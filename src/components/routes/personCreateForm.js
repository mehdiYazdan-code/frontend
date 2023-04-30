import React from 'react';
import {Form, redirect, useNavigate} from "react-router-dom";
import {createUser} from "../services/personServices";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Controller, useForm} from "react-hook-form";

export async function action({request}) {
    const formData = await request.formData();
    const obj = Object.fromEntries(formData);
    console.log(obj)
    const persist =  await createUser(obj)
    return  redirect(`/persons/${persist.id}/edit`)
}

const PersonCreateForm = () => {
    const naviggte = useNavigate();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues : {
            firstName : "",
            lastName : "",
            roleId : 3,
            dob : new Date()
        }
    });
    const onSubmit = async (data) => {
        await createUser(data)
        console.log(data);
        naviggte(-1)
    }
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{fontFamily : "IRANSans"}} className="container p-5 w-50 border rounded-4 bg-light">
                <div className="form-label">
                    <h2>ایجاد کاربر جدید</h2>
                </div>
                <div className="row">
                    <label htmlFor="firstName" className="form-label">نام</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        {...register("firstName", {required: true})}
                    />
                </div>
                <div className="row">
                    <label htmlFor="lastName" className="form-label">نام خانوادگی</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        {...register("lastName", {required: true})}
                    />
                </div>
                <div className="row">
                    <label htmlFor="role" className="form-label">سطح دسترسی</label>
                    <select className="form-select" {...register("role", { required: true })}>
                        <option value="ADMIN">ADMIN</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="USER">USER</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="lastName" className="form-label">تاریخ گزارش</label>
                    <Controller
                        control={control}
                        name="dob"
                        rules={{ required: true }}
                        render={({
                                     field: { onChange, name, value },
                                     fieldState: { invalid, isDirty }, //optional
                                     formState: { errors }, //optional, but necessary if you want to show an error message
                                 }) => (
                            <>
                                <DatePicker
                                    value={value || ""}
                                    onChange={(date) => {
                                        onChange(date?.isValid ? date.toDate() : "");
                                    }}
                                    format="YYYY/MM/DD"
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    style={{
                                        width: "100%",
                                        boxSizing: "border-box",
                                        height: "40px"
                                    }}
                                    containerStyle={{
                                        width: "100%",
                                        height: "100%",
                                        padding : 0
                                    }}
                                />
                                {errors && errors[name] && errors[name].type === "required" && (
                                    <span>خطا رخ داد</span>
                                )}
                            </>
                        )}
                    />
                </div>
                <div className="row w-50">
                    <span className="w-25 m-3">
                        <button type="submit" className="btn btn-primary rounded-pill ">ایجاد</button>
                    </span>
                </div>
            </div>
        </form>
    );
};

export default PersonCreateForm;