import * as Type from '../action/Type'
const initialState = {
    loading: false,
    dashbaord: {},
    usersdata:{},
    // banner:{},
    error: null,
  };
  const dashbaordreducers = (state = initialState, action) => {
    switch (action.type) {
      case Type.DASHBOARD_BATCH_REQUEST:
        return { ...state, loading: true, error: null, };
      case Type.DASHBOARD_BATCH_SUCCESS:
        return {  ...state,  loading: false,       dashbaord: action.payload, };
      case Type.DASHBOARD_BATCH_FAILURE:
        return {  ...state,  loading: false,  error: 'get dashbaord data not found ',};
        case Type.USER_NEWS_REQUEST:
        return { ...state, loading: true, error: null, };
      case Type.USER_NEWS_SUCCESS:
        return {  ...state,  loading: false,    usersdata: action.payload, };
      case Type.USER_NEWS_FAILURE:
        return {  ...state,  loading: false,  error: 'get dashbaord data not found ',};
        
        
          default:
        return state;
    }
  };
  export default dashbaordreducers;