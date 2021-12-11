import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeScreen, RequestForm, RequestList } from "./components/home";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navigation/NavBar";
import SignUpForm from "./components/signup/SignUpForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginForm /> } />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/requestform" element={<RequestForm />} />
        <Route path="/requestlist" element={<RequestList />} />
      </Routes>
    </div>
  );
}

export default App;
