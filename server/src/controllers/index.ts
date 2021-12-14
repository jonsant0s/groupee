import { Request, Response } from "express";
import { database } from "../database";

const fs = require("fs");
const fastcsv = require("fast-csv");

export async function initializeTables(req:Request, res: Response) {
    const db = await database();
    const tables = fs.readFileSync("./sql/database.sql").toString();

    await db.query("CREATE DATABASE IF NOT EXISTS `groupee`");
    
    db.query(tables)
        .then(() => {
            populateTables(req, res);
        })
        .catch((err)=>{
            res.send(err)
        })
}

export function populateTables(req:Request, res: Response) {
    const csvFiles = [
    "account", 
    "professor", 
    "student",
    "course",
    "student_account",
    "classlist"];

    for(let table in csvFiles) {
        csvFileStream(csvFiles[table]);
    }
    return res.status(200).send("Tables initialized");
}

const csvFileStream = async (table:string) => {
    const db = await database();
    
    let accountsStream = fs.createReadStream(`./sql/${table}.csv`);
    let csvData:any = [];

    let csvStream = fastcsv
        .parse()
        .on("data", (data:any) => {
            csvData.push(data);
        })
        .on("end", async () => {
            const q = `INSERT INTO groupee.${table} (${csvData[0]}) VALUES ?`
            csvData.shift();

            db.query(q, [csvData])
                .then(() => {
                    return
                }).catch((err) => {
                    return err
                })
        });
    
    accountsStream.pipe(csvStream);
}