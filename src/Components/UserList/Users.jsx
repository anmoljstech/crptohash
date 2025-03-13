import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { userdata } from '../../Redux/action/Dashboardaction'
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
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

    // const handleStatusChange = (userId) => {
    //     let url = "";
    
    //     switch () {
    //       case "openview":
    //         url = `/update?id=${userId}`;
    //         break;
    
    //       default:
    //         return;
    //     }
    
    //     navigate(url);
    //   };
    const records = () => {
        if (usersdata && usersdata?.users && usersdata?.users?.length > 0) {
            return usersdata?.users?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
                        <td className="tabel-text w inter">{row?.userId}</td>
                        <td className="tabel-text w inter">{row?.name}</td>
                        <td className="tabel-text w inter">{row?.email}</td>
                        <td className="tabel-text w inter">{row?.phonenumber}</td>
                        <td className="tabel-text w inter">{row?.isTransferAble ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                        <td className="tabel-text w inter">{row?.isVerified ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                        <td className="tabel-text w inter">{row?.isBlocked ? <FaCheck color="green" /> : <ImCross color="red" />}</td>
                        <td className="tabel-text w inter">
                            {dateFormat(row.createdAt, "yyyy-mm-dd, HH:mm:ss")}
                        </td>
                        <td className="tabel-text w inter">
                            <button
                                className='btn btn-primary'

                                onClick={() => navigate(`/update/${row._id}`)}



                            >

                                view
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
        <>
            <div className="container mt-4">

                <div className="container container-trade2 mt-2 p-1">
                    <h1 className="text-info text-center">User List </h1>
                    <h4 className="text-right1 p-3 text-primary">
                        Total User List: {usersdata?.count}
                    </h4>
                </div>
                <div className="container container-trade2 mt-2 p-1">
                    <div className="transactions">
                        <div className="table-responsive">
                            {loading ? (
                                <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />) : (
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">UserId</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Transfer</th>
                                            <th scope="col"> Verified</th>
                                            <th scope="col">Blocked</th>

                                            <th scope="col">Date</th>
                                            <th scope="col">View</th>

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
                            total={usersdata?.count || 0}
                            pageSize={10}
                            onChange={handlePaginationChange}
                            showSizeChanger={false}
                            showQuickJumper={false}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Users
