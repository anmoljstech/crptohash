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
                                {row.transactionHash ? row.transactionHash.slice(0, 15) : 'None'}
                            </a>
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
          
                <div className="container container-trade p-0">
             <div className="bgClr1 rounded-3">
                 <h1 className="text-center p-3 text-white fw-bold">Deposit Transaction</h1>
             </div>

             <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                 <h5>
                     Total Deposit Transaction:{" "}
                     <span
                        className="fw-bold"
                        style={{ color: despositdata?.record_count === 0 ? 'red' : 'green' }}
                    >
                        {despositdata?.record_count || 0}
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
                                    <th>S No</th>
                                    <th>Name</th>
                                    <th>User Id</th>
                                    <th>AdminHash</th>
                                    <th>Amount</th>
                                    <th>Api Key</th>
                                    <th>Debit Hash</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Deposit Status</th>
                                    <th>Debit Status</th>
                                    <th>Token Name</th>
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
                    total={despositdata?.record_count}
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

export default Desposittranction

