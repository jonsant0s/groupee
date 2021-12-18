import { useEffect, useState } from "react";

import * as Api from "../../../api/student-groups/StudentGroup.api";
import * as Type from "./StudentGroupDetailsScreen.types";

import { Button, Table } from "react-bootstrap";
import { getCurrentUser } from "services";

export const StudentGroupDetailsScreen = () => {
	const user: UserInfo = getCurrentUser();
	const [loading, setLoading] = useState(false);
	const [postedPreferences, setPostedPreferences] = useState<
		Type.PostedPreferencesType[]
	>([]);

	const [joinRequests, setJoinRequests] = useState<JoinInfo[]>([]);

	useEffect(() => {
		Api.GetPreferencePosts(user.school_id).then((res) => {
			setPostedPreferences(res);
		});

		Api.GetUserJoinRequests(user.school_id).then((res) => {
			setJoinRequests(res);
		});
	}, [loading]);

	const handleUpdateStatus = ( post_id:number, requester_id: number, status: string ) => {
		Api.UpdateStudentRequest(post_id, requester_id, status).then((res) => {
			console.log(res);
			setLoading(!loading);
		});
	}

	return (
		<div className="col-md-10 p-2">
			<div className="col-md-12 border p-5">
				<h5>My Preference Posts</h5>
				<Table>
					<thead>
						<tr>
							<td> Forum Post Id</td>
							<td> Requested By</td>
							<td> Group size</td>
							<td> Class Name</td>
							<td> Decision</td>
							<td> Comment</td>
						</tr>
					</thead>
					{ postedPreferences && postedPreferences.length>0 &&
						postedPreferences.map((pref) => {
							return (
								<tbody>
									<tr>
										<td> #{ pref.post_id } </td>
										<td> { pref.first_name } { pref.last_name } ({ pref.student_id }) </td>
										<td> { pref.size }/4 </td>
										<td> { pref.course_name } ({ pref.course_id }) </td>
										<td>
											<span className="mr-2">
												<Button value="Accept" size="sm" onClick={() => { handleUpdateStatus(pref.post_id, pref.student_id, "Accepted") }}>
													Accept
												</Button>
											</span>
											<span>
												<Button className="btn-danger" value="Reject" size="sm" onClick={() => { handleUpdateStatus(pref.post_id, pref.student_id, "Rejected") }}>
													Reject
												</Button>
											</span>
										</td>
										<td> {pref.content}</td>
									</tr>
								</tbody>
							);
						}) }
				</Table>

				<h5 className="mt-5">My Join Requests</h5>
				
				<Table>
					<thead>
						<tr>
							<td> Forum Post Id </td>
							<td> Class Name </td>
							<td> Availability </td>
							<td> Members </td>
							<td> Status </td>
						</tr>
					</thead>
					{ joinRequests && joinRequests.length>0 && 
						joinRequests.map((request) => {
							return (
								<tbody>
									<tr>
										<td> #{ request.post_id } </td>
										<td> { request.course_name } </td>
										<td> { request.availability } </td>
										<td> { request.size }/4 </td>
										<td className={`
											${ request.status==="Accepted" ? "text-success" : 
											   request.status==="Rejected" ? "text-danger" :
											   "text-secondary"} 
										`}> 
											{ request.status } 
										</td>
									</tr>
								</tbody>
							)
						})
					}
					
				</Table>
			</div>
		</div>
	);
};
