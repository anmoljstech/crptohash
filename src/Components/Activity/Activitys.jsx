import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { activateaction } from '../../Redux/action/Activate'
const Activitys = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);Alltranction
    const { actiavite, loading } = useSelector((state) => state.actiavite);
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(activateaction(requestData));
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    console.log({ actiavite });

    const records = () => {
        if (actiavite && actiavite?.data && actiavite?.data?.length > 0) {
            return actiavite?.data?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>
                        <td className="tabel-text w inter">{row?.userId?.userId}</td>
                        <td className="tabel-text w inter">{row?.userId?.name}</td>
                        <td className="tabel-text w inter">{row?.activity}</td>
                        <td className="tabel-text w inter">{row?.discription}</td>
                        <td className="tabel-text w inter text-danger">{row?.message}</td>
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
                        <h1 className="text-info text-center">Activity </h1>
                        <h4 className="text-right1 p-3 text-primary">
                        Total Activities: {actiavite?.count}
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
                                                <th scope="col">Activity</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Message</th>
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
                                total={actiavite?.count || 0}
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

export default Activitys

