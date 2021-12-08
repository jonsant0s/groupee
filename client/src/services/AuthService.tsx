import axios from "axios";

const API_URL = "https://localhost:3001/";

//Uses axios for HTTP requests and local storage for user information & JWT

export const login = (email: string, password: string) => {
    return axios.post(API_URL + "users", {
        email,
        password
    })
    .then(response => {
        console.log(email, password)
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = (email: string, password: string) => {
    return axios.post(API_URL + "signup", {
        email,
        password
    });
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};
