import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Editor from './Editor';
import styles from './Write.module.css';

export default function Modify() {
  const { reviewNo } = useParams();
  const itemInput = useRef();
  const titleInput = useRef();
  let textareaInput = '';
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchReview();
  }, []);

  async function fetchReview() {
    const reviewRes = await fetch(`http://3.36.132.58/review/${reviewNo}`);
    if (reviewRes.status === 200) {
      const data = await reviewRes.json();
      itemInput.current.value = data.item;
      titleInput.current.value = data.title;
      setContent(data.content);
    }
  }

  const userEmail = useSelector((state) => state.user.userEmail);

  function onEditorChange(value) {
    textareaInput = value;
  }

  async function post() {
    textareaInput === '' ? (textareaInput = content) : (textareaInput = textareaInput);

    const modifyInfo = {
      item: itemInput.current.value,
      title: titleInput.current.value,
      content: textareaInput,
      email: userEmail,
    };

    if (modifyInfo.item !== '' && modifyInfo.title !== '' && modifyInfo.content) {
      const postResponse = await fetch(`http://3.36.132.58:4500/review/modify/${reviewNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifyInfo),
      });
      if (postResponse.status === 200) {
        const result = await postResponse.json();
        if (result.result) {
          alert(result.msg);
          navigate('/review');
        } else {
          alert(result.msg);
        }
      }
    } else {
      alert('필수 정보를 입력해주세요');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.write_box}>
        <div className={styles.title_box}>
          <h1>작성페이지</h1>
          <h3 className={styles.h3}> 　　*는 필수입력 정보입니다.</h3>
        </div>
        <div className={styles.item_box}>
          <div className={styles.item_name}>*여행상품</div>
          <div className={styles.item_tourli}>
            <select className={styles.tourli} ref={itemInput}>
              <option value=''>선택</option>
              <option value='강원'>강원</option>
              <option value='경기'>경기</option>
              <option value='경남'>경남</option>
              <option value='경북'>경북</option>
              <option value='경주'>경주</option>
              <option value='대구'>대구</option>
              <option value='대전'>대전</option>
              <option value='부산'>부산</option>
              <option value='서울'>서울</option>
              <option value='울산'>울산</option>
              <option value='인천'>인천</option>
              <option value='전남'>전남</option>
              <option value='전북'>전북</option>
              <option value='제주'>제주</option>
              <option value='충남'>충남</option>
              <option value='충북'>충북</option>
            </select>
          </div>
        </div>
        <div className={styles.content_box}>
          <div className={styles.content_name}>*제목</div>
          <div className={styles.content_input}>
            <input type='text' placeholder='제목을 입력하세요' ref={titleInput}></input>
          </div>
        </div>
        <div className={styles.review_box}>
          <div className={styles.review_name}>*내용</div>
          <div className={styles.review_input}>
            <Editor onChange={onEditorChange} value={content} />
          </div>
        </div>
        <div className={styles.btn_box}>
          <button className={styles.btn_push} onClick={() => post()}>
            수정하기
          </button>
          <Link to='/review'>
            <button className={styles.btn_cancel}>취소하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
