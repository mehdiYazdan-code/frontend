import React, {useEffect, useState} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function toPersianFormat(params) {
    return new Intl.NumberFormat("fa-IR").format(params.value);
}

const CollectTable = (props) => {
    const [rowData,setRowData] = useState(props.data || []);

    const [columnDefs] = useState([
        {
            field: 'month',
            headerName: "ماه" ,
            sortable : true,
            flex : 1
        }
        ,
        {
            field: 'monthName',
            headerName: "نام ماه",
            sortable : true,
            flex : 1
        },
        {
            field: 'totalAmount',
            headerName: "مبلغ(ریال)",
            sortable : true,
            flex : 2 ,
            valueFormatter : toPersianFormat
        },
        {
            field: 'totalQuantity',
            headerName: "تعداد",
            sortable : true,
            flex : 2 ,
            valueFormatter : toPersianFormat
        },
        {
            field: 'totalPayments',
            headerName: "وصولی",
            sortable : true,
            flex : 2 ,
            valueFormatter : toPersianFormat
        }
    ])
    useEffect(() => {
        setRowData(props.data)
    },[props.data])
    return (
            <div className="ag-theme-alpine" style={{height: "100%", width: "500px",marginTop:"20px",fontFamily: "IRANSans",}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    enableRtl={true}
                    animateRows={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
    );
};

export default CollectTable;