import React from 'react';
import {getAll, createUser} from "../services/personServices";
import {Link, redirect, useLoaderData} from "react-router-dom";
import moment from "jalali-moment";


export async function loader() {
    return await getAll();
}
function toShamsi(d){
    return moment(d, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
}
const PersonList = () => {
    const persons = useLoaderData();
    return (
        <div style={{fontFamily: "IRANSans"}} className="container">
            <div className="container">
                <div className="row w-25 m-3">
                    <Link to="create">
                        <button className="btn btn-primary w-25 rounded-pill">جدید</button>
                    </Link>
                </div>

                <table style={{fontFamily: "IRANSans"}} className="table table-bordered w-50">
                    <thead>
                    <tr>
                        <th scope="col">ردیف</th>
                        <th scope="col">نام</th>
                        <th scope="col">نام خانوادگی</th>
                        <th scope="col">سطح دسترسی</th>
                        <th scope="col">تاریخ تولد</th>
                        <th scope="col">عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        persons.map(person =>
                            <tr key={person.id}>
                                <th scope="row">{person.id}</th>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.role.title}</td>
                                <td>{toShamsi(person.dob)}</td>
                                <td>
                                    <Link to={`${person.id}`}>
                                        <button className="btn btn-secondary btn-sm rounded-pill">جزئیات</button>
                                    </Link>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonList;