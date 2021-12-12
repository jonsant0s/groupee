import { Request, Response } from "express";
import { database } from "../database";
import { Credentials, NewRequest } from "../types";

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
        INSERT INTO groupee.group_request (requester_id, requested_members, availability, size)
        VALUES ("${pref.id}", 
                "${pref.members}", 
                "${pref.availability}", 
                "${pref.size}")`
    )
        .then(() => {
            return res.send(
                `Submitted group creation request with members: ${pref.members}.`
            );
        })
        .catch((err) => {
            return res.send(`You have an existing request under review.`);
        });

    // Only students can create requests
    // May give student a warning if student ID they enter does not exist in database
}

// Export modules at end
