import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import "./LoginForm.css";
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
  return (
    <div className="containerDiv">
      <div className="titleDiv">
        <h1>Groupee</h1>
        <h6>School Group Managment System</h6>
      </div>
      <div>
        <Form className="form">
          <Form.Group className="usernameGroup" controlId="formBasicUsername">
            <div>
              <Form.Label className="usernameLabe">Username</Form.Label>
            </div>
            <Form.Control type="username" />
          </Form.Group>
          <Form.Group className="passwordGroup" controlId="formBasicPassword">
            <div>
              <Form.Label>Password</Form.Label>
            </div>
            <Form.Control type="password" />
          </Form.Group>
          <Button className="submitButton" variant="primary" type="submit">
            Login
          </Button>
          <p className="accountParagraph">Don't have an account?</p>
          {/* Route "sign up here" to the SignUpForm Component later */}
          <NavLink className="nav-link" to="/signup">
            Sign Up Here
          </NavLink>
        </Form>
      </div>
    </div>
  );
}
