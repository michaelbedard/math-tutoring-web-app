import axios from 'axios'

export const getAuthToken = () => {
    return window.sessionStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    window.sessionStorage.setItem('auth_token', token);
};

axios.defaults.baseURL='http://localhost:8080/api'
axios.defaults.headers.post["Content-Type"] = 'application/json'

axios.interceptors.request.use((config) => {
    const authToken = getAuthToken();
    if (authToken !== null && authToken !== 'null') {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});