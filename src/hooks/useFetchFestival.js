import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchFestival = (areaCode, sigunguCode, startDate, pageNo) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/searchFestival?serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=8&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&Arrange=A&listYN=Y&eventStartDate=${startDate}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json`,
    { withCredentials: true }
  );
};

export const useFetchFestival = (areaCode, sigunguCode, startDate, pageNo) => {
  return useQuery(
    ['searchFestival', areaCode, sigunguCode, startDate, pageNo],
    () => fetchFestival(areaCode, sigunguCode, startDate, pageNo),
    {
      select: (data) => data.data.response?.body,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: false,
    }
  );
};
