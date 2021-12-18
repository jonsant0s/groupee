import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser, getProfessor } from "../../services";
import Navbar from "react-bootstrap/Navbar";
import { NavBarHome } from "../navigation/NavBarHome";

import Button from "react-bootstrap/esm/Button";
import "./HomeScreen.css";
import { fetchCourseInfo } from "./HomeScreenHelpers";

export const CourseHomeScreen = () => {
    const [user, setUser] = useState(getCurrentUser);
    const [classlistSearchValues, setClasslistSearchValues] =
        useState<PrevClassInfo>({
            course_name: "",
            course_id: "",
            student_id: null,
        });

    const[professorName, setProfessorName ] = useState(getProfessor);
    
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let courseID = params.get("course_id");

        if(courseID){
            console.log(courseID);
            fetchCourseInfo(courseID);
        }
    }, []);
        /*
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let courseName = params.get("course_name");
        let courseID = params.get("course_id");
        
        if (courseID) {
            let prev = { ...classlistSearchValues };
            prev.course_id = courseID;
            setClasslistSearchValues(prev);
        }

        if (courseName) {
            let prev = { ...classlistSearchValues };
            prev.course_name = courseName;
            setClasslistSearchValues(prev);
        }
        
    }, []);*/

    var firstLetter = user.first_name.charAt(0);
    var lastLetter = user.last_name.charAt(0);

    var department;
    if (user.role == "Professor") {
        department = "Department:";
    } else {
        department = "Major:";
    }
    return (
        <div className="p-3">
            <div className="row px-3">
                <div className="col-md-12 border-3 border-bottom py-3">
                    

                    {professorName ? (
                            professorName.map((data) => {
                                return (
                                    <div key={data.course_id}>
                                        <h2>
                                            {data.course_name}
                                        </h2>
                                        <p>
                                            Instructor: {data.first_name} {data.last_name} <br />
                                            Instructor ID: {data.professor_id} <br />
                                        </p>
                                    </div>
                                );
                            })
                        ) : (
                            <div></div>
                        )}
                        {/*{classlistSearchValues.course_id}: {classlistSearchValues.course_name}*/ }
                    
                    
                </div>
                <NavBarHome/>
                <div className="col-md-12 border-3 border-bottom"/>


                <div className="col-md-8 p-2">
                    <div className="col-md-12 border p-5 text-center">
                        <h5>GROUP REQUEST LIST</h5>
                    </div>
                    <div className="col-md-12 border p-2">
                        <div className="d-grid gap-2">
                            <Button href="/forum" variant="primary" size="lg">
                                Create Group Request
                            </Button>
                            <Button variant="secondary" size="lg">
                                Update Group Request
                            </Button>
                            <Button
                                href={
                                    user.role == "professor"
                                        ? "/professorGroupDetails"
                                        : "/studentGroupDetails"
                                }
                                variant="secondary"
                                size="lg"
                            >
                                View Group Details
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