import React, {useState} from 'react';
import "./ReportTable.css"
import {createReport, removeReport} from "../services/reportService";
import {useNavigate} from "react-router-dom";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, {DateObject} from "react-multi-date-picker";
import IconAddCircleLine from "../assets/icons/IconAddCircleLine";
import IconDeleteOutline from "../assets/icons/IconDeleteOutline";
import moment from "jalali-moment";

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}

const parseNumber = (number) => {
    return parseInt(number.replace(/^0+/, '').replace(/,/g, ''));
};


const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const intialValues = {
    id: 0,
    name: "",
    phone: null,
    payments: [
        {
            id: 0,
            description: "",
            date: "2022-09-30",
            amount: 0
        }
    ]
}

const CustomerPayments = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(intialValues)
    const [formData, setFormData] = useState({
        ...customer,
        payments: customer.payments.map((item) => ({
            ...item,
            amount: formatNumber(item.amount)
        }))
    })

    const handleInputChange = (event, index) => {
        const {name, value} = event.target;
        const newItems = [...formData.payments];
        newItems[index][name] = value;
        if (name === 'unitPrice' || name === 'quantity' || name === 'amount') {
            const intValue = parseInt(value.replace(/,/g, ''));
            if (!isNaN(intValue) && intValue >= 0) {
                newItems[index][name] = formatNumber(intValue);
                const quantityValue = parseInt(newItems[index].quantity.replace(/,/g, ''));
                const unitPriceValue = parseInt(newItems[index].unitPrice.replace(/,/g, ''));
                const amountValue = parseInt(newItems[index].amount.replace(/,/g, ''));
                newItems[index].amount = quantityValue * unitPriceValue;
            }
        }
        setFormData({...formData, payments: newItems});
    };


    const handleAddItem = () => {
        const newItems = [
            ...formData.payments,
            {id: formData.payments.length + 1, customerId: 0, unitPrice: '0', quantity: '0', amount: '0'},
        ];
        setFormData({...formData, payments: newItems});
    };

    const handleRemoveItem = (index) => {
        const newItems = [...formData.payments];
        newItems.splice(index, 1);
        setFormData({...formData, reportItems: newItems});
    };

    const getTotalAmount = () => {
        return formData.payments.reduce((total, item) => total + item.amount, 0);
    };
    const hadleRemoveReport = async (e) => {
        e.preventDefault()
        await removeReport(formData.id).then(r => console.log(r)).catch(error => console.log(error))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const parsedItems = formData.payments.map((item) => {
            return {
                ...item,
                unitPrice: parseInt(item.unitPrice.replace(/,/g, '')),
                quantity: parseInt(item.quantity.replace(/,/g, '')),
                amount: parseInt(item.amount.replace(/,/g, '')),
            };
        });
        const model = {
            ...formData,
            payments: parsedItems
        }
        await createReport(model).then(response => {
            if (response.status === 200) navigate(-1)
        })
        console.log(model);
    };


    return (
        <div style={{fontFamily: "IRANSans"}} className="report-form">
            <div style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid lightgray",
                borderRadius: "5px",
                width: "100%",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#f5f6f7"
            }}>
                <h3 style={{fontFamily: "IRANSansBold"}}>شرکت پارس پرند حیان</h3>
                <h5 style={{fontFamily: "IRANSansBold"}}>گزارش روزانه تولید</h5>
            </div>
            <div style={{
                display: "flex",
                marginTop: "5px",
                border: "1px solid lightgray",
                borderRadius: "5px",
                height: "120px",
                width: "100%",
                padding: "10px"
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
                        onChange={handleInputChange}
                        className="custom-datepicker"
                        inputClass="custom-datepicker-input"
                        calendarClass="custom-datepicker-calendar"
                    />
                </div>
                <div style={{margin: "0 5px", width: "100%"}}>
                    <label htmlFor="explanation">شرح گزارش:</label>
                    <input
                        type="text"
                        id="explanation"
                        name="explanation"
                        value={report.explanation}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button className="btn" onClick={handleAddItem}>
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
                                    style={{fontFamily: "IRANSans"}}
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
                <div className="col mt-2" style={{fontFamily: "IRANSansMedium"}}>
                    <button type="submit" className="btn btn-outline-success">ثبت</button>
                    <button className="btn btn-outline-danger" onClick={hadleRemoveReport}>حذف</button>
                </div>
            </form>
        </div>
    );
};

export default CustomerPayments;
