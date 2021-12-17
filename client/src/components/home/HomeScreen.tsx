import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser, getUserClasses } from "../../services";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import "./HomeScreen.css";
import { fetchStudentClasses } from "./HomeScreenHelpers";

export const HomeScreen = () => {
    const [user, setUser] = useState(getCurrentUser);
    const [userClasses, setUserClasses] = useState(getUserClasses);

    useEffect(() => {
        console.log(user);
        console.log(userClasses);
    }, [user]);
    var firstLetter = user.first_name.charAt(0);
    var lastLetter = user.last_name.charAt(0);

    return (
        <div className="p-3">
            <div className="row px-3">
                <div className="col-md-1 border border-5 rounded-circle mb-3">
                    <p className="profileContainer">{firstLetter} {lastLetter}</p>
                    
                </div>
                <div className="col-md-11 border-3 border-bottom py-3 mb-3">
                    <h5>
                        {user.first_name} {user.last_name}
                    </h5>
                    <p>
                        Role: {user.role} <br />
                        Student ID: {user.school_id} <br />
                        Major: CS
                    </p>
                </div>

                <div className="col-md-4 p-2">
                    <div className="d-flex flex-column border p-3">
                        <h6>Enrolled in:</h6>
                        {userClasses ? (
                            userClasses.map((data) => {
                                return (
                                    <div
                                        className="p-2 border-bottom"
                                        key={data.course_id}
                                    >
                                        <NavLink
                                            className="nav-link"
                                            to={`/classlist?course_name=${data.course_name}`}
                                        >
                                            {data.course_name}
                                        </NavLink>
                                    </div>
                                );
                            })
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
                <div className="col-md-8 p-2">
                <div className="col-md-12 border p-5">
                        <h5>JOIN REQUESTS</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <td> Requested By</td>
                                    <td> Requester Section</td>
                                    <td> Forum Post Section</td>
                                    <td> Current Memories</td>
                                    <td> Decision</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> 
                                        <span>
                                        <Button  size="sm">
                                            Accept
                                        </Button>
                                        </span>
                                        <span>
                                        <Button  size="sm" >
                                            Reject
                                        </Button>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    </div>
                <div className="col-md-8 p-2">
                    <div className="col-md-12 border p-5 text-center">
                        <h5>GROUP REQUEST LIST</h5>
                    </div>
                    <div className="col-md-12 border p-2">
                        <div className="d-grid gap-2">
                            <Button
                                href="/forum"
                                variant="primary"
                                size="lg"
                            >
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
