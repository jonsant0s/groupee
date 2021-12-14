import { Credentials, SignUpForm, UserInfo } from "../types";
import { Request, Response } from "express";
import { database } from "../database";

const config = require("../config/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function login(req: Request, res: Response) {
    const db = await database();
    const { username, password }: Credentials = req.body;

    const result1 = await db.query (
                `SELECT * FROM groupee.account
                 WHERE username="${username}"`);

    const data1 = Object(result1[0])[0];
    
    if(data1) {
        const match = bcrypt.compareSync(password, data1.password); 
        
         // Comparing without bycrypt since the existing accounts don't have hashed passwords
        if (!match && password != data1.password) {
            return res.status(401).send({
                accessToken: null,
                message: "Incorrect password."});
        } else {
            var token = await jwt.sign({ username: data1.username }, config.secret, { expiresIn: 86400 }); // 24 hours

            let userInfo:UserInfo = {
                first_name: data1.first_name,
                last_name: data1.last_name,
                school_id: 0,
                username: username,
                session_token: token,
                role: ""
            }

            const professorInfo = await db.query(`SELECT * FROM groupee.professor WHERE username="${username}"`);
            const prof = Object(professorInfo[0])[0];
            
            // Checking if username matches with professor or student
            if(prof) {
                userInfo.school_id=prof.professor_id;
                userInfo.role="Professor";

            } else {
                const studentInfo = await db.query(`SELECT * FROM groupee.student_account WHERE username="${username}"`);
                const student = Object(studentInfo[0])[0];

                userInfo.school_id=student.student_id;
                userInfo.role="Student";
            }

            return res.status(200).send(userInfo);
        }
    } else {
        return res.status(404).send(`Account with username "${username}" does not exist.`);
    }
}

export async function signup(req: Request, res: Response) {
    const db = await database();
    const form: SignUpForm = req.body;
    const salt = await bcrypt.genSalt(8);

    var pass = bcrypt.hashSync(form.password, salt);
    const studentInfo = await db.query(`SELECT * FROM groupee.student WHERE student_id=${form.student_id}`);
    const student = Object(studentInfo[0])[0];

    if (student){
        db.query(`
        INSERT INTO groupee.account (username, password, first_name, middle_name, last_name)
        VALUES ("${form.username}", 
                "${pass}", 
                "${form.first_name}", 
                "${form.middle_name}", 
                "${form.last_name}")`)
        .then(() => {
            db.query(`
            INSERT INTO groupee.student_account (username, student_id)
            VALUES ("${form.username}", 
                    ${student.student_id})`)
            }).then(() => {
                return res.status(200).send(`$Student account created!`);
            }).catch((err) => {
                return res.send(err);
            })
        .catch((err) => {
            return res.send(err);
        });
    } else {
        return res.send({message: `Student ID already exists`});
    }



    
}