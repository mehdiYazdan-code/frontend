import React, { useState } from 'react';
import "./ReportFormWithFormat.css"
import {useLoaderData, useNavigate} from "react-router-dom";
import {getCustomersDropDownList} from "../services/customerServices";
import {getReportById, removeReport, updateReport} from "../services/reportService";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";
import IconDeleteOutline from "../assets/icons/IconDeleteOutline";
import IconAddCircleLine from "../assets/icons/IconAddCircleLine";

export async function loader({params}) {
    const customers_load = await  getCustomersDropDownList()
    const report_load = await getReportById(params.reportId);
    console.log("report_load: ",report_load)
    return  {report_load,customers_load}
}
function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}
const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function ReportFormWithFormat() {
    const navigate = useNavigate();
    const {report_load,customers_load} = useLoaderData()
    const [customers,setCustomers] = useState(customers_load)
    const [report, setReport] = useState({
        ...report_load,
        date : new DateObject(report_load.date).toDate(),
        reportItems: report_load.reportItems.map((item) => ({
            ...item,
            unitPrice : formatNumber(item.unitPrice),
            quantity : formatNumber(item.quantity),
            amount: item.unitPrice * item.quantity,
        }))
    })
    const [date,setDate] = useState(report.date);
    // const [items, setItems] = useState([
    //     { id: 1, name: 'Item 1', unitPrice: '1,000', quantity: '2', amount: 2000 },
    //     { id: 2, name: 'Item 2', unitPrice: '15,000', quantity: '3', amount: 45000 },
    // ]);

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        if (name === "explanation"){
            setReport({...report, "explanation" : value })
        }
        const newItems = [...report.reportItems];
        newItems[index][name] = value;
        if (name === 'unitPrice' || name === 'quantity') {
            const intValue = parseInt(value.replace(/,/g, ''));
            if (!isNaN(intValue) && intValue >= 0) {
                newItems[index][name] = formatNumber(intValue);
                const quantityValue = parseInt(newItems[index].quantity.replace(/,/g, ''));
                const unitPriceValue = parseInt(newItems[index].unitPrice.replace(/,/g, ''));
                newItems[index].amount = quantityValue * unitPriceValue;
            }
        }
        setReport({...report,reportItems: newItems});
    };


    const handleAddItem = () => {
        const newItems = [
            ...report.reportItems,
            { id: report.reportItems.length + 1, customerId: 0, unitPrice: '0', quantity: '0', amount: 0 },
        ];
        setReport({...report,reportItems: newItems});
    };

    const handleRemoveItem = (index) => {
        const newItems = [...report.reportItems];
        newItems.splice(index, 1);
        setReport({...report,reportItems: newItems});
    };

    const getTotalAmount = () => {
        return report.reportItems.reduce((total, item) => total + item.amount, 0);
    };
    const handleDateChange = (d) => {
        setDate(d?.isValid ? d.toDate() : "");
    };
    const hadleRemoveReport = async (e) => {
        e.preventDefault()
        await removeReport(report.id).then(r => console.log(r)).catch(error => console.log(error))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedItems = report.reportItems.map((item) => {
            const parsedItem = {
                ...item,
                unitPrice : parseInt(item.unitPrice.replace(/,/g, '')),
                quantity : parseInt(item.quantity.replace(/,/g, ''))
            };
            return parsedItem;
        });
        const formData = {
            ...report,
            date : new DateObject(date).format("YYYY-MM-DD"),
            reportItems : parsedItems
        }
        await updateReport(report.id,formData).then(response => {
            if (response.status === 200) navigate(-1)
        })
        console.log(formData);
    };


    return (
        <div style={{fontFamily:"IRANSans"}} className="report-form">
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
                            onChange={(event) => handleInputChange(event,"index")}
                        />
                    </div>
                </div>
            <button className="btn"  onClick={handleAddItem}>
                <IconAddCircleLine fontSize={35}/>
            </button>
           <form onSubmit={handleSubmit}>
               <table>
                   <thead>
                   <tr>
                       <th>شرکت</th>
                       <th>حواله انبار</th>
                       <th>کد کالا</th>
                       <th>قیمت واحد(ریال)</th>
                       <th>تعداد</th>
                       <th>مبلغ(ریال)</th>
                       <th>عملیات</th>
                   </tr>
                   </thead>
                   <tbody>
                   {report.reportItems.map((item, index) => (
                       <tr key={item.id}>
                           <td>
                               <select
                                   type="select"
                                   id={`customerId-${index}`}
                                   name="customerId"
                                   value={item.customerId}
                                   onChange={(event) => handleInputChange(event, index)}
                                   required
                               >
                                   {customers.map(customer => <option value={customer.id}>{customer.name}</option>)}
                               </select>
                           </td>
                           <td>
                               <input
                                   type="text"
                                   id={`inventory_paper-${index}`}
                                   name="inventory_paper"
                                   value={item.inventory_paper}
                                   onChange={(event) => handleInputChange(event, index)}
                                   required
                               />
                           </td>
                           <td>
                               <input
                                   type="text"
                                   id={`productCode-${index}`}
                                   name="productCode"
                                   value={item.productCode}
                                   onChange={(event) => handleInputChange(event, index)}
                                   required
                               />
                           </td>
                           <td>
                               <input
                                   style={{fontFamily:"IRANSans"}}
                                   type="text"
                                   name="unitPrice"
                                   value={item.unitPrice}
                                   onChange={(event) => handleInputChange(event, index)}
                                   pattern="[0-9,]*"
                               />
                           </td>
                           <td>
                               <input
                                   type="text"
                                   name="quantity"
                                   value={item.quantity}
                                   onChange={(event) => handleInputChange(event, index)}
                                   pattern="[0-9,]*"
                               />
                           </td>
                           <td>{formatNumber(parseInt(item.unitPrice.replace(/,/g, '')) * parseInt(item.quantity.replace(/,/g, '')))}</td>
                           <td>
                               <button className="btn" onClick={() => handleRemoveItem(index)}>
                                   <IconDeleteOutline size={30}/>
                               </button>
                           </td>
                       </tr>
                   ))}
                   </tbody>
                   <tfoot>
                   <tr>
                       <td colSpan={5}>جمع کل(ریال)</td>
                       <td colSpan={2}>{formatNumber(getTotalAmount())}</td>
                   </tr>
                   </tfoot>
               </table>
              <div className="col mt-2" style={{fontFamily:"IRANSansMedium"}}>
                  <button type="submit" className="btn btn-outline-success">ثبت</button>
                  <button className="btn btn-outline-danger" onClick={hadleRemoveReport}>حذف</button>
              </div>
           </form>
        </div>
    );
}

export default ReportFormWithFormat;
