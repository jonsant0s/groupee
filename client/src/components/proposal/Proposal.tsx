import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
    getCurrentUser,
    getUserClasses,
    getUserGroups,
    getUserProposals,
} from "services";
import { ProfessorProposalPage } from "./ProfessorProposalPage";
import { ProposalRequestForm } from "./ProposalRequestForm";

import * as Api from "./ProposalHelpers"

interface ProposalProps {
    class_id: number,
}
export const Proposal = () => {
    const [user, setUser] = useState(getCurrentUser);
    const [userClasses, setUserClasses] = useState(getUserClasses);
    const [userGroups, setUserGroups] = useState(getUserGroups);
    const [userProposals, setUserProposals] = useState(getUserProposals);
    const [groupMembers, setGroupMembers] = useState(getUserProposals);
    const [currentUserClass, setCurrentUserClass] = useState(
        userClasses[0].course_id
    );

    useEffect(() => {
        const school_id = user.role === "Professor" ? null : user.school_id;
        const courseId = currentUserClass;

        Api.fetchUserGroups(user.school_id, currentUserClass)
        .then((groups) => {
            setUserGroups(groups);
        })
        .then(() => {
            return Api.fetchProposal(courseId, school_id);
        })
        .then((proposals) => {
            setUserProposals(proposals);
        })
        .then(() => {
            return Api.fetchGroupMembers(user.school_id, courseId);
        })
        .then((members) => {
            setGroupMembers(members);
        });
    },[currentUserClass]);

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        const newCourse = e.target.value.split(",")[1];

        setCurrentUserClass(newCourse);
    };

    const mapGroupMembers = () => {
        return groupMembers.map((member) => {
            return (
                <h6>{member.first_name} {member.last_name} ({member.student_id})</h6>
            )
        })
    }
    return (
        <div className="container-sm vh-100 p-2">
            <label className="form-label mt-3">Course</label>
            <select
                id="course_name"
                className="form-select"
                value={currentUserClass}
                onChange={handleInputChange}
            >
                { userClasses.map((course) => {
                    return (
                        <option>
                            {course.course_name}, {course.course_id}
                        </option>
                    );
                })}
            </select>

            { user.role == "Professor" ? (
                <ProfessorProposalPage proposals={userProposals}/>
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
                            { userGroups && groupMembers && (
                                userGroups.map((group) => {
                                    return (
                                        <tr>
                                            <td>{group.group_no} </td>
                                            <td> {group.course_id}</td>
                                            <td> {mapGroupMembers()} </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </Table>
                    <div className="mt-5">
                        <h5> My Proposals </h5>
                        <Table>
                            <thead>
                                <tr>
                                    <td> Submission ID</td>
                                    <td> Group Number</td>
                                    <td> Topic</td>
                                    <td> Description</td>
                                    <td> Submitted on</td>
                                </tr>
                            </thead>
                            <tbody>
                                { userProposals && (
                                    userProposals.map((proposal) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {proposal.submission_id}
                                                </td>
                                                <td>
                                                    {proposal.group_no}
                                                </td>
                                                <td> {proposal.topic}</td>
                                                <td>
                                                    {proposal.description}
                                                </td>
                                                <td>
                                                    {proposal.submission_date}
                                                </td>
                                            </tr>
                                        );
                                    })
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
