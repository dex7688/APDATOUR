const initState = {
  festivalData: [],
  festivalLoading: false,
  festivalError: '',
};

const FETCH_FESTIVAL_REQUEST = 'fetchFestival/FETCH_FESTIVAL_REQUEST';
const FETCH_FESTIVAL_SUCCESS = 'fetchFestival/FETCH_FESTIVAL_SUCCESS';
const FETCH_FESTIVAL_FAIL = 'fetchFestival/FETCH_FESTIVAL_FAIL';

function fetchFestivalRequest() {
  return { type: FETCH_FESTIVAL_REQUEST };
}

function fetchFestivalSuccess(payload) {
  return { type: FETCH_FESTIVAL_SUCCESS, payload };
}

function fetchFestivalFail(payload) {
  return { type: FETCH_FESTIVAL_FAIL, payload };
}

export function fetchFestival(type, areaCode = '1', sigunguCode = '1', date, pageNo = '1') {
  return (dispatch) => {
    dispatch(fetchFestivalRequest());
    fetch(
      // 타입, 지역, 시군구 코드에 따라 api 호출
      `http://apis.data.go.kr/B551011/KorService/${type}?serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=8&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&Arrange=A&listYN=Y&eventStartDate=${date}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response?.header.resultCode === '0000') {
          dispatch(fetchFestivalSuccess(data.response.body));
        }
      })
      .catch((err) => dispatch(fetchFestivalFail(err)));
  };
}

export default function fetchFestivalReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_FESTIVAL_REQUEST:
      return { ...state, festivalLoading: true };

    case FETCH_FESTIVAL_SUCCESS:
      return { ...state, festivalData: action.payload, festivalLoading: false };

    case FETCH_FESTIVAL_FAIL:
      return { ...state, festivalError: action.payload, festivalLoading: false };

    default:
      return state;
  }
}
