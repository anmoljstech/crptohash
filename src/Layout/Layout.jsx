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
    <div class="d-flex">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setSidebarVisible={setSidebarVisible}
        isSidebarCollapsed={isSidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div class="content no-margin">
        <nav class="navbar navbar-expand-lg px-3">
          <button id="main-toggler" class="toggler" onClick={toggleSidebar}>
            <i class="fas fa-bars"></i>
          </button>
          <span class="ms-3 fw-bold">Admin Dashboard</span>
        </nav>

        <div class="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
