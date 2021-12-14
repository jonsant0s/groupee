import { Request, Response } from "express";
import { database } from "../database";

const fs = require("fs");
const fastcsv = require("fast-csv");

const csvFiles = [
    "account", 
    "professor", 
    "student", 
    "student_account", 
    "course", 
    "classlist"];

export async function initializeTables(req:Request, res: Response) {
    const db = await database();
    const tables = fs.readFileSync("./sql/database.sql").toString();

    db.query(tables)
        .then(() => {
            console.log;("Tables created successfully.");
            return;
        })
        .then(()=>{
            csvFiles.forEach(async (table) => {
                await csvFileStream(table);
            })
            res.status(200).send("Tables populated.");
        })
        .catch((err)=>{
            res.send(err)
        })
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