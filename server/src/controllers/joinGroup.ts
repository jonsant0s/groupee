import { Request, Response } from "express";
import { database } from "../database";
import { JoinRequest } from "../types";

export async function deleteJoinRequest(req: Request | any, res: Response) {
	const db = await database();
	const { student_id, post_id } = req.body;

	db.query(
		`
        DELETE FROM groupee.group_request
        WHERE student_id=${student_id} AND post_id=${post_id}`
	)
	.then(() => {
		return res.send(
			`Cancelled request to join group posting #${post_id}`
		);
	})
	.catch((err) => {
		return res.send(err);
	});
}

// Professor query. If student tries to join a group from a different section
// Or student tries to join group that is full
export async function getRequestIssues(req: Request | any, res: Response) {
	const db = await database();
	const { professor_id } = req.query;
	const maxCap=4;

	db.query(
		`
        SELECT DISTINCT J.*, R.section, R.size
        FROM ( SELECT * FROM groupee.join_request ) AS J
        INNER JOIN (
            SELECT G.*
            FROM (
				SELECT *
				FROM groupee.group_request 
				WHERE size>=${maxCap}) AS G
            INNER JOIN (
                SELECT course_id 
                FROM groupee.course 
                WHERE instructor_id=${professor_id}) AS C
            ON C.course_id=G.course_id ) AS R
        ON J.post_id=R.request_id`
	)
	.then((data) => {
		return res.send(data[0]);
	})
	.catch((err) => {
		return res.send(err);
	});
}

export async function getJoinRequest(req: Request | any, res: Response) {
	const db = await database();
	const { student_id } = req.query;

	db.query(
		`
        SELECT DISTINCT R.*, C.course_name, G.availability, G.section, G.size
        FROM ( 
			SELECT DISTINCT *
			FROM groupee.join_request
			WHERE student_id=${student_id} ) AS R
		INNER JOIN groupee.group_request as G
			ON R.post_id=G.request_id
		INNER JOIN groupee.course AS C
			ON G.course_id=C.course_id
		` 
	)
	.then((data) => {
		return res.send(data[0]);
	})
	.catch((err) => {
		console.log(err)
		return res.json({
			status: 400,
			message: `Failed retrieve join requests by Student #${student_id}`,
		});
	});
}

// From student poster home page, takes student ID of user
export async function getPostingRequests(req: Request | any, res: Response) {
	const db = await database();
	const { school_id } = req.query;

	db.query(`
        SELECT DISTINCT J.*, R.section, R.course_id, R.size, C.course_name, S.first_name, S.last_name
        FROM (
			SELECT *
			FROM groupee.join_request
			WHERE status="pending" ) AS J
        INNER JOIN (
            SELECT request_id, section, course_id, size
            FROM groupee.group_request
            WHERE poster_id=${school_id}) AS R
        ON J.post_id=R.request_id
		INNER JOIN groupee.course AS C
			ON R.course_id=C.course_id
		INNER JOIN groupee.student AS S
			ON S.student_id=J.student_id`
	)
	.then((data) => {
		return res.send(data[0]);
	})
	.catch((err) => {
		console.log(err)
		return res.json({
			status: 400,
			message: `Failed retrieve join requests.`,
		});
	});
}

// Accepted or rejected request of a student. Could be from prof or poster.
// Query is written so that ***If student tries to join a group from a different section Or student tries to join group that is full***
// Request goes to professor instead of student(poster on forum)
export async function updateJoinRequest(req: Request | any, res: Response) {
	const db = await database();
	const param: JoinRequest = req.body;

	db.query(`
        UPDATE groupee.join_request
        SET status="${param.status}"
        WHERE (
            post_id=${param.post_id} AND
            student_id=${param.student_id})`
	)
	.then(() => {
		return db.query(`
			UPDATE groupee.group_request
			SET size = ${param.status==="Accepted" ? `size+1`:`size`}
			WHERE request_id=${param.post_id}
		`)
	})
	.then(() => {
		let message = `Added a member to your group request#${param.post_id}!'`;

		if(param.status==="Rejected") {
			message = `Rejected request to join your group.'`;
		}

		return res.json({
			status: 200,
			message: message
		});
	})
	.catch(() => {
		return res.json({
			status: 400,
			message: `Failed to Accept/Reject request to join your group. #${param.post_id}`,
		});
	});
}

// Student tries to join a group
export async function requestToJoin(req: Request | any, res: Response) {
	const db = await database();
	const param: JoinRequest = req.body;

	db.query(`
		INSERT INTO groupee.join_request (post_id, student_id)
		SELECT DISTINCT ${param.post_id}, ${param.student_id}
		FROM groupee.group_request, groupee.student 
		WHERE NOT EXISTS (
				SELECT *
				FROM groupee.join_request
				WHERE post_id=${param.post_id} AND student_id=${param.student_id})`
	)
	.then(() => {
		return res.json({
			status: 200,
			message: `Submitted a request to join group in posting #${param.post_id}. Your request status: Pending`
		});
	})
	.catch(() => {
		return res.json({
			status: 400,
			message: `Failed to submit request.`,
		});
	});
}
