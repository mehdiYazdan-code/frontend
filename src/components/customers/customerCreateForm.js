import React, {useState} from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";
import "./CustomerCreateForm.css"
import IconAddCircleLine from "../assets/icons/IconAddCircleLine";
import IconDeleteOutline from "../assets/icons/IconDeleteOutline";

const customer = {
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
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("jYYYY/jMM/jDD");
}

function CustomerCreateForm() {
    const [subtotal, setSubtotal] = useState(
        customer.payments.reduce((total, payment) => total + payment.amount, 0)
    );
    const [currentCustomer, setCurrentCustomer] = useState(customer);
    const handleAmountChange = (index, event) => {
        const newPayments = [...currentCustomer.payments];
        newPayments[index].amount = parseInt(event.target.value.replace(/,/g, ''));
        const updatedCustomer = {
            ...currentCustomer,
            payments: newPayments
        };
        setCurrentCustomer(updatedCustomer);
        setSubtotal(updatedCustomer.payments.reduce((total, payment) => total + payment.amount, 0));
    };

    const handleAddPayment = () => {
        const newPayments = [...currentCustomer.payments, {
            id: currentCustomer.payments.length,
            description: "",
            date: new Date(),
            amount: 0,
        },];
        const updatedCustomer = {
            ...currentCustomer,
            payments: newPayments
        };
        setCurrentCustomer(updatedCustomer);
        setSubtotal(updatedCustomer.payments.reduce((total, payment) => total + payment.amount, 0));
    };

    const handleRemovePayment = (index) => {
        const newPayments = [...currentCustomer.payments];
        newPayments.splice(index, 1);
        const updatedCustomer = {
            ...currentCustomer,
            payments: newPayments
        };
        setCurrentCustomer(updatedCustomer);
        setSubtotal(updatedCustomer.payments.reduce((total, payment) => total + payment.amount, 0));
    };

    const handleNameChange = (event) => {
        const updatedCustomer = {
            ...currentCustomer,
            name: event.target.value
        };
        setCurrentCustomer(updatedCustomer);
    };

    const handlePhoneChange = (event) => {
        const updatedCustomer = {
            ...currentCustomer,
            phone: event.target.value
        };
        setCurrentCustomer(updatedCustomer);
    };

    function handleDateChange(value, index) {
        const newPayments = [...currentCustomer.payments];
        newPayments[index].date = value.toDate()
        const updatedCustomer = {
            ...currentCustomer,
            payments: newPayments
        };
        setCurrentCustomer(updatedCustomer);
    }

    function handleSubmit(e) {
        e.preventDefault()
        currentCustomer.payments = currentCustomer.payments.map(item => ({
            ...item,
            date: new DateObject(item.date).format("YYYY-MM-DD")
        }))
        console.log("submit: ", currentCustomer)
    }

    function hadleRemoveCustomer() {

    }

    const handleDescriptionChange = (event, index) => {
        const newPayments = [...currentCustomer.payments];
        newPayments[index].description = event.target.value;
        const updatedCustomer = {
            ...currentCustomer,
            payments: newPayments
        };
        setCurrentCustomer(updatedCustomer);
    };


    return (
        <div className="customer-form container">
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
                <h5 style={{fontFamily: "IRANSansBold"}}>فرم ثبت مطالبات وصول شده</h5>
            </div>
           <div className="form-section">
               <form onSubmit={handleSubmit} className="form">
                   <div style={{
                       display: "flex",
                       marginTop: "5px",
                       border: "1px solid lightgray",
                       borderRadius: "5px",
                       width: "100%",
                       padding: "10px"
                   }}
                   >
                       <div className="form-header">
                           <div style={{display : "flex",alignItems:"center"}}>
                               <label style={{margin: "0 5px"}} htmlFor="name">نام:</label>
                               <input
                                   className="input-field"
                                   id="name"
                                   type="text"
                                   value={currentCustomer.name}
                                   onChange={handleNameChange}
                               />
                           </div>
                       </div>
                       <div>
                           <div style={{display : "flex",alignItems:"center"}}>
                               <label style={{margin: "0 5px"}} htmlFor="phone">تلفن:</label>
                               <input
                                   className="input-field"
                                   id="phone"
                                   type="tel"
                                   value={currentCustomer.phone}
                                   onChange={handlePhoneChange}
                               />
                           </div>
                       </div>
                   </div>
                   <div>
                       <button className="btn" onClick={handleAddPayment}>
                           <IconAddCircleLine fontSize={35}/>
                       </button>
                   </div>
                   <table className="table">
                       <thead>
                       <tr className="table-header-row">
                           <th>توضیحات</th>
                           <th>تاریخ</th>
                           <th>مبلغ</th>
                           <th>عملیات</th>
                       </tr>
                       </thead>
                       <tbody>
                       {currentCustomer.payments.map((payment, index) => (
                           <tr key={payment.id} className="table-body-row">
                               <td>
                                   <input
                                       className="input-field"
                                       type="text"
                                       value={payment.description}
                                       onChange={(event) => handleDescriptionChange(event, index)}
                                   />
                               </td>
                               <td>
                                   <DatePicker
                                       id="date"
                                       name="date"
                                       type="text"
                                       format="YYYY/MM/DD"
                                       calendar={persian}
                                       locale={persian_fa}
                                       style={{
                                           margin: "0 5px",
                                           width: "100%"
                                       }}
                                       value={toShamsi(payment.date)}
                                       onChange={(value) => handleDateChange(value, index)}
                                   />
                               </td>
                               <td>
                                   <input
                                       className="input-field"
                                       type="text"
                                       value={formatNumber(payment.amount)}
                                       onChange={(event) => handleAmountChange(index, event)}
                                   />
                               </td>
                               <td>
                                   <button className="btn" onClick={() => handleRemovePayment(index)}>
                                       <IconDeleteOutline size={30}/>
                                   </button>
                               </td>
                           </tr>
                       ))}
                       </tbody>
                       <tfoot>
                       <tr className="table-footer-row">
                           <td colSpan="2">جمع کل:</td>
                           <td>{formatNumber(subtotal)}</td>
                           <td>
                           </td>
                       </tr>
                       </tfoot>
                   </table>
                   <div className="col mt-2" style={{fontFamily: "IRANSansMedium"}}>
                       <button type="submit" className="btn btn-outline-success">ثبت</button>
                       <button className="btn btn-outline-danger" onClick={hadleRemoveCustomer}>حذف</button>
                   </div>
               </form>
           </div>
        </div>
    );
}

export default CustomerCreateForm;




