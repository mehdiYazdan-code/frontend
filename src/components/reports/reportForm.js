import React, {useState} from 'react';
import "./ReportTable.css"
import {getReportById, removeReport, updateReport} from "../services/reportService";
import {useLoaderData, useNavigate} from "react-router-dom";
import {getCustomersDropDownList} from "../services/customerServices";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import moment from "jalali-moment";
import IconDeleteOutline from "../assets/icons/IconDeleteOutline";
import IconAddCircleLine from "../assets/icons/IconAddCircleLine";
import {NumericFormat} from "react-number-format";

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}

export async function loader({params}) {
    const customers_load = await  getCustomersDropDownList()
    const report_load = await getReportById(params.reportId);
    return  {report_load,customers_load}
}
const ReportForm = () => {
    const {report_load,customers_load} = useLoaderData()
    const [report, setReport] = useState(report_load)
    const [date,setDate] = useState(report.date);
    const [customers,setCustomers] = useState(customers_load)
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setReport((prevReport) => ({
            ...prevReport,
            [name]: value,
        }));
    };
    const handleDateChange = (d) => {
        setDate(d?.isValid ? d.toDate() : "");
    };

    const handleItemChange = (event, index) => {
        const { name, value } = event.target;
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: prevReport.reportItems.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            ),
        }));
    };

    const handleAddItem = () => {
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: [
                ...prevReport.reportItems,
                {
                    id: '',
                    customerId: '',
                    inventory_paper: '',
                    productCode: '',
                    unitPrice: '',
                    quantity: '',
                },
            ],
        }));
    };

    const handleRemoveItem = (index) => {
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: prevReport.reportItems.filter((item, i) => i !== index),
        }));
    };
    const hadleRemoveReport = async (e) => {
        e.preventDefault()
       await removeReport(report.id).then(r => navigate("/api/reports")).catch(error => console.log(error))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        report.date = new DateObject(date).format("YYYY-MM-DD");
        console.log("before format: ",report)
        const formattedValues = {
            ...report,
            reportItems: report.reportItems.map((item) => ({
                ...item,
                unitPrice: Number(item.unitPrice.toString().replace(/,/g, '')),
                quantity: Number(item.quantity.toString().replace(/,/g, '')),
            }))
        }
        console.log(formattedValues)
        await updateReport(report.id,formattedValues).then(response => {
            if (response.status === 200) navigate(-1);
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="report-form">
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
                <div style={{display:"flex",
                    marginTop:"5px",
                    border:"1px solid lightgray",
                    borderRadius : "5px",
                    height:"120px",
                    width : "100%",
                    padding : "10px"
                }}
                >
                    <div style={{margin: "0 5px"}}>
                        <label htmlFor="date">تاریج:</label>
                        <DatePicker
                            id="date"
                            name="date"
                            type="text"
                            format="YYYY/MM/DD"
                            calendar={persian}
                            locale={persian_fa}
                            value={toShamsi(report.date)}
                            onChange={handleDateChange}
                            className="custom-datepicker"
                            inputClass="custom-datepicker-input"
                            calendarClass="custom-datepicker-calendar"
                        />
                    </div>
                    <div style={{margin: "0 5px", width:"100%"}}>
                        <label htmlFor="explanation">شرح گزارش:</label>
                        <input
                            type="text"
                            id="explanation"
                            name="explanation"
                            value={report.explanation}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={handleAddItem}>
                        <IconAddCircleLine fontSize={35}/>
                    </button>
                </div>
                <div style={{marginTop : "5px"}}>
                    <table>
                        <thead>
                        <tr>
                            <th>شرکت</th>
                            <th>حواله انبار</th>
                            <th>کد کالا</th>
                            <th>قیمت واحد(ریال)</th>
                            <th>تعداد</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {report.reportItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select
                                        type="select"
                                        id={`customerId-${index}`}
                                        name="customerId"
                                        value={item.customerId}
                                        onChange={(event) => handleItemChange(event, index)}
                                        required
                                    >
                                        {customers.map(customer =>
                                            <option selected={customer.id === item.customerId} value={customer.id}>
                                                {customer.name}
                                            </option>)}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id={`inventory_paper-${index}`}
                                        name="inventory_paper"
                                        value={item.inventory_paper}
                                        onChange={(event) => handleItemChange(event, index)}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        id={`productCode-${index}`}
                                        name="productCode"
                                        value={item.productCode}
                                        onChange={(event) => handleItemChange(event, index)}
                                        required
                                    />
                                </td>
                                <td>
                                    <NumericFormat
                                        type="text"
                                        id={`unitPrice-${index}`}
                                        name="unitPrice"
                                        thousandsGroupStyle="thousand"
                                        thousandSeparator=","
                                        thousandSeparator={true}
                                        value={item.unitPrice.toString()}
                                        onChange={(event) => handleItemChange(event, index)}
                                        required
                                    />
                                </td>

                                <td>
                                    <NumericFormat
                                        type="text"
                                        id={`quantity-${index}`}
                                        name="quantity"
                                        thousandsGroupStyle="thousand"
                                        thousandSeparator=","
                                        thousandSeparator={true}
                                        value={item.quantity.toString()}
                                        onChange={(event) => handleItemChange(event, index)}
                                        required
                                    />
                                </td>
                                <td>
                                    {report.reportItems.length > 0 && (
                                        <button
                                            className="btn"
                                            onClick={() => handleRemoveItem(index)}>
                                            <IconDeleteOutline size={30}/>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
               <div className="col mt-2" style={{fontFamily:"IRANSansMedium"}}>
                   <button className="btn btn-outline-success" type="submit">ثبت</button>
                   <button className="btn btn-outline-danger" onClick={hadleRemoveReport}>حذف</button>
               </div>
            </div>
        </form>
    );
};

export default ReportForm;
