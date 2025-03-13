import {dashboarddata, userapi, userdetailsapi }  from '../../Apiservice/apiservice'
import * as Type from './Type'
import { toast } from 'react-toastify' 
export const dashboardbatchs = () => async (dispatch) => {
    dispatch({ type: Type.DASHBOARD_BATCH_REQUEST }); 
    try {
      let response = await dashboarddata ();
      if (response.success === true) {
        dispatch({
          type: Type.DASHBOARD_BATCH_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({ type: Type.DASHBOARD_BATCH_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.DASHBOARD_BATCH_FAILURE });
      toast.dismiss() 
      toast.error('dashboard failed. Please try again.');
    }
  };

export const userdata = (requestData) => async (dispatch) => {
    dispatch({ type: Type.USER_NEWS_REQUEST }); 
    try {
      let response = await userapi(requestData); 
  
         
      if (response.success === true) {
        dispatch({
          type: Type.USER_NEWS_SUCCESS,
          payload: response,
        });
      
      } else {
        dispatch({ type: Type.USER_NEWS_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.USER_NEWS_FAILURE });
      toast.dismiss() 
      toast.error('WITHDRAW  is  failed. Please try again.');
    }
  }
  export const userdetils = (requestData) => async (dispatch) => {
    dispatch({ type: Type.USER_DETAILS_REQUEST }); 
    try {
      let response = await userdetailsapi(requestData); 
  
         
      if (response.success === true) {
        dispatch({
          type: Type.USER_DETAILS_SUCCESS,
          payload: response,
        });
      
      } else {
        dispatch({ type: Type.USER_DETAILS_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.USER_DETAILS_FAILURE });
      toast.dismiss() 
      toast.error('WITHDRAW  is  failed. Please try again.');
    }
  }