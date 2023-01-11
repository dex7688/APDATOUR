import React, { useEffect } from 'react';

export default function Kakao({ Lat, Lng }) {
  const { kakao } = window;
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(Lat, Lng),
      level: 4,
    };

    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(Lat, Lng);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, []);

  return <div id='map' style={{ width: '300px', height: '200px' }}></div>;
}
