import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
     
      setSidebarVisible((prev) => !prev);
    } else {
     
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const closeSidebarOnOutsideClick = (event) => {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      const mainToggler = document.getElementById("main-toggler");
      if (
        !sidebar.contains(event.target) &&
        !mainToggler.contains(event.target)
      ) {
        setSidebarVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSidebarOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, []);

  return (
    <div className="d-flex">
  <Sidebar
    isSidebarVisible={isSidebarVisible}
    setSidebarVisible={setSidebarVisible}
    isSidebarCollapsed={isSidebarCollapsed}
    setSidebarCollapsed={setSidebarCollapsed}
  />
  <div id="content" className={`content no-margin ${isSidebarVisible ? "show" : ""} ${isSidebarCollapsed ? "full" : ""}`} >
 
    <nav className="navbar navbar-expand-lg px-3">
      <button id="main-toggler" className="toggler" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <span className="ms-3 fw-bold">Admin Dashboard</span>
    </nav>

    <div className="p-4">
      <Outlet />
    </div>
  </div>
</div>

  );
};

export default Layout;
