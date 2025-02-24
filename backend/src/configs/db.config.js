import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
};

export const pool = new Pool(databaseConfig);

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
};
