import { Request, Response } from "express";
import { database } from "../database";
import { CommentInfo } from "../types";


// Returns array of comments depending on post_id GET: http://localhost:3001/comment?post_id=800652
export async function getStudentComments(req: Request, res: Response) {
    const db = await database();
    const { post_id, commenter_id } = req.query;

    db.query(`
        SELECT DISTINCT C.*, A.username,
        REPLACE (REPLACE (C.time_stamp, 'T', ' '), '.000Z', '') AS time_stamp
        FROM groupee.comment AS C
        INNER JOIN (
            SELECT *
            FROM groupee.group_request
            WHERE request_id=${post_id}) AS R
        ON C.post_id=R.request_id
        INNER JOIN (SELECT * FROM groupee.student_account WHERE student_id=${commenter_id}) AS A
            ON A.student_id=C.commenter_id`
    ).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        console.log(err);
        res.send("Something went wrong.");
    })
}
export async function getComments(req: Request, res: Response) {
    const db = await database();
    const { post_id } = req.query;

    db.query(`
        SELECT DISTINCT C.*, A.username,
        REPLACE (REPLACE (C.time_stamp, 'T', ' '), '.000Z', '') AS time_stamp
        FROM groupee.comment AS C
        INNER JOIN (
            SELECT *
            FROM groupee.group_request
            WHERE request_id=${post_id}) AS R
        ON C.post_id=R.request_id
        INNER JOIN groupee.student_account AS A
            ON A.student_id=C.commenter_id`
    ).then((data) => {
        res.send(data[0]);
    }).catch((err) => {
        console.log(err);
        res.send("Something went wrong.");
    })
}

// Delete own comment
export async function deleteComment(req: Request, res: Response) {
    const db = await database();
    const param:CommentInfo = req.body;

    db.query(`
        DELETE FROM groupee.comment
        WHERE ( post_id=${param.post_id} AND
                commenter_id=${param.commenter_id} AND
                time_stamp="${param.time_stamp}")`
    ).then(() => {
        res.send("Successfully deleted your comment.");
    }).catch((err) => {
        console.log(err)
        res.send("Something went wrong.");
    })
}

export async function postComment(req: Request, res: Response) {
    const db = await database();
    const param:CommentInfo = req.body;

    db.query(`
        INSERT INTO groupee.comment (post_id, commenter_id, content)
        VALUES (
            ${param.post_id},
            ${param.commenter_id},
            "${param.content}")`
    ).then(() => {
        res.send(`Added new comment to post: ${param.post_id}`);
    }).catch((err) => {
        res.send(`Failed to add new comment....\n\n${param.post_id} does not exist.`);
    })
}