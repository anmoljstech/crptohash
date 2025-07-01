import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";

// import {dashboardbatchs } from '../../Redux/action/Dashboardaction'
const Cardsdetils = () => {
   
  
    const { userdetials, loading } = useSelector(state => state.dashbaord);
    // useEffect(() => {
    //     dispatch(dashboardbatchs());

    // }, []);
    // console.log({dashbaord});
    
    const cardsData = [
        { title: "Name", value:userdetials?.user?.name   },
        { title: "Email", value:userdetials?.user?.email },
        { title: "Phone Number", value:userdetials?.user?.phonenumber },
        // { title: "Api Key ", value: '4' },
        
    ]; 
       return (
            <>
    
                <div className="row">
                    {cardsData.map((card, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card shadow-sm mb-3">
                                <div className="card-body d-flex align-items-center">
                                    <div>
                                        <h5 className="card-title"> {loading ? (<Skeleton width={150} baseColor="#9e9e9e" highlightColor="#000" />) : (card.title)}               </h5>
                                        <p className="card-text"> {loading ? (<Skeleton width={100} baseColor="#9e9e9e" highlightColor="#000" />) : (card.value)} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    ))}
                </div>
    
    
            </>
        );
    };
    
    export default Cardsdetils;  

