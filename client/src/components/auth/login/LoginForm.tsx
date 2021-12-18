import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getCurrentUser, login } from "../../../services/";

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

import "./LoginForm.css";
import { fetchUserClasses } from "components/home/HomeScreenHelpers";

export const LoginForm = () => {
    const navigate = useNavigate();

    const [loginValues, setLogin] = useState<LoginInfo>({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = { ...loginValues };
        prev[e.target.id] = e.target.value;

        setLogin(prev);
    };

    const handleLogin = (e: FormEvent) => {
        const form = e.currentTarget;

        if (form.checkValidity()) {
            e.preventDefault();

            login(loginValues)
                .then((user) => {
                    let apiRoute = user.role==="Professor"? "course" : "fetch";
                    fetchUserClasses(apiRoute, user.school_id);
                    navigate("/home");
                    window.location.reload();
                })
                .catch((err) => {
                    setMessage(err);
                });
        }

        // Unreachable code if user is navigated to profile?
        setValidated(true);
    };

    return (
        <div className="containerDiv">
            <div className="titleDiv">
                <h1>Groupee</h1>
                <h6>School Group Managment System</h6>
            </div>
            <div>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleLogin}
                    className="form"
                >
                    <Form.Group className="usernameGroup">
                        <div>
                            <Form.Label className="usernameLabe">
                                Username
                            </Form.Label>
                        </div>
                        <Form.Control
                            type="text"
                            id="username"
                            value={loginValues.username}
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
                            value={loginValues.password}
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
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <p className="accountParagraph"> Don't have an account? </p>
                    <NavLink className="nav-link" to="/signup">
                        Sign Up Here
                    </NavLink>
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
};
