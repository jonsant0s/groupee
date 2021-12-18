import { Request, Response } from "express";
import { database } from "../database";

export async function updateProposal(req: Request | any, res: Response) {
    const db = await database();
    const { status, group_no, time_stamp } = req.body;

    db.query(
        `
        UPDATE groupee.proposal
        SET status="${status}"
        WHERE group_no=${group_no} AND submission_date="${time_stamp}"`
    )
        .then(() => {
            return res.json({
                status: 200,
                message: `Updated proposal. You have ${status} the submission`,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.json({
                status: 400,
                message: `Failed to update submission.`,
            });
        });
}
// Student tries to join a group
export async function getProposals(req: Request | any, res: Response) {
    const db = await database();
    const { course_id } = req.query;

    db.query(
        `SELECT DISTINCT P.*
        FROM groupee.proposal AS P
        JOIN ( SELECT group_no
                FROM groupee.classlist 
                WHERE course_id=${course_id}) AS G
        ON G.group_no=P.group_no`
    )
        .then((data) => {
            return res.send(data[0]);
        })
        .catch((err) => {
            console.log(err);
            return res.json({
                status: 400,
                message: `Failed to retrieve proposal.`,
            });
        });
}

export async function submitProposal(req: Request | any, res: Response) {
	const db = await database();
	const { submission_id, group_no, topic, description } = req.body;

	db.query(`
		INSERT INTO groupee.proposal (submission_id, group_no, topic, description)
		VALUES (${submission_id}, ${group_no}, "${topic}", "${description}")`
	)
	.then(() => {
		return res.json({
			status: 200,
			message: `Submitted. Your proposal is under review by <Professor name>`
		});
	})
	.catch(() => {
		return res.json({
			status: 400,
			message: `Failed to submit proposal.`,
		});
	});
}