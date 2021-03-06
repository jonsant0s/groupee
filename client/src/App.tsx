import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { HomeScreen } from "./components/home";
import { RequestList } from "./components/request";
import { LoginForm, SignUpForm } from "./components/auth";
import { NavBar } from "./components/navigation/NavBar";
import { Forum } from "components/forum";

import AuthRequired from "components/auth/private-route/AuthRequired";
import ClasslistScreen from "components/classlist/ClasslistScreen";
import CustomAlert from "components/alert/CustomAlert";

import "./App.css";
import axios from "axios";

import { getCurrentUser, getUserClasses } from "services";
import { ProfessorGroupDetailsScreen } from "components/home/ProfessorGroupDetailsScreen";
import { StudentGroupDetailsScreen } from "components/home/student-group/StudentGroupDetailsScreen";
import { Proposal } from "components/proposal/Proposal";

const App = () => {
    const user: UserInfo = getCurrentUser();
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get("http://localhost:3001/")
            .then(() => {
                return axios.get("http://localhost:3001/populate");
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="App">
            <NavBar />
            {show && <CustomAlert setShow={setShow} />}
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            <Navigate replace to="/home" />
                        ) : (
                            <Navigate replace to="/login" />
                        )
                    }
                />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route
                    path="/home"
                    element={
                        <AuthRequired setShow={setShow}>
                            <HomeScreen />
                        </AuthRequired>
                    }
                />
                <Route
                    path="/requestlist"
                    element={
                        <AuthRequired setShow={setShow}>
                            <RequestList />
                        </AuthRequired>
                    }
                />

                <Route
                    path="/classlist"
                    element={
                        <AuthRequired setShow={setShow}>
                            <ClasslistScreen />
                        </AuthRequired>
                    }
                />
                <Route
                    path="/forum"
                    element={
                        <AuthRequired setShow={setShow}>
                            <Forum />
                        </AuthRequired>
                    }
                />
                <Route
                    path="/professorGroupDetails"
                    element={
                        <AuthRequired setShow={setShow}>
                            <ProfessorGroupDetailsScreen user={user} />
                        </AuthRequired>
                    }
                />
                <Route
                    path="/studentGroupDetails"
                    element={
                        <AuthRequired setShow={setShow}>
                            <StudentGroupDetailsScreen />
                        </AuthRequired>
                    }
                />
                <Route
                    path="/proposals"
                    element={
                        <AuthRequired setShow={setShow}>
                            <Proposal />
                        </AuthRequired>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
