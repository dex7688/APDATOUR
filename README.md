# APDA-TOUR

## 설명
- 웹개발자 입문과정에서 진행한 4인 팀 프로젝트 입니다. (주관 : 포스코 미래창조아카데미)
- 기간 : 2022.12.15 ~ 2022.12.30
- 팀원 : 하아름, 이기원, 최수린, 이우석
- 소개 : 국내 여행지, 축제, 숙박 정보를 검색할 수 있는 웹 사이트 입니다.
- 배포 : https://go.tourapda.com/
- 계정 : id : 1234, 비밀번호 : 1234


## 사용기술
- react
- axios
- redux
- react-query
- react-router v6

## 기능
### 1. carousel (슬라이드)
<p width="100%">
<img display="block" src="https://user-images.githubusercontent.com/104712554/218309523-b767ca78-7887-4526-880b-a2c8bde1f8ef.png" width="48%" padding="0">
<img display="block" align="right" width="48%" src="https://user-images.githubusercontent.com/104712554/218309548-36696062-abc0-4661-98f0-f88fa83ee8da.png">
</p>

- useState, useEffect를 사용하여 슬라이드를 구현했습니다.
- setInterval을 사용하여 일정 시간마다 이미지가 변경되도록 했고 clean-up 함수를 사용하여 컴포넌트가 사라질 경우 setInterval 이벤트를 제거했습니다.

### 2. 지역 선택 모달
<img width="50%" height='400' alt="스크린샷 2023-02-12 오후 9 11 21" src="https://user-images.githubusercontent.com/104712554/218310299-2d715d6c-6f75-4ba6-9128-a286e8fe1bd5.png">

- 지역(시)를 선택하면 해당 지역의 군,구 리스트를 보여주도록 구현했습니다.
- react-query를 사용해 지역(시)를 키 값으로 지정하고 staleTime을 변경해 해당 지역을 다시 선택할 경우에 불필요한 네트워크 통신이 일어나지 않게 했습니다.
- 지역을 선택하지 않고 검색을 할 경우 “지역을 선택해 주세요”라는 alert이 보여지도록 구현했습니다.

### 3. 주변관광지
<img align="center" height='400' src="https://user-images.githubusercontent.com/104712554/218310377-d790e129-32b4-49cc-b6f5-694a9e1d2dde.png">

- 여행 지역을 선택하지 않으면 검색 할 수 없으며, 선택한 지역이 input value가 되도록 구현 했습니다.
- 검색을 할 경우 useNavigate의 state 옵션을 사용해 선택한 지역을 전달 했습니다.

### 4. 관광지 검색
<img height='400' src="https://user-images.githubusercontent.com/104712554/218310521-ff45c86d-0cb8-48e8-a553-7c916b1706b5.png">

- 지역과 유형을 선택하면 해당 아이템이 보여지도록 구현했습니다.
- 정보를 성공적으로 받으면 전체 아이템 수와 필요한 페이지 수를 계산하여 페이지번호가 보여지도록 구현했습니다.
- react-query의 key value로 지역, 페이지 번호로 지정했으며 staleTime을 변경하여 일정 시간동안 불필요한 네트워크 통신을 하지 않게 구현했습니다.

### 5. 상세 페이지
<img height='400' src="https://user-images.githubusercontent.com/104712554/218310577-b3576984-9cb9-4711-8338-da5fe0c1f0b2.png">

- 여행지, 축제, 숙박에 대한 정보를 보여주는 상세 페이지 입니다.
- 로그인 상태
  - 페이지 접속시 해당 장소가 사용자 db에 저장되어 있는지 확인하고 존재 여부에 따라 ‘구독하기’, ‘구독취소’를 보여주도록 구현했습니다.
  - ‘구독하기’ 버튼을 클릭 할 경우 사용자 db에 해당 장소가 추가되고, ‘구독취소’를 클릭 할 경우 사용자 db에 해당 장소를 제거 하도록 구현했습니다.
- 비로그인 상태
  - 기본적으로 ‘구독하기’ 버튼을 보여주며, 버튼을 클릭 할 경우 ‘로그인을 해주세요’라는 alert이 생기도록 구현했습니다.
- 해당 장소의 위치 정보를 받아 카카오 맵에 표시했습니다.

### 6. 로그인
- 로그인을 할 경우 쿠키를 생성했습니다. 이후 페이지를 재접속할 경우 서버에 쿠키가 남아있는지 확인하고, 쿠키가 존재하면 로그인을 유지하도록 구현했습니다.
- 로그인 상태는 redux를 사용하여 전역적으로 관리하며 로그인 상태에 따라 사용할 수 있는 기능을 제한했습니다. (글쓰기, 구독하기)

### 7. 반응형
<img width="586" height="400" src="https://user-images.githubusercontent.com/104712554/218310951-c0ee4d32-73ae-4cec-8fd2-86f0ae9c6063.png">
- media-query를 사용하여 width에 따라 layout을 변경했습니다.



## 작동방법
``` javascript
cd APDATOUR

npm install

npm start
```

## 수정완료
- 교육과정이 끝나고 개인적으로 수정 중입니다.
- 로그인 유지 (express cookie 사용)
- 메인페이지 스타일 변경
- 기존 redux-thunk를 네트워크 통신을 했지만 react-query로 변경
- 반응형 구현
- Frontend : netlify 배포, Backend : AWS EC2 배포

## To do
- 마이페이지
- 후기 페이지 반응형 구현
- 쿠키 만료시 연장하기
