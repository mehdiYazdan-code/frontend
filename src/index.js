import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PersonList, {loader as personListLoader} from "./components/routes/personList";
import PersonForm, {loader as personLoader} from "./components/routes/personForm";
import PersonEditForm, {
    loader as personEditLoader,
    action as personEditAction
} from "./components/routes/personEditForm";
import "bootstrap/dist/css/bootstrap.css"
import {destroy} from "./components/routes/destroy";
import PersonCreateForm, {action as personCreateAction} from "./components/routes/personCreateForm";
import ReportForm, {loader as reportFormLoader} from "./components/reports/reportForm";
import ReportEditForm, {loader as reportEditFormLoader} from "./components/reports/reportEditForm";
import CustomerList,{loader as customerListLoader} from "./components/customers/customerList";
import CustomerForm,{loader as customerFormLoader} from "./components/customers/customerForm";
import CustomerCreateForm from "./components/customers/customerCreateForm";
import ReportCreateForm, {loader as reportCreateFormLoader} from "./components/reports/reportCreateForm";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/dashboard";
import Colors from "./components/colors/Colors";
import ReportEdit from "./components/formik/ReportEdit";
import ReportTable from "./components/reports/ReportTable";
import ReportFormWithFormat,{loader as ReportFormWithFormatLoader} from "./components/reports/ReportFormWithFormat";


const router = createBrowserRouter(
    createRoutesFromElements([
        <Route
            path="/"
            index
            element={<Login/>}
        />,
        <Route
            path="login/"
            element={<Login/>}
        />,
        <Route path="api" element={<App/>}>
            <Route
                path="dashboard"
                index
                element={<Dashboard/>}
            />
            <Route
                path="users"
                element={<PersonList/>}
                loader={personListLoader}
            />
            <Route
                path="users/:personId"
                element={<PersonForm/>}
                loader={personLoader}
            />
            <Route
                path="users/create"
                element={<PersonCreateForm/>}
                action={personCreateAction}
            />
            <Route
                path="users/:personId/edit"
                element={<PersonEditForm/>}
                loader={personEditLoader}
                action={personEditAction}
            />

            <Route
                path="users/:personId/destroy"
                action={destroy}
            />
                <Route
                    path="reports"
                    element={<ReportTable/>}

                />
            <Route
                path="reports/:reportId"
                element={<ReportFormWithFormat/>}
                loader={ReportFormWithFormatLoader}
            />
            <Route
                path="reports/create"
                element={<ReportCreateForm/>}
                loader={reportCreateFormLoader}
            />
            <Route
                path="reports/:reportId/edit"
                element={<ReportEditForm/>}
                loader={reportEditFormLoader}
            />
            <Route
                path="/api/customers"
                element={<CustomerList/>}
                loader={customerListLoader}
            />
            <Route
                path="customers/create"
                element={<CustomerCreateForm/>}
            />
            <Route
                path="customers/:customerId"
                element={<CustomerForm/>}
                loader={customerFormLoader}
            />
            <Route
                path="colors"
                element={<Colors/>}
            />
            <Route
                path="friends"
                element={<ReportEdit/>}
            />
        </Route>
    ])
)
const Context = createContext(null);
const user = {};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={user}>
            <RouterProvider router={router}>
                <App/>
            </RouterProvider>
        </Context.Provider>
    </React.StrictMode>
);
