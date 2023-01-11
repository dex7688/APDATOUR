import React from "react";
import styles from "./Board.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";

export default function Board() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>여행 후기게시판</h1>
      <div className={styles.write_box}>
        <div className={styles.write_info}>
          <div className={styles.write_area}>상품</div>
          <div className={styles.write_title}>제목</div>
          <div className={styles.write_name}>이름</div>
          <div className={styles.write_date}>날짜</div>
          <div className={styles.write_views}>조회수</div>
        </div>
        <div className={styles.write}>
          <p></p>
          <div className={styles.btn_box}>
            <div className={styles.like_box}>
              <h3 className={styles.like_text}>
                후기가 마음에 드셨나요?
                <button className={styles.like_btn}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
              </h3>
              <p></p>
            </div>
          </div>
        </div>
        <div className={styles.write_btnbox}>
          <button className={styles.wrtie_modify}></button>
          <button className={styles.wrtie_delete}></button>
        </div>
        <div className={styles.comment_box}>
          <span className={styles.comment_writer}>작성자</span>
          <span className={styles.comment_write}>내용</span>
          <span className={styles.comment_date}>
            시간
            <button className={styles.comment_delete}>
              <FontAwesomeIcon icon={faRectangleXmark} />
            </button>
          </span>
        </div>
        <div className={styles.comment_write_box}>
          댓글
          <input type="text" placeholder="내용을 입력해주세요"></input>
          <button className={styles.comment_push}>전송</button>
        </div>
      </div>
    </div>
  );
}
