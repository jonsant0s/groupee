import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from 'react-router-dom';

import * as AuthService from "../../services";

import EventBus from "../../common/EventBus";

export const NavBarHome = () => {
    const [showProfessorPath, setShowProfessorPath] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInfo | undefined>(undefined);

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

    const logOut = () => {
        AuthService.logout();
        setShowProfessorPath(false);
        setCurrentUser(undefined);
    };

    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="/home"> 
                <NavDropdown title="Courses" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      </Navbar.Brand>
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
            </Navbar>
        </div>
    );
};