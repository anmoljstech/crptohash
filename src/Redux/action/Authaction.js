import {loginApi ,loginotpApi}  from '../../Apiservice/apiservice'
import * as Type from './Type'
import { toast } from 'react-toastify' 
export const login = (email, password,navigate) => async (dispatch) => {
    dispatch({ type: Type.LOGIN_REQUEST });
    try {
      let response = await loginApi({ email, password });
      if (response.success === true) {
        toast.dismiss()
        toast.success(response.message);
        
        navigate(`/loginotp?email=${email}`);
      } else {
        dispatch({ type: Type.LOGIN_FAILURE });
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.LOGIN_FAILURE });
      toast.dismiss()
      toast.error('Login failed. Please try again.');
    }
  };
  export const loginotp = (email, otp,deviceToken,navigate) => async (dispatch) => {
    dispatch({ type: Type.ACCOUNT_VERFICATION_REQUEST });
    try {
      let response = await loginotpApi({ email, otp,deviceToken });
      if (response.success === true) {
        toast.dismiss()
        toast.success(response.message);
        
        localStorage.setItem('token', response?.token);
       navigate('/')
      } else {
        dispatch({ type: Type.ACCOUNT_VERFICATION_SUCCESS });
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.ACCOUNT_VERFICATION_FAILURE });
      toast.dismiss()
      toast.error('Login failed. Please try again.');
    }
  };


