import React, { useEffect, useState, useRef } from 'react';
import styles from './SelectInput.module.css';
import { useFetchAreaCode } from '../../hooks/useFetchAreaCode';
import { useFetchSigungu } from '../../hooks/useFetchSigungu';

export default function SelectInput({ areaInfo, setAreaInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: areaLists } = useFetchAreaCode();
  const { data: sigunguLists } = useFetchSigungu(areaInfo.area);

  const inputRef = useRef();

  // 다른곳을 클릭하면 지역선택창이 사라지게 하기
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

  // 지역 선택시 input value 값 설정
  useEffect(() => {
    const areaName = areaLists?.find((el) => el.code === areaInfo.area);
    const sigunguName = sigunguLists?.find((el) => el.code === areaInfo.sigungu);

    if (areaName && sigunguName) {
      inputRef.current.value = `${areaName.name} ${sigunguName.name}`;
    }
  }, [areaInfo]);

  // 지역을 선택하면 시군구 api 요청, 시군구 코드 초기화
  const handleAreaClick = (area) => {
    setAreaInfo({ ...areaInfo, area: area.code, sigungu: '' });
  };

  // 시군구 코드 useStatae를 사용하여 관리
  const handleSigunguClick = (sigungu) => {
    setAreaInfo({ ...areaInfo, sigungu: sigungu.code });
  };

  return (
    <div className={styles.selectInputWrapper} onClick={(e) => e.stopPropagation()}>
      <input
        className={styles.selectInput}
        readOnly
        type='text'
        placeholder='원하시는 지역을 선택하세요'
        onClick={() => setIsOpen((prev) => !prev)}
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
              {areaLists?.map((area) => (
                <div
                  key={area.name}
                  className={`${styles.area} ${areaInfo.area === area.code ? styles.active : ''}`}
                  onClick={() => handleAreaClick(area)}
                >
                  {area.name}
                </div>
              ))}
            </div>
            <div className={styles.sigunguList}>
              {/* {loading && <div>loading..</div>} */}
              {sigunguLists?.map((sigungu) => (
                <div
                  className={`${styles.sigungu} ${areaInfo.sigungu === sigungu.code ? styles.active : ''}`}
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
