import * as Type from '../action/Type'

const initialState = {
    loading: false,
    user: null,    
    token: null,   
    error: null,
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case Type.LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case Type.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,     
          token: action.payload.token,
        };
      case Type.LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          error: 'Login failed',
        };
        default:
        return state;
    }
  };
  
  export default authReducer;