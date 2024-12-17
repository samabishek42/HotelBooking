import React from "react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-links">
        <a href="#home">Home</a>
        <a href="#profile">Profile</a>
        <a href="#menu">Menu</a>
        <a href="#orders">Orders</a>
        <a href="#settings">Settings</a>
        <a href="#logout">Logout</a>
      </div>
    </div>
  );
};

export default Sidebar;
