import { Request, Response, NextFunction } from "express";
const config = require("../config/auth.ts");

const jwt = require("jsonwebtoken");

export async function verifyToken(req: Request, res: Response, next: NextFunction){
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.body.username = decoded.username;
        next();
    });
};