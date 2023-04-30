import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../formik/ReportTable.css"
import moment from "jalali-moment";
import {Link} from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import IconAddCircleLine from "../assets/icons/IconAddCircleLine";
import {getCurrentMonth} from "../utils/calendar";


function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}

function toPersianFormat(number) {
    return new Intl.NumberFormat("fa-IR").format(number);
}
const { firstDayGregorian, lastDayGregorian } = getCurrentMonth();
console.log("firstDayGregorian: ",firstDayGregorian)
console.log("lastDayGregorian: ",lastDayGregorian)

const ReportTable = () => {
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState(firstDayGregorian);
    const [endDate, setEndDate] = useState(lastDayGregorian);

    const getReports = async () => {
        const from = new DateObject(startDate).format("YYYY-MM-DD");
        const to =  new DateObject(endDate).format("YYYY-MM-DD");
        console.log("from ",from)
        console.log("to",to)
        const res = await axios.get(`http://localhost:8083/api/reports/?pageNo=${currentPage}&pageSize=${rowsPerPage}&startDate=${from}&endDate=${to}`);
        setReports(res.data.reports);
        setTotalPages(res.data.totalPages);
    };
    useEffect(() => {
        getReports();
    }, [currentPage, rowsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(e.target.value);
        setCurrentPage(0);
    };
//moment(d).format("YYYY-MM-DD")

    const handleStartDateChange = (d) => {
        setStartDate(d?.isValid ? d.toDate() : "");
    };

    const handleEndDateChange = (d) => {
        setEndDate(d?.isValid ? d.toDate() : "");
    };
    return (
        <div style={{fontFamily:"IRANSans",textAlign:"center",marginTop:"10px"}}>
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
                <h5 style={{fontFamily:"IRANSansBold"}}>گزارش روزانه تولید</h5>
            </div>
            <div style={{
                display:"flex",
                border:"1px solid lightgray",
                borderRadius : "5px",
                marginTop:"5px",
                height:"80px",
                width : "100%",
                padding : "10px"}}>
                <div className="search-form" style={{width: "100%", marginTop:"5px"}}>
                    <label htmlFor="startDate">از تاریخ: </label>
                    <DatePicker
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="custom-datepicker"
                        inputClass="custom-datepicker-input"
                        calendarClass="custom-datepicker-calendar"
                    />
                    <label htmlFor="endDate">تا تاریخ: </label>
                    <DatePicker
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="custom-datepicker"
                        inputClass="custom-datepicker-input"
                        calendarClass="custom-datepicker-calendar"
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => { setCurrentPage(0); }}>جستجو</button>
                </div>
            </div>
            <div>
                <Link className="btn" to="create" style={{display:"flex",width:"80px"}}>
                    <IconAddCircleLine fontSize={35}/>
                </Link>
            </div>
            <div className="report-table">
                <table>
                    <thead>
                    <tr style={{cursor:"pointer"}}>
                        <th>تاریخ</th>
                        <th>تعداد کل</th>
                        <th>مجموع مبلغ</th>
                        <th style={{ width: '10%', padding: '0.5rem' }}>جزئیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((report,index) => (
                        <tr key={report.id}>
                            <td>{toShamsi(report.date)}</td>
                            <td>{toPersianFormat(report.totalCount)}</td>
                            <td>{toPersianFormat(report.totalAmount)}</td>
                            <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                                <Link to={`${report.id}`} style={{ display: 'block' }}>
                                    <FaEdit size={20} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="report-controls">
                <span>نمایش</span>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                    <option value="5">5 سطر</option>
                    <option value="10">10 سطر</option>
                    <option value="20">20 سطر</option>
                </select>
                <span>در هر صفحه</span>
            </div>
            <div className="pagination-controls">
                <button onClick={() => handlePageChange(0)} disabled={currentPage === 0}><FaAngleDoubleRight /></button>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}><FaAngleRight /></button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}><FaAngleLeft /></button>
                <button onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}><FaAngleDoubleLeft /></button>
            </div>
        </div>
    );
};

export default ReportTable;
