import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

import * as Api from "api/professor-pages/ProfessorReviewJoin";
import { useEffect, useState } from "react";

interface ProfessorProps {
    user: UserInfo;
}

interface GroupRequestInfo {
    availability: string;
    course_id: number;
    course_name: string;
    first_name: string;
    last_name: string;
    poster_id: number;
    request_id: number;
    section: number;
    size: number;
}

interface Members {
    first_name: string;
    last_name: string;
    section_no: number;
}

export const ProfessorGroupDetailsScreen: React.FC<ProfessorProps> = ({
    user,
}) => {
    const [postedPreferences, setPostedPreferences] = useState<
        GroupRequestInfo[]
    >([]);
    const [members, setMembers] = useState<Members[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Api.GetStudentGroupRequest(user.school_id).then((res) => {
            setPostedPreferences(res); // Get all user requests
        });
    }, [loading]);

    const handleUpdateStatus = (postPref: any, status: string) => {
        Api.UpdateGroupRequest(postPref.request_id, status) // Update group request to approves
            .then((res) => {
                if (status === "Approved") {
                    return Api.CreateGroups(postPref.request_id); // Create new group
                }
            })
            .then((res) => {
                if (status == "Approved") {
                    console.log(postPref.course_id);
                    console.log(user.school_id);
                    return Api.SetGroupId(user.school_id, postPref.course_id);
                }
            })
            .then((res) => {
                setLoading(!loading);
            });
    };

    const getMembers = (post_id: number) => {
        Api.GetMemberInfo(post_id).then((res) => {
            console.log(res); // Returns all members in request
            setMembers(res); // Loop through to display { first_name, last_name, section_no }
        });
    };

    return (
        <div>
            <div className="col-md-12 border p-5">
                <h5> Join Requests </h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Requested By </td>
                            <td> Requester Section </td>
                            <td> Forum Post ID/Section </td>
                            <td> Current Members </td>
                            <td> Decision </td>
                        </tr>
                    </thead>
                    {postedPreferences && postedPreferences.length > 0 ? (
                        postedPreferences.map((pref) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>
                                            {pref.first_name} {pref.last_name} (
                                            {pref.poster_id})
                                        </td>
                                        <td> #0{pref.section} </td>
                                        <td> #{pref.request_id} </td>
                                        <td>
                                                <Button
                                                    className="btn-success mr-2"
                                                    size="sm"
                                                    onClick={() => {
                                                        getMembers(pref.request_id);
                                                    }}
                                                >
                                                    {" "}
                                                    Approve{" "}

                                                    </Button>
                                            
                                            {" "}
                                            {pref.size}/4
                                        </td>
                                        <td>
                                            <span>
                                                <Button
                                                    className="btn-success mr-2"
                                                    size="sm"
                                                    onClick={() => {
                                                        handleUpdateStatus(
                                                            pref,
                                                            "Approved"
                                                        );
                                                    }}
                                                >
                                                    {" "}
                                                    Approve{" "}
                                                </Button>
                                            </span>
                                            <span>
                                                <Button
                                                    className="btn-danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        handleUpdateStatus(
                                                            pref,
                                                            "Rejected"
                                                        );
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                    ) : (
                        <tbody>
                            <th scope="row">No group requests available.</th>
                        </tbody>
                    )}
                </Table>
            </div>
        </div>
    );
};
