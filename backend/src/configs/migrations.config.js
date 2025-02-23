import 'dotenv/config';
import { Umzug } from "umzug";
import { pool } from "./db.config.js";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const migrationsPath = path.resolve(__dirname, '../migrations');

// Seed data directory (if needed in the future for tesst)
// const seedsPath = path.resolve(__dirname, '../seeds');

const migrator = new Umzug({
	migrations: {
		glob: path.join(migrationsPath, "**/up.sql"),
		resolve(params) {
			const migrationFolder = path.dirname(params.path);
			const upPath = path.join(migrationFolder, 'up.sql');
			const downPath = path.join(migrationFolder, 'down.sql');
			const migrationName = path.basename(migrationFolder);

			return {
				name: migrationName,
				path: params.path,
				up: async () => {
					try {
						const sql = fs.readFileSync(upPath, 'utf-8').trim();
						if (!sql) throw new Error(`Empty SQL file: ${upPath}`);
						return params.context.query(sql);
					} catch (error) {
						console.error(`Error reading ${upPath}:`, error);
						throw error;
					}
				},
				down: async () => {
					try {
						const sql = fs.readFileSync(downPath, 'utf-8').trim();
						if (!sql) throw new Error(`Empty SQL file: ${downPath}`);
						return params.context.query(sql);
					} catch (error) {
						console.error(`Error reading ${downPath}:`, error);
						throw error;
					}
				},
			};
		},
	},
	context: pool,
	logger: console,
});

// Seeder (uncomment if needed later)
// const seeder = new Umzug({
// 	migrations: {
// 		glob: path.join(seedsPath, '**/up.sql'),
// 		resolve(params) {
// 			const seedFolder = path.dirname(params.path);
// 			const upPath = path.join(seedFolder, 'up.sql');
// 			const seedName = path.basename(seedFolder);

// 			return {
// 				name: seedName,
// 				path: params.path,
// 				up: async () => {
// 					try {
// 						const sql = fs.readFileSync(upPath, 'utf-8').trim();
// 						if (!sql) throw new Error(`Empty SQL file: ${upPath}`);
// 						return params.context.query(sql);
// 					} catch (error) {
// 						console.error(`Error reading ${upPath}:`, error);
// 						throw error;
// 					}
// 				},
// 			};
// 		},
// 	},
// 	context: pool,
// 	logger: console,
// });

// Run migrations
(async () => {
	try {
		// Get command line arguments
		const args = process.argv.slice(2);

		// Rollback the last migration (only if migrations exist)
		if (args[0] === "--rollback") {
			const executedMigrations = await migrator.executed();
			if (executedMigrations.length === 0) {
				console.log("No migrations to rollback.");
				return;
			}
			const migrations = await migrator.down();
			console.log('Migrations rolled back:', migrations);
			return;
		}

		/**
		// Seed data (uncomment if needed later)
		// if (args[0] === "--seed") {
		// 	const seeds = await seeder.up();
		// 	console.log('Seeds applied:', seeds);
		// 	return;
		// }
		*/

		// Run all migrations
		const migrations = await migrator.up();
		console.log('Migrations applied:', migrations);
	} catch (err) {
		console.error('Error running migrations:', err);
	} finally {
		await pool.end();
	}
})();

