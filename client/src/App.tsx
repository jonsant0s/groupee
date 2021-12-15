import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "./components/home";
import { RequestForm, RequestList } from "./components/request";
import { LoginForm, SignUpForm } from "./components/auth";
import { NavBar } from "./components/navigation/NavBar";
import { Forum } from "components/forum";

import "./App.css";
import axios from "axios";
import ClasslistScreen from "components/classlist/ClasslistScreen";
import { useEffect } from "react";

const App = () => {
    useEffect(() => {
        axios.get("http://localhost:3001/")
            .then(() => {
                return axios.get("http://localhost:3001/populate");
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/requestlist" element={<RequestList />} />
                <Route path="/classlist" element={<ClasslistScreen />} />
                <Route path="/forum" element={<Forum />} />
            </Routes>
        </div>
    );
};

export default App;
