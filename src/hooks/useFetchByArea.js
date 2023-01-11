import { useState, useEffect } from 'react';

const useFetchByArea = (areaCode) => {
  const [tourLists, setTourLists] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchByArea = async () => {
    setLoading(true);

    try {
      setLoading(true);
      const fetchResponse = await fetch(
        `http://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=${process.env.REACT_APP_TOUR_KEY}&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=O&areaCode=${areaCode}&_type=json`
      );
      const result = await fetchResponse.json();

      if (result.response.header.resultCode === '0000') {
        setTourLists(result.response.body.items.item);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchByArea();
  }, [areaCode]);

  return [tourLists, loading, error];
};

export default useFetchByArea;
