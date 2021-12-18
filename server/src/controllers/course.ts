import { database } from "../database";
import { Request, Response } from "express";

export async function fetchProfessor (req: Request | any, res: Response) {
    const db = await database();
    const {course_id} = req.query;

    db.query(`
            SELECT *
            FROM groupee.account as A
            INNER JOIN groupee.professor as P
            ON A.username = P.username
            INNER JOIN (
                SELECT *
                FROM groupee.course
                WHERE course_id =${course_id} ) as C
            ON C.instructor_id = P.professor_id
            `
    ).then((result) => {
            const data = Object(result[0])[0];
            
            if(data && data.length == 0) {
                res.json({message: `Student ${course_id} is not enrolled in any courses.`});
            } else {
                res.json(result[0]);
                console.log(data);
            }

        }).catch((err) => {
            console.log(err);
            res.json();
        });
}