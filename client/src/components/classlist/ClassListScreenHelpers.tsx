import axios from "axios";

const API_URL = "http://localhost:3001/";

export const search = (info: ClassListSearchInfo) => {
    return axios
        .get(API_URL + "classlist", {
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
