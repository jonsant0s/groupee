import axios from "axios";

const API_URL = "http://localhost:3001/";

// Uses axios for HTTP requests and local storage for user information & JWT

export const login = (credentials : LoginInfo) => {
    return axios
        .post(API_URL + "authentication/login", {
            username: credentials.username,
            password: credentials.password,
        })
        .then((response) => {
            console.log(response.data);
            console.log(credentials.username, credentials.password);
            /*
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            */
            return response.data;
        })
        .catch((err) => { return (err) });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = (userInfo : SignUpInfo) => {
    return axios
        .post(API_URL + "authentication/signup", {
            username: userInfo.username,
            password: userInfo.password,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return;
};
