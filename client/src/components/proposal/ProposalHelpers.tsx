import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchUserGroups = (id: number) => {
    return axios
        .get(`${API_URL}groups/getGroups`, {
            params: {
                student_id: id,
            },
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem("userGroups", JSON.stringify(response.data));
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};
