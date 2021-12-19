import axios from "axios";

const API_URL = "http://localhost:3001/";

export const parseTimeStamp = (time_stamp: string) => {
    var re = /T/gi;
    return time_stamp.replace(re, " ").split(".")[0];
};

export const fetchUserGroups = (student_id: number, course_id: number) => {
    return axios
        .get(`${API_URL}groups/section`, {
            params: {
                student_id,
                course_id,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

export const fetchGroupMembers = (student_id: number, course_id: number) => {
    return axios
        .get(`${API_URL}groups/section/members`, {
            params: {
                student_id,
                course_id,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

export const fetchProposal = (course_id: number, student_id: number | null) => {
    return axios
        .get(`${API_URL}proposal/submissions`, {
            params: {
                student_id,
                course_id,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

export const updateGroupProposal = (status: string, group_no: number) => {
    return axios
        .put(`${API_URL}proposal/review`, {
            status,
            group_no,
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};
