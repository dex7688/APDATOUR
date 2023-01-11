import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Review.module.css";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    fetchAllReview();
  }, []);

  async function fetchAllReview() {
    const reviewRes = await fetch("http://3.36.132.58:4500/review/getAll");
    if (reviewRes.status === 200) {
      const data = await reviewRes.json();

      setReviews(data);
    }
  }
  const { reviewNo } = useParams();
  const [count, setCount] = useState(0);
  async function addCounts() {
    const countRes = await fetch(
      `http://3.36.132.58:4500/review/addCounts/${reviewNo}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (countRes.status === 200) {
      const msg = await countRes.json();
      if (msg === "업데이트 성공") {
        setCount(count + 1);
      } else {
        alert("업데이트 문제");
      }
    }
  }

  // const reviews = [
  //   {
  //     no: 1,
  //     title: "테스트",
  //     author: "회원1",
  //     registerTime: "2022-12-22",
  //     counts: 1,
  //     like: 0,
  //   },
  //   {
  //     no: 2,
  //     title: "테스트",
  //     author: "회원2",
  //     registerTime: "2022-12-22",
  //     counts: 1,
  //     like: 0,
  //   },
  //   {
  //     no: 3,
  //     title: "테스트",
  //     author: "회원3",
  //     registerTime: "2022-12-22",
  //     counts: 1,
  //     like: 0,
  //   },
  // ];
  // async function getAllReviews() {
  //   const reviewResponse = await fetch("backend address");
  //   const allReviews = await reviewResponse.json();
  //   setReviews(allReviews);
  // }

  const handleWriteClick = () => {
    if (isLogin) {
      navigate("/review/write");
    } else {
      alert("로그인을 해주세요");
      navigate("/login");
    }
  };

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>여행 후기 게시판</h3>
      <p>총 {reviews.length}건</p>
      <table>
        <thead>
          <tr>
            <th style={{ width: "100px" }}>번호</th>
            <th style={{ width: "100px" }}>지역</th>
            <th style={{ width: "350px" }}>제목</th>
            <th style={{ width: "180px" }}>회원E-mail</th>
            <th style={{ width: "180px" }}>등록일</th>
            <th style={{ width: "150px" }}>조회수</th>
            <th style={{ width: "150px" }}>추천수</th>
          </tr>
        </thead>

        {reviews.map((el) => {
          return (
            <tbody>
              <tr
                key={el.no}
                onClick={() => navigate(`${el.no}`)}
                className={styles.listClick}
              >
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
        <Link to="write">
          <button className={styles.btn} onClick={() => addCounts()}>
            글쓰기
          </button>
        </Link>
      )}
    </div>
  );
}
