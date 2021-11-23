import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import "./SignUpForm.css";

export default function SignUpForm() {
  return (
    <div className="containerDiv">
      <div className="titleDiv">
        <h1>Groupee</h1>
        <h6>School Group Managment System</h6>
      </div>
      <div>
        <Form className="form">
          <Form.Group className="emailGroup" controlId="formBasicEmail">
            <div>
              <Form.Label className="emailLabel">Email address</Form.Label>
            </div>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="passwordGroup" controlId="formBasicPassword">
            <div>
              <Form.Label>Password</Form.Label>
            </div>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="submitButton" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
