import winston from 'winston';

const { combine, timestamp, json, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'info',
	format: combine(
		errors({ stack: true }),
		timestamp(),
		json()
	),
	transports: [
		// Console transport for immediate logging
		new winston.transports.Console({
			format: combine(timestamp(), logFormat),
		}),
		// File transport for persistent logs
		new winston.transports.File({
			filename: 'logs/app.log',
			format: combine(timestamp(), json()),
		}),
	],
	exceptionHandlers: [
		new winston.transports.File({ filename: 'logs/exceptions.log' }),
		new winston.transports.Console({ format: logFormat }),
	],
	rejectionHandlers: [
		new winston.transports.File({ filename: 'logs/rejections.log' }),
		new winston.transports.Console({ format: logFormat }),
	],
});

process.on('uncaughtException', (err) => {
	logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
	process.exit(1);
});

process.on('unhandledRejection', (reason) => {
	logger.error(`Unhandled Rejection: ${reason}`);
});

