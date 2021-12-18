import { API_URL } from "common/constants";

import axios from "axios";


export const GetMemberInfo = async (post_id: number) => {
	return await axios
		.get(`${API_URL}/groups/members`, {
			params: { post_id },
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const GetStudentGroupRequest = async (professor_id: number) => {
	return await axios
		.get(`${API_URL}/groups`, {
			params: { professor_id },
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const UpdateGroupRequest = async (post_id:number, status:string) => {
	return await axios
		.put(`${API_URL}/requests`, {
			post_id,
			status
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const GetGroupRequests = async (course_id: number) => {
	return await axios
		.get(`${API_URL}/groups`, {
			params: { course_id },
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const SetGroupId = async (course_id: number, student_id: number) => {
	return await axios
		.put(`${API_URL}/groups/members`, { course_id, student_id })
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const CreateGroups = async (post_id:number) => {
	return await axios
		.post(`${API_URL}/groups/`, {
			post_id,
		})
		.then((response) => {
			return 
		})
		.catch((error) => {
			throw error;
		});
};
