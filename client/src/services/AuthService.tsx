import axios from "axios";

const API_URL = "http://localhost:3001/";

//Uses axios for HTTP requests and local storage for user information & JWT


export const login = (username: string, password: string) => {
    return axios.post(API_URL + "authentication/login", {
        "username": username,
        "password": password
    }).then(response => {
        console.log(response.data)
        console.log(username, password)
        /*
        if(response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        */
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
