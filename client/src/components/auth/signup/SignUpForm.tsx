import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services";

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

import "./SignUpForm.css";

export const SignUpForm = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [registerValues, setRegister] = useState<SignUpInfo> ({
        student_id: 0,
        first_name: "",
        last_name: "",
        username: "",
        password: ""
    });
    
    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = {...registerValues};
        prev[e.target.id] = e.target.value;

        setRegister(prev);
    };

    const handleRegister = (e: FormEvent) => {
        const form = e.currentTarget;

        if (form.checkValidity()) {
            e.preventDefault();

            console.log(registerValues);

            register(registerValues)
            .then(() => { 
                navigate("/");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
        }
        setValidated(true);
    };

    return (
        <div className="containerDiv">
            <div className="titleDiv">
                <h2>Sign Up for Groupee</h2>
            </div>
            <div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleRegister}
                    className="form"
                >   
                    <Form.Group className="studentIDGroup">
                        <div>
                            <Form.Label className="idLabel">
                                Student ID
                            </Form.Label>
                        </div>
                        <Form.Control
                            type="number"
                            id="student_id"
                            value={registerValues.student_id}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter school ID.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="firstNameGroup">
                        <div>
                            <Form.Label className="firstNameLabel">
                                First Name
                            </Form.Label>
                        </div>
                        <Form.Control
                            type="name"
                            id="first_name"
                            value={registerValues.first_name || ""}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="lastNameGroup">
                        <div>
                            <Form.Label className="nameLabel">
                                Last Name
                            </Form.Label>
                        </div>
                        <Form.Control
                            type="name"
                            id="last_name"
                            value={registerValues.last_name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="usernameGroup">
                        <div>
                            <Form.Label className="usernameLabe">
                                Username
                            </Form.Label>
                        </div>
                        <Form.Control
                            type="text"
                            id="username"
                            value={registerValues.username}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide an email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="passwordGroup">
                        <div>
                            <Form.Label>Password</Form.Label>
                        </div>
                        <Form.Control
                            type="password"
                            id="password"
                            value={registerValues.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                        className="submitButton"
                        variant="primary"
                        type="submit"
                        onClick={handleRegister}
                    >
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
};