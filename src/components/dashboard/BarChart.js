import React from "react";
import {BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from "recharts";
import "./BarChart.css";

const BarChart = ({ data , fontFamily }) => {
    const months = [
        { month: 1, monthName: 'فروردین', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 2, monthName: 'اردیبهشت', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 3, monthName: 'خرداد', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 4, monthName: 'تیر', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 5, monthName: 'مرداد', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 6, monthName: 'شهریور', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 7, monthName: 'مهر', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 8, monthName: 'آبان', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 9, monthName: 'آذر', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 10, monthName: 'دی', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 11, monthName: 'بهمن', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
        { month: 12, monthName: 'اسفند', totalAmount: 0,totalPayments:0, totalQuantity : 0 },
    ];
    data.forEach((item) => {
        months[item.month - 1] = item;
    });
    const CustomYAxisTick = ({x, y, payload}) => {
        const formattedTotalAmount = new Intl.NumberFormat('fa-IR').format(payload.value);

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    fontSize={12}
                >
                    {formattedTotalAmount}
                </text>
            </g>
        );
    };
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('fa-IR').format(amount);
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{textAlign:"right",border:"1px solid grey"}}>
                    <p className="label">{`${label}`} </p>
                    <p className="label">{`مبلغ : ${formatAmount(payload[0].value)}`}</p>
                    <p className="label">{`تعداد : ${formatAmount(payload[0].payload.totalQuantity)}`}</p>
                    <p className="label">{`وصولی : ${formatAmount(payload[0].payload.totalPayments)}`}</p>
                </div>
            );
        }

        return null;
    };
    const formatNumber = (number) => {
        return new Intl.NumberFormat('fa-IR').format(number);
    };
    const subtotal = data.reduce((acc, item) => acc + item.totalAmount, 0);
    const collects = data.reduce((acc, item) => acc + item.totalPayments, 0);
    const claims = subtotal - collects


    return (
        <div style={{ fontFamily }} className="bar-chart-container">
            <RechartsBarChart width={600} height={500} data={months}
                              className="bar-chart" margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey="monthName" tick={{ fontSize: "12px" }}/>
                <YAxis
                    dataKey="totalAmount"
                    tick={<CustomYAxisTick />}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} formatter={formatAmount} />
                <Legend />
                <Bar dataKey="totalAmount" name="درآمد" fill="#8884d8" />
                <Bar dataKey="totalPayments" name="وصولی" fill="#82ca9d" />
            </RechartsBarChart>
            <table dir="rtl">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>جمع درآمد سال (ریال)</td>
                        <td>{formatNumber(subtotal)}</td>
                    </tr>
                    <tr>
                        <td>جمع وصول شده (ریال)</td>
                        <td>{formatNumber(collects)}</td>
                    </tr>
                    <tr>
                        <td>مانده مطالبات (ریال)</td>
                        <td>{formatNumber(claims)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default BarChart;

const x = [
    {
        "name": "درآمد",
        "fill": "#8884d8",
        "dataKey": "totalAmount",
        "color": "#8884d8",
        "value": 45720000000,
        "payload": {
            "month": 4,
            "monthName": "تیر",
            "totalAmount": 45720000000,
            "totalQuantity": 7200
        }
    }
]
