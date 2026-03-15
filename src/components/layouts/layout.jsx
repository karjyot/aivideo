import React from "react";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div class="container">
        <Sidebar />
          <Outlet />
      </div>
    
  
    </>
  );
};

export default Layout;