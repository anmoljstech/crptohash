import * as Type from '../action/Type'
const initialState = {
    loading: false,
    despositdata: {},
    margin: {},
    payout: {},
    error: null,
};
const dispositreducers = (state = initialState, action) => {
    switch (action.type) {
        case Type.DESPOSIT_BATCH_REQUEST:
            return { ...state, loading: true, error: null, };
        case Type.DESPOSIT_BATCH_SUCCESS:
            return { ...state, loading: false, despositdata: action.payload, };
        case Type.DESPOSIT_BATCH_FAILURE:
            return { ...state, loading: false, error: 'get dashbaord data not found ', };
        case Type.MARGIN_BATCH_REQUEST:
            return { ...state, loading: true, error: null, };
        case Type.MARGIN_BATCH_SUCCESS:
            return { ...state, loading: false, margin: action.payload, };
        case Type.MARGIN_BATCH_FAILURE:
            return { ...state, loading: false, error: 'get dashbaord data not found ', };
        case Type.PAYOUT_BATCH_REQUEST:
            return { ...state, loading: true, error: null, };
        case Type.PAYOUT_BATCH_SUCCESS:
            return { ...state, loading: false, payout: action.payload, };
        case Type.PAYOUT_BATCH_FAILURE:
            return { ...state, loading: false, error: 'get dashbaord data not found ', };


        default:
            return state;
    }
};
export default dispositreducers;