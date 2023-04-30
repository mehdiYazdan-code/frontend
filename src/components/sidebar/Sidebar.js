import React from 'react';
import {Link} from "react-router-dom";
import "./sidebar.css"

const Sidebar = () => {
    return (
        <div className="container-fluid min-vh-100 m-0" style={{backgroundColor : "#151B54"}}>
            <div className="row sidebar-item">
                <Link className="link" to="/api/users">کاربران</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/api/customers">مشتریان</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/api/reports">گزارشات روزانه</Link>
            </div>
            <div className="row sidebar-item">
                <Link className="link" to="/api/dashboard">داشبورد</Link>
            </div>
        </div>
    );
};

export default Sidebar;