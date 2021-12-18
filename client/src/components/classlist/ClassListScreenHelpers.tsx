import { API_URL } from "common/constants";

import axios from "axios";

export const search = (info: ClassListSearchInfo) => {
	return axios
		.get(`${API_URL}/classlist`, {
			params: {
				course_name: info.course_name,
				student_id: info.student_id,
			},
		})
		.then((response) => {
			console.log(response.data);
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};