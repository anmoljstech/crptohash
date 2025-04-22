import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PiHandDepositBold } from "react-icons/pi";
// import { dashboardbatchs } from '../Redux/action/Dashboardaction'
import { GrTransaction } from "react-icons/gr";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiHandWithdrawDuotone } from "react-icons/pi";
const Sidebar = ({
  isSidebarVisible,
  setSidebarVisible,
  isSidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openBannerDropdown, setOpenBannerDropdown] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.clear('token');
    navigate('/login');
    setShowLogoutModal(false);
  };
  const handleDropdownToggle = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };
  const handleBannerDropdownToggle = () => {
    setOpenBannerDropdown((prev) => !prev);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarCollapsed]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    //  dispatch(dashboardbatchs());
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div id="sidebar" className={`sidebar ${isSidebarVisible ? "show" : ""} ${isSidebarCollapsed ? "collapsed" : ""}`} >

        <div className="logo">
          <div className="d-flex align-items-center">
            <i className="fa fa-user"></i>
            <span>Admin Panel </span>
          </div>
          <i
            className="fas fa-bars toggler-icon"
            id="sidebar-toggler"
            onClick={() => setSidebarVisible(false)}
          ></i>
        </div>
        <ul className="nav flex-column pt-3">
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/"
              title={isSidebarCollapsed ? "Dashboard" : ""}
            >
              <span className="icon">
                <i className="fas fa-tachometer-alt"></i>
              </span>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/users/list"
              title={isSidebarCollapsed ? "user" : ""}
            >
              <span className="icon">
                <i className="fas fa-users"></i>
              </span>
              <span className="text">User</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/desposit/desposittranction"
              title={isSidebarCollapsed ? "desposit" : ""}
            >
              <span className="icon">
                <PiHandDepositBold />
              </span>
              <span className="text">Deposit Transaction</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/desposit/margintranction"
              title={isSidebarCollapsed ? "desposit" : ""}
            >
              <span className="icon">
                <GrTransaction />
              </span>
              <span className="text">Margin Transaction</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/desposit/payouttransaction"
              title={isSidebarCollapsed ? "desposit" : ""}
            >
              <span className="icon">
                <BiMoneyWithdraw />
              </span>
              <span className="text">Payout Transaction</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              onClick={() => setSidebarVisible(false)}
              className="nav-link"
              to="/withdrawal/withdraw"
              title={isSidebarCollapsed ? "withdraw" : ""}
            >
              <span className="icon">
                <PiHandWithdrawDuotone />
              </span>
              <span className="text">Withdraw Histary</span>
            </Link>
          </li>
          <li className="nav-item">
            <div
              className="nav-link text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => setShowLogoutModal(true)}
              title={isSidebarCollapsed ? "Logout" : ""}
            >
              <span className="icon">
                <i className="fas fa-sign-out-alt"></i>
              </span>
              <span className="text">Logout</span>
            </div>
          </li>
        </ul>
      </div>
      {showLogoutModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Logout</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLogoutModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Sidebar;
