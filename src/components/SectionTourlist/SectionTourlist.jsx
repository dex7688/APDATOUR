import { useState, useEffect } from 'react';
import styles from './SectionTourlist.module.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import ItemCard from '../ItemCard/ItemCard';
import SelectBox from '../SelectBox/SelectBox';
import { useFetchTourListByArea } from '../../hooks/useFetchTourListByArea';
import { useFetchAreaCode } from '../../hooks/useFetchAreaCode';

export default function SectionTourlist() {
  const [currentArea, setCurrentArea] = useState('1');
  const [slide, setSlide] = useState(4);
  const { data: tourLists } = useFetchTourListByArea(currentArea);
  const { data: areaCodes } = useFetchAreaCode();

  const handleOnChange = (areaCode) => {
    setCurrentArea(areaCode);
  };

  const handleNextClick = () => {
    setSlide((slide) => slide + 1);
  };

  const handlePrevClick = () => {
    setSlide((slide) => slide - 1);
  };

  // 무한 슬라이드 css
  const slideTransform = () => {
    if (slide === 15) {
      setTimeout(() => {
        setSlide(5);
      }, 50);
      return { transform: `transLateX(-${(145 / 3 + 280) * 4}px)` };
    } else if (slide === -1) {
      setTimeout(() => {
        setSlide(9);
      }, 50);
      return { transform: `transLateX(-${(145 / 3 + 280) * 10}px)` };
    } else {
      return { transform: `transLateX(-${(145 / 3 + 280) * slide}px)`, transition: 'transform 0.2s ease-out' };
    }
  };

  // 무한 슬라이드를 위해 받아온 데이터를 수정
  const tourListsLoop = tourLists && [...tourLists.slice(6), ...tourLists, ...tourLists.slice(0, 4)];

  return (
    <section className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>관광지 둘러보기</h2>
        <SelectBox
          items={areaCodes}
          currentArea={currentArea}
          labelId={'area'}
          selectId={'areaSelect'}
          label={'지역'}
          handleOnChange={handleOnChange}
        />
      </div>
      <div className={styles.slide}>
        <div className={styles.itemWrapper} style={slideTransform()}>
          {tourListsLoop?.map((tourList, index) => (
            <ItemCard
              key={index}
              addr1={tourList.addr1}
              firstimage={tourList.firstimage}
              title={tourList.title}
              contentid={tourList.contentid}
            />
          ))}
        </div>
      </div>
      <span className={styles.prev} onClick={handlePrevClick}>
        <MdKeyboardArrowLeft className={styles.icons} />
      </span>
      <span className={styles.next} onClick={handleNextClick}>
        <MdKeyboardArrowRight className={styles.icons} />
      </span>
    </section>
  );
}
