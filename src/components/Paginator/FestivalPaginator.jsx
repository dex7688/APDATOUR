import React, { useState } from 'react';
import styles from './Paginator.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFestival } from '../../store/modules/fetchFestival';
import { FcNext, FcPrevious } from 'react-icons/fc';

export default function FestivalPaginator({ totalCount, pageNo, date }) {
  const { type, areaCode, sigunguCode, contentTypeCode } = useSelector((state) => state.searchInfo);
  const [pageIndex, setPageIndex] = useState(0);
  const dispatch = useDispatch();

  // 필요한 총 페이지 수
  const numOfPages = Math.ceil(Number(totalCount) / 8);
  // 필요한 페이지 수만큼 배열 생성
  const numArray = Array.from({ length: numOfPages }, (v, i) => i + 1);
  // 한번에 보여줄 페이지 수
  const pagination = numArray.slice(0 + pageIndex * 5, 5 + pageIndex * 5);
  // 마지막 페이지 index
  const lastPageIndex = Math.ceil(numArray.length / 5) - 1;
  // 처음 페이지 index
  const startPageIndex = 0;

  const handleNextClick = () => {
    if (pageIndex === lastPageIndex) return;
    setPageIndex((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    if (pageIndex === startPageIndex) return;
    setPageIndex((prev) => prev - 1);
  };

  const handleClick = (el) => {
    dispatch(fetchFestival('searchFestival', areaCode, sigunguCode, date, el));
  };

  return (
    <div className={styles.pagination}>
      {totalCount && pageIndex !== startPageIndex && (
        <div className={styles.iconWrapper} onClick={handlePrevClick}>
          <FcPrevious className={styles.icons} />
        </div>
      )}
      {pagination.map((el) => (
        <div
          onClick={() => handleClick(el)}
          key={el}
          className={`${styles.pageNumber} ${el === pageNo && styles.current}`}
        >
          {el}
        </div>
      ))}
      {totalCount && pageIndex !== lastPageIndex && (
        <div className={styles.iconWrapper} onClick={handleNextClick}>
          <FcNext className={styles.icons} />
        </div>
      )}
    </div>
  );
}
