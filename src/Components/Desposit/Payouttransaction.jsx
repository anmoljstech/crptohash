import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { payouttransaction } from '../../Redux/action/Desposit';
import { FaFilter } from "react-icons/fa";

const PayoutTransaction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

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

    useEffect(() => {
        if (payout?.transactions) {
            setFilteredData(payout.transactions);
        }
    }, [payout]);

    const handleSearch = () => {
        const filtered = payout?.transactions?.filter((row) => {
            const rowName = row?.userId?.name?.toLowerCase() || "";
            const rowUserId = row?.userId?.userId?.toLowerCase() || "";
            const rowApiKey = row?.apiKey?.toLowerCase() || "";
            const createdAt = new Date(row?.createdAt);

            const matchName = name ? rowName.includes(name.toLowerCase()) : true;
            const matchUserId = userId ? rowUserId.includes(userId.toLowerCase()) : true;
            const matchApiKey = apiKey ? rowApiKey.includes(apiKey.toLowerCase()) : true;

            const matchDate =
                (!fromDate || createdAt >= new Date(fromDate)) &&
                (!toDate || createdAt <= new Date(toDate + "T23:59:59"));

            return matchName && matchUserId && matchApiKey && matchDate;
        });
        setFilteredData(filtered);
    };

    const handleClear = () => {
        setName("");
        setUserId("");
        setApiKey("");
        setFromDate("");
        setToDate("");
        setFilteredData(payout?.transactions || []);
    };

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    const records = () => {
        if (filteredData && filteredData.length > 0) {
            return filteredData.map((row, i) => (
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
                        <a href={`https://bscscan.com/tx/${row.transactionHash}`} className={`text-decoration-none text-success ${!row.transactionHash ? 'text-danger' : ''}`} target="_blank" rel="noreferrer">
                            {row.transactionHash ? row.transactionHash.slice(0, 15) : 'None'}
                        </a>
                    </td>
                    <td className="tabel-text w inter">
                        {dateFormat(row.createdAt, "yyyy-mm-dd, HH:mm:ss")}
                    </td>
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="13" className="text-center text-danger fw-bold">Data Not Found</td>
                </tr>
            );
        }
    };

    return (
        <div className="container container-trade p-0">
            <div className="bgClr1 rounded-3">
                <h1 className="text-center p-3 text-white fw-bold">Payout Transaction</h1>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3">
                <h5 className="text-primary">
                    Total Payout Transaction: <span
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
                <div className="mb-3 px-3 d-flex flex-wrap gap-2">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        className="input_search"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by User ID"
                        className="input_search"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <input
                        type="date"
                        className="input_search"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />

                    <button className="btn btn-apply" onClick={handleSearch}>Apply</button>
                    <button className="btn btn-clear" onClick={handleClear}>Clear</button>
                </div>
            )}


            <div className="table-responsive rounded shadow-sm">
                {loading ? (
                    <Skeleton count={10} height={50} baseColor="#e0e0e0" />
                ) : (
                    <table className="table table-bordered table-striped text-center align-middle">
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

            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    current={currentPage}
                    total={filteredData.length}
                    pageSize={pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default PayoutTransaction;
