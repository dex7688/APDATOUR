import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchSigungu = (areaCode) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaCode?pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=${process.env.REACT_APP_TOUR_KEY}&areaCode=${areaCode}&numOfRows=100&_type=json`
  );
};

export const useFetchSigungu = (areaCode, option) => {
  return useQuery(['area', areaCode], () => fetchSigungu(areaCode), {
    select: (data) => data?.data.response.body.items.item,
    staleTime: 1000 * 60 * 5,
    ...option,
  });
};
