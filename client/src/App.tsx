import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./components/home/HomeScreen";
import LoginForm from "./components/login/LoginForm";
import NavBar from "./components/navigation/NavBar";
import SignUpForm from "./components/signup/SignUpForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <LoginForm /> */}
      <HomeScreen />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
