import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Review.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

export default function ReviewDetail() {
  const { reviewNo } = useParams();
  const [like, setLike] = useState(0);
  const [review, setReview] = useState([]);
  const [comment, setComment] = useState(false);
  const commentInput = useRef();
  const userEmail = useSelector((state) => state.user.userEmail);
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  // let year = review.registerTime.getFullYear(); // 년도
  // let month = review.registerTime.getMonth() + 1; // 월 => +1 하는 이유는 월이 0부터 시작하기 때문
  // let date = review.registerTime.getDate(); // 일

  // // month가 10보다 작으면 문자 '0'을 추가하는 코드
  // month = month >= 10 ? month : "0" + month;

  // // date가 10보다 작으면 문자'0'을 추가하는 코드
  // date = date >= 10 ? date : "0" + date;

  // let selectDate = `${year}년 ${month}월 ${date}일`;

  const deleteComment = async (author, comment) => {
    const deleteCommentResponse = await fetch(`http://3.36.132.58:4500/review/comment/delete/${reviewNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: author,
        comment: comment,
      }),
    });
    if (deleteCommentResponse.status === 200) {
      const deleteCommentResult = await deleteCommentResponse.json();
      alert(deleteCommentResult.msg);
      setComment(!comment);
    } else {
      alert('서버 통신 에러');
    }
  };

  const postCommnet = async () => {
    const addCommentResponse = await fetch(`http://3.36.132.58:4500/review/comment/add/${reviewNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: userEmail,
        comment: commentInput.current.value,
        registerTime: new Date(),
      }),
    });
    commentInput.current.value = '';
    if (addCommentResponse.status === 200) {
      const addCommentResult = await addCommentResponse.json();
      alert(addCommentResult.msg);
      setComment(!comment);
    } else {
      alert('서버 통신 에러');
    }
  };

  async function fetchReview() {
    const reviewRes = await fetch(`http://3.36.132.58:4500/review/${reviewNo}`);
    if (reviewRes.status === 200) {
      const data = await reviewRes.json();
      setReview(data);
      setLike(data.like);
    }
  }
  async function addLike() {
    const likeRes = await fetch(`http://3.36.132.58:4500/review/addLike/${reviewNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (likeRes.status === 200) {
      const msg = await likeRes.json();
      if (msg === '업데이트 성공') {
        setLike(like + 1);
      } else {
        alert('업데이트 문제');
      }
    }
  }
  async function addCount() {
    const countRes = await fetch(`http://3.36.132.58:4500/review/addCount/${reviewNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (countRes.status === 200) {
      const msg = await countRes.json();
      if (msg === '업데이트 문제') {
        alert('업데이트 문제');
      }
    }
  }

  const deleteReview = async () => {
    const deleteReviewResponse = await fetch(`http://3.36.132.58:4500/review/delete/${reviewNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (deleteReviewResponse.status === 200) {
      const deleteReviewResult = await deleteReviewResponse.json();
      alert(deleteReviewResult.msg);
      navigate('/review');
    } else {
      alert('리뷰 삭제 실패');
    }
  };

  useEffect(() => {
    fetchReview();
    addCount();
  }, [comment]);

  return (
    <div>
      {/* <div>review ID is {reviewID} </div> */}
      <div className={styles.wrap}>
        <h3 className={styles.title}>나의 여행기</h3>
        <div className={styles.title2}>
          <span className={styles.item_box}>{review.item}</span>
          <span className={styles.title_box}>{review.title}</span>
          <span className={styles.author_box}>{review.author}</span>
          <span className={styles.registerTime_box}>{review.registerTime?.substring(0, 10)}</span>
          <span className={styles.counts_box}>{review.counts}</span>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: review.content }}></div>
        <div className={styles.btn_box}>
          <div className={styles.like_box}>
            <h3 className={styles.like_text}>
              후기가 도움이 되었나요?{' '}
              <button className={styles.like_btn} onClick={() => addLike()}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              {like}
            </h3>
          </div>
        </div>
        {/* <div className={styles.like}>
          후기가 도움되었나요?{" "}
          <button onClick={() => addLike()}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          {like}
        </div> */}
        <br />
        {userEmail === review.author && (
          <div className={styles.write_btnbox}>
            <Link to={`/review/modify/${reviewNo}`}>
              <button className={styles.write_modify}>수정</button>
            </Link>
            <button className={styles.write_delete} onClick={() => deleteReview()}>
              삭제
            </button>
          </div>
        )}
        {review.comments?.map((el, index) => {
          return (
            <div className={styles.comment_box} key={index}>
              <span className={styles.comment_writer}>{el.author}</span>
              <span className={styles.comment_write}>{el.comment}</span>
              <span className={styles.comment_date}>
                {el.registerTime?.substring(0, 10)}
                {userEmail === el.author && (
                  <button className={styles.comment_delete} onClick={() => deleteComment(el.author, el.comment)}>
                    <FontAwesomeIcon icon={faRectangleXmark} />
                  </button>
                )}
              </span>
            </div>
          );
        })}
        {isLogin && (
          <div className={styles.comment_write_box}>
            댓글
            <input type='text' placeholder='내용을 입력해주세요' ref={commentInput}></input>
            <button
              className={`${styles.comment_push} ${
                comment.length > 0 ? styles.submitCommentActive : styles.submitCommentInactive
              }`}
              onClick={postCommnet}
            >
              전송
            </button>
          </div>
        )}

        <Link to='/review'>
          <button className={styles.btn}>목록</button>
        </Link>
      </div>
    </div>
  );
}
