import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

export default function SignUp() {
  const usernameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const regionInput = useRef();
  const navigate = useNavigate();

  async function register() {
    const registerInfo = {
      name: usernameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
      region: regionInput.current.value,
    };

    if (registerInfo.name !== '' && registerInfo.email !== '' && registerInfo.password !== '' && registerInfo.region) {
      const registerResponse = await fetch('http://3.36.132.58/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
      });
      if (registerResponse.status === 200) {
        const result = await registerResponse.json();
        if (result.result) {
          alert(result.msg);
          navigate('/login');
        } else {
          alert(result.msg);
        }
      }
    } else {
      alert('가입 정보를 입력해주세요');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.signup_box}>
        <div className={styles.signUp_text}>
          <h1>회원가입</h1>
        </div>
        <ul className={styles.signup_input}>
          <li>
            <div className={styles.signup_boxtext}>이름</div>
            <input
              ref={usernameInput}
              type='text'
              className={styles.signup_box1}
              placeholder='이름을 입력하세요'
            ></input>
          </li>
          <li>
            <div className={styles.signup_boxtext}>이메일</div>
            <input
              ref={emailInput}
              type='email'
              className={styles.signup_box1}
              placeholder='이메일을 입력하세요'
            ></input>
          </li>
          <li>
            <div className={styles.signup_boxtext}>비밀번호</div>
            <input
              ref={passwordInput}
              type='password'
              className={styles.signup_box1}
              placeholder='비밀번호를 입력하세요'
            ></input>
          </li>
          <li>
            <div className={styles.signup_boxtext}>관심여행지</div>
            <select className={styles.tourli} ref={regionInput}>
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
          </li>
          <li>
            <button
              className={styles.signup_btn}
              onClick={() => {
                register();
              }}
            >
              회원가입
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
