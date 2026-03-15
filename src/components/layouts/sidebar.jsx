import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {



  return (
    <>
       <div className="sidebar">
        <a href="#">Dashboard</a>
        <a href="#">Create Video</a>
        <a href="#">My Videos</a>
        <a href="#">Templates</a>
        <a href="#">Settings</a>
        <a href="#">Billing</a>
      </div>
    </>
  );
}

export default Sidebar; 
 
 
 
