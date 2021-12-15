import { database } from "../database";
import { ClassList } from "../types";
import { Request, Response } from "express";

export async function searchStudent (req: Request | any, res: Response) {
    const db = await database();
    const { course_name, student_id }: ClassList = req.query;

    db.query(`
            SELECT DISTINCT *
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

export async function fetchStudentClasses (req: Request | any, res: Response) {
    const db = await database();
    const {student_id} = req.query;

    db.query(`
            SELECT DISTINCT *
            FROM groupee.course AS C
            INNER JOIN groupee.classlist AS L
                ON C.course_id=L.course_id
            INNER JOIN ( 
                SELECT student_id
                FROM groupee.student 
                WHERE student_id=${student_id} ) AS S 
                ON S.student_id=L.student_id`
    ).then((result) => {
            const data = Object(result[0])[0];

            if(data && data.length == 0) {
                res.json({message: `Student ${student_id} is not enrolled in any courses.`});
            } else {
                res.json(result[0]);
            }

        }).catch((err) => {
            console.log(err);
            res.json();
        });
}