import { Response } from "express";
import { database } from "../database";

const fs = require("fs");

export async function initializeTables(res: Response) {
    const db = await database();
    const tables = fs.readFileSync("./sql/database.sql").toString();

    db.query("CREATE DATABASE IF NOT EXISTS `groupee`")
        .then(() => {
            console.log("Database 'groupee' created.");
        })
        .catch((error) => {
            res.send(error);
        });

    db.query(tables)
        .then(() => {
            res.send("Tables created successfully.");
        })
        .catch((error) => {
            res.send(error);
        });
}
