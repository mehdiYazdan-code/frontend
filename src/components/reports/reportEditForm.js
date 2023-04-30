import React from 'react';
import { useLoaderData, useNavigate} from "react-router-dom";
import {getReportById, updateReport} from "../services/reportService";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";

export async function loader({params}) {
    return await getReportById(params.reportId);
}
function toShamsi(d){
    return moment(d, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
}

const ReportEditForm = () => {
    const navigate = useNavigate();
    const report = useLoaderData();
    const {register, handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            id: report.id,
            title: report.title,
            date: report.date,
            metaData: report.metaData
        }
    });
    const onSubmit = async (data) => {
        await updateReport(data.id, data);
        console.log(data);
        return navigate(-1)
    }
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{fontFamily: "IRANSans"}} className="container p-5 w-100 border rounded-4 bg-light">
                <div className="row">
                    <div className="col p-4">
                        <div className="row">
                            <label htmlFor="id" className="form-label">ردیف</label>
                            <input
                                type="number"
                                className="form-control"
                                id="id"
                                {...register("id", {})}
                                disabled
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="title" className="form-label">عنوان گزارش</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                {...register("title", {required: true, max: 100, min: 5})}
                            />
                        </div>
                        <div className="row">
                            <label htmlFor="date" className="form-label">تاریخ گزارش</label>
                            <Controller
                                id="date"
                                control={control}
                                name="date"
                                rules={{required: true}}
                                render={({
                                             field: {onChange, name, value},
                                             fieldState: {invalid, isDirty},
                                             formState: {errors},
                                         }) => (
                                    <>
                                        <DatePicker
                                            value={toShamsi(value) || ""}
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
                    </div>
                    <div className="col p-2 m-3">
                        <div className="row h-100 mb-5">
                            <label htmlFor="roleId" className="form-label">توضیحات</label>
                            <input
                                type="text"
                                className="form-control h-75"
                                id="metaData"
                                {...register("metaData", {maxLength: 200})}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-success" type="submit">ذخیره</button>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default ReportEditForm;