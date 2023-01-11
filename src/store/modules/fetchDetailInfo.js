const initState = {
  infoData: [],
  infoLoading: false,
  infoError: '',
};

const FETCH_DETAILINFO_REQUEST = 'fetchDetailInfo/FETCH_DETAILINFO_REQUEST';
const FETCH_DETAILINFO_SUCCESS = 'fetchDetailInfo/FETCH_DETAILINFO_SUCCESS';
const FETCH_DETAILINFO_FAIL = 'fetchDetailInfo/FETCH_DETAILINFO_FAIL';
const CHANGE_INITSTATE = 'fetchDetailInfo/CHANGE_INITSTATE';

function fetchDetailInfoRequest() {
  return { type: FETCH_DETAILINFO_REQUEST };
}

function fetchDetailInfoSuccess(payload) {
  return { type: FETCH_DETAILINFO_SUCCESS, payload };
}

function fetchDetailInfoListFail(payload) {
  return { type: FETCH_DETAILINFO_FAIL, payload };
}

export function changeInitState() {
  return { type: CHANGE_INITSTATE };
}

export function fetchDetailInfo(contentId) {
  return (dispatch) => {
    dispatch(fetchDetailInfoRequest());
    fetch(
      `http://apis.data.go.kr/B551011/KorService/detailCommon?defaultYN=Y&serviceKey=${process.env.REACT_APP_TOUR_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentId}&_type=json&firstImageYN=Y&addrinfoYN=Y&overviewYN=Y&mapinfoYN=Y`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response?.header.resultCode === '0000') {
          dispatch(fetchDetailInfoSuccess(data.response?.body.items.item));
        }
      })
      .catch((err) => dispatch(fetchDetailInfoListFail(err)));
  };
}

export default function fetchDetailInfoReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_DETAILINFO_REQUEST:
      return { ...state, infoLoading: true };

    case FETCH_DETAILINFO_SUCCESS:
      return { ...state, infoData: action.payload, infoLoading: false };

    case FETCH_DETAILINFO_FAIL:
      return { ...state, infoError: action.payload, infoLoading: false };

    case CHANGE_INITSTATE:
      return { ...state, infoData: [], infoLoading: false, infoError: '' };

    default:
      return state;
  }
}
