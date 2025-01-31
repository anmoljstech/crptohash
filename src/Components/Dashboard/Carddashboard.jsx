import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from "react-loading-skeleton";
import dateFormat from "dateformat"
import {dashboardbatchs } from '../../Redux/action/Dashboardaction'
const Dashboardcards = () => {
    const dispatch = useDispatch();
  
   const  { dashbaord, loading } = useSelector(state => state.dashbaord);
    useEffect(() => {
        dispatch(dashboardbatchs());

    }, []);
    console.log({dashbaord});
    
    const cardsData = [
        { title: "User", value: dashbaord?.users  },
        { title: "Deposit Transactions", value: dashbaord?.depositTransactions },
        
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

export default Dashboardcards;   