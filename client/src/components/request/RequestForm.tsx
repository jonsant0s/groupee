import { useEffect, useState } from "react";
import { Days } from "../../global/days";
import axios from "axios";

import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";

const randomIntFromInterval = () => {
    let rand = Math.floor(Math.random() * (999 - 100+ 1) + 100);
    let id = parseInt(""+800+rand);
    
    return id;
}

interface FormInfo {
    userClasses:any,
    school_id: number,
    addRequest: () => void;
}

export const RequestForm:React.FC<FormInfo> = ({userClasses, school_id, addRequest} : FormInfo) => {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>();
    
    const initPost: RequestInput = {
        requestID: randomIntFromInterval(),
        courseName: userClasses[0].course_name,
        student_id: school_id,
        availability: Days.Monday,
        group_size: 0,
        section: userClasses[0].section_no,
        comments:""
    }

    const [requestInfo, setRequestInfo] = useState<RequestInput>(initPost);

    useEffect(() => {
        console.log(requestInfo);
    }, [requestInfo]);

    const handleShow = () => setShow(!show);

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = {...requestInfo};
        prev[e.target.id] = e.target.value;

        if(e.target.id==="courseName") {
            const filtered = userClasses
                .filter((course) => {
                    return course.course_name===e.target.value
                });

            prev.section=filtered[0].section_no;
        }
        setRequestInfo(prev);
    };

    const onSubmit = () => {
        axios
            .post("http://localhost:3001/requests/create", requestInfo)
            .then((res) => {
                setAlert({
                    status: res.data.status,
                    message: res.data.message
                });
                setRequestInfo(initPost);
                addRequest();
            })
            .catch((err) => {
                setAlert({
                    status: err.data.status,
                    message: err.data.message
                });
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Post new group preference
            </Button>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Group preference</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form
                        className="w-75 row mx-auto p-3"
                        onSubmit={onSubmit}
                    >
                        { alert && 
                            <Alert variant={alert.status==200 ? "success":"danger"}>
                                { alert.message }
                            </Alert> 
                        }

                        <label className="form-label mt-3">Course</label>
                            <select
                                id="courseName"
                                className="form-select"
                                value={requestInfo.courseName}
                                onChange={handleInputChange}
                            >
                                { userClasses.map((course, i) => {
                                    return <option key={`c${course.course_name}`}>{course.course_name}</option>;
                                }) }
                            </select>

                        <label className="form-label mt-3"> Number of members you are looking for </label>
                            <input
                                type="number"
                                className="form-control"
                                id="group_size"
                                name="group_size"
                                value={requestInfo.group_size || ""}
                                onChange={handleInputChange}
                            />
            
                        <label className="form-label mt-3">Availability</label>
                            <select
                                id="availability"
                                className="form-select"
                                name="availability"
                                value={requestInfo.availability || ""}
                                onChange={handleInputChange}
                            >
                                { Object.keys(Days).map((day) => {
                                    return <option key={`d${day}`}>{day}</option>;
                                }) }
                            </select>
                        
                        <label className="form-label mt-3">Additional preferences:</label>
                            <textarea 
                                className="form-control" 
                                value={requestInfo.comments || ""} 
                                id="comments" 
                                onChange={handleInputChange}
                                rows={3}
                            />
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
