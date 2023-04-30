import React, {useEffect, useState} from 'react';
import {
    getAllpaymentsByCustomerIdAndYearGroupedByMonth,
    getAllpaymentsByYearGroupedByMonth,
    getAllSalesByCustomerIdAndYearGroupedByMonth,
    getAllSalesByYearGroupedByMonth
} from "../services/customerServices";
import SearchForm from "./searchForm";
import BarChart from "./BarChart";
import "./Dashboard.css"
import CollectTable from "./CollectTable";

function combineArrays(array1, array2) {
    const combinedArray = [];
    for (let i = 0; i < array1.length; i++) {
        const combinedObject = {
            month: array1[i].month,
            monthName: array1[i].monthName,
            totalAmount: array1[i].totalAmount,
            totalPayments: array2[i].totalAmount,
            totalQuantity: array1[i].totalQuantity,
        };
        combinedArray.push(combinedObject);
    }
    return combinedArray;
}


const Dashboard = () => {
    const [data, setData] = useState([]);
    const onSubmit = async (formData) => {
        const {company, year} = formData;
        const sales = await getAllSalesByCustomerIdAndYearGroupedByMonth(company, year);
        const payments = await getAllpaymentsByCustomerIdAndYearGroupedByMonth(company, year);
        const payload = combineArrays(sales,payments);
        console.log("payload: ",payload)
        setData(payload);
    };
    useEffect(() => {
        async function loadData() {
             const sales = await getAllSalesByYearGroupedByMonth(1401);
             const payments = await getAllpaymentsByYearGroupedByMonth(1401);
             console.log("payments: ",payments)
             console.log(combineArrays(sales, payments))
            return combineArrays(sales, payments);
        }

        loadData().then(response => setData(response))
    }, [])


    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div>
                <SearchForm onSubmit={onSubmit}/>
            </div>
            <div className="row">
                <div className="col">
                    <BarChart data={data} fontFamily="IRANSans"/>
                </div>
                <div className="col">
                    <CollectTable data={data} fontFamily="IRANSans"/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;