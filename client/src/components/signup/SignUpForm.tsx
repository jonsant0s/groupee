import React, { Component, useState } from "react";
import axios from 'axios';
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Form from "react-bootstrap/esm/Form";
import "./SignUpForm.css";

export default class SignUpForm extends Component{

  

  
  render() {
    const [accountType, setAccountType] = useState("Account Type");
    return (
      <div className="containerDiv">
        <div className="titleDiv">
          <h2>Sign Up for Groupee</h2>
        </div>
        <div>
          <Form className="form">
            <Form.Group className="firstNameGroup" controlId="formBasicFirstName">
              <div>
                <Form.Label className="firstNameLabel">First Name</Form.Label>
              </div>
              <Form.Control type="name" />
            </Form.Group>
            <Form.Group className="lastNameGroup" controlId="formBasicLastName">
              <div>
                <Form.Label className="nameLabel">Last Name</Form.Label>
              </div>
              <Form.Control type="lastName" />
            </Form.Group>
            <Form.Group className="usernameGroup" controlId="formBasicUsername">
              <div>
                <Form.Label className="usernameLabel">Username</Form.Label>
              </div>
              <Form.Control type="name" />
            </Form.Group>
            <Form.Group className="passwordGroup" controlId="formBasicPassword">
              <div>
                <Form.Label>Password</Form.Label>
              </div>
              <Form.Control type="password" />
            </Form.Group>
            <DropdownButton
              className="dropdownButton"
              variant="secondary"
              size="sm"
              title={accountType}
            >
              <Dropdown.Item
                onClick={() => setAccountType((currentAccountType) => "Student")}
              >
                Student
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setAccountType((currentAccountType) => "Professor")
                }
              >
                Professor
              </Dropdown.Item>
            </DropdownButton>
            <Button className="submitButton" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
