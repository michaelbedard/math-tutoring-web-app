import {useState} from "react";
import {setAuthHeader} from  '../../../services/interceptor/Interceptor'
import LoginForm from "./components/LoginForm";
import Buttons from "./components/Buttons";
import WelcomeContent from "./components/WelcomContent";
import axios from "axios";


const Login = () => {
    const [componentToShow, setComponentToShow] = useState('welcome');

    const login = () => {
        setComponentToShow('login');
    };

    const logout = () => {
        setComponentToShow('welcome');
        setAuthHeader(null);
    };

    const onLogin = (e, username, password) => {
        e.preventDefault();
        console.log(username, password)
        axios.post('/login', {
            email : username,
            password: password
        })
            .then((response) => {
                console.log("RESPONSE TOKEN : " + JSON.stringify(response.data.jwt_TOKEN))
                setAuthHeader(response.data.jwt_TOKEN);
                setComponentToShow('messages');
            })
            .catch((error) => {
                setAuthHeader(null);
                setComponentToShow('welcome');
            });
    };

    const onRegister = (event, name, username, password) => {
        event.preventDefault();
        console.log(name, username, password)
        axios.post('/register', {
            name: name,
            email: username,
            password: password
        })
            .then((response) => {
                setAuthHeader(response.data.token);
                setComponentToShow('messages');
            })
            .catch((error) => {
                setAuthHeader(null);
                setComponentToShow('welcome');
            });
    };

    return (
        <>
            <Buttons login={login} logout={logout} />

            {componentToShow === 'welcome' && <WelcomeContent />}
            {componentToShow === 'login' && <LoginForm onLogin={onLogin} onRegister={onRegister} />}
            {componentToShow === 'messages' && <h1>You are logged in</h1>}
        </>
    );
};

export default Login;