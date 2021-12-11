import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import "./ClasslistScreen.css";

const ClasslistScreen = () => {
    return (
        <div>
            <div className="formDiv">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Class id</Form.Label>
                        <Form.Control type="Name" />
                    </Form.Group>
                </Form>
                <Button className="submitButton" type="submit">
                    Search
                </Button>
            </div>
            <div className="outerDiv">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Class Id</th>
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
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@jthorton</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry</td>
                            <td>Bird</td>
                            <td>@lbird</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ClasslistScreen;