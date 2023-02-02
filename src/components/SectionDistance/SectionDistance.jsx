import React, { useState } from 'react';
import styles from './SectionDistance.module.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useFetchTourListByDistance } from '../../hooks/useFetchTourListByDistance';
import ItemCard from '../ItemCard/ItemCard';

export default function SectionDistance() {
  const [slide, setSlide] = useState(0);
  const { data: distanceData } = useFetchTourListByDistance();

  const getCarouselStyle = () => {
    return {
      transition: 'transform 0.25s ease-out',
      transform: `translateX(${-295 * slide}px)`,
    };
  };

  const handleNextClick = () => {
    if (slide === distanceData.length - 3) {
      setSlide(distanceData.length - 3);
    } else {
      setSlide((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    if (slide === 0) {
      setSlide(0);
    } else {
      setSlide((prev) => prev - 1);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>주변 관광지</h2>
      <div className={styles.itemWrapper}>
        <div className={styles.itemImage} />
        <div className={styles.itemSlides}>
          <div className={styles.carousel} style={getCarouselStyle()}>
            {distanceData?.map((tourList, index) => (
              <ItemCard
                key={index}
                addr1={tourList.addr1}
                firstimage={tourList.firstimage}
                title={tourList.title}
                contentid={tourList.contentid}
                dist={parseInt(tourList.dist, 10)}
              />
            ))}
          </div>

          {distanceData && slide !== distanceData.length - 3 && (
            <span className={styles.next} onClick={handleNextClick}>
              <MdKeyboardArrowRight className={styles.icons} />
            </span>
          )}
          {distanceData && slide !== 0 && (
            <span className={styles.prev} onClick={handlePrevClick}>
              <MdKeyboardArrowLeft className={styles.icons} />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
