import { API_URL } from "common/constants";
import * as Type from "./Comments.types";
import axios from "axios";

export const fetchComments = async (requestId: number) => {
	return await axios
		.get<Type.GetCommentsRequest[]>(
			`${API_URL}/comment?post_id=${requestId}`
		)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const postCommentRequest = async (
	postCommentBody: Type.PostCommentBody
) => {
	return await axios
		.post(`${API_URL}/comment`, postCommentBody)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const deleteCommentRequest = async (
	deleteCommentBody: Type.DeleteCommentBody
) => {
	return await axios
		.delete(`${API_URL}/comment`, { data: deleteCommentBody })
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export const joinGroupRequest = async (
	joinGroupBody: Type.JoinGroupRequestBody
) => {
	return await axios
		.post(`${API_URL}/join`, joinGroupBody)
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};
