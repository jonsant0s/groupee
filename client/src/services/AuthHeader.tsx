import { AxiosRequestHeaders } from "axios";

interface User {
    accessToken?: string;
}

export const AuthHeader = () : AxiosRequestHeaders => {
    const user: User = JSON.parse(JSON.stringify(localStorage.getItem("user"))) || null;

    if (user && user.accessToken) {
        return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}
