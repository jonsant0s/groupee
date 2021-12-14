import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from "../../services"

import Button from "react-bootstrap/esm/Button";
import "./HomeScreen.css";

const enrolled = ["CPSC 471", "CPSC 4545", "CPSC 242", "CPSC 123"]; // Also needs to be queried by studentID

export const HomeScreen = () => {
    const [user, setUser] = useState(getCurrentUser);

    useEffect(() => {
        console.log(user);
    }, [user]);
    
    return (
        <div className="p-3">
            <div className="row px-3">
                <div className="col-md-1 border border-5 rounded-circle mb-3"></div>
                <div className="col-md-11 border-3 border-bottom py-3 mb-3"> 
                    <h5>{user.first_name} {user.last_name}</h5>
                    <p>
                        Role: {user.role} <br/>
                        Student ID: {user.school_id} <br/>
                        Major: CS
                    </p>
                </div>

                <div className="col-md-4 p-2">                   
                    <div className="d-flex flex-column border p-3">
                        <h6>Enrolled in:</h6>
                        { 
                            enrolled.map((course) => { 
                                return (
                                    <div className="p-2 border-bottom"> 
                                        <NavLink 
                                            className="nav-link" 
                                            to={`/classlist?course_name=${ course }`}
                                        >
                                            { course }
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-md-8 p-2">
                    <div className="col-md-12 border p-5 text-center">     
                        <h5>GROUP REQUEST LIST</h5>
                    </div>
                    <div className="col-md-12 border p-2">              
                        <div className="d-grid gap-2">
                            <Button href="/requestform" variant="primary" size="lg">
                                Create Group Request
                            </Button>
                            <Button variant="secondary" size="lg">
                                Update Group Request
                            </Button>
                            <Button variant="secondary" size="lg">
                                View Group
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
