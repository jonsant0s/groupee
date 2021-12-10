import { Request, Response } from "express";
import { database } from "../database"
import { signupForm, loginForm } from "../interface/Account"

export async function login(req: Request, res: Response) {
    const db = await database();
    const { username, password }: loginForm = req.body;

    const result = await db.query (
                `SELECT password FROM groupee.account
                 WHERE username="${username}"`);

    const data = Object(result[0])[0];
    
    if(data) {
        if ( data.password != password ) {
            return res.json(`Incorrect password.`);
        } else {
            return res.json(`Welcome back "${username}"!`);
        }
    } else {
        return res.json(`Account with username "${username}" does not exist.`);
    }
}

export async function signup(req: Request, res: Response) {
    const db = await database();
    const form: signupForm = req.body;

    db.query(`
        INSERT INTO groupee.account (username, password, first_name, middle_name, last_name)
        VALUES ("${form.username}", 
                "${form.password}", 
                "${form.first_name}", 
                "${form.middle_name}", 
                "${form.last_name}")`)
            .then(() => {
                return res.send(`Account created!`);
            }).catch(() => {
                return res.send(`Account with username "${form.username}" already exists.`);
            })
    }