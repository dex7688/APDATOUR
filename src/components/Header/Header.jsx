import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/modules/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo} style={{ fontSize: "30px" }}>
        <Link to="/" className={styles.logoText} style={{ fontSize: "30px" }}>
          앞다투어
          <FontAwesomeIcon icon={faPaperPlane} />
        </Link>
      </h1>

      <nav className={styles.navList}>
        <Link to="/travel" className={styles.navItem}>
          여행
        </Link>
        <Link to="/festival" className={styles.navItem}>
          축제
        </Link>
        <Link to="/accommodation" className={styles.navItem}>
          숙박
        </Link>
        <Link to="/review" className={styles.navItem}>
          후기
        </Link>

        {isLogin ? (
          <Link
            onClick={() => {
              dispatch(logout());
            }}
            className={styles.navItem}
          >
            로그아웃
          </Link>
        ) : (
          <>
            <Link to="/login" className={styles.navItem}>
              로그인
            </Link>
            <Link to="/signup" className={styles.navItem}>
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

// 푸라닭
// 여기어때
// 강원교육
// 생거진천체
