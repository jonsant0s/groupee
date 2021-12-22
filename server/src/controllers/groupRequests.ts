import { Request, Response } from "express";
import { database } from "../database";
import { NewRequest } from "../types";

export async function updateGroupRequest(req: Request, res: Response) {
    const db = await database();
    const { post_id, status } = req.body;
    console.log(status);

    db.query(`
        UPDATE groupee.group_request
        SET status="${status? status:`status`}"
        WHERE request_id=${post_id}`
    )
    .then(() => {
        return res.json({
            status:200,
            message: `Updated group request #${post_id} status to ${status}.`
        });
    })
    .catch((err) => {
        return res.send(err);
    })
}

// In home, gets all the group requests the user has posted
export async function getGroupPreferencePost(req: Request, res: Response) {
    const db = await database();
    const { school_id } = req.query;

    db.query (
        `SELECT *
         FROM groupee.group_request
         WHERE poster_id=${school_id}`
    ).then((data) => {
        return res.send(data);
    })
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed to retrieve posts.`
        });
    });
}

// Delete posting from forum
export async function deleteGroupPreference(req: Request, res: Response) {
    const db = await database();
    const { request_id } = req.query;

    db.query (
        `DELETE FROM groupee.group_request
         WHERE request_id=${request_id}`
    )
    .then(() => {
        return res.json({
            status:200,
            message: `Deleted preference post #${request_id}.`
        });
    })
    .catch((err) => {
        console.log(err);
        return res.json({
            status:400,
            message: `Failed delete preference #${request_id}.`
        });
    });
}

export async function getGroupRequests(req: Request, res: Response) {
    const db = await database();
    const { school_id } = req.query;

    const id = await db.query (
        `SELECT DISTINCT R.*, A.username, C.course_name
         FROM groupee.group_request AS R
         JOIN ( SELECT *
                FROM groupee.course AS X
                WHERE EXISTS (
                    SELECT *
                    FROM groupee.classlist AS Y
                    WHERE Y.student_id=${school_id} OR
                          (X.course_id=Y.course_id AND
                           X.instructor_id=${school_id}))
                ) AS C
            ON C.course_id=R.course_id
         JOIN groupee.student_account AS A
            ON A.student_id=R.poster_id`
    );

    const data = Object(id[0]);

    if (data) {
        return res.send(data);
    } else {
        return res.send(`Failed to retrieve group requests.`);
    }
}

export async function createGroupRequest(req: Request, res: Response) {
    const db = await database();
    const pref: NewRequest = req.body;

    const posts = await db.query(`
        SELECT C.course_id, X.request_id
        FROM groupee.course AS C, groupee.group_request AS X
        WHERE EXISTS (
            SELECT R.course_id, R.request_id
            FROM groupee.group_request AS R
            WHERE R.poster_id=${pref.student_id} AND
                C.course_id=R.course_id AND
                C.course_name="${pref.courseName}")`
        )
    const prevPost = Object(posts[0]);
    
    if(prevPost.length > 0) {
        return res.json({
            status:400,
            message: `You have an existing post for ${pref.courseName}. (Post ID: #${prevPost[0].request_id})`
        });
    }

    db.query(`
        INSERT IGNORE INTO groupee.group_request (course_id, request_id, poster_id, availability, size, section, comments)
            SELECT course_id, ${pref.requestID}, ${pref.student_id}, "${pref.availability}", ${pref.group_size}, ${pref.section},"${pref.comments}"
            FROM groupee.course AS C
            WHERE C.course_name="${pref.courseName}"`
    )
    .then(() => {
        return res.json({
            status:200,
            message: `Created group preference post #${pref.requestID} for ${pref.courseName}.`
        });
    })
    .catch((err) => {
        console.log(err)
        return res.json({
            status:400,
            message: `Failed to post new preference (#${pref.requestID}) for ${pref.courseName}.`
        });
    })
}