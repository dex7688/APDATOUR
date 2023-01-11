import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_left}>
        <div>상호명 : 앞다투어</div>
        <div>CEO : kdt4-team2</div>
        <div>E-mail : ilove@tour.com</div>
      </div>
      <div className={styles.footer_right}>
        <div>사업자등록번호 : 2022-12-30</div>
        <div>통신판매업신고번호 : 2022-앞다투어-1230호</div>
        <div>주소 : 대한민국</div>
      </div>
      <div className={styles.footer_copy}>Copyright©앞다투어</div>
    </footer>
  );
}
