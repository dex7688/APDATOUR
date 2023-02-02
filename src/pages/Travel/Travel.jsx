import { useEffect, useState } from 'react';
import styles from './Travel.module.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paginator from '../../components/Paginator/Paginator';
import LoadingSpinner from '../../components/LoadingSpinner.jsx/LoadingSpinner';
import { useFetchAreaCode } from '../../hooks/useFetchAreaCode';
import { useFetchSigungu } from '../../hooks/useFetchSigungu';
import { useFetchTourListBySigungu } from '../../hooks/useFetchTourListByArea';
import { useLocation } from 'react-router-dom';

// 컨텐츠 타입
const contentTypes = [
  { name: '관광지', code: '12' },
  { name: '문화시설', code: '14' },
  { name: '여행코스', code: '25' },
  { name: '레포츠', code: '28' },
  { name: '쇼핑', code: '38' },
  { name: '음식점', code: '39' },
];

export default function Travel() {
  const { state } = useLocation();
  const [area, setArea] = useState(state?.area || '');
  const [sigungu, setSigungu] = useState(state?.sigungu || '');
  const [contentType, setContentType] = useState('');
  const [page, setPage] = useState(1);

  // ----------
  const { data: areaCodes } = useFetchAreaCode();
  const { data: sigunguData, isFetching: sigunguFetching } = useFetchSigungu(area, { enabled: !!area });
  const { data: tourData, isFetching } = useFetchTourListBySigungu(area, sigungu, contentType, page);

  useEffect(() => {
    const getTravelInfoFromSession = JSON.parse(sessionStorage.getItem('travelInfo'));

    if (getTravelInfoFromSession) {
      const { area, sigungu, contentType, page } = getTravelInfoFromSession;
      setArea(area);
      setSigungu(sigungu);
      setContentType(contentType);
      setPage(page);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('travelInfo', JSON.stringify({ area, sigungu, contentType, page }));
  }, [contentType]);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setSigungu('');
  };

  const handleSigunguChange = (e) => {
    setSigungu(e.target.value);
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  return (
    <section className={styles.container}>
      {isFetching && <LoadingSpinner />}
      <h2 className={styles.sectionTitle}>여행 지역을 선택하세요</h2>
      <div className={styles.boxWrapper}>
        <Box className={styles.areaBox}>
          <FormControl fullWidth>
            <InputLabel id='area'>지역</InputLabel>
            <Select labelId='area' id='areaSelect' label='지역' onChange={handleAreaChange} value={area}>
              {areaCodes?.map((area) => (
                <MenuItem key={area.name} value={area.code}>
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.sigunguBox}>
          <FormControl fullWidth>
            <InputLabel id='sigungu'>시군구</InputLabel>
            <Select
              labelId='sigungu'
              id='sigunguSelect'
              label='시군구'
              value={sigunguFetching ? '000' : sigungu}
              onChange={handleSigunguChange}
            >
              {sigunguData?.map((sigungu) => (
                <MenuItem key={sigungu.name} value={sigungu.code}>
                  {sigungu.name}
                </MenuItem>
              ))}
              {sigunguFetching && <MenuItem value={'000'}>loading</MenuItem>}
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.contentTypeBox}>
          <FormControl fullWidth>
            <InputLabel id='contentType'>유형</InputLabel>
            <Select
              labelId='contentType'
              id='contentTypeSelect'
              label='유형'
              value={contentType}
              onChange={handleContentTypeChange}
            >
              {contentTypes.map((contentType) => (
                <MenuItem key={contentType.name} value={contentType.code}>
                  {contentType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className={styles.itemList}>
        {tourData?.totalCount === 0 ? (
          <div>없습니다</div>
        ) : (
          tourData?.items?.item.map((data) => (
            <Link
              to={`/detail/${data.contentid}`}
              key={`${data.contentid}`}
              state={{ contentId: data.contentid }}
              className={styles.itemWrapper}
            >
              <img src={data.firstimage || 'images/gray.jpg'} alt={data.title} className={styles.img} />
              <div className={styles.title}>{data.title}</div>
            </Link>
          ))
        )}
      </div>

      {
        <Paginator
          numOfRows={tourData?.numOfRows}
          totalCount={tourData?.totalCount}
          pageNo={tourData?.pageNo}
          setPage={setPage}
        />
      }
    </section>
  );
}
