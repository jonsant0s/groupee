import React from "react";
import "./App.css";
import LoginForm from "./components/login/LoginForm";

import SignUpForm from "./components/signup/SignUpForm";


function App() {
  return (
    <div className="App">
      <LoginForm />

      <SignUpForm />

    </div>
  );
}

export default App;
