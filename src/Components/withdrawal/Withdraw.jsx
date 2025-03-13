

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import dateFormat from "dateformat";
import Skeleton from "react-loading-skeleton";
import { withdrawtranction, withdrawtapprovedaction } from '../../Redux/action/Withdrawaction'
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Withdraw = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { withdrwal, loading } = useSelector(state => state.withdrwal);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [remarks, setRemarks] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");
    const pageSize = 10;
    const fetchData = () => {
        const skip = (currentPage - 1) * pageSize;
        const requestData = {
            limit: pageSize,
            skip: skip,

        };
        dispatch(withdrawtranction(requestData));
    };
    const handleAction = (transaction, actionType) => {
        setSelectedTransaction(transaction);
        setSelectedStatus(actionType);
        setShowModal(true);
    };

    const confirmAction = () => {
        if (!selectedTransaction || !selectedStatus) return;
    
        const requestData = {
            transactionId: selectedTransaction._id,
            status: selectedStatus,
            remarks: remarks,
        };
    
        dispatch(withdrawtapprovedaction(requestData))
            .then(() => {
                setShowModal(false);
                setRemarks("");
                fetchData(); 
            })
            .catch((error) => {
                console.error("Error updating transaction:", error);
            });
    };
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };


    const records = () => {
        if (withdrwal && withdrwal?.transactions && withdrwal?.transactions?.length > 0) {
            return withdrwal?.transactions?.map((row, i) => {
                return (
                    <tr className="table-row" key={i}>
                        <td scope="row">{(currentPage - 1) * pageSize + i + 1}</td>

                        <td className="tabel-text w inter">{row?.userId?.name}</td>
                        <td className="tabel-text w inter">{row?.userId?.userId}</td>
                        <td className="tabel-text w inter">{row?.status}</td>


                        <td className="tabel-text w inter">{row?.amount}</td>
                        <td className="tabel-text w inter">{row?.tokenName}</td>



                        <td className="tabel-text w inter">
                            {dateFormat(row.createdAt, "yyyy-mm-dd, HH:mm:ss")}
                        </td>
                        <td className="tabel-text w inter">
                            {row?.status === "PENDING" ? (
                                <>
                                    <button className="btn btn-success" onClick={() => handleAction(row, "APPROVED")}>
                                        Approve
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => handleAction(row, "REJECTED")}>
                                        Reject
                                    </button>
                                </>
                            ) : (
                                <>
                                
                                </>
                            )}
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
                        <h1 className="text-info text-center"> withdraw Transaction  </h1>
                        <h4 className="text-right1 p-3 text-primary">
                            Total withdraw Transaction      : {withdrwal?.record_count
                            }

                        </h4>
                    </div>
                    <div className="container container-trade2 mt-2 p-1">
                        <div className="transaction">
                            <div className="table-responsive transactions">
                                {loading ? (
                                    <Skeleton count={10} height={50} baseColor="#9e9e9e" highlightColor="#000" />) : (
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col"> Name</th>
                                                <th scope="col"> User Id</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Token Name</th>



                                                <th scope="col">Date</th>
                                                <th scope="col">Action</th>
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
                                total={withdrwal?.record_count || 0}
                                pageSize={10}
                                onChange={handlePaginationChange}
                                showSizeChanger={false}
                                showQuickJumper={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStatus === "APPROVED" ? "Approve Transaction" : "Reject Transaction"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to {selectedStatus.toLowerCase()} this transaction?</p>
                    <p><strong>User:</strong> {selectedTransaction?.userId?.name}</p>
                    <p><strong>Amount:</strong> {selectedTransaction?.amount} {selectedTransaction?.tokenName}</p>
                    <Form.Group>
                        <Form.Label>Remarks ({selectedStatus === "APPROVED" ? "Approval" : "Rejection"} Reason)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant={selectedStatus === "APPROVED" ? "success" : "danger"} onClick={confirmAction}>
                        Confirm {selectedStatus}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Withdraw


