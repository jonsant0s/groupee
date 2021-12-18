import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from 'react-router-dom';
import { getCurrentUser, getUserClasses } from "../../services";
import Button from "react-bootstrap/esm/Button";
import { fetchStudentClasses } from "../home/HomeScreenHelpers";

import * as AuthService from "../../services";

import EventBus from "../../common/EventBus";

export const NavBarHome = () => {
    const [showProfessorPath, setShowProfessorPath] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInfo | undefined>(undefined);
    const [user, setUser] = useState(getCurrentUser);

    const [userClasses, setUserClasses] = useState(getUserClasses);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        
        if (user) {
            setCurrentUser(user);
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        }
    }, []);

    useEffect(() => {
        fetchStudentClasses(user.school_id);
    }, [user]);

    const logOut = () => {
        AuthService.logout();
        setShowProfessorPath(false);
        setCurrentUser(undefined);
    };

    return (
        <div>
            <Nav variant="tabs">
                <NavDropdown title="Courses" id="collasible-nav-dropdown" color="black">
                {userClasses ? (
                            userClasses.map((data) => {
                                return (
                                        <NavDropdown.Item
                                            href={`/coursehome?course_name=${data.course_name}`}
                                        >
                                            {data.course_name}
                                        </NavDropdown.Item>
                                );
                            })
                        ) : (
                            <div></div>
                        )}
                </NavDropdown>
                <Navbar.Collapse id="basic-navbar-nav">
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                {currentUser.first_name+" "+currentUser.last_name}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" onClick={logOut}>
                                Log Out
                            </NavLink>
                        </li>
                    </div>
                    
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">
                                Sign Up
                            </NavLink>
                        </li>
                    </div>
                )}
                </Navbar.Collapse>
            </Nav>
        </div>
    );
};