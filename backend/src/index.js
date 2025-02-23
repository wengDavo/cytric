import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { establishDbConnection } from "./configs/db.config.js";
import { docsOptions } from "./configs/docs.config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsSpecs = swaggerJSDoc(docsOptions);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: process.env.CORS_ORIGIN || [
		"*",
	],
	credentials: true,
}));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docsSpecs, { explorer: true }));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

establishDbConnection();

app.get("/", (req, res) => {
	res
		.status(200)
		.set({ "Content-Type": "application/json" })
		.json({ message: "server is running" })
});

app.listen((PORT), () => {
	console.log(`App is listening on http://localhost:${PORT}`)
});

export default app;
