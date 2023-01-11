const initState = {
  accommoData: [],
  accommoLoading: false,
  accommoError: '',
};

const FETCH_ACCOMMODATION_REQUEST = 'fetchAccommodation/FETCH_ACCOMMODATION_REQUEST';
const FETCH_ACCOMMODATION_SUCCESS = 'fetchAccommodation/FETCH_ACCOMMODATION_SUCCESS';
const FETCH_ACCOMMODATION_FAIL = 'fetchAccommodation/FETCH_ACCOMMODATION_FAIL';

function fetchAccommodationRequest() {
  return { type: FETCH_ACCOMMODATION_REQUEST };
}

function fetchAccommodationSuccess(payload) {
  return { type: FETCH_ACCOMMODATION_SUCCESS, payload };
}

function fetchAccommodationFail(payload) {
  return { type: FETCH_ACCOMMODATION_FAIL, payload };
}

export function fetchAccommodation(type, areaCode = '1', sigunguCode = '1', pageNo = '1') {
  return (dispatch) => {
    dispatch(fetchAccommodationRequest());
    fetch(
      // 타입, 지역, 시군구 코드에 따라 api 호출
      `http://apis.data.go.kr/B551011/KorService/${type}?serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=8&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&Arrange=O&listYN=Y&_type=json&areaCode=${areaCode}&sigunguCode=${sigunguCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response?.header.resultCode === '0000') {
          dispatch(fetchAccommodationSuccess(data.response.body));
        }
      })
      .catch((err) => dispatch(fetchAccommodationFail(err)));
  };
}

export default function fetchAccommodationReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ACCOMMODATION_REQUEST:
      return { ...state, festivalLoading: true };

    case FETCH_ACCOMMODATION_SUCCESS:
      return { ...state, accommoData: action.payload, accommoLoading: false };

    case FETCH_ACCOMMODATION_FAIL:
      return { ...state, accommoError: action.payload, accommoLoading: false };

    default:
      return state;
  }
}
