

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { margintranction } from '../../Redux/action/Desposit'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const Margintranction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { margin, loading } = useSelector(state => state.despositdata);
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(margintranction(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    console.log({ margin });

    const records = () => {
        if (margin && margin?.transactions && margin?.transactions?.length > 0) {
            return margin?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
            
                        <td className="tabel-text w inter">{row?.userId?.name}</td>
                        <td className="tabel-text w inter">{row?.userId?.userId}</td>
                        <td className="tabel-text w inter">{row?.commissionAmount}</td>
                      
                      
                        <td className="tabel-text w inter">{row?.amount}</td>
                        <td className="tabel-text w inter">{row?.apiKey}</td>
                        <td className="tabel-text w inter">{row?.transactionCharge}</td>
                        <td className="tabel-text w inter">{row?.payableAmount}</td>
                        <td className="tabel-text w inter">{row?.type}</td>
                        <td className="tabel-text w inter">{row?.remark}</td>
                     
                       
                        <td className="tabel-text w inter">{row?.tokenName}</td>
                        <td className="tabel-text w inter">{row?.usdtValue}</td>

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
                        <h1 className="text-info text-center"> Margin Transaction  </h1>
                        <h4 className="text-right1 p-3 text-primary">
                            Total Margin Transaction      : {margin?.record_count
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
                                                <th scope="col">#</th>
                                                <th scope="col"> Name</th>
                                                <th scope="col"> User Id</th>
                                                <th scope="col">Commission Amount</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Api Key</th>
                                                <th scope="col">Transaction Charge</th>
                                                <th scope="col">Payable Amount</th>
                                                <th scope="col"> Type</th>
                                                <th scope="col"> Remarks</th>
                                                <th scope="col"> Token Name</th>
                                                <th scope="col">Usdt Value</th>
                                               
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
                                total={margin?.record_count || 0}
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

export default Margintranction


