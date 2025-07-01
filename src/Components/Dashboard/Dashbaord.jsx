import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";

import Dashboardcards from './Carddashboard'
import { useNavigate } from "react-router-dom"; 
import {dashboardbatchs } from '../../Redux/action/Dashboardaction'
const Dashbaord = () => {
  const navigate = useNavigate();

  useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
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
