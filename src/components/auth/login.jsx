import React, {useState} from 'react';
import "./login.css"
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1",
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "نام کاربری اشتباه است",
        pass: "کلمه عبور اشتباه است"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        const {uname, pass} = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                setIsSubmitted(true);
                navigate("api/dashboard")
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>نام کاربری </label>
                    <input className="login-form-input" type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>کلمه عبور </label>
                    <input className="login-form-input" type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <button className="login-form-button" type="submit">ورود</button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">ورود به نرم افزار</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
};

export default Login;