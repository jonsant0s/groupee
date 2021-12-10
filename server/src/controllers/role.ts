import { Request, Response } from 'express';

export async function allAccess(req: Request, res: Response){
    res.status(200).send("Public Content.");
};

export async function userBoard(req: Request, res: Response){
    res.status(200).send("User Content.");
};

export async function StudentBoard(req: Request, res: Response){
    res.status(200).send("Student Content.");
};

export async function ProfessorBoard(req: Request, res: Response){
    res.status(200).send("Professor Content.");
};