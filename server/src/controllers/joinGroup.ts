import { Request, Response } from "express";
import { database } from "../database";
import { JoinRequest } from "../types";


export async function deleteJoinRequest(req: Request | any, res: Response) {
    const db = await database();
    const { student_id, post_id } = req.body;

    db.query(`
        DELETE FROM groupee.group_request
        WHERE student_id=${student_id} AND post_id=${post_id}`
    )
    .then(() => {
        return res.send(`Cancelled request to join group posting #${post_id}`);
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

    db.query(`
        SELECT DISTINCT J.*
        FROM ( SELECT * FROM groupee.join_request WHERE conflict=1 ) AS J
        INNER JOIN (
            SELECT G.request_id, G.section, G.size
            FROM groupee.group_request AS G
            INNER JOIN (
                SELECT course_id 
                FROM groupee.course 
                WHERE instructor_id=${professor_id}) AS C
            ON C.course_id=G.course_id) AS R
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

    db.query(`
        SELECT DISTINCT *
        FROM groupee.join_request
        WHERE student_id=${student_id}`
    )
    .then((data) => {
        return res.send(data[0]);
    })
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed retrieve join requests by Student #${student_id}`
        });
    })
}

// From student poster home page, takes student ID of user
export async function getPostingRequests(req: Request | any, res: Response) {
    const db = await database();
    const { poster_id } = req.query;

    db.query(`
        SELECT DISTINCT J.*, R.section
        FROM ( SELECT * FROM groupee.join_request WHERE conflict=0 ) AS J
        INNER JOIN (
            SELECT request_id, section
            FROM groupee.group_request
            WHERE poster_id=${poster_id}) AS R
        ON J.post_id=R.request_id`
    )
    .then((data) => {
        return res.send(data[0]);
    })
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed retrieve join requests.`
        });
    })
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
                SELECT first_name, last_name
                FROM groupee.student
                WHERE student_id=${param.student_id}`)
    })
    .then((student) => {
        const studentName = Object(student[0])[0]
        console.log(studentName);

        return res.json({
            status:200,
            message: `Updated student: ${studentName.first_name} ${studentName.last_name}'s request to: ${param.status}'`
        });
    })
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed join request for posting #${param.post_id}`
        });
    })
}


// Student tries to join a group
export async function requestToJoin(req: Request | any, res: Response) {
    const db = await database();
    const param: JoinRequest = req.body;

    db.query(`
        INSERT INTO groupee.join_request (post_id, student_id, join_group, conflict)
        VALUES (${param.post_id}, ${param.student_id}, ${param.join}, 1)`
    )
    .then(() => {
        return res.json({
            status:200,
            message: `Submitted a request to join group in posting #${param.post_id}.`
        });
    })
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed to submit request.`
        });
    })
}