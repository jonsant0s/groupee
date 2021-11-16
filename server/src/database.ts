import { createPool } from 'mysql2/promise';
require('dotenv').config();

export async function database() {
    const db = await createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD
    });
    
    return db;
}