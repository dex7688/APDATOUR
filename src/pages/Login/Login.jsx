import React, { useRef } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/modules/users';

export default function Login() {
  const KAKAO_CLIENT_ID = '71fc8b830aac0622e9954140782b4cf4';
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const userEmailInput = useRef();
  const userPasswordInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginUser() {
    const loginInfo = {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    };
    if (loginInfo.email !== '' && loginInfo.password !== '') {
      const loginResponse = await fetch('http://3.36.132.58:4500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });
      if (loginResponse.status === 200) {
        const result = await loginResponse.json();
        //로그인 처리 하기
        if (result.result) {
          dispatch(login(result));
          navigate('/');
        } else {
          alert(result.msg);
        }
      } else {
        throw new Error('로그인 실패');
      }
    } else {
      alert('이메일 또는 비밀번호를 입력해주세요.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.login_box}>
          <div className={styles.login_text}>
            <h3>로그인</h3>
          </div>
          <ul className={styles.login_input}>
            <li>
              <input
                ref={userEmailInput}
                className={styles.login_inputbox1}
                type='email'
                placeholder='아이디(이메일 계정)'
              ></input>
            </li>
            <li>
              <input
                ref={userPasswordInput}
                className={styles.login_inputbox2}
                type='password'
                placeholder='비밀번호를 입력하세요'
              ></input>
            </li>
          </ul>
          <button className={styles.login_btn} onClick={() => loginUser()}>
            로그인
          </button>
          <Link to='/signup'>
            <button className={styles.register_btn}>회원가입</button>
          </Link>
          <a href={KAKAO_AUTH_URL}>
            <div className={styles.kakao_btn}></div>
          </a>
        </div>
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
