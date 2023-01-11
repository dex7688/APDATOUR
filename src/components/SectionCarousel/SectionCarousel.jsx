import React, { useState, useRef } from "react";
import styles from "./SectionCarousel.module.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import SelectInput from "../../components/SelectInput/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import { changeType } from "../../store/modules/searchInfo";

export default function SectionCarousel() {
  const [selected, setSelected] = useState("여행");
  const { type, areaCode, sigunguCode } = useSelector(
    (state) => state.searchInfo
  );
  const sectionRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 여행,숙박,축제 클릭할 경우 클릭 상태 저장, api 요청시 필요한 type 변경
  const handleOptionClick = (e) => {
    dispatch(changeType(e.target.textContent));
    setSelected(e.target.textContent);
  };

  // button 클릭 시 페이지 이동하기 위한 router 주소 값 반환
  const getPageNation = () => {
    if (selected === "여행") return "/travel";
    if (selected === "축제") return "/festival";
    if (selected === "숙박") return "/accommodation";
  };

  // 알아보기 버튼 클릭 시 이동, 지역을 선택하지 않으면 alert 생성
  const handleButtonClick = () => {
    if (sigunguCode === "") {
      alert("지역을 선택해주세요");
    } else {
      navigate(getPageNation());
    }
  };

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.innerLeft}>
        <h2 className={styles.title}>
          고객님,
          <br />
          어떤 여행을 꿈꾸시나요?
        </h2>

        <ul className={styles.optionList}>
          {typesInfo.map((el) => (
            <li
              key={el.name}
              onClick={handleOptionClick}
              className={`${styles.option} ${
                selected === el.name && styles.active
              }`}
            >
              {el.name}
            </li>
          ))}
        </ul>

        <SelectInput />

        <button className={styles.button} onClick={handleButtonClick}>
          {selected} 알아보기
        </button>
      </div>

      <div className={styles.innerRight}>
        <Carousel sectionRef={sectionRef} />
      </div>
    </section>
  );
}

const typesInfo = [
  { name: "여행", type: "areaBasedList" },
  { name: "축제", type: "searchFestival" },
  { name: "숙박", type: "searchStay" },
];
