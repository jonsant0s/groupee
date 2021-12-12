import { CheckRoleForm, GetObj, PostPayload} from "../types"
import { database } from "../database"

const config = require("../config/auth.ts");
const jwt = require("jsonwebtoken");

export async function verifyToken({req, res, next}: PostPayload) {
    let token = await req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    };

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.body.username = decoded.username;
        next!(); //Makes sure next(); is not NULL
    });
};

export async function isStudent({req, res}: PostPayload) {
    const db = await database();
    const { username, role_id }: CheckRoleForm = req.body;
    
    const data1 = await db.query(
                `SELECT username FROM groupee.account
                 WHERE username="${username}"`);

    const result1 = Object(data1[0])[0];

    if (result1.role_id == "2") {
        return res.status(200).send({
            message: "Welcome Student!"
        });
    }

    return res.status(403).send({
        message: "Require Student Role!"
    });

}

export async function isProfessor({ req, res }: PostPayload) {
    const db = await database();
    const { username, role_id }: CheckRoleForm = req.body;
    
    const data1 = await db.query(
                `SELECT username FROM groupee.account
                 WHERE username="${username}"`);
                 
    const result1 = Object(data1[0])[0];

    if (result1.role_id == "3") {
        return res.status(200).send({
            message: "Welcome Professor!"
        });
    }

    return res.status(403).send({
        message: "Require Professor Role!"
    });

}

export async function header({ res, next }: GetObj) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next!();
}
