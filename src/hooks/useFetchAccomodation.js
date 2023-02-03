import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchAccomodation = (areaCode, sigunguCode, pageNo) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/searchStay?serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=8&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&Arrange=O&listYN=Y&_type=json&areaCode=${areaCode}&sigunguCode=${sigunguCode}`
  );
};

export const useFetchAccomodation = (areaCode, sigunguCode, pageNo) => {
  return useQuery(
    ['searchStay', areaCode, sigunguCode, pageNo],
    () => fetchAccomodation(areaCode, sigunguCode, pageNo),
    {
      select: (data) => data?.data.response.body,
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      enabled: !!areaCode && !!sigunguCode,
    }
  );
};
