import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Review.module.css';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  // HTTPS
  const HTTPS = 'https://api.tourapda.com';
  // LOCAL
  // const HTTPS = 'http://localhost:4500';

  useEffect(() => {
    fetchAllReview();
  }, []);

  async function fetchAllReview() {
    const reviewRes = await fetch(`${HTTPS}/review/getAll`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (reviewRes.status === 200) {
      const data = await reviewRes.json();
      setReviews(data);
    }
  }
  const { reviewNo } = useParams();
  const [count, setCount] = useState(0);

  async function addCounts() {
    const countRes = await fetch(`${HTTPS}/review/addCounts/${reviewNo}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (countRes.status === 200) {
      const msg = await countRes.json();
      if (msg === '업데이트 성공') {
        setCount(count + 1);
      } else {
        alert('업데이트 문제');
      }
    }
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>여행 후기 게시판</h3>
      <p>총 {reviews.length}건</p>
      <table>
        <thead>
          <tr>
            <th style={{ width: '100px' }}>번호</th>
            <th style={{ width: '100px' }}>지역</th>
            <th style={{ width: '350px' }}>제목</th>
            <th style={{ width: '180px' }}>회원E-mail</th>
            <th style={{ width: '180px' }}>등록일</th>
            <th style={{ width: '150px' }}>조회수</th>
            <th style={{ width: '150px' }}>추천수</th>
          </tr>
        </thead>

        {reviews.map((el) => {
          return (
            <tbody>
              <tr key={el.no} onClick={() => navigate(`${el.no}`)} className={styles.listClick}>
                <td>{el.no}</td>
                <td>{el.item}</td>
                <td>{el.title}</td>
                <td>{el.author}</td>
                <td>{el.registerTime.substring(0, 10)}</td>
                <td>{el.counts}</td>
                <td>{el.like}</td>
              </tr>
            </tbody>
          );
        })}
      </table>

      {isLogin && (
        <Link to='write'>
          <button className={styles.btn} onClick={() => addCounts()}>
            글쓰기
          </button>
        </Link>
      )}
    </div>
  );
}
