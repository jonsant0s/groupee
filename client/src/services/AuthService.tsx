import axios from "axios";

const API_URL = "http://localhost:3001/";

export const login = (credentials: LoginInfo) => {
    return axios
        .post(API_URL + "authentication/login", credentials)
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = (userInfo: SignUpInfo) => {
    return axios
        .post(API_URL + "authentication/signup", {
            student_id: userInfo.student_id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            password: userInfo.password,
        })
        .then((response) => {
            login(userInfo);
            console.log(response.data);
            return response.data;
        });
};

// Returns token, user, role etc
export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return;
};

// Returns current users enrolled classes
export const getUserClasses = () => {
    const userClassesStr = localStorage.getItem("userClasses");
    if (userClassesStr) return JSON.parse(userClassesStr);

    return;
};

export const getUserGroups = () => {
    const userGroupsStr = localStorage.getItem("userGroups");
    if (userGroupsStr) return JSON.parse(userGroupsStr);

    return;
};

export const getUserProposals = () => {
    const userProposalsStr = localStorage.getItem("userProposals");
    if (userProposalsStr) return JSON.parse(userProposalsStr);

    return;
};

export const getUserGroupMembers = () => {
    const userGroupMemberStr = localStorage.getItem("userGroupMembers");
    if (userGroupMemberStr) return JSON.parse(userGroupMemberStr);

    return;
};
