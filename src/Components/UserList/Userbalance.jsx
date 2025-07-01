
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";

import Skeleton from "react-loading-skeleton";
import { userbalance, userdata } from '../../Redux/action/Dashboardaction'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const Userbalance = () => {
    

const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
   const { userbalancedata, loading } = useSelector(state => state.dashbaord);
    const pageSize = 10;
    const fetchData = () => {
        // const skip = (currentPage - 1) * pageSize;
        // const requestData = {
        //     limit: pageSize,
        //     skip: skip,

        // };
        dispatch(userbalance ());
    };
    useEffect(() => {
        fetchData();
    }, []);
    // const handlePaginationChange = (page) => {
    //     setCurrentPage(page);
    // };
    const totalPayableSum = userbalancedata?.wallet_transactions?.reduce(
  (acc, row) => acc + (parseFloat(row?.totalPayable) || 0),
  0
);

const totalCommissionSum = userbalancedata?.wallet_transactions?.reduce(
  (acc, row) => acc + (parseFloat(row?.totalCommision) || 0),
  0
);

    const records = () => {
  if (
    userbalancedata?.wallet_transactions &&
    userbalancedata?.wallet_transactions.length > 0
  ) {
    const rows = userbalancedata?.wallet_transactions?.map((row, i) => (
      <tr key={i}>
        <td>{(currentPage - 1) * pageSize + i + 1}</td>
        <td>{row?.userId}</td>
        <td>{row?.name}</td>
        <td>{row?.totalPayable?.toFixed(2)}</td>
        <td>{row?.totalCommision?.toFixed(2)}</td>
      </tr>
    ));

  
    rows.push(
      <tr key="total" className="table-success fw-bold">
        <td colSpan={3}>Total</td>
        <td>${totalPayableSum?.toFixed(2)}</td>
        <td> ${totalCommissionSum?.toFixed(2)}</td>
      </tr>
    );

    return rows;
  } else {
    return (
      <tr>
        <td colSpan="10" className="text-center text-danger">
          Data Not Found
        </td>
      </tr>
    );
  }
};


    return (
        <div className="container">
            <div className="bgClr1 rounded-3 mb-4">
                <h1 className="text-center p-3 text-white fw-bold">User List Balance </h1>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
               
            </div>

        

            <div className="table-responsive rounded shadow-sm">
                {loading ? (
                    <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />
                ) : (
                    <table className="table table_width table-bordered table-striped text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>S No</th>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Total Payable</th>
                                  <th>Total Commision</th>
                            </tr>
                        </thead>
                        <tbody>{records()}</tbody>
                    </table>
                )}
            </div>

          
        </div>
    );
};

export default Userbalance;
