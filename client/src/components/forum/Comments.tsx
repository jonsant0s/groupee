import { useEffect, useState, useCallback } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";

import { getUserClasses } from "../../services";
import * as Api from "../../api/comments/Comments.api";

interface CommentsProps {
	post: Posts;
	user: UserInfo;
}

const memberCap=4;

export const Comments: React.FC<CommentsProps> = ({ post, user }) => {
	const [show, setShow] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [comments, setComments] = useState<PostComment[]>([]);
	const [postComment, setPostComment] = useState<UserComment>({
		post_id: post.request_id,
		commenter_id: user.school_id,
		content: "",
		status: "",
	});

	useEffect(() => {
		Api.fetchComments(post.request_id)
			.then((res) => {
				setComments(res);
				setRefresh(false);
			})
			.catch((err) => console.log(err));
		if (!refresh) return;
	}, [refresh]);

	const handleOnPost = () => {
		Api.postCommentRequest(postComment)
			.then((res) => setRefresh(true))
			.catch((err) => console.log(err));
	};

	const handleDeleteComment = (post_id: number, time_stamp: string) => {
		let deleteRequestBody = {
			post_id: post_id,
			commenter_id: user.school_id,
			time_stamp: time_stamp,
		};

		Api.deleteCommentRequest(deleteRequestBody)
			.then((res) => setRefresh(true))
			.catch((err) => console.log(err));
	};

	const handleOnRequest = useCallback(() => {
		let joinRequestBody = {
			post_id: post.request_id,
			members: post.size,
			student_id: user.school_id,
			join: true,
		};

		Api.joinGroupRequest(joinRequestBody)
			.then((res) => {
				setPostComment((state) => ({
					...state,
					post_id: post.request_id,
					status: "pending",
				}));
			})
			.catch((err) => console.log(err));
	}, []);

	const handleInputChange = useCallback(({ target }) => {
		setPostComment((state) => ({
			...state,
			[target.name]: target.value,
		})); 
	}, []);

	return (
		<>
			<a className="text-reset text-decoration-none" href="#">
				<a className="h4" onClick={() => setShow(!show)}>
					{post.course_name}: Section 0{post.section}
				</a>
				{ user.role != "Professor" && user.school_id!=post.poster_id &&
					<button
						id="join"
						onClick={handleOnRequest}
						className={`ml-3 btn btn-sm ${
							postComment.status === "pending" ? "btn-outline-secondary" :
							post.size===memberCap ? "btn-secondary disabled" : "btn-outline-primary"
						}`}
					>
						{post.size===memberCap ? "Full" : "Join"}
					</button>
				}

			</a>
			<Modal show={show} onHide={() => setShow(!show)} className="p-3">
				<Modal.Header closeButton>
					<Modal.Title>
						{post.course_name}: Section 0{post.section}{" "}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>{post.comments}</p>- {post.username} Student ID:
					{post.poster_id}
				</Modal.Body>

				{comments &&
					comments.map((comment) => {
						return (
							<div className="border-top row px-3 m-2">
								<div className="col-md-10">
									<h6 className=" pt-2">
										{comment.username}
										<small className="text-muted">
											{" "}
											Student #{comment.commenter_id}{" "}
										</small>
										<br />
										<small className="text-muted">
											{" "}
											{comment.time_stamp}{" "}
										</small>
									</h6>
									<p>{comment.content}</p>
								</div>

								<div className="col-md-2 mt-4">
									{user.school_id ===
										comment.commenter_id && (
										<CloseButton
											onClick={() => {
												handleDeleteComment(
													post.request_id,
													comment.time_stamp
												);
											}}
										/>
									)}
								</div>
							</div>
						);
					})}

				<Modal.Footer>
					<div className="w-100 row">
						<h6>{user.username}</h6>
						<textarea
							name="content"
							rows={3}
							onChange={handleInputChange}
						/>
						<div className="text-right">
							<Button
								className="w-25 mt-2"
								onClick={handleOnPost}
							>
								Post
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};
