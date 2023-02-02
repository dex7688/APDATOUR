import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../../store/modules/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4500/login/check', { withCredentials: true }).then((data) => {
      if (data.data.cookie) {
        dispatch(login({ email: data.data.cookie }));
      }
    });
  }, []);

  useEffect(() => setUser(isLogin), [isLogin]);

  const handleLogoutClick = () => {
    axios.get('http://localhost:4500/logout', { withCredentials: true });
    setUser('');
    dispatch(logout());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to='/' className={styles.logoText}>
          앞다투어
          <FontAwesomeIcon icon={faPaperPlane} />
        </Link>
      </h1>

      <nav className={styles.navList}>
        <Link to='/travel' className={styles.navItem}>
          여행
        </Link>
        <Link to='/festival' className={styles.navItem}>
          축제
        </Link>
        <Link to='/accommodation' className={styles.navItem}>
          숙박
        </Link>
        <Link to='/review' className={styles.navItem}>
          후기
        </Link>

        {user ? (
          <div onClick={handleLogoutClick} className={styles.navItem}>
            로그아웃
          </div>
        ) : (
          <>
            <Link to='/login' className={styles.navItem}>
              로그인
            </Link>
            <Link to='/signup' className={styles.navItem}>
              회원가입
            </Link>
          </>
        )}
      </nav>

      <GiHamburgerMenu className={styles.burgerMenu} onClick={() => setShow((prev) => !prev)} />

      <nav className={`${styles.miniNavList} ${show && styles.active}`} onClick={() => setShow(false)}>
        <Link to='/travel' className={styles.navItem}>
          여행
        </Link>
        <Link to='/festival' className={styles.navItem}>
          축제
        </Link>
        <Link to='/accommodation' className={styles.navItem}>
          숙박
        </Link>
        <Link to='/review' className={styles.navItem}>
          후기
        </Link>

        {user ? (
          <div onClick={handleLogoutClick} className={styles.navItem}>
            로그아웃
          </div>
        ) : (
          <>
            <Link to='/login' className={styles.navItem}>
              로그인
            </Link>
            <Link to='/signup' className={styles.navItem}>
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
