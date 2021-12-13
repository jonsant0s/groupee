import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import "./ClasslistScreen.css";
import { search } from "./ClassListScreenHelpers";

const ClasslistScreen = () => {
    const [classlistValues, setClasslistValues] = useState<ClassListSearchInfo>(
        {
            course_name: "",
            student_id: null,
        }
    );

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = { ...classlistValues };
        prev[e.target.id] = e.target.value;

        setClasslistValues(prev);
    };

    const handleSearch = (e: FormEvent) => {
        const form = e.currentTarget;

        if (form.checkValidity()) {
            e.preventDefault();

            search(classlistValues)
                .then((classlist) => {
                    console.log(classlist);
                })
                .catch((err) => {
                    postMessage(err);
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
                            value={classlistValues.course_name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Class id</Form.Label>
                        <Form.Control
                            type="Student Id"
                            id="student_id"
                            value={classlistValues.student_id || ""}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
                <Button
                    className="submitButton"
                    type="submit"
                    onClick={handleSearch}
                >
                    Search
                </Button>
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
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ClasslistScreen;
