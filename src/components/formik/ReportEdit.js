import React, {useState} from 'react';
import {Formik, Field, Form, ErrorMessage, FieldArray} from 'formik';
import ThousandSeparatorInput from "../commons/ThousandSeparatorInput";

const initialValues = {
    reportDate: '',
    totalSalesCount: '',
    totalSalesPrice: '',
    reportItems: [
        {
            id: '',
            customerId: '',
            receiptNumber: '',
            barrelType: '',
            unitPrice: '',
            quantity: '',
        }
    ]
};
const ReportEdit = () => {
    const [customers,setCustomers] = useState([
        {id:1,name:"customer1"},
        {id:2,name:"customer2"},
        {id:3,name:"customer3"},
    ]);
    return (
        <div style={{fontFamily:"IRANSans"}}>
            <div className="border border-pill rounded-4 p-3 mb-4"  style={{textAlign:"center"}}>
                <h3>شرکت پارس پرند حیان</h3>
                <h4>گزارش روزانه تولید</h4>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    console.log(values)
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >{({values,handleChange}) => (
                <Form>
                    <div className="col w-50 mt-4 border border-pill rounded-4 p-3">
                        <div className="row">
                            <label className="form-label col-4">تاریخ گزارش</label>
                            <div className="col-8">
                                <Field name="reportDate"/>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-label col-4">فروش کل(تعداد)</label>
                            <div className="col-8">
                                <Field name="totalSalesCount"/>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-label col-4">فروش کل(ریال)</label>
                            <div className="col-8">
                                <Field name="totalSalesPrice"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FieldArray name="reportItems">
                            {({remove, push}) => (
                                <div className="mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => push({
                                            customerId: '',
                                            receiptNumber: '',
                                            barrelType: '',
                                            unitPrice: '',
                                            quantity: '',
                                        })}
                                    >
                                        افزودن آیتم جدید
                                    </button>
                                    <div className="row border border-pill rounded-4">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <td scope="col">مشتری</td>
                                                <td scope="col">شماره حواله انبار</td>
                                                <td scope="col">کد محصول</td>
                                                <td scope="col">قیمت واحد(ریال)</td>
                                                <td scope="col">تعداد</td>
                                                <td scope="col">عملیات</td>
                                            </tr>
                                            </thead>
                                            {values.reportItems.length > 0 &&
                                                values.reportItems.map((props,index) => (
                                                    <tbody>
                                                    <tr>
                                                        <td className="col">
                                                            <div>
                                                                <Field
                                                                    name={`reportItems.${index}.customerId`}
                                                                    as = "select"
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="">انتخاب مشتری</option>
                                                                    {customers.map(customer =>
                                                                        <option
                                                                            value={customer.id}
                                                                        >
                                                                            {customer.name}
                                                                        </option>
                                                                    )}
                                                                </Field>
                                                                <ErrorMessage
                                                                    name={`reportItems.${index}.customerId`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="col">
                                                            <div>
                                                                <Field
                                                                    name={`reportItems.${index}.receiptNumber`}
                                                                    type="text"
                                                                />
                                                                <ErrorMessage
                                                                    name={`reportItems.${index}.receiptNumber`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="col">
                                                            <div>
                                                                <Field
                                                                    name={`reportItems.${index}.barrelType`}
                                                                    type="text"
                                                                />
                                                                <ErrorMessage
                                                                    name={`reportItems.${index}.barrelType`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="col">
                                                            <div>
                                                                <span>{`reportItems[${index}].unitPrice`}</span>
                                                                <Field
                                                                    name={`reportItems.${index}.unitPrice`}
                                                                    component={ThousandSeparatorInput}
                                                                    onChange={handleChange}
                                                                    value={props.unitPrice}
                                                                />
                                                                <ErrorMessage
                                                                    name={`reportItems.${index}.unitPrice`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="col">
                                                            <div>
                                                                <Field
                                                                    name={`reportItems.${index}.quantity`}
                                                                    type="text"
                                                                />
                                                                <ErrorMessage
                                                                    name={`reportItems.${index}.quantity`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => remove(index)}
                                                            >حذف</button>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                ))}
                                        </table>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                    <button className="btn btn-success" type="submit">ثبت</button>
                </Form>
            )}
            </Formik>

        </div>
    );
};

export default ReportEdit;