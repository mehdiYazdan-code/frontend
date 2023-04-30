import './App.css';
import {Link, Outlet} from "react-router-dom";
import React from "react";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
    return (
        <div className="container-fluid" style={{ minHeight: "100vh"}}>
            <div className="row">
                <div className="col-2 min-vh-100 border" >
                    <Sidebar/>
                </div>
                <div className="col-10" style={{backgroundColor: "light"}}>
                    <div className="row w-75">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
