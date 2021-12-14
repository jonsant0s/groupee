import { createPool } from "mysql2/promise";
require("dotenv").config();

export async function database() {
    const db = await createPool({
        host: "localhost", //localhost
        user: "root",
        password: "password",
        multipleStatements: true,
    });

    await db.query("CREATE DATABASE IF NOT EXISTS `groupee`");
    
    return db;
}

