import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiHandDepositBold, PiHandWithdrawDuotone } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const Sidebar = ({
  isSidebarVisible,
  setSidebarVisible,
  isSidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
    setShowLogoutModal(false);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
useEffect(() => {
  if (showLogoutModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [showLogoutModal]);

  return (
    <>
      <div id="sidebar" className={`sidebar ${isSidebarVisible ? "show" : ""} ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <div className="logo bgClr1">
          <div className="d-flex align-items-center">
            <i className="fa fa-user"></i>
            <span>Admin Panel</span>
          </div>
          <i className="fas fa-bars toggler-icon" onClick={() => setSidebarVisible(false)}></i>
        </div>

        <ul className="nav flex-column pt-3">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setSidebarVisible(false)}>
              <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
              <span className="text">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/users/list" className="nav-link" onClick={() => setSidebarVisible(false)}>
              <span className="icon"><i className="fas fa-users"></i></span>
              <span className="text">User</span>
            </Link>
          </li>


          <li className="nav-item">
            <div className="nav-link d-flex justify-content-between align-items-center" onClick={() => toggleDropdown("transactions")} style={{ cursor: "pointer" }}>
              <span>
                <span className="icon"><GrTransaction /></span>
                <span className="text">Transactions</span>
              </span>
              <span>{openDropdown === "transactions" ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            {openDropdown === "transactions" && (
              <ul className="nav flex-column ps-4">
                <li className="nav-item">
                  <Link to="/desposit/desposittranction" className="nav-link" onClick={() => setSidebarVisible(false)}>
                    <PiHandDepositBold className="me-2" />
                    <span className="text">Deposit Transaction</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/desposit/margintranction" className="nav-link" onClick={() => setSidebarVisible(false)}>
                    <GrTransaction className="me-2" />
                    <span className="text">Margin Transaction</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/desposit/payouttransaction" className="nav-link" onClick={() => setSidebarVisible(false)}>
                    <BiMoneyWithdraw className="me-2" />
                    <span className="text">Payout Transaction</span>
                  </Link>
                </li>
              </ul>
            )}

          </li>
       

          <li className="nav-item">
            <Link to="/withdrawal/withdraw" className="nav-link" onClick={() => setSidebarVisible(false)}>
              <span className="icon"><PiHandWithdrawDuotone /></span>
              <span className="text">Withdraw History</span>
            </Link>
          </li>

          <li className="nav-item">
            <div className="nav-link text-danger" style={{ cursor: "pointer" }} onClick={() => setShowLogoutModal(true)}>
              <span className="icon"><i className="fas fa-sign-out-alt"></i></span>
              <span className="text">Logout</span>
            </div>
          </li>
        </ul>
      </div>

     
      {showLogoutModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog ">
            <div className="modal-content p-2 ">
              <div className="modal-header border-0">
                <h5 className="modal-title">Confirm Logout</h5>
                <button type="button " className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
              </div>
              <div className="modal-body ">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-clear" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                <button type="button" className="btn btn-yes" onClick={handleLogout}>Yes, Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
