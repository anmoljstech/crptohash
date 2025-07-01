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
    const { usersdata, loading } = useSelector(state => state.dashbaord);
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(userdata(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };
    console.log({usersdata});
    
 
 const records = () => {
        const startIndex = (currentPage - 1) * pageSize;
        if (usersdata && usersdata?.users && usersdata?.users?.length > 0) {
            return usersdata?.users?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                    <td>{(currentPage - 1) * pageSize + i + 1}</td>
                     <td>{row?.userId}</td>
                     <td>{row?.name}</td>
                     <td>{row?.email}</td>
                     <td>{row?.phonenumber}</td>
                     <td>{row?.isTransferAble ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                     <td>{row?.isVerified ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                     <td>{row?.isBlocked ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                     <td>
                       <td className="tabel-text w inter">
  {dateFormat(new Date(row.createdAt), "yyyy-mm-dd, HH:MM:ss")}
</td>

                        </td>
                     <td>
                         <button className="viewbtn" onClick={() => navigate(`/update/${row._id}`)}>
                             View
                         </button>
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
        <div className="container">
            <div className="bgClr1 rounded-3 mb-4">
                <h1 className="text-center p-3 text-white fw-bold">User List</h1>
            </div>

            <div className="d-flex justify-content-between align-items-center p-3 text-primary">
                <h5>Total User List: 
                    <span className="text-success fw-bold ms-2">{usersdata?.count || 0}</span>
                </h5>
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
            )} */}

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

            <div className="pagination mt-3">
                           <Pagination
                               style={{ cursor: "pointer" }}
                               className="mx-auto"
                               current={currentPage || 1}
                               total={usersdata?.count}
                               pageSize={pageSize}
                               onChange={handlePaginationChange}
                               showSizeChanger={false}
                               showQuickJumper={false}
                           />
                       </div>
        </div>
    );
};

export default Users;
