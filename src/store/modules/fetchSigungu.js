const initState = {
  sigunGuData: [],
  loading: false,
  error: '',
};

const FETCH_SIGUNGU_REQUEST = 'fetchSigungu/FETCH_SIGUNGU_REQUEST';
const FETCH_SIGUNGU_SUCCESS = 'fetchSigungu/FETCH_SIGUNGU_SUCCESS';
const FETCH_SIGUNGU_FAIL = 'fetchSigungu/FETCH_SIGUNGU_FAIL';

function fetchSigunguRequest() {
  return { type: FETCH_SIGUNGU_FAIL };
}

function fetchSigunguSuccess(payload) {
  return { type: FETCH_SIGUNGU_SUCCESS, payload };
}

function fetchSigunguFail(payload) {
  return { type: FETCH_SIGUNGU_FAIL, payload };
}

export function fetchSigungu(areaCode) {
  return (dispatch) => {
    dispatch(fetchSigunguRequest());
    fetch(
      `http://apis.data.go.kr/B551011/KorService/areaCode?pageNo=1&MobileOS=ETC&MobileApp=AppTest&serviceKey=${process.env.REACT_APP_TOUR_KEY}&areaCode=${areaCode}&numOfRows=100&_type=json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response.header.resultCode === '0000') {
          dispatch(fetchSigunguSuccess(data.response?.body.items.item));
        }
      })
      .catch((error) => dispatch(fetchSigunguFail(error)));
  };
}

export default function fetchSigunguReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_SIGUNGU_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SIGUNGU_SUCCESS:
      return { ...state, sigunGuData: action.payload, loading: false, error: '' };
    case FETCH_SIGUNGU_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
