import React, { useState, useEffect, useRef } from 'react';
import styles from './Carousel.module.css';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

export default function Carousel({ sectionRef }) {
  const [slide, setSlide] = useState(1);
  const carouselRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slide === 5) setSlide(1);
    if (slide === 0) setSlide(4);
    carouselRef.current.style.backgroundImage = backgroundInfo[slide].carousel;
    sectionRef.current.style.backgroundColor = backgroundInfo[slide].section;
  }, [slide]);

  const handleNextClick = () => {
    setSlide((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    setSlide((prev) => prev - 1);
  };

  return (
    <>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselItem} ref={carouselRef} />
      </div>
      <div className={styles.iconWrapper}>
        <span className={styles.prev} onClick={handlePrevClick}>
          <MdKeyboardArrowLeft className={styles.icons} />
        </span>
        <span className={styles.next} onClick={handleNextClick}>
          <MdKeyboardArrowRight className={styles.icons} />
        </span>
      </div>
    </>
  );
}

const backgroundInfo = [
  {
    section: '#7fd1ae',
    carousel: 'url(images/carouselReview.jpeg)',
    color: '#303030',
  },
  {
    section: '#b0edf6',
    carousel: "url('images/carouselTravel.jpeg')",
    color: '#FFFFFF',
  },
  {
    section: '#ACA7CB',
    carousel: "url('images/carouselFestival.jpeg')",
    color: '#FFFFFF',
  },
  {
    section: '#f8dec3',
    carousel: "url('images/carouselAccommodation.jpeg')",
    color: '#303030',
  },
  {
    section: '#7fd1ae',
    carousel: "url('images/carouselReview.jpeg')",
    color: '#303030',
  },
  {
    section: '#b0edf6',
    carousel: "url('images/carouselTravel.jpeg')",
    color: '#FFFFFF',
  },
];
