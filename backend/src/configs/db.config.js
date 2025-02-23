import pg from 'pg';

const { Pool, Client } = pg;

const databaseConfig = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT || "5432"),
};

export const pool = new Pool(databaseConfig);

export const client = new Client(databaseConfig);

// Test and establish the database connection
export async function establishDbConnection() {
	try {
		const connection = await pool.connect();
		const res = await connection.query("SELECT NOW()");
		console.log("Database connection successful:", res.rows[0]);
		connection.release();
	} catch (err) {
		console.error("Error connecting to the database:", err);
		process.exit(1);
	}
}

