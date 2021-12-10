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

export const register = (first_name: string, last_name: string, username: string, password: string) => {
    return axios.post(API_URL + "authentication/signup", {
        "username": username,
        "password": password,
        "first_name": first_name,
        "last_name": last_name
    }).then(response => {
        console.log(response.data)

        return response.data;
    });
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};
