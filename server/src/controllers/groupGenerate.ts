import { Request, Response } from "express";
import { database } from "../database"

export const getNumGroups = async(req: Request, res: Response) => {
    const db = await database();
    const size = req.body.size;
    //const size = 2;

    const count = await db.query(
        `SELECT COUNT(*) as total FROM groupee.student`
    );
    const data = Object(count[0])[0];

    const numGroups = data.total/size;

    if(data) {
        console.log(data.total);
        console.log(numGroups);
    }
}
