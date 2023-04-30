import React from 'react';
import {Chart} from "react-chartjs-2";
const LineChart = () => {
    const data = {}
    return (
        <div style={{width: "500px",height:"500px", backgroundColor : "blue"}}>
            <Chart type={"line"} data={data}/>
        </div>
    );
};

export default LineChart;