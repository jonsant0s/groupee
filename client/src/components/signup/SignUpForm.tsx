import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { register } from "../../services/AuthService";

import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import Form from "react-bootstrap/esm/Form";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const[validated, setValidated] = useState(false)
  const[successful, setSuccessful] = useState(false);
  const[loading, setLoading] = useState(false);
  const[message, setMessage] = useState("");
  const[registerValues, setRegister] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: ""
  });
  const [accountType, setAccountType] = useState("Account Type");

  let handleFirstName = (e) => {
    e.persist();
    setRegister((registerValues) => ({
      ...registerValues,
      first_name: e.target.value,
    }));
  };
  let handleLastName = (e) => {
    e.persist();
    setRegister((registerValues) => ({
      ...registerValues,
      last_name: e.target.value,
    }));
  };
  let handleUsername = (e) => {
    e.persist();
    setRegister((registerValues) => ({
        ...registerValues,
        username: e.target.value,
    }));
  };
  let handlePassword = (e) => {
    e.persist();
    setRegister((registerValues) => ({
        ...registerValues,
        password: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === true) {
      e.preventDefault();

      setMessage(" ");
      setLoading(true);
      console.log(registerValues);

      register(registerValues.first_name, 
               registerValues.last_name,
               registerValues.username,
               registerValues.password).then(()=> {

        navigate("/profile");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
        );
    }
  }
  
  return (
    <div className="containerDiv">
      <div className="titleDiv">
        <h2>Sign Up for Groupee</h2>
      </div>
      <div>
        <Form noValidate validated={validated} onSubmit={handleRegister} className="form">
          <Form.Group className="firstNameGroup" controlId="formBasicFirstName">
            <div>
              <Form.Label className="firstNameLabel">First Name</Form.Label>
            </div>
            <Form.Control 
              type="name" 
              value={registerValues.first_name}
              onChange={handleFirstName}
              required
              />
            <Form.Control.Feedback type="invalid">
              Please enter first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="lastNameGroup" controlId="formBasicLastName">
            <div>
              <Form.Label className="nameLabel">Last Name</Form.Label>
            </div>
            <Form.Control 
              type="name" 
              value={registerValues.last_name}
              onChange={handleLastName}
              required
              />
              <Form.Control.Feedback type="invalid">
                Please enter last name.
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="usernameGroup" controlId="formBasicUsername">
              <div>
                <Form.Label className="usernameLabe">Username</Form.Label>
              </div>
              <Form.Control 
                type="text" 
                value={registerValues.username} 
                onChange={handleUsername} 
                required/>
              <Form.Control.Feedback type="invalid">
                Please provide an email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="passwordGroup" controlId="formBasicPassword">
              <div>
                <Form.Label>Password</Form.Label>
              </div>
              <Form.Control 
                type="password" 
                value={registerValues.password} 
                onChange={handlePassword} 
                required/>
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
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
          <Button className="submitButton" variant="primary" type="submit" onClick={handleRegister}>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;
