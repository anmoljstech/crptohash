

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { desposit } from '../../Redux/action/Desposit'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const Desposittranction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { despositdata, loading } = useSelector(state => state.despositdata);
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(desposit(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    console.log({ despositdata });

    const records = () => {
        if (despositdata && despositdata?.transactions && despositdata?.transactions?.length > 0) {
            return despositdata?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
                        {/* <td className="tabel-text w inter">{row?.adminHash?`${row?.adminHash?.slice(0, 10)}...` : ""}</td> */}
                        <td className="tabel-text w inter">{row?.userId?.name}</td>
                        <td className="tabel-text w inter">{row?.userId?.userId}</td>

                        <td>
                            <a href={`https://bscscan.com/tx/${row.adminHash}`} target="_blank" >
                                {row.adminHash ? row.adminHash.slice(0, 15) : 'None'}
                            </a>
                        </td>
                        <td className="tabel-text w inter">{row?.amount}</td>
                        <td className="tabel-text w inter">{row?.apiKey}</td>

                        <td>
                            <a href={`https://bscscan.com/tx/${row.debitHash}`} target="_blank" >
                                {row.debitHash ? row.debitHash.slice(0, 15) : 'None'}
                            </a>
                        </td>
                        <td>
                            <a href={`https://bscscan.com/address/${row.from}`} target="_blank" >
                                {row.from ? row.from.slice(0, 15) : 'None'}
                            </a>
                        </td>
                        <td>
                            <a href={`https://bscscan.com/address/${row.to}`} target="_blank" >
                                {row.to ? row.to.slice(0, 15) : 'None'}
                            </a>
                        </td>
                        <td className="tabel-text w inter">{row?.baseCurrencyDepositStatus ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                        <td className="tabel-text w inter">{row?.mainCurrencyDebitStatus ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                        <td className="tabel-text w inter">{row?.tokenName}</td>

                        <td>
                            <a href={`https://bscscan.com/address/${row.transactionHash}`} target="_blank" >
                                {row.to ? row.to.slice(0, 15) : 'None'}
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
                        <h1 className="text-info text-center"> Deposit Transaction  </h1>
                        <h4 className="text-right1 p-3 text-primary">
                            Total Deposit Transaction      : {despositdata?.record_count
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
                                                <th scope="col">AdminHash</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Api Key</th>
                                                <th scope="col">Debit Hash</th>
                                                <th scope="col">From</th>
                                                <th scope="col"> To</th>
                                                <th scope="col"> Deposit Status</th>
                                                <th scope="col"> Debit Status</th>
                                                <th scope="col"> Token Name</th>
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
                                total={despositdata?.record_count || 0}
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

export default Desposittranction
