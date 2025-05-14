import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";
import dateFormat from "dateformat"
import Dashboardcards from './Carddashboard'
import {dashboardbatchs } from '../../Redux/action/Dashboardaction'
const Dashbaord = () => {
    const dispatch = useDispatch();

  const  { dashbaord, loading } = useSelector(state => state.dashbaord);
  useEffect(() => {
    // dispatch(dashboardbatchs());
  }, []);
  
  return (
    <>
    <div className="container ">
    <div className="bgClr1 rounded-3 mb-4">
      <h1 className="text-center p-3 text-white fw-bold">Admin Dashboard</h1>
      </div>
    
      <Dashboardcards />

    </div>
    </>
  )
}

export default Dashbaord
