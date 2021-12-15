import { Request, Response } from "express";
import { database } from "../database";
import { NewRequest, Credentials } from "../types";

export async function getGroupRequests(req: Request, res: Response) {
    const db = await database();
    const { username }: Credentials = req.body;

    const id = await db.query(
        `SELECT S.student_id
         FROM groupee.student S, groupee.account A, groupee.student_account B
         WHERE 
            A.username=B.username AND 
            A.username="${username}" AND 
            S.student_id=B.student_id`
    );

    const data = Object(id[0])[0];

    if (data) {
        const result = await db.query(
            `SELECT * FROM groupee.group_request
             WHERE requester_id="${data.student_id}"`
        );

        return res.json(result[0]);

    } else {
        const pid = await db.query(
            `SELECT id FROM groupee.professor
             WHERE username="${username}"`
        );

        const pdata = Object(pid[0])[0];

        if (pdata) {
            const result = await db.query(`SELECT * FROM groupee.group_request`);
            return res.json(result[0]);
        } else {
            return res.json({
                message: `You have not submitted any group requests.`,
            });
        }
    }
}

export async function createGroupRequest(req: Request, res: Response) {
    const db = await database();
    const pref: NewRequest = req.body;

    db.query(`
        INSERT INTO groupee.group_request (request_id, poster_id, availability, size, course_id, section, comments)
        VALUES (${pref.requestID}, 
                ${pref.student_id}, 
                "${pref.availability}", 
                ${pref.group_size},
                ${pref.class_id},
                ${pref.section},
                "${pref.comments}")`
        )
        .then(() => {
            return db.query(`SELECT course_name FROM groupee.course WHERE course_id=${pref.class_id}`);
        })
        .then((courseN) => {
            const course = Object(courseN[0])[0];
            return res.json({
                status:200,
                message: `Created group preference post #${pref.requestID} for ${course.course_name}.`
            });
        })
        .catch(() => {
            return res.json({
                status:400,
                message: `Failed to post new preference (#${pref.requestID}) for Course ID: ${pref.class_id}.`
            });
        });
}