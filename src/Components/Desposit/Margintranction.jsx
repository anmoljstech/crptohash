
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { margintranction } from "../../Redux/action/Desposit";
import { IoFilter, IoCloseSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
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
    

    const records = () => {
        const startIndex = (currentPage - 1) * pageSize;
        if (margin && margin?.transactions && margin?.transactions?.length > 0) {
            return margin?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                      <td>{startIndex + i + 1}</td>
                     <td>{row?.userId?.name}</td>
                     <td>{row?.userId?.userId}</td>
                     <td>{row?.commissionAmount}</td>
                     <td>{row?.amount}</td>
                     <td className="text-truncate" style={{ maxWidth: 120 }}>{row?.apiKey}</td>
                     <td>{row?.transactionCharge}</td>
                     <td>{row?.payableAmount}</td>
                     <td className={`fw-semibold ${row?.type === "deposit" ? "text-success" : "text-danger"}`}>{row?.type}</td>
                     <td>{row?.remark}</td>
                     <td>{row?.tokenName}</td>
                     <td>{row?.usdtValue}</td>
                     <td className="text-truncate" style={{ maxWidth: 160 }}>
                         <a href={`https://bscscan.com/tx/${row.transactionHash}`}  className={`text-decoration-none text-success ${!row.transactionHash ? 'text-danger' : ''}`} target="_blank" rel="noopener noreferrer">
                             {row.transactionHash ? row.transactionHash.slice(0, 12) + "..." : "None"}
                         </a>
                     </td>
                     <td>{dateFormat(row.createdAt, "yyyy-mm-dd, HH:MM:ss")}</td>
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
                 <h1 className="text-center p-3 text-white fw-bold">Margin Transaction</h1>
             </div>

             <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                 <h5>
                     Total Margin  Transaction:{" "}
                     <span
                        className="fw-bold"
                        style={{ color: margin?.record_count === 0 ? 'red' : 'green' }}
                    >
                        {margin?.record_count || 0}
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
                                 <th>User ID</th>
                                 <th>Commission</th>
                                 <th>Amount</th>
                                 <th>API Key</th>
                                 <th>Transaction Charge</th>
                                 <th>Payable</th>
                                 <th>Type</th>
                                 <th>Remark</th>
                                 <th>Token Name</th>
                                 <th>USDT</th>
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
                    total={margin?.record_count}
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

export default Margintranction

