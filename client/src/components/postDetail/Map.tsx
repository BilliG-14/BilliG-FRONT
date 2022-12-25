import { useEffect, useState } from 'react';

interface ResultType {
  x: number;
  y: number;
}

interface AddressType {
  address: string;
}

export default function Map(props: AddressType) {
  const { address } = props;
  const [mapXY, setMapXY] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const container = document.getElementById('map');

    // 주소-좌표 변환 객체를 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소-좌표 변환 함수
    const callback = function (result: [ResultType], status: string) {
      if (status === window.kakao.maps.services.Status.OK) {
        const newMapXY = {
          ...mapXY,
          x: Number(result[0].x),
          y: Number(result[0].y),
        };
        setMapXY(newMapXY);
      }
    };

    // 글 작성자 주소 좌표받기
    geocoder.addressSearch(address, callback);

    const options = {
      center: new window.kakao.maps.LatLng(mapXY.y, mapXY.x),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new window.kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 개인정보 보호를 위해 줌 금지
    // // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    // const zoomControl = new window.kakao.maps.ZoomControl();
    // map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    //드래그 막기
    map.setDraggable(false);

    //줌 막기
    map.setZoomable(false);

    const markerPosition = new window.kakao.maps.LatLng(mapXY.y, mapXY.x);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [mapXY.x]);
  return <div id="map" className="w-[500px] h-[400px]"></div>;
}
