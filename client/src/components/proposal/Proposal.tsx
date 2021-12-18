import { randomIntFromInterval } from "components/request/RequestForm";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getCurrentUser, getUserClasses, getUserGroups } from "services";
import { ProfessorProposalPage } from "./ProfessorProposalPage";
import { fetchUserGroups } from "./ProposalHelpers";
import { ProposalRequestForm } from "./ProposalRequestForm";

interface ProposalProps {
    userClasses: any;
    user: any;
}

export const Proposal = () => {
    const [userClasses, setUserClasses] = useState(getUserClasses);
    const [user, setUser] = useState(getCurrentUser);

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        console.log(e.target.value);
        console.log(getUserGroups);
        // let prev = { ...requestInfo };
        // prev[e.target.id] = e.target.value;

        // if (e.target.id === "courseName") {
        //     const filtered = userClasses.filter((course) => {
        //         return course.course_name === e.target.value;
        //     });

        //     prev.section = filtered[0].section_no;
        // }
        // setRequestInfo(prev);
    };

    useEffect(() => {
        console.log(user.school_id);
        fetchUserGroups(user.school_id);
    }, []);

    return (
        <div className="container-sm vh-100 p-2">
            <label className="form-label mt-3">Course</label>
            <select
                id="courseName"
                className="form-select"
                value={userClasses.course_name}
                onChange={handleInputChange}
            >
                {userClasses.map((course) => {
                    return (
                        <option key={`c${course.course_name}`}>
                            {course.course_name}
                        </option>
                    );
                })}
            </select>
            {user.role == "Professor" ? (
                <ProfessorProposalPage />
            ) : (
                <div className="col-md-12 mt-5">
                    <h5>My Group Information</h5>
                    <Table>
                        <thead>
                            <tr>
                                <td> Group Number</td>
                                <td> Course Name</td>
                                <td> Group Members</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </Table>

                    <h5>My Proposals</h5>
                    <Table>
                        <thead>
                            <tr>
                                <td> Proposal ID</td>
                                <td> Course Name</td>
                                <td> Contents</td>
                                <td> Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        </tbody>
                    </Table>
                    <ProposalRequestForm userClasses={userClasses} />
                </div>
            )}
        </div>
    );
};
