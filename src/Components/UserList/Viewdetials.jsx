import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { userdetils } from '../../Redux/action/Dashboardaction'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import Cardsdetils from "./Viewdetils/Cardsdetils";
const Viewdetials = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('id', id);
    const [currentPage, setCurrentPage] = useState(1);
    const { userdetials, loading } = useSelector(state => state.dashbaord);
    console.log({ userdetials });

    const pageSize = 10;
    const fetchData = () => {
        // const skip = (currentPage - 1) * pageSize;
        const requestData = {
            id: id

        };
        dispatch(userdetils(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };


    const records = () => {
        if (userdetials && userdetials?.wallet_transactions && userdetials?.wallet_transactions?.length > 0) {
            return userdetials?.wallet_transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
                        <td className="tabel-text w inter">{row?.tokenName}</td>
                        <td className="tabel-text w inter">
                            {Number(row.amount).toFixed(2)}
                        </td>
                        <td className="tabel-text w inter">
                            <a href={`https://bscscan.com/address/${row.transactionHash}`} target="_blank" >
                                {row.transactionHash ? row.transactionHash?.slice(0, 15) : 'None'}
                            </a></td>
                        <td className="tabel-text w inter">{row?.apiKey}</td>
                        <td className="tabel-text w inter">
                            {Number(row.commissionAmount).toFixed(2)}</td>
                        <td className="tabel-text w inter">
                        {Number(row.transactionCharge).toFixed(2)}
                        </td>
                        <td className="tabel-text w inter">
                        {Number(row.payableAmount).toFixed(2)}
                        </td>
                        <td className="tabel-text w inter">{row?.type}</td>
                        <td className="tabel-text w inter">{row?.remark}</td>
                        <td className="tabel-text w inter">
                        {Number(row.usdtValue).toFixed(2)}
                        </td>

                        <td className="tabel-text w inter">
                          <td className="tabel-text w inter">
  {dateFormat(new Date(row.createdAt), "yyyy-mm-dd, HH:MM:ss")}
</td>

                        </td>


                    </tr>
                );
            });
        } else {

            return (
                <tr>
                    <td colSpan="10 " className="text-center">Data Not Found</td>
                </tr>
            );
        }
    };

    return (
        <>
            <div className="container mt-4">

                <div className="container container-trade2 mt-2 p-1">
                    <h1 className="text-info text-center">View detials </h1>

                </div>
                <Cardsdetils />
                <div className="row mb-md-5 mb-3">
                    <div className="col-md-12 mb-12">
                        <div className="card h-100 text-black bg-light">
                            <div className="card-body">
                                <h4 className="card-title">Total Withdrawal</h4>
                                <hr />

                                <div className="container container-trade2 mt-2 p-1">
                                    <div className="transactions">
                                        <div className="table-responsive">
                                            {loading ? (
                                                <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />) : (
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">TokenName</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">TransactionHash</th>
                                                            <th scope="col">Api Key</th>
                                                            <th scope="col">Commission Amount</th>
                                                            <th scope="col"> Transaction Charge</th>
                                                            <th scope="col">Payable Amount</th>

                                                            <th scope="col">Type</th>
                                                            <th scope="col">Remark</th>
                                                            <th scope="col">USDT Value</th>
                                                            <th scope="col">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {records()}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-6 mb-3">
                        <div className="card h-100 text-black bg-light ">
                            <div className="card-body">
                                <div className="mb-4">
                                    <h4 className="card-title">whitelisted IP  </h4>
                                    <div className="container container-trade2 mt-2 p-1">
                                        <div className="transactions">
                                            <div className="table-responsive">
                                              
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">UserId</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Phone Number</th>
                                                            <th scope="col">Transfer</th>
                                                            <th scope="col"> Verified</th>
                                                            <th scope="col">Blocked</th>

                                                            <th scope="col">Date</th>
                                                            <th scope="col">View</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                       
                                                    </tbody>
                                                </table>
                                               
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default Viewdetials


