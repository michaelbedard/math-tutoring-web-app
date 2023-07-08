import "./Header.css"
import {useState} from "react";
import LoginPopUp from "../LoginPopUp/LoginPopUp";


const Header = () => {
    const [showLogin, setShowLogin] = useState(false)

    function handleOpen() {
        setShowLogin(true)
    }

    function handleClose() {
        setShowLogin(false)
    }

    return (
        <div>
            <div className={"header__container"}>
                <a className={"header__item btn btn-about"} href={"/AboutUs"} >About Us</a>
                <a className={"header__item"} href={"/"} >
                    <img
                        src="/path/to/logo-image.png"
                        alt="Math World Logo"
                    />
                </a>
                <a className={"header__item btn btn-login"} onClick={handleOpen} >Login</a>
            </div>
            {showLogin && <LoginPopUp handleClose={handleClose}/>}
        </div>
    )
}

export default Header