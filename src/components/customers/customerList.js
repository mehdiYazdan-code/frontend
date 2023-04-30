import React from 'react';
import {Link, useLoaderData} from "react-router-dom";
import {AgGridReact} from "ag-grid-react";
import {getAllcustomers} from "../services/customerServices";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import IconEdit from "../assets/icons/IconEdit";
import IconAddCircleLine from "../assets/icons/IconAddCircleLine"; // Optional theme CSS

export async function loader(){
    return await getAllcustomers();
}

const CustomerList = () => {
    const customers = useLoaderData();
    const columns = [
        { field: "id", headerName: "شماره", sortable: true, filter: true,flex:1 },
        { field: "name", headerName: "نام", sortable: true, filter: "agTextColumnFilter" ,floatingFilter: true, flex:4 },
        { field: "phone", headerName: "تلفن", sortable: true, filter: "agTextColumnFilter" ,floatingFilter: true,flex:2 },
        {
            field: "details",
            headerName: "",
            cellRendererFramework: (params) => (
                <Link to={`${params.data.id}`}><IconEdit color={"green"} fontSize={"1rem"}/></Link>
            ),
            flex:1
        },
    ];
    const tableLocaleText = {
        // set the table locale text for Persian
        page: "صفحه",
        to: "تا",
        of: "از",
        next: "بعدی",
        last: "آخرین",
        first: "اولین",
        previous: "قبلی",
        loadingOoo: "در حال بارگذاری..."
    };
    const tableOptions = {
        // set the table options
        defaultColDef: { resizable: true },
        pagination: true,
        paginationPageSize: 5,
        fontSize:"1.2rem",
        localeText: tableLocaleText
    };

    return (
        <div style={{display:"flex",flexDirection:"column",marginTop:"10px"}}>
            <div style={{display:"flex",
                flexDirection: "column",
                border:"1px solid lightgray",
                borderRadius : "5px",
                width : "100%",
                padding : "10px",
                textAlign:"center",
                backgroundColor : "#f5f6f7"
            }}>
                <h3 style={{fontFamily:"IRANSansBold"}}>شرکت پارس پرند حیان</h3>
                <h5 style={{fontFamily:"IRANSansBold"}}>لیست مشتریان</h5>
            </div>
            <div>
                <Link className="btn" to="create" style={{display:"flex",width:"80px"}}>
                    <IconAddCircleLine fontSize={35}/>
                </Link>
            </div>
            <div
                className="ag-theme-alpine"
                style={{
                    height: "500px",
                    width: "100%",
                    marginTop: "5px",
                    fontFamily: "IRANSans",
                }}
            >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    {...tableOptions}
                    enableRtl={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </div>
    );
};

export default CustomerList;