import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { userdata } from '../../Redux/action/Dashboardaction'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [searchTerm, setSearchTerm] = useState({ name: "", userId: "", date: "" });
    const [filteredData, setFilteredData] = useState([]);
    const { usersdata, loading } = useSelector(state => state.dashbaord);
    const pageSize = 10;

    const fetchData = () => {
        const skip = 0; // Fetching full data for filter
        dispatch(userdata({ limit: 1000, skip }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (usersdata?.users) {
            setFilteredData(usersdata.users);
        }
    }, [usersdata]);

    const applyFilters = () => {
        const filtered = usersdata?.users?.filter(row => {
            const name = row?.name?.toLowerCase() || "";
            const userId = row?.userId?.toLowerCase() || "";
            const createdDate = row?.createdAt ? dateFormat(row.createdAt, "yyyy-mm-dd") : "";

            return (
                name.includes(searchTerm.name) &&
                userId.includes(searchTerm.userId) &&
                (searchTerm.date ? createdDate === searchTerm.date : true)
            );
        }) || [];
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const records = () => {
        if (paginatedData.length > 0) {
            return paginatedData.map((row, i) => (
                <tr key={i}>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                    <td>{row?.userId}</td>
                    <td>{row?.name}</td>
                    <td>{row?.email}</td>
                    <td>{row?.phonenumber}</td>
                    <td>{row?.isTransferAble ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                    <td>{row?.isVerified ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                    <td>{row?.isBlocked ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                    <td>{dateFormat(row.createdAt, "yyyy-mm-dd, HH:MM:ss")}</td>
                    <td>
                        <button className="viewbtn" onClick={() => navigate(`/update/${row._id}`)}>
                            View
                        </button>
                    </td>
                </tr>
            ));
        } else {
            return <tr><td colSpan="10" className="text-center text-danger">Data Not Found</td></tr>;
        }
    };

    return (
        <div className="container">
            <div className="bgClr1 rounded-3 mb-4">
                <h1 className="text-center p-3 text-white fw-bold">User List</h1>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                <h5>Total User List: 
                    <span className="text-success fw-bold ms-2">{filteredData.length || 0}</span>
                </h5>
                <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
                    <FaFilter className="me-2" /> {showFilter ? "Hide Filter" : "Filter"}
                </button>
            </div>

            {showFilter && (
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
                    <input
                        type="date"
                        className="input_search"
                        value={searchTerm.date}
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, date: e.target.value }))}
                    />
                    <button type="submit" className="btn btn-apply">Apply</button>
                    <button type="button" className="btn btn-clear"
                        onClick={() => {
                            setSearchTerm({ name: "", userId: "", date: "" });
                            setFilteredData(usersdata?.users || []);
                            setCurrentPage(1);
                        }}
                    >
                        Clear
                    </button>
                </form>
            )}

            <div className="table-responsive rounded shadow-sm">
                {loading ? (
                    <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />
                ) : (
                    <table className="table table-bordered table-striped text-center align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>S No</th>
                                <th>UserId</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Transfer</th>
                                <th>Verified</th>
                                <th>Blocked</th>
                                <th>Date</th>
                                <th>View</th>
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
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Users;
