import "./LoginPopUp.css"
import React, {useState} from "react";
import {axiosLogin, axiosSignUp} from "../../services/UserRelated";

type LoginPopUpProps = {
    handleClose: () => void
}

const LoginPopUp = ({handleClose} : LoginPopUpProps) => {
    const [option, setOption] = useState<"LOGIN" | "SIGNUP">("LOGIN")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(email, password)
        if (option === "LOGIN"){
            axiosLogin(email, password)
        } else {
            axiosSignUp(email, password)
        }
    }


    return (
        <div className={"login-pop-up__overlay"}>
            <div className={"login-pop-up__container"}>
                <div className={"login-pop-up__container--close-btn"} onClick={handleClose}>
                    x
                </div>
                <div className={"login-pop-up__container-content"}>
                    <div className={"login-pop-up__container-content grid"}>
                        <div style={{backgroundColor: option === "LOGIN" ? "blue": "white"}} onClick={()=>setOption("LOGIN")}>
                            LOGIN
                        </div>
                        <div style={{backgroundColor: option === "SIGNUP" ? "blue": "white"}} onClick={()=>setOption("SIGNUP")}>
                            SIGN UP
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor={"email"}>email : </label>
                            <input type={"email"} onChange={handleEmail} id={"email"} value={email} placeholder={"ex: example@gmail.com"}/>
                        </div>
                        <div>
                            <label htmlFor={"password"}>password : </label>
                            <input type={"password"} onChange={handlePassword} id={"password"} value={password} placeholder={"ex: 123"}/>
                        </div>
                        <button type={"submit"}>submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPopUp