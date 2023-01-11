const initState = {
  tourData: [],
  tourLoading: false,
  tourError: '',
};

const FETCH_TOURLIST_REQUEST = 'fetchSigungu/FETCH_TOURLIST_REQUEST';
const FETCH_TOURLIST_SUCCESS = 'fetchSigungu/FETCH_TOURLIST_SUCCESS';
const FETCH_TOURLIST_FAIL = 'fetchSigungu/FETCH_TOURLIST_FAIL';

function fetchTourListRequest() {
  return { type: FETCH_TOURLIST_REQUEST };
}

function fetchTourListSuccess(payload) {
  return { type: FETCH_TOURLIST_SUCCESS, payload };
}

function fetchTourListFail(payload) {
  return { type: FETCH_TOURLIST_FAIL, payload };
}

export function fetchTourList(
  type = 'areaBasedList',
  areaCode = '1',
  sigunguCode = '1',
  contentTypeId = '12',
  pageNo = '1'
) {
  const contentType = contentTypeId ? `&contentTypeId=${contentTypeId}` : '';

  return (dispatch) => {
    dispatch(fetchTourListRequest());
    fetch(
      // 타입, 지역, 시군구 코드에 따라 api 호출
      `http://apis.data.go.kr/B551011/KorService/${type}?serviceKey=${process.env.REACT_APP_TOUR_KEY}&pageNo=${pageNo}&numOfRows=8&MobileApp=AppTest&MobileOS=ETC&arrange=O&areaCode=${areaCode}&sigunguCode=${sigunguCode}&_type=json${contentType}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response?.header.resultCode === '0000') {
          dispatch(fetchTourListSuccess(data.response.body));
        }
      })
      .catch((err) => dispatch(fetchTourListFail(err)));
  };
}

export default function fetchTourListReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_TOURLIST_REQUEST:
      return { ...state, tourLoading: true };

    case FETCH_TOURLIST_SUCCESS:
      return { ...state, tourData: action.payload, tourLoading: false };

    case FETCH_TOURLIST_FAIL:
      return { ...state, tourError: action.payload, tourLoading: false };

    default:
      return state;
  }
}
