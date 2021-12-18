import { createPool } from "mysql2/promise";
require("dotenv").config();

export async function database() {
	const db = createPool({
		host: "localhost", //localhost
		user: "root",
		password: "password",
		multipleStatements: true,
		connectionLimit: 5
	});

	return db;
}
