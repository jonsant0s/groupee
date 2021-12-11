import { Request, Response } from "express";
import { database } from "../database";
import { signupForm, loginForm } from "../interface/Account";
import { userBoard } from "./role";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function login(req: Request, res: Response) {
    const db = await database();
    const { username, password }: loginForm = req.body;

    const result = await db.query(
        `SELECT password FROM groupee.account
                 WHERE username="${username}"`
    );

    const data = Object(result[0])[0];

    if (data) {
        const match = await bcrypt.compareSync(password, data.password);
        if (!match) {
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
    const salt = await bcrypt.genSalt(8);
    var pass = bcrypt.hashSync(form.password, salt);

    db.query(`
        INSERT INTO groupee.account (username, password, first_name, middle_name, last_name)
        VALUES ("${form.username}", 
                "${pass}", 
                "${form.first_name}", 
                "${form.middle_name}", 
                "${form.last_name}")`)
        .then(() => {
            if (form.roles) {
                db.query(
                    `INSERT INTO groupee.user_roles (role_id, username)
                     VALUES (${form.roles},"${form.username}")`
                ).then(() => {
                    return res.send(`Account created with ${form.roles} role!`);
                });
            } else {
                db.query(
                    `INSERT INTO groupee.user_roles (role_id, username)
                     VALUES (${1},"${form.username}")`
                ).then(() => {
                    return res.send(`Account created with User role!`);
                });
            }
        })
        .catch(() => {
            return res.status(500).send(`${form}\n ${pass}\nAccount with username "${form.username}" already exists.`);
        });
}

export async function setRole(req: Request, res: Response) {
    const db = await database();
}