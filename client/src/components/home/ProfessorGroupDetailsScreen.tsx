import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

import * as Api from "api/professor-pages/ProfessorReviewJoin";
import { useEffect, useState } from "react";

interface ProfessorProps {
    user: UserInfo
}

interface GroupRequestInfo {
    availability: string,
    course_id: number,
    course_name:string,
    first_name: string,
    last_name:string,
    poster_id: number,
    request_id: number,
    section:number,
    size: number
}

interface Members {
    first_name: string,
    last_name: string,
    section_no: number
}

export const ProfessorGroupDetailsScreen:React.FC<ProfessorProps> = ({ user }) => {
    const [postedPreferences, setPostedPreferences] = useState<GroupRequestInfo[]>([]);
    const [members, setMembers] = useState<Members[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
		Api.GetStudentGroupRequest(user.school_id).then((res) => {
			setPostedPreferences(res);      // Get all user requests
		});
    }, [loading]);

	const handleUpdateStatus = ( post_id:number, status: string) => {
		Api.UpdateGroupRequest(post_id, status)     // Update group request to approves
        .then((res) => {
            if(status==="Approved") {
                return Api.CreateGroups(post_id);   // Create new group
            }
		})
        .then((res) => {
            console.log(res);
            setLoading(!loading);
        });
	}

    const getMembers = (post_id:number) => {
        Api.GetMemberInfo(post_id).then((res) => {
            console.log(res);    // Returns all members in request
            setMembers(res);     // Loop through to display { first_name, last_name, section_no }
		});
    }

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
                    { postedPreferences && postedPreferences.length > 0 ?
						postedPreferences.map((pref) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{ pref.first_name } { pref.last_name } ({ pref.poster_id })</td>
                                        <td> #0{ pref.section } </td>
                                        <td> #{ pref.request_id } </td>
                                        <td onClick={() => { getMembers(pref.request_id) }} > {pref.size}/4</td>
                                        <td>
                                            <span>
                                                <Button className="btn-success mr-2" size="sm" onClick={() => { handleUpdateStatus(pref.request_id, "Approved") }}> Approve </Button>
                                            </span>
                                            <span>
                                                <Button className="btn-danger" size="sm" onClick={() => { handleUpdateStatus(pref.request_id, "Rejected") }}>Reject</Button>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        :
                        <tbody>
                            <th scope="row">No group requests available.</th>
                        </tbody>
                    }
                </Table>
            </div>

            <div className="col-md-12 border p-5">
                <h5>Submitted Proposals</h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Group No. </td>
                            <td> Title </td>
                            <td> Description </td>
                            <td> Submission Date </td>
                            <td> Decision </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td> 7 </td>
                            <td > My title </td>
                            <td className="w-25"> Would like to build a game for this class </td>
                            <td> Time stamp </td>
                            <td>
                                <span>
                                    <Button className="btn-success mr-2" size="sm">Approve</Button>
                                </span>
                                <span>
                                    <Button className="btn-danger" size="sm">Reject</Button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
