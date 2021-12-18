import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchUserClasses = (route: string, id: string) => {
    return axios
        .get(`${API_URL}classlist/${route}`, {
            params: {
                school_id: id,
            },
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("userClasses", JSON.stringify(response.data));
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};