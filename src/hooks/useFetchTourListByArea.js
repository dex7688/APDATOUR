import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

const fetchTourListByArea = (areaCode) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=${process.env.REACT_APP_TOUR_KEY}&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=O&areaCode=${areaCode}&_type=json`
  );
};

export const fetchTourListBySigungu = (areaCode, sigunguCode, contentType, pageNo) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=${process.env.REACT_APP_TOUR_KEY}&pageNo=${pageNo}&numOfRows=8&MobileApp=AppTest&MobileOS=ETC&arrange=O&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json&contentTypeId=${contentType}`
  );
};

export const useFetchTourListByArea = (areaCode) => {
  return useQuery(['tourListByArea', areaCode], () => fetchTourListByArea(areaCode), {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    select: (data) => data?.data.response.body.items.item,
  });
};

export const useFetchTourListBySigungu = (areaCode, sigunguCode, contentType, pageNo = 1) => {
  return useQuery(
    ['tourList', areaCode, sigunguCode, contentType, pageNo],
    () => fetchTourListBySigungu(areaCode, sigunguCode, contentType, pageNo),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      enabled: !!areaCode && !!sigunguCode && !!contentType,
      select: (data) => data?.data.response.body,
    }
  );
};
