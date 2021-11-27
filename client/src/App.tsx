import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {HomeScreen, RequestForm, RequestList } from "./components/home";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navigation/NavBar";
import SignUpForm from "./components/signup/SignUpForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <RequestList /> */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/requestform" element={<RequestForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
