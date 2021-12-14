import { useEffect, useState } from "react";
import { Days } from "../../global/days";

export const RequestForm = () => {
    const [requestInfo, setRequestInfo] = useState<RequestInput>({
        student_id: 0,
        group_size: 0,
    });

    useEffect(() => {
        console.log(requestInfo);
    });

    const handleInputChange = (e: ChangeEvent) => {
        console.log(e.target.id);

        e.persist();
        let prev = { ...requestInfo };
        prev[e.target.id] = e.target.value;

        setRequestInfo(prev);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
        // axios
        //     .post("https://jsonplaceholder.typicode.com/posts", requestInfo)
        //     .then((res) => console.log(res.data));
    };

    return (
        <div className="container-sm p-5">
            <h3 className="mb-4 text-center">Create Group Request</h3>
            <form
                className="w-75 row mx-auto p-3 border rounded"
                onSubmit={onSubmit}
            >
                <div className="col-md-6">
                    <div className="col-md-12">
                        <label className="form-label">Student ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="student_id"
                            name="student_id"
                            value={requestInfo.student_id || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Group Size</label>
                        <input
                            type="number"
                            className="form-control"
                            id="group_size"
                            name="group_size"
                            value={requestInfo.group_size || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Availability</label>
                        <select
                            id="availability"
                            className="form-select"
                            name="availability"
                            value={requestInfo.availability || ""}
                            onChange={handleInputChange}
                        >
                            {Object.keys(Days).map((day) => {
                                return <option>{day}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit request
                    </button>
                </div>
            </form>
        </div>
    );
};
