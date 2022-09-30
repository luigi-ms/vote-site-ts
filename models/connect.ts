import { Client } from 'pg';

const config = {
	user: "u0_a440",
	host: "localhost",
	database: "vote-site",
	password: "",
	port: 5432
};

const db = new Client(config);
db.connect();

export default db;
