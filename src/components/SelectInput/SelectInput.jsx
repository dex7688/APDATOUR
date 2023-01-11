import React, { useEffect, useState, useRef } from 'react';
import styles from './SelectInput.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeAreaCode, changeSigunguCode } from '../../store/modules/searchInfo';
import { fetchSigungu } from '../../store/modules/fetchSigungu';

export default function SelectInput() {
  const [isOpen, setIsOpen] = useState(false);
  const { areaCode, sigunguCode } = useSelector((state) => state.searchInfo);
  const { sigunGuData, loading } = useSelector((state) => state.fetchsigungu);
  const dispatch = useDispatch();
  const inputRef = useRef();

  // 다른곳을 클릭하면 지역선택창이 사라지게 하기, 초기 지역선택창 서울(1) api 요청
  useEffect(() => {
    window.addEventListener('click', () => {
      setIsOpen(false);
    });

    return () => {
      window.removeEventListener(
        'click',
        window.addEventListener('click', () => {
          setIsOpen(false);
        })
      );
    };
  }, []);

  // input value 설정 시 + 시군구
  useEffect(() => {
    const areaName = areaCodes.find((el) => el.code === areaCode);
    const sigunguName = sigunGuData.find((el) => el.code === sigunguCode);
    inputRef.current.value = `${areaName?.name || ''} ${sigunguName?.name || ''}`;
  }, [sigunguCode, areaCode]);

  // 지역을 선택하면 시군구 api 요청
  const handleAreaClick = (area) => {
    dispatch(changeAreaCode(area.code));
    dispatch(fetchSigungu(area.code));
    dispatch(changeSigunguCode(''));
  };

  // 지역 선택할때 active 효과를 주기 위해 useState로 관리
  const handleSigunguClick = (sigungu) => {
    dispatch(changeSigunguCode(sigungu.code));
  };

  return (
    <div className={styles.selectInputWrapper} onClick={(e) => e.stopPropagation()}>
      <input
        className={styles.selectInput}
        readOnly
        type='text'
        placeholder='원하시는 지역을 선택하세요'
        onClick={() => {
          setIsOpen((prev) => !prev);
          dispatch(changeAreaCode('1'));
          dispatch(fetchSigungu('1'));
        }}
        ref={inputRef}
      />
      {isOpen && (
        <div className={styles.areaWrapper}>
          <div className={styles.textWrapper}>
            <div className={styles.text}>지역을 선택하세요</div>
            <div className={styles.close} onClick={() => setIsOpen(false)}>
              닫기
            </div>
          </div>

          <div className={styles.listWrapper}>
            <div className={styles.areaList}>
              {areaCodes.map((area) => (
                <div
                  key={area.name}
                  className={`${styles.area} ${areaCode === area.code ? styles.active : ''}`}
                  onClick={() => handleAreaClick(area)}
                >
                  {area.name}
                </div>
              ))}
            </div>
            <div className={styles.sigunguList}>
              {loading && <div>loading..</div>}
              {sigunGuData &&
                sigunGuData.map((sigungu) => (
                  <div
                    className={`${styles.sigungu} ${sigunguCode === sigungu.code ? styles.active : ''}`}
                    key={sigungu.name}
                    onClick={() => handleSigunguClick(sigungu)}
                  >
                    {sigungu.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 도시(서울, 인천, ..)에 대한 코드
const areaCodes = [
  {
    rnum: 1,
    code: '1',
    name: '서울',
  },
  {
    rnum: 2,
    code: '2',
    name: '인천',
  },
  {
    rnum: 3,
    code: '3',
    name: '대전',
  },
  {
    rnum: 4,
    code: '4',
    name: '대구',
  },
  {
    rnum: 5,
    code: '5',
    name: '광주',
  },
  {
    rnum: 6,
    code: '6',
    name: '부산',
  },
  {
    rnum: 7,
    code: '7',
    name: '울산',
  },
  {
    rnum: 8,
    code: '8',
    name: '세종시',
  },
  {
    rnum: 9,
    code: '31',
    name: '경기도',
  },
  {
    rnum: 10,
    code: '32',
    name: '강원도',
  },
  {
    rnum: 11,
    code: '33',
    name: '충청북도',
  },
  {
    rnum: 12,
    code: '34',
    name: '충청남도',
  },
  {
    rnum: 13,
    code: '35',
    name: '경상북도',
  },
  {
    rnum: 14,
    code: '36',
    name: '경상남도',
  },
  {
    rnum: 15,
    code: '37',
    name: '전라북도',
  },
  {
    rnum: 16,
    code: '38',
    name: '전라남도',
  },
  {
    rnum: 17,
    code: '39',
    name: '제주도',
  },
];
