import axios from "axios";

const API_URL = "http://localhost:3001/";

export const fetchUserGroups = (student_id: number, course_id: number) => {
    return axios
        .get(`${API_URL}groups/section`, {
            params: {
                student_id: student_id,
                course_id: course_id,
            },
        })
        .then((response) => {
            localStorage.setItem("userGroups", JSON.stringify(response.data));
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

export const fetchProposal = (course_id: number) => {
    return axios
        .get(`${API_URL}proposal/submissions`, {
            params: {
                course_id: course_id,
            },
        })
        .then((response) => {
            localStorage.setItem(
                "userProposals",
                JSON.stringify(response.data)
            );
            console.log(response.data);
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};
