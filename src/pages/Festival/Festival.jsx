import { useState, useEffect } from 'react';
import styles from './Festival.module.css';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import LoadingSpinner from '../../components/LoadingSpinner.jsx/LoadingSpinner';
import FestivalPaginator from '../../components/Paginator/FestivalPaginator';

import { useFetchAreaCode } from '../../hooks/useFetchAreaCode';
import { useFetchSigungu } from '../../hooks/useFetchSigungu';
import { useFetchFestival } from '../../hooks/useFetchFestival';

export default function Festival() {
  const { state } = useLocation();
  const [area, setArea] = useState(state?.area || '');
  const [sigungu, setSigungu] = useState(state?.sigungu || '');
  const [startDate, setStartDate] = useState('');
  const [page, setPage] = useState(1);

  const { data: areaCodes } = useFetchAreaCode();
  const { data: sigunguData, isFetching: sigunguFetching } = useFetchSigungu(area, { enabled: !!area });
  const { data: festivalData, isFetching, refetch } = useFetchFestival(area, sigungu, startDate, page);

  useEffect(() => {
    const getFestivalInfoFromSession = JSON.parse(sessionStorage.getItem('festivalInfo'));

    if (getFestivalInfoFromSession) {
      const { area, sigungu, startDate, page } = getFestivalInfoFromSession;
      setArea(area);
      setSigungu(sigungu);
      setStartDate(startDate);
      setPage(page);
    }
  }, []);

  useEffect(() => {
    refetch();

    return () => refetch();
  }, [page]);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleSigunguChange = (e) => {
    setSigungu(e.target.value);
  };

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleSearchClick = () => {
    sessionStorage.setItem('festivalInfo', JSON.stringify({ area, sigungu, startDate, page }));
    refetch();
  };

  return (
    <section className={styles.container}>
      {isFetching && <LoadingSpinner />}
      <h2 className={styles.sectionTitle}>축제 지역을 선택하세요</h2>
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

        <TextField
          className={styles.dateBox}
          id='outlined-basic'
          label='날짜'
          variant='outlined'
          placeholder='예)20221201'
          value={startDate}
          onChange={handleDateChange}
        />

        <button className={styles.searchBtn} onClick={handleSearchClick}>
          검색하기
        </button>
      </div>

      <div className={styles.itemList}>
        {festivalData?.totalCount === 0 ? (
          <div>없습니다</div>
        ) : (
          festivalData?.items?.item.map((data) => (
            <Link
              to={`/detail/${data.contentid}`}
              key={`${data.contentid}`}
              state={{
                contentId: data.contentid,
                eventstartdate: data.eventstartdate,
                eventenddate: data.eventenddate,
              }}
              className={styles.itemWrapper}
            >
              <img src={data.firstimage || 'images/gray.jpg'} alt={data.title} className={styles.img} />
              <div className={styles.title}>{data.title}</div>
            </Link>
          ))
        )}
      </div>

      {
        <FestivalPaginator
          numOfRows={festivalData?.numOfRows}
          totalCount={festivalData?.totalCount}
          pageNo={festivalData?.pageNo}
          setPage={setPage}
        />
      }
    </section>
  );
}
