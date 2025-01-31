import {despositapi, marginapi }  from '../../Apiservice/apiservice'
import * as Type from './Type'
import { toast } from 'react-toastify' 
export const desposit = (requestData) => async (dispatch) => {
    dispatch({ type: Type.DESPOSIT_BATCH_REQUEST }); 
    try {
      let response = await despositapi (requestData);
      console.log({response});
      
      if (response.status === true) {
        dispatch({
          type: Type.DESPOSIT_BATCH_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({ type: Type.DESPOSIT_BATCH_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.DESPOSIT_BATCH_FAILURE });
      toast.dismiss() 
      toast.error('dashboard failed. Please try again.');
    }
  };
  export const margintranction = (requestData) => async (dispatch) => {
    dispatch({ type: Type.MARGIN_BATCH_REQUEST }); 
    try {
      let response = await marginapi (requestData);
      console.log({response});
      
      if (response.status === true) {
        dispatch({
          type: Type.MARGIN_BATCH_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({ type: Type.MARGIN_BATCH_FAILURE }); 
        toast.dismiss()
        toast.error(response.message);
      }
    } catch (error) {
      dispatch({ type: Type.MARGIN_BATCH_FAILURE });
      toast.dismiss() 
      toast.error('dashboard failed. Please try again.');
    }
  };
