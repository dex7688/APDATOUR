import { useState, useEffect } from 'react';
import styles from './Accommodation.module.css';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingSpinner from '../../components/LoadingSpinner.jsx/LoadingSpinner';
import AccommodationPaginator from '../../components/Paginator/AccommodationPaginator';
import { useFetchAreaCode } from '../../hooks/useFetchAreaCode';
import { useFetchSigungu } from '../../hooks/useFetchSigungu';
import { useFetchAccomodation } from '../../hooks/useFetchAccomodation';
import { useLocation } from 'react-router-dom';

export default function Accommodation() {
  const { state } = useLocation();
  const [area, setArea] = useState(state?.area || '');
  const [sigungu, setSigungu] = useState(state?.sigungu || '');
  const [page, setPage] = useState(JSON.parse(sessionStorage.getItem('stayInfo'))?.page || 1);

  useEffect(() => {
    if (sigungu !== '') {
      sessionStorage.setItem('stayInfo', JSON.stringify({ area, sigungu, page }));
    }
  }, [sigungu]);

  useEffect(() => {
    const getStayInfoFromSession = JSON.parse(sessionStorage.getItem('stayInfo'));

    if (getStayInfoFromSession) {
      const { area, sigungu } = getStayInfoFromSession;
      setArea(area);
      setSigungu(sigungu);
      setPage(page);
    }
  }, []);

  const { data: areaCodes } = useFetchAreaCode();
  const { data: sigunguData, isFetching: sigunguFetching } = useFetchSigungu(area, { enabled: !!area });
  const { data: stayLists, isFetching } = useFetchAccomodation(area, sigungu, page);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setSigungu('');
  };

  const handleSigunguChange = (e) => {
    setSigungu(e.target.value);
    setPage(1);
  };

  return (
    <section className={styles.container}>
      {isFetching && <LoadingSpinner />}
      <h2 className={styles.sectionTitle}>숙박 지역을 선택하세요</h2>
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
      </div>

      <div className={styles.itemList}>
        {stayLists?.totalCount === 0 ? (
          <div>없습니다</div>
        ) : (
          stayLists?.items?.item.map((data) => (
            <Link
              to={`/detail/${data.contentid}`}
              key={`${data.contentid}`}
              state={{ contentId: data.contentid, tel: data.tel }}
              className={styles.itemWrapper}
            >
              <img src={data.firstimage || 'images/gray.jpg'} alt={data.title} className={styles.img} />
              <div className={styles.title}>{data.title}</div>
            </Link>
          ))
        )}
      </div>

      {
        <AccommodationPaginator
          numOfRows={stayLists?.numOfRows}
          totalCount={stayLists?.totalCount}
          pageNo={stayLists?.pageNo}
          setPage={setPage}
        />
      }
    </section>
  );
}
