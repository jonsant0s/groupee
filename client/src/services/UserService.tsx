import axios from "axios";
import { AuthHeader } from "./AuthHeader";

const API_URL = "https://localhost:3001/";

export const getUserPage = () => {
    return axios.get(API_URL + 'user', { headers: AuthHeader() });
};

export const getStudentPage = () => {
    return axios.get(API_URL + 'stud', { headers: AuthHeader() });
};

export const getProfessorPage = () => {
    return axios.get(API_URL + 'prof', { headers: AuthHeader() });
};