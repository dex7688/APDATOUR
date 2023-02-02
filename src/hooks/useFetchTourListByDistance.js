import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTourListByDistance = (longitude, latitude) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=15&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=S&mapX=${longitude}&mapY=${latitude}&radius=2000&listYN=Y&_type=json`,
    { withCredentials: true }
  );
};

// todo! : 위치 좌표가 존재할때만 통신하게 바꾸기
export const useFetchTourListByDistance = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ ...location, latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);

  return useQuery(['tourListByDistance'], () => fetchTourListByDistance(location.longitude, location.latitude), {
    select: (data) => data?.data.response.body.items.item,
    staleTime: 1000 * 60 * 5,
    enabled: !!location.latitude && !!location.longitude,
  });
};
