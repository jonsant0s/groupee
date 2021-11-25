import { createPool } from 'mysql2/promise';


export async function database() {
    const db = await createPool({
        host: "localhost", //localhost
        user: "root",
        password: "password",
        multipleStatements: true
    });
    
    return db;
}