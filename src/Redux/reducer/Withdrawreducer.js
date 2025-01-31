import * as Type from '../action/Type'
const initialState = {
    loading: false,
    withdrwal:{},
    withdrwalapproved:{},
    error: null,
  };
    const Withdrawreducer = (state = initialState, action) => {
      switch (action.type) {
        case Type.WITHDRAW_BATCH_REQUEST:
          return { ...state, loading: true, error: null, };
        case Type.WITHDRAW_BATCH_SUCCESS:
          return {  ...state,  loading: false,       withdrwal: action.payload, };
        case Type.WITHDRAW_BATCH_FAILURE:
          return {  ...state,  loading: false,  error: 'get dashbaord data not found ',};
          case Type.WITHDRAW_APPROVED_BATCH_REQUEST:
            return { ...state, loading: true, error: null, };
          case Type.WITHDRAW_APPROVED_BATCH_SUCCESS:
            return {  ...state,  loading: false,       withdrwalapproved: action.payload, };
          case Type.WITHDRAW_APPROVED_BATCH_FAILURE:
            return {  ...state,  loading: false,  error: 'withdrwalapproved  data not found ',};
           
          
            default:
          return state;
      }
    };
    export default Withdrawreducer;