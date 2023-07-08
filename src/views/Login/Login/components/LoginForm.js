import React, { useState } from 'react';

const LoginForm = ({ onLogin, onRegister }) => {
    const [active, setActive] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "name") setName(value);
        else if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        onLogin(e, email, password);
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        onRegister(e, name, email, password);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            id="tab-login"
                            onClick={() => setActive("login")}
                        >
                            Login
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            id="tab-register"
                            onClick={() => setActive("register")}
                        >
                            Register
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="pills-login">
                        <form onSubmit={onSubmitLogin}>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="loginEmail"
                                    name="email"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                />
                                <label className="form-label" htmlFor="loginEmail">
                                    Username
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    id="loginPassword"
                                    name="password"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                />
                                <label className="form-label" htmlFor="loginPassword">
                                    Password
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                Sign in
                            </button>
                        </form>
                    </div>
                    <div>
                        <form onSubmit={onSubmitRegister}>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                />
                                <label className="form-label" htmlFor="name">
                                    First name
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="registerEmail"
                                    name="email"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                />
                                <label className="form-label" htmlFor="registerEmail">
                                    Username
                                </label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    id="registerPassword"
                                    name="password"
                                    className="form-control"
                                    onChange={onChangeHandler}
                                />
                                <label className="form-label" htmlFor="registerPassword">
                                    Password
                                </label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-3">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;