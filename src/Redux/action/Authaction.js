import {loginApi }  from '../../Apiservice/apiservice'
import * as Type from './Type'
import { toast } from 'react-toastify' 
export const login = (email, password,navigate) => async (dispatch) => {
    dispatch({ type: Type.LOGIN_REQUEST });
    try {
      let response = await loginApi({ email, password });
      if (response.success === true) {
        toast.dismiss()
        toast.success(response.message);
        localStorage.setItem('token', response?.admin?.accessToken);
       navigate('/dashboard')
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


