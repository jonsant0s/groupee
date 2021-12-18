export interface JoinGroupRequestBody {
	post_id: number;
	student_id: number;
	join: boolean;
	status?: string;
}

export interface PostCommentBody {
	post_id: number;
	commenter_id: number;
	content: string;
}

export interface DeleteCommentBody {
	post_id: number;
	commenter_id: number;
	time_stamp: string;
}

export interface GetCommentsRequest {
	commenter_id: number;
	content: string;
	join_group: boolean;
	post_id: number;
	status: string;
	time_stamp: string;
	username: string;
}
