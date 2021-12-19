import { Request, Response } from "express";
import { database } from "../database";

export async function getGroupMembers(req: Request, res: Response) {
    const db = await database();
    const { student_id, course_name } = req.query;

    db.query (`
        SELECT DISTINCT *
        FROM (
            SELECT course_id 
            FROM groupee.course 
            WHERE course_name="${course_name}") AS Y
        INNER JOIN (
            SELECT *
            FROM groupee.classlist
            WHERE student_id=${student_id}) AS L
        ON L.course_id=Y.course_id
        INNER JOIN groupee.classlist AS C
            ON L.group_no=C.group_no
        INNER JOIN groupee.student AS X
            ON X.student_id=C.student_id`
    )
    .then((result) => {
        return res.json(result[0]);
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}

export async function getGroups(req: Request, res: Response) {
    const db = await database();
    const { course_id, group_no } = req.query;
    
    db.query (`
        SELECT DISTINCT *
        FROM groupee.classlist
        WHERE course_id=${course_id} AND ${group_no? `group_no=${group_no}`: `group_no IS NULL`}`
    )
    .then((result) => {
        return res.json(result[0])
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}

export async function reviewGroupRequests(req: Request, res: Response) {
    const db = await database();
    const { professor_id } = req.query;
    const memberCap = 4;
    
    db.query (`
        SELECT G.*, S.first_name, S.last_name
        FROM (
            SELECT C.course_id, C.course_name, R.request_id, R.poster_id, R.size, R.availability, R.section
            FROM groupee.group_request AS R, groupee.course as C
            WHERE R.size>=${memberCap} AND
                  R.status<>"Approved" AND R.status<>"Rejected" AND
                  C.instructor_id=${professor_id} AND
                  C.course_id=R.course_id ) AS G
        INNER JOIN groupee.student AS S
            ON G.poster_id=S.student_id`
    )
    .then((result) => {
        return res.json(result[0])
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}


export async function getMemberRequestInfo(req: Request, res: Response) {
    const db = await database();
    const { post_id } = req.query;

    db.query (`
        SELECT DISTINCT S.first_name, S.last_name, C.section_no
        FROM groupee.classlist AS C
        INNER JOIN groupee.student AS S
            ON C.student_id=S.student_id
        INNER JOIN (
            SELECT student_id
            FROM groupee.join_request
            WHERE status="Accepted" AND
                  post_id=${post_id}) AS R
            ON S.student_id=R.student_id`
    )
    .then((result) => {
        return res.json(result[0]);
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}

export async function updateStudentGroup(req: Request, res: Response) {
    const db = await database();
    const { post_id } = req.body;

    db.query (`
        UPDATE groupee.classlist AS C
        SET group_no=(SELECT max(group_no) FROM groupee.group)
        WHERE C.student_id IN (
            SELECT student_id
            FROM groupee.join_request
            WHERE status="Accepted" AND post_id=${post_id})`
    )
    .then(()=>{
        return res.json({
            status:200,
            message: "Group members updated."
        });
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}

export async function createGroup(req: Request, res: Response) {
    const db = await database();

    db.query (`
        INSERT INTO groupee.group (group_name, grade)
        VALUES ("Group", NULL)`
    )
    .then(() => {
        return res.json({
            status:200,
            message: "Your group was created!"
        });
    })
    .catch((err) => {
        return res.json({
            status:400,
            message: err
        });
    })
}