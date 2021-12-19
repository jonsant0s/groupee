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

export const fetchGroupMembers = (student_id: number, course_id: number) => {
    return axios
        .get(`${API_URL}classlist/section/members`, {
            params: {
                school_id: student_id,
                course_id: course_id,
            },
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem(
                "userGroupMembers",
                JSON.stringify(response.data)
            );
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};
