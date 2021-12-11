import { Credentials, SignUpForm, PostPayload } from "../types";
import { database } from "../database";
import { userBoard } from "./role";

const config = require("../config/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function login({req, res}:PostPayload) {
    const db = await database();
    const { username, password }: Credentials = req.body;

    const result1 = await db.query (
                `SELECT password FROM groupee.account
                 WHERE username="${username}"`);

    const data1 = Object(result1[0])[0];
    
    if(data1) {
        const match = await bcrypt.compareSync(
            password,
            data1.password
        );
        if (!match) {
            return res.status(401).send({
                accessToken: null,
                message: "Incorrect password."});
        } else {
            var token = await jwt.sign({ username: data1.username }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            
            var authorities: string[] = [];

            const result2 = await db.query(
                        `SELECT role_id FROM groupee.user_roles
                         WHERE username="${username}"`);

            const data2 = Object(result2[0])[0];
            
            if (data2) {
                const result3 = await db.query(
                    `SELECT role_name FROM groupee.roles
                     WHERE role_id=${data2.role_id}`);

                const data3 = Object(result3[0])[0];
        
                if(data3) {
                    console.log(`Logged in as "${username}" (role ${data3.role_name}).`);
                    authorities.push("ROLE_"+data3.role_name);
                    return res.status(200).send({
                        username: username,
                        roles: authorities,
                        accessToken: token
                    })
                }
            }
        }
    } else {
        console.log(`Account with username "${username}" does not exist.`);
        return res.status(404).send(`Account with username "${username}" does not exist.`);
    }
}

export async function signup({req, res}:PostPayload) {
    const db = await database();
    const form: SignUpForm = req.body;
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