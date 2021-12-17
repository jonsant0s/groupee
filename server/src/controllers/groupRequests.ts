import { Request, Response } from "express";
import { database } from "../database";
import { NewRequest } from "../types";

// Posting should update everytime new student joins
export async function updateMemberCount(req: Request, res: Response) {
    const db = await database();
    const { post_id, member_count } = req.query;

    db.query(`
        UPDATE groupee.group_request
        SET size=${member_count}
        WHERE post_id=${post_id}`
    )
    .then(() => {
        return res.json({
            status:200,
            message: `Added new member to group request.`
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
    const { request_id } = req.body;

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
    .catch(() => {
        return res.json({
            status:400,
            message: `Failed delete preference #${request_id}.`
        });
    });
}

// Gets all posts on forum depending on classes student is enrolled in
export async function getGroupRequests(req: Request, res: Response) {
    const db = await database();
    const { school_id } = req.query;

    const id = await db.query (
        `SELECT DISTINCT R.*, A.username, C.course_name
         FROM groupee.group_request AS R
         JOIN ( SELECT X.course_id, X.course_name, S.student_id
                FROM groupee.course AS X
                JOIN groupee.classlist AS L
                    ON X.course_id=L.course_id
                JOIN ( 
                    SELECT student_id
                    FROM groupee.student 
                    WHERE student_id=${school_id} ) AS S
                ON S.student_id=L.student_id ) AS C
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

// Posts new group request on forum
export async function createGroupRequest(req: Request, res: Response) {
    const db = await database();
    const pref: NewRequest = req.body;

    db.query(`
        SELECT course_id
        FROM groupee.course
        WHERE course_name="${pref.courseName}"`)
    .then((result) => {
        const course = Object(result[0])[0];
        
        return db.query(`
            INSERT IGNORE INTO groupee.group_request (request_id, poster_id, availability, size, course_id, section, comments)
            VALUES (${pref.requestID}, 
                    ${pref.student_id}, 
                    "${pref.availability}", 
                    ${pref.group_size},
                    ${course.course_id},
                    ${pref.section},
                    "${pref.comments}")`)
    })
    .then(() => {
        return res.json({
            status:200,
            message: `Created group preference post #${pref.requestID} for ${pref.courseName}.`
        });
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: `Failed to post new preference (#${pref.requestID}) for ${pref.courseName}.`
        });
    })
}