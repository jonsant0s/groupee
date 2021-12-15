import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import "./ClasslistScreen.css";
import { search } from "./ClassListScreenHelpers";

const ClasslistScreen = () => {
    const [message, setMessage] = useState("");
    const [classlistValues, setclasslistValues] = useState<any>();
    const [classlistSearchValues, setClasslistSearchValues] =
        useState<ClassListSearchInfo>({
            course_name: "",
            student_id: null,
        });

    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let courseName = params.get("course_name");

        if (courseName) {
            let prev = { ...classlistSearchValues };
            prev.course_name = courseName;
            setClasslistSearchValues(prev);
        }
    }, []);

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = { ...classlistSearchValues };
        prev[e.target.id] = e.target.value;

        setClasslistSearchValues(prev);
    };

    const handleSearch = (e: FormEvent) => {
        const form = e.currentTarget;

        if (form.checkValidity()) {
            e.preventDefault();

            search(classlistSearchValues)
                .then((classlist) => {
                    const jsonData = JSON.parse(JSON.stringify(classlist));
                    setclasslistValues(JSON.parse(JSON.stringify(jsonData)));
                    if (jsonData.length == 0) {
                        setMessage(
                            "There are not results for that course. Please check to make sure your course exists or is correctly spelled."
                        );
                    }
                })
                .catch((err) => {
                    setMessage(err);
                });
        }
    };

    return (
        <div>
            <div className="formDiv">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="Course Name"
                            id="course_name"
                            value={classlistSearchValues.course_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Student id</Form.Label>
                        <Form.Control
                            type="Student Id"
                            id="student_id"
                            value={classlistSearchValues.student_id || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
                <Button
                    className="submitButton"
                    type="submit"
                    onClick={handleSearch}
                    disabled={classlistSearchValues.course_name == ""}
                >
                    Search
                </Button>
                {message && classlistValues.length == 0 && (
                    <div className="message">
                        <div className="alert alert-warning" role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
            <div className="outerDiv">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course Id</th>
                            <th>Student Id</th>
                            <th>Section Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classlistValues ? (
                            classlistValues.map((data) => {
                                return (
                                    <tr key={data.student_id}>
                                        <td>{data.course_id}</td>
                                        <td>{data.student_id}</td>
                                        <td>{data.section_no}</td>
                                        <td>{data.first_name}</td>
                                        <td>{data.last_name}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ClasslistScreen;
