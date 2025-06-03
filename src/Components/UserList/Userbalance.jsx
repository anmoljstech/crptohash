
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { userbalance, userdata } from '../../Redux/action/Dashboardaction'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const Userbalance = () => {
    

const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
   const { userbalancedata, loading } = useSelector(state => state.dashbaord);
    const pageSize = 10;
    const fetchData = () => {
        // const skip = (currentPage - 1) * pageSize;
        // const requestData = {
        //     limit: pageSize,
        //     skip: skip,

        // };
        dispatch(userbalance ());
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    
    const records = () => {
    if (userbalancedata?.wallet_transactions && userbalancedata?.wallet_transactions && userbalancedata?.wallet_transactions?.length > 0) {
            return userbalancedata?.wallet_transactions?.map((row, i) => {
                 return (
                <tr key={i}>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                    <td>{row?.userId}</td>
                    <td>{row?.name}</td>
                    <td>{row?.totalPayable}</td>
                    
                </tr>
            )});
        } else {
            return <tr><td colSpan="10" className="text-center text-danger">Data Not Found</td></tr>;
        }
    };

    return (
        <div className="container">
            <div className="bgClr1 rounded-3 mb-4">
                <h1 className="text-center p-3 text-white fw-bold">User List Balance </h1>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                {/* <h5>Total User Balance: 
                    <span className="text-success fw-bold ms-2">{userbalancedata?.count}</span>
                </h5> */}
                {/* <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
                    <FaFilter className="me-2" /> {showFilter ? "Hide Filter" : "Filter"}
                </button> */}
            </div>

            {/* {showFilter && (
                <form className="d-flex flex-wrap gap-3 mb-4 justify-content-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        applyFilters();
                    }}
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
                        placeholder="User ID"
                        className="input_search"
                        value={searchTerm.userId}
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, userId: e.target.value.toLowerCase() }))}
                    />
                    
                    <button type="submit" className="btn btn-apply">Apply</button>
                    <button type="button" className="btn btn-clear"
                        onClick={() => {
                            setSearchTerm({ name: "", userId: "", date: "" });
                            setFilteredData(userbalancedata?.wallet_transactions || []);
                            setCurrentPage(1);
                        }}
                    >
                        Clear
                    </button>
                </form>
            )} */}

            <div className="table-responsive rounded shadow-sm">
                {loading ? (
                    <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />
                ) : (
                    <table className="table table_width table-bordered table-striped text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>S No</th>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Total Payable</th>
                                
                            </tr>
                        </thead>
                        <tbody>{records()}</tbody>
                    </table>
                )}
            </div>

            {/* <div className="d-flex justify-content-center mt-4">
                <Pagination
                                    style={{ cursor: "pointer" }}
                                    className="mx-auto"
                                    current={currentPage || 1}
                                    total={userbalancedata?.count}
                                    pageSize={pageSize}
                                    onChange={handlePaginationChange}
                                    showSizeChanger={false}
                                    showQuickJumper={false}
                                />
            </div> */}
        </div>
    );
};

export default Userbalance;
