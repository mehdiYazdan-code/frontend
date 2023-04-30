import React, {useEffect, useState} from "react";
import {createcustomer, getCustomerById, removeCustomer, updatecustomer} from "../services/customerServices";
import {useLoaderData, useNavigate} from "react-router-dom";
import "./CustomerForm.css"
import  {DateObject} from "react-multi-date-picker";
import moment from "jalali-moment";
import PersianDatePickerInput from "../commons/PersianDatePickerInput";
import * as Yup from "yup";
import {Field, FieldArray, Form, Formik, useField} from "formik";
import CurrencyInput from "../commons/CurrencyInput";


export async function loader({params}) {
    return await getCustomerById(params.customerId);
}
function toShamsi(date) {
    return moment(date, "YYYY-MM-DD").locale("fa").format("YYYY/MM/DD");
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phone: Yup.string().required('Required').matches(/^[0-9]+$/, 'Must be a number'),
    payments: Yup.array()
        .of(
            Yup.object().shape({
                description: Yup.string().required('Required'),
                amount: Yup.number().required('Required').positive('Must be positive')
            })
        )
        .required('Must have at least one payment')
});

const initialValues = {
    id: 0,
    name: '',
    phone: '',
    payments: [{id: 0, description: '', date: new Date(), amount: 0}]
};

const CustomerForm = ({onDelete}) => {
    const navigate = useNavigate()
    const customer = useLoaderData();
    const handleSubmit = async (values) => {
        const formattedValues = {
            ...values,
            payments: values.payments.map((payment) => ({
                ...payment,
                date: new DateObject(payment.date).format("YYYY-MM-DD"),
                amount: Number(payment.amount.replace(/,/g, '')),
            })),
        };
        await updatecustomer(customer.id,formattedValues).then(response => {
            console.log("update response: ",response)
            if (response.status === 200) navigate(-1)
        })
        console.log(formattedValues);
    };

   async function handleDelete() {
        await removeCustomer(customer.id).then(response => {
            console.log("delete response: ",response)
            if (response.status === 204) navigate(-1)
        })
    }

    return (
        <div className="report-table" style={{display: "flex", flexDirection: "column", margin: "5% 10%"}}>
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
                <h5 style={{fontFamily: "IRANSansBold"}}>فرم ثبت پرداخت های مشتری</h5>
            </div>
            <Formik
                initialValues={customer}
                onSubmit={handleSubmit}
            >
                {({values, errors, touched}) => (
                    <Form style={{borderCollapse: "collapse"}}>
                        <div style={{display: "flex"}}>
                            <div style={{marginRight: "10px"}}>
                                <Field name="name" label="نام شرکت" type="text" as={CustomInput}/>
                            </div>
                            <div>
                                <Field name="phone" label="شماره تماس" as={CustomInput}/>
                            </div>
                        </div>
                        <FieldArray name="payments">
                            {({push, remove}) => (
                                <div>
                                    <button type="button"
                                            onClick={() => push({id: 0, description: '', date: '', amount: ''})}>
                                        Add Payment
                                    </button>
                                    <table style={{width: "100%", borderCollapse: "collapse"}}>
                                        <tr>
                                            <th style={{textAlign: "right", fontFamily: "IRANSansBold"}}>شرح</th>
                                            <th style={{textAlign: "right", fontFamily: "IRANSansBold"}}>تاریخ</th>
                                            <th style={{textAlign: "right", fontFamily: "IRANSansBold"}}>مبلغ (ریال)
                                            </th>
                                            <th style={{textAlign: "right", fontFamily: "IRANSansBold"}}></th>
                                        </tr>
                                        <tbody>
                                        {values.payments.map((payment, index) => (
                                            <tr key={index}>
                                                <td style={{margin:0,padding:0}}>
                                                    <Field name={`payments[${index}].description`} as={CustomInput} />
                                                </td>
                                                <td style={{margin:0,padding:0}}>
                                                    <Field name={`payments[${index}].date`}
                                                           as={PersianDatePickerInput}/>
                                                </td>
                                                <td style={{margin:0,padding:0}}>
                                                    <Field name={`payments[${index}].amount`} as={CurrencyInput}/>
                                                </td>
                                                <td style={{margin:0,padding:0}}>
                                                    {index > 0 && (
                                                        <button className="btn" type="button" onClick={() => remove(index)}>
                                                            Remove Payment
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </FieldArray>

                        <button style={{
                            padding: "10px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontFamily: "IRANSansBold",
                            cursor: "pointer",
                            marginTop: "10"
                        }}
                                type="submit">ثبت
                        </button>
                        <button
                            onClick={handleDelete}
                            style={{
                                padding: "10px",
                                backgroundColor: "#ee294b",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                fontFamily: "IRANSansBold",
                                cursor: "pointer",
                                marginTop: "10"
                            }}>
                            حذف
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
const CustomInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div style={{margin: 0, padding: 0, width: "100%", height: "100%"}}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} style={{
                padding: '10px',
                borderRadius: '5px',
                border: "none",
                fontSize: '1rem',
                width: '200px',
                transition: "border-color 0.2s ease-in-out"
            }}/>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    );
}

export default CustomerForm
