import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { desposit } from '../../Redux/action/Desposit';
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoFilter } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

const Desposittranction = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { despositdata, loading } = useSelector(state => state.despositdata);

    const [searchTerm, setSearchTerm] = useState({
        name: '',
        userId: '',
        date: '',
    });

    const [filteredData, setFilteredData] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (despositdata?.transactions) {
            setFilteredData(despositdata.transactions);
        }
    }, [despositdata]);

    const fetchData = () => {
        const requestData = {
            limit: 1000,
            skip: 0,
        };
        dispatch(desposit(requestData));
    };

    const applyFilters = () => {
        const filtered = despositdata?.transactions?.filter((row) => {
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

    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    const records = () => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const currentData = filteredData.slice(startIndex, endIndex);

        if (currentData.length > 0) {
            return currentData.map((row, i) => (
                <tr key={i}>
                    <td>{startIndex + i + 1}</td>
                    <td>{row?.userId?.name}</td>
                    <td>{row?.userId?.userId}</td>
                    <td><a href={`https://bscscan.com/tx/${row.adminHash}`} className={`text-decoration-none text-success ${!row.adminHash ? 'text-danger' : ''}`} target="_blank" rel="noreferrer">{row.adminHash?.slice(0, 15) || 'None'}</a></td>
                    <td>{row?.amount}</td>
                    <td>{row?.apiKey}</td>
                    <td><a href={`https://bscscan.com/tx/${row.debitHash}`} className={`text-decoration-none text-success ${!row.debitHash ? 'text-danger' : ''}`} target="_blank" rel="noreferrer">{row.debitHash?.slice(0, 15) || 'None'}</a></td>
                    <td><a href={`https://bscscan.com/address/${row.from}`} className="text-decoration-none  text-success" target="_blank" rel="noreferrer">{row.from?.slice(0, 15) || 'None'}</a></td>
                    <td><a href={`https://bscscan.com/address/${row.to}`} className="text-decoration-none  text-success" target="_blank" rel="noreferrer">{row.to?.slice(0, 15) || 'None'}</a></td>
                    <td>{row?.baseCurrencyDepositStatus ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                    <td>{row?.mainCurrencyDebitStatus ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                    <td>{row?.tokenName}</td>
                    <td><a href={`https://bscscan.com/address/${row.transactionHash}`} className="text-decoration-none  text-success" target="_blank" rel="noreferrer">{row.transactionHash?.slice(0, 15) || 'None'}</a></td>
                    <td>{dateFormat(row.createdAt, "yyyy-mm-dd, HH:mm:ss")}</td>
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="14" className="text-center">Data Not Found</td>
                </tr>
            );
        }
    };

    return (
        <div className="container container-trade p-0">
            <div className="bgClr1 rounded-3">
                <h1 className="text-center p-3 text-white fw-bold">Deposit Transaction</h1>
            </div>

            {/* <div className="mb-3 text-right1 p-3 text-primary">
                <h5>
                    Total Deposit Transaction:{" "}
                    <span className="text-success fw-bold">
                        {filteredData.length || 0}
                    </span>
                </h5>
            </div>

            <div className="text-end my-3 p-0">
                <button
                    className="btn border p-2 rounded-3"
                  
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    {showFilter ? <IoCloseSharp className="filter_icon"/> : <IoFilter className="filter_icon"/> }
                </button>
            </div> */}
            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                <h5>
                    Total Deposit Transaction:{" "}
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
                <div className="text-center mb-4 ">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            applyFilters();
                        }}
                        className="d-flex flex-wrap justify-content-center gap-3"
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
                                    setSearchTerm({ name: '', userId: '', date: '' });
                                    setFilteredData(despositdata?.transactions || []);
                                    setCurrentPage(1);
                                }}
                            >
                                Clear Filter
                            </button>
                        </div>
                    </form>
                </div>
            )}

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
                    total={filteredData.length}
                    pageSize={pageSize}
                    onChange={handlePaginationChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                />
            </div>
        </div>
    );
};

export default Desposittranction;

