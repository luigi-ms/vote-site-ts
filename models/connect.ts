import { Client } from 'pg';

const config = {
	user: "user",
	host: "localhost",
	database: "vote-site",
	password: "password",
	port: 5432
};

const db = new Client(config);
db.connect();

export default db;
