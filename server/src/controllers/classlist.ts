import { database } from "../database";
import { ClassList } from "../types";
import { Request, Response } from "express";

export async function searchStudent (req: Request, res: Response) {
    const db = await database();
    const { course_name, student_id }: ClassList = req.body;

    db.query(`
            SELECT *
            FROM (
                SELECT course_id
                FROM groupee.course
                WHERE course_name="${course_name}" ) AS C
            JOIN groupee.classlist AS L
                ON C.course_id=L.course_id
            JOIN ( 
                SELECT * 
                FROM groupee.student 
                WHERE ${student_id ? `student_id=${student_id}`:`1=1`}) AS S
                ON S.student_id=L.student_id`
                
        ).then((result) => {
            const data = Object(result[0])[0];

            if(data && data.length == 0) {
                res.json({message: `Student ${student_id} is not enrolled in "${course_name}"`});
            } else {
                res.json(result[0]);
            }

        }).catch((err) => {
            console.log(err);
            res.json();
        });

}