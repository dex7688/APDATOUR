import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const fetchDetail = (contentId) => {
  return axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailCommon?defaultYN=Y&serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&_type=json&firstImageYN=Y&addrinfoYN=Y&overviewYN=Y&mapinfoYN=Y`
  );
};

const checkLike = (userInfo) => {
  return axios.post(`https://www.tourapda.com/api/addLike/isCheck`, userInfo, { withCredentials: true });
};

const addLike = (info) => {
  return axios.post(`https://www.tourapda.com/api/addLike`, info, { withCredentials: true });
};

export const useFetchDetail = (contentId) => {
  return useQuery(['detail', contentId], () => fetchDetail(contentId), {
    staleTime: 1000 * 60 * 5,
    select: (data) => data.data.response.body.items.item,
  });
};

export const useCheckLike = (userInfo) => {
  return useMutation(checkLike);
};

export const useAddLike = () => {
  return useMutation(addLike);
};
