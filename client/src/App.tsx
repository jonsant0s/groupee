import React from "react";
import "./App.css";

import { BrowserRouter as Route, Routes, Router } from 'react-router-dom';

import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navigation/NavBar";
import SignUpForm from "./components/signup/SignUpForm";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignUpForm/>} />
      </Routes>

    </div>
  );
}

export default App;
