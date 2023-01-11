import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByDistance } from '../store/modules/fetchByDistance';

const useGeolocation = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const { distanceData, loading, error } = useSelector((state) => state.fetchByDistance);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ ...location, latitude: position.coords.latitude, longitude: position.coords.longitude });
      dispatch(fetchByDistance(location.longitude, location.latitude));
    });
  }, [location.latitude, location.longitude]);

  return [distanceData, loading, error];
};

export default useGeolocation;
