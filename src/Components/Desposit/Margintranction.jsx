import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { margintranction } from "../../Redux/action/Desposit";
import { IoFilter, IoCloseSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

const Margintranction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState({ name: "", userId: "", date: "" });

    const { margin, loading } = useSelector(state => state.despositdata);
    const pageSize = 10;

    useEffect(() => {
        const skip = 0;
        dispatch(margintranction({ limit: 1000, skip }));
    }, []);

    useEffect(() => {
        if (margin?.transactions) {
            setFilteredData(margin.transactions);
        }
    }, [margin]);

    const applyFilters = () => {
        const filtered = margin?.transactions?.filter(row => {
            const name = row?.userId?.name?.toLowerCase() || '';
            const userId = row?.userId?.userId?.toLowerCase() || '';
            const createdDate = row?.createdAt ? dateFormat(row.createdAt, "yyyy-mm-dd") : '';

            return (
                name.includes(searchTerm.name) &&
                userId.includes(searchTerm.userId) &&
                (searchTerm.date ? createdDate === searchTerm.date : true)
            );
        }) || [];
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const renderTableRows = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const currentData = filteredData.slice(startIndex, startIndex + pageSize);

        if (currentData.length > 0) {
            return currentData.map((row, i) => (
                <tr key={i}>
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
            ));
        } else {
            return (
                <tr>
                    <td colSpan="14" className="text-center text-danger">Data Not Found</td>
                </tr>
            );
        }
    };

    return (
        <div className="container container-trade p-0">
            <div className="bgClr1 rounded-3">
                <h1 className="text-center p-3 text-white fw-bold">Margin Transaction</h1>
            </div>

           

            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                <h5>
                    Total Transactions:{" "}
                    <span
                        className="fw-bold"
                        style={{ color: filteredData.length === 0 ? 'red' : 'green' }}
                    >
                        {filteredData.length || 0}
                    </span>
                </h5>
                <button className=" filter-btn" onClick={() => setShowFilter(!showFilter)}>
                    <FaFilter className="me-2" /> {showFilter ? "Hide Filter" : " Filter"}
                </button>
            </div>
            {showFilter && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        applyFilters();
                    }}
                    className="d-flex flex-wrap justify-content-center gap-3 mb-4"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        className="input_search"
                        value={searchTerm.name}
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, name: e.target.value.toLowerCase() }))}
                    />
                    <input
                        type="text"
                        placeholder="User Id"
                        className="input_search"
                        value={searchTerm.userId}
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, userId: e.target.value.toLowerCase() }))}
                    />
                    <input
                        type="date"
                        className="input_search"
                        value={searchTerm.date}
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, date: e.target.value }))}
                    />
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-apply">Apply Filter</button>
                        <button
                            type="button"
                            className="btn btn-clear"
                            onClick={() => {
                                setSearchTerm({ name: "", userId: "", date: "" });
                                setFilteredData(margin?.transactions || []);
                                setCurrentPage(1);
                            }}
                        >
                            Clear Filter
                        </button>
                    </div>
                </form>
            )}

            <div className="table-responsive rounded shadow-sm">
                {loading ? (
                    <Skeleton count={10} height={50} baseColor="#e0e0e0" />
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
                                <th>Token</th>
                                <th>USDT</th>
                                <th>Transaction Hash</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableRows()}</tbody>
                    </table>
                )}
            </div>

            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    current={currentPage}
                    total={filteredData.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Margintranction;
