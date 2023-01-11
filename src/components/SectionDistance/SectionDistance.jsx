import React, { useState } from 'react';
import styles from './SectionDistance.module.css';
import useGeolocation from '../useGeolocation';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function SectionDistance() {
  const [slide, setSlide] = useState(0);
  const [distanceData, loading, error] = useGeolocation();
  const navigate = useNavigate();

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
      <h2 className={styles.title}>내 주변 관광지 보기</h2>
      <div className={styles.itemWrapper}>
        <div className={styles.itemImage}></div>
        <div className={styles.itemSlides}>
          <div className={styles.carousel} style={getCarouselStyle()}>
            {loading && <div className={styles.loading}>l</div>}
            {distanceData &&
              distanceData.map((el) => (
                <div className={styles.item} key={el.title}>
                  <img className={styles.img} src={el.firstimage || 'images/gray.jpg'} alt={el.title} />
                  <div>
                    <div className={styles.title}>{el.title}</div>
                    <div className={styles.addr}>
                      주소
                      <br />
                      {el.addr1}
                    </div>
                    <div className={styles.dist}>거리 {parseInt(el.dist, 10)}m</div>
                  </div>
                </div>
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
