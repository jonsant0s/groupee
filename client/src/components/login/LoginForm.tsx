import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/AuthService";

import axios from 'axios';

import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import "./LoginForm.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const[validated, setValidated] = useState(false)
  const[loginValues, setLogin] = useState({
    email: "",
    password: ""
  });
  const[loading, setLoading] = useState<boolean>(false);
  const[message, setMessage] = useState<string>("");
  
  let handleEmail = (e) => {
    e.persist();
    setLogin((loginValues) => ({
        ...loginValues,
        email: e.target.value,
    }));
  };
  let handlePassword = (e) => {
    e.persist();
    setLogin((loginValues) => ({
        ...loginValues,
        password: e.target.value,
    }));
  };

  

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (e) => {

    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
    
    

    setMessage(" ");
    setLoading(true);

    login(loginValues.email, loginValues.password).then(()=> {
      
      navigate("/profile");
      window.location.reload();
      
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

    setValidated(true);
  };

  return (
    <div className="containerDiv">
      <div className="titleDiv">
        <h1>Groupee</h1>
        <h6>School Group Managment System</h6>
      </div>
      <div> 
          <Form noValidate validated={validated} onSubmit={handleLogin} className="form">
            <Form.Group className="usernameGroup" controlId="formBasicUsername">
              <div>
                <Form.Label className="usernameLabe">Username</Form.Label>
              </div>
                <Form.Control 
                  type="email" 
                  value={loginValues.email} 
                  onChange={handleEmail} 
                  required/>
                <Form.Control.Feedback type="invalid">
                  Please provide an email.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="passwordGroup" controlId="formBasicPassword">
              <div>
                <Form.Label>Password</Form.Label>
              </div>
              <Form.Control type="password" value={loginValues.password} onChange={handlePassword} required/>
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="submitButton" variant="primary" type="submit" onClick={handleLogin}>
              Login
            </Button>
            <p className="accountParagraph">Don't have an account?</p>
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
}

export default LoginForm;