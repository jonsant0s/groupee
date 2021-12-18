import { API_URL } from "common/constants";

import axios from "axios";

import * as Type from "../../components/home/student-group/StudentGroupDetailsScreen.types";


export const GetPreferencePosts = async (school_id: number) => {
	return await axios
		.get<Type.PostedPreferencesType[]>(`${API_URL}/join/posting`, {
			params: { school_id },
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const UpdateStudentRequest = async (post_id:number, student_id:number, status:string) => {
	return await axios
		.put(`${API_URL}/join`, {
			post_id,
			student_id,
			status
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const GetUserJoinRequests = async (student_id:number) => {
	return await axios
		.get(`${API_URL}/join/requests`, { params: { student_id } })
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};