import {withdrawsactionapi, withdrawsapi }  from '../../Apiservice/apiservice'
import * as Type from './Type'
import { toast } from 'react-toastify' 
export const withdrawtranction = (requestData) => async (dispatch) => {
    dispatch({ type: Type.WITHDRAW_BATCH_REQUEST }); 
    try {
      let response = await withdrawsapi (requestData);
      console.log('=-=-=',{response});
      
      if (response.status === true) {
        dispatch({
          type: Type.WITHDRAW_BATCH_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({ type: Type.WITHDRAW_BATCH_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.WITHDRAW_BATCH_FAILURE });
      toast.dismiss() 
      toast.error('dashboard failed. Please try again.');
    }
  };
  export const withdrawtapprovedaction = (requestData) => async (dispatch) => {
    dispatch({ type: Type.WITHDRAW_APPROVED_BATCH_REQUEST }); 
    try {
      let response = await withdrawsactionapi (requestData);
      console.log('=-=-sdfsdfsd=',response?.message);
      
      if (response.success === true) {
        dispatch({
          type: Type.WITHDRAW_APPROVED_BATCH_SUCCESS,
          payload: response,
        });
        toast.dismiss();
        toast.success(response?.message);
      } else {
        dispatch({ type: Type.WITHDRAW_APPROVED_BATCH_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.WITHDRAW_APPROVED_BATCH_FAILURE });
      toast.dismiss() 
      toast.error('dashboard failed. Please try again.');
    }
  };