import { randomIntFromInterval } from "components/request/RequestForm";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
    getCurrentUser,
    getUserClasses,
    getUserGroups,
    getUserProposals,
} from "services";
import { ProfessorProposalPage } from "./ProfessorProposalPage";
import {
    fetchUserGroups,
    fetchProposal,
    fetchGroupMembers,
} from "./ProposalHelpers";
import { ProposalRequestForm } from "./ProposalRequestForm";

// interface GroupInfo {
//     group_no?: number;
//     course_id?: number;
// }

// interface ProposalInfo {
//     submission_id?: number;
//     group_no?: number;
//     topic?: string;
//     description?: string;
// }

export const Proposal = () => {
    // const initUserGroup: GroupInfo = {
    //     group_no: undefined,
    //     course_id: undefined,
    // };

    // const initUserProposal: ProposalInfo = {
    //     submission_id: undefined,
    //     group_no: undefined,
    //     topic: undefined,
    //     description: undefined,
    // };

    const [user, setUser] = useState(getCurrentUser);
    const [userClasses, setUserClasses] = useState(getUserClasses);
    const [userGroups, setUserGroups] = useState(getUserGroups);
    const [userProposals, setUserProposals] = useState(getUserProposals);
    const [currentUserClass, setCurrentUserClass] = useState(
        userClasses[0].course_id
    );

    useEffect(() => {
        const courseId = currentUserClass.toString();
        const courseIdClean = courseId.split(",")[1];
        console.log(courseIdClean);
        fetchUserGroups(user.school_id, courseIdClean);
        fetchProposal(courseIdClean);

        // fetchGroupMembers(user.school_id, courseId).then((res) => {
        //     setUserGroups(res.data);
        // });;
        console.log("------");
        console.log(userGroups);
        console.log(userProposals);
    });

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        setCurrentUserClass(e.target.value);
    };

    return (
        <div className="container-sm vh-100 p-2">
            <label className="form-label mt-3">Course</label>
            <select
                id="course_name"
                className="form-select"
                value={currentUserClass}
                onChange={handleInputChange}
            >
                {userClasses.map((course) => {
                    return (
                        <option>
                            {course.course_name}, {course.course_id}
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
                                <td> Course ID</td>
                                <td> Group Members</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userGroups ? (
                                userGroups.map((group) => {
                                    return (
                                        <tr>
                                            <td>{group.group_no || ""} </td>
                                            <td> {group.course_id || ""}</td>
                                            <td> </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </Table>
                    <div className="mt-5">
                        <h5>My Proposals</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <td> Submission ID</td>
                                    <td> Group Number</td>
                                    <td> Topic</td>
                                    <td> Description</td>
                                </tr>
                            </thead>
                            <tbody>
                                {userProposals ? (
                                    userProposals.map((proposal) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {proposal.submission_id ||
                                                        ""}
                                                </td>
                                                <td>
                                                    {proposal.group_no || ""}
                                                </td>
                                                <td> {proposal.topic || ""}</td>
                                                <td>
                                                    {proposal.description || ""}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    <ProposalRequestForm userClasses={userClasses} />
                </div>
            )}
        </div>
    );
};
