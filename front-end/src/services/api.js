import axios from "axios";

const API = axios.create({
    baseURL: "https://localhost:7151/api", 
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"]= "application/json";
    }
    return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log(error.message);
            console.log(error.data);
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;