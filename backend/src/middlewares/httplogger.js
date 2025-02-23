import { logger } from "../configs/logger.config.js";
import morgan from "morgan";

// Morgan formats request logs for Winston
const httpLogger = morgan( ':method :url :status :response-time ms - :res[content-length]',
	{
		stream: {
			write: (message) => logger.info(message.trim()), // Send logs to Winston
		},
	}
);

export default httpLogger;

