import axios from "axios";
import  { AuthHeader } from "./AuthHeader";

const API_URL = "https://localhost:3001/";

export const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: AuthHeader() });
};

export const getStudentBoard = () => {
    return axios.get(API_URL + "stud", { headers: AuthHeader() });
};

export const getProfessorBoard = () => {
    return axios.get(API_URL + "prof", { headers: AuthHeader() });
};
