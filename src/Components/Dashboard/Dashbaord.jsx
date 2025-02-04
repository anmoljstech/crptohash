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
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Dashboardcards />
      {/* <div className="mt-4">
        <h4>Recent Activity</h4>
        <div className="table-responsive">
          {/* {loading ? (
            <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />
          ) : 
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Side</th>
                  <th scope="col">Batch Id</th>
                  <th scope="col">Close Status </th>
                  <th scope="col">Profit Distribution Status</th>
                  <th scope="col">Leverage </th>
                  <th scope="col">Quantity </th>
                  <th scope="col">Date </th>
                </tr>
              </thead>
              <tbody>
                {/* {records()} 
              </tbody>
            </table>
          {/* )} 
        </div>
      </div> */}
    </div>
    </>
  )
}

export default Dashbaord
