import React from 'react';
import {getPersonById} from "../services/personServices";
import {Form, useLoaderData} from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export async function loader({params}){
    return  await getPersonById(params.personId);
}
const PersonForm = () => {
    const person = useLoaderData();
    return (
        <div style={{fontFamily : "IRANSans"}} className="container p-5 w-50 border rounded-4 bg-light">
            <div className="form-label">
                <h2>مشاهده جزئیات</h2>
            </div>
            <div className="row">
                <label htmlFor="id" className="form-label">ردیف</label>
                <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    defaultValue={person.id}
                    disabled
                />
            </div>
            <div className="row">
                <label htmlFor="firstName" className="form-label">نام</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    defaultValue={person.firstName}
                    disabled
                />
            </div>
            <div className="row">
                <label htmlFor="lastName" className="form-label">نام خانوادگی</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    defaultValue={person.lastName}
                    disabled
                />
            </div>
            <div className="row">
                <label htmlFor="roleId" className="form-label">سطح دسترسی</label>
                <input
                    type="text"
                    className="form-control"
                    id="roleId"
                    name="roleId"
                    defaultValue={person.role.title}
                    disabled
                />
            </div>
            <div className="row">
                <label htmlFor="age" className="form-label">تاریخ تولد</label>
                <div className="form-control">
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        style={{border:"none"}}
                        value={person.dob}
                        disabled
                    />
                </div>
            </div>
            <div className="row w-50">
                    <span className="w-25 m-3">
                        <Form action="edit">
                        <button type="submit" className="btn btn-success rounded-pill ">ویرایش</button>
                    </Form>
                    </span>
                    <span className="w-25 m-3">
                        <Form method="post" action="destroy" onSubmit={(event) => {
                            // eslint-disable-next-line no-restricted-globals
                            if (!confirm("Please confirm you want to delete this record.")) {
                                event.preventDefault();
                            }
                        }}>
                            <button type="submit" className="btn btn-danger rounded-pill">حذف</button>
                        </Form>
                    </span>
            </div>
        </div>
    );
};

export default PersonForm;