import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import httpLogger from './middlewares/httplogger.js';
import swaggerUi from "swagger-ui-express";

import { establishDbConnection } from "./configs/db.config.js";
import { docsOptions, docsSpec } from "./configs/docs.config.js";

import NftsRouter from "./routes/nfts.routes.js"

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// adds secure headers
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["https://cytric-zeta.vercel.app", "http://localhost:3000"],
		credentials: true,
	})
);
app.use(httpLogger)

establishDbConnection();
app.get("/api/v1", (req, res) => {
	res
		.status(200)
		.set({ "Content-Type": "application/json" })
		.json({ message: "server is running" })
});
app.use("/api/v1/nfts", NftsRouter)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(docsSpec))

app.listen((PORT), () => {
	console.log(`App is listening on http://localhost:${PORT}`)
});

export default app;
