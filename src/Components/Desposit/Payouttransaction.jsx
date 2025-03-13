

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { payouttransaction } from '../../Redux/action/Desposit'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const PayoutTransaction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { payout, loading } = useSelector(state => state.despositdata);
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(payouttransaction(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    console.log({ payout });

    const records = () => {
        if (payout && payout?.transactions && payout?.transactions?.length > 0) {
            return payout?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
            
                        <td className="tabel-text w inter">{row?.userId?.name}</td>
                        <td className="tabel-text w inter">{row?.userId?.userId}</td>
                        <td className="tabel-text w inter">{row?.apiKey}</td>
                        <td className="tabel-text w inter">{row?.amount}</td>
                        <td className="tabel-text w inter">{row?.status}</td>
                        <td className="tabel-text w inter">{row?.walletAddress}</td>
                      
                      
                        <td className="tabel-text w inter">{row?.ipAddress}</td>
                        <td className="tabel-text w inter">{row?.blockChain}</td>
                        <td className="tabel-text w inter">{row?.callbackUrl}</td>
                        <td className="tabel-text w inter">{row?.remarks}</td>

                        <td>
                            <a href={`https://bscscan.com/tx/${row.transactionHash}`} target="_blank" >
                                {row.transactionHash ? row.transactionHash.slice(0, 15) : 'None'}
                            </a>
                        </td>
                        <td className="tabel-text w inter">
                            {dateFormat(row.createdAt, "yyyy-mm-dd, HH:mm:ss")}
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
            <div className="container container-trade p-0">
                <div className="">
                    <div className="container container-trade2 mt-2 p-1">
                        <h1 className="text-info text-center"> Payout Transaction  </h1>
                        <h4 className="text-right1 p-3 text-primary">
                            Total Payout Transaction      : {payout?.record_count
                            }

                        </h4>
                    </div>
                    <div className="container container-trade2 mt-2 p-1">
                        <div className="transaction">
                            <div className="table-responsive transactions">
                                {loading ? (
                                    <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />) : (
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S No.</th>
                                                <th scope="col"> Name</th>
                                                <th scope="col"> User Id</th>
                                                <th scope="col">Api Key</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Wallet Address</th>
                                                <th scope="col">IP Address</th>
                                                <th scope="col">Blockcain</th>
                                                <th scope="col">Callback Url</th>
                                                <th scope="col"> Remarks</th>
                                               
                                                <th scope="col"> Transaction Hash</th>


                                                <th scope="col">Date</th>

                                            </tr>
                                        </thead>
                                        <tbody>{records()}</tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        <div className="pagination mt-3">
                            <Pagination
                                style={{ cursor: "pointer" }}
                                className="mx-auto"
                                current={currentPage || 1}
                                total={payout?.record_count || 0}
                                pageSize={10}
                                onChange={handlePaginationChange}
                                showSizeChanger={false}
                                showQuickJumper={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayoutTransaction;


