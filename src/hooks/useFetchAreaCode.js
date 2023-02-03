import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAreaCode = () => {
  return axios.get('data/areaCode.json');
};

export const useFetchAreaCode = () => {
  return useQuery(['areaCode'], fetchAreaCode, {
    select: (data) => data.data.areaCodes,
    staleTime: 1000 * 60 * 5,
  });
};
