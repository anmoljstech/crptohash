

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";

import { payouttransaction } from '../../Redux/action/Desposit';
import { IoFilter, IoCloseSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
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
        dispatch(payouttransaction (requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    

    const records = () => {
        const startIndex = (currentPage - 1) * pageSize;
        if (payout && payout?.transactions && payout?.transactions?.length > 0) {
            return payout?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                      <td>{(currentPage - 1) * pageSize + i + 1}</td>
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
                         <a href={`https://bscscan.com/tx/${row.hash}`} className={`text-decoration-none text-success ${!row.hash ? 'text-danger' : ''}`} target="_blank" rel="noreferrer">
                             {row.hash ? row.hash.slice(0, 15) : 'None'}
                         </a>
                     </td>
                     <td className="tabel-text w inter">
                          {dateFormat(new Date(row.createdAt), "yyyy-mm-dd, HH:MM:ss")}
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
             <div className="bgClr1 rounded-3">
                 <h1 className="text-center p-3 text-white fw-bold">Payout Transaction</h1>
             </div>

             <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                 <h5>
                     Total Payout     Transaction:{" "}
                     <span
                        className="fw-bold"
                        style={{ color: payout?.record_count === 0 ? 'red' : 'green' }}
                    >
                        {payout?.record_count || 0}
                    </span>
                </h5>
              
            </div>
           

            <div className="transaction">
                <div className="table-responsive rounded shadow-sm">
                    {loading ? (
                        <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />
                    ) : (
                        <table className="table table-striped table-bordered text-center align-middle">
                            <thead className="table-dark">
                                <tr>
                                   <th>S No.</th>
                                 <th>Name</th>
                                 <th>User Id</th>
                                 <th>Api Key</th>
                                 <th>Amount</th>
                                 <th>Status</th>
                                 <th>Wallet Address</th>
                                 <th>IP Address</th>
                                 <th>Blockcain</th>
                                 <th>Callback Url</th>
                                 <th>Remarks</th>
                                 <th>Transaction Hash</th>
                                 <th>Date</th>
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
                    total={payout?.record_count}
                    pageSize={pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                />
            </div>
        </div>
        </>
    )
}

export default PayoutTransaction

