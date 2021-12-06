import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../services/AuthService";
import { RouteComponentProps } from "react-router";

import axios from 'axios';

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import "./LoginForm.css";

interface RouterProps {
  history: string;
}

type Props = RouteComponentProps<RouterProps>;

export const LoginForm: React.FC<Props> = ({ history }) => {
  const[loading, setLoading] = useState<boolean>(false);
  const[message, setMessage] = useState<string>("");

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage(" ");
    setLoading(true);

    login(email, password).then(()=> {
      history.push("/profile");
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
  };

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
          <p>Sign up here</p>
        </Form>
      </div>
    </div>
  );
}
