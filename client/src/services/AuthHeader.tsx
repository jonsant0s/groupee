import { AxiosRequestHeaders } from "axios";

interface User {
    accessToken?: string
}

export default function AuthHeader(): AxiosRequestHeaders {
    const user = JSON.parse(String(localStorage.getItem("user"))) as User || null;
    
    if (user && user.accessToken){
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}