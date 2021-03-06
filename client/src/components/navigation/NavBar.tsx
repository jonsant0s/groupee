import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import * as AuthService from "../../services";

import EventBus from "../../common/EventBus";

export const NavBar = () => {
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    Groupee
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                </div>
            </nav>
        </div>
    );
};