import axios from "axios";
import {setAuthHeader} from "./interceptor/Interceptor";


export function axiosLogin(email: string, password: string) {
    console.log("START LOGIN")
    axios.post('/login', {
        email : email,
        password: password
    })
        .then((response) => {
            console.log("RESPONSE TOKEN : " + JSON.stringify(response.data.jwt_TOKEN))
            setAuthHeader(response.data.jwt_TOKEN);
        })
        .catch((error) => {
            console.log(error)
            setAuthHeader(null);
        });
}

export function axiosSignUp(email: string, password: string) {
    axios.post('/register', {
        email : email,
        password: password
    })
        .then((response) => {
            console.log("RESPONSE TOKEN : " + JSON.stringify(response.data.jwt_TOKEN))
            setAuthHeader(response.data.jwt_TOKEN);
        })
        .catch((error) => {
            setAuthHeader(null);
        });
}