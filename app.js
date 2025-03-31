import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import userRouter from './routes/users.js';
import taskRouter from './routes/tasks.js';
import { authenticate } from './middleware/userAuth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = config.serverPort || 3000;

const transport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: 'logs/application-%DATE%.log', // Store logs in a 'logs' directory
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// Handle errors in the transport
transport.on('error', (error) => {
  console.error('Error in DailyRotateFile transport:', error);
});

// Handle log rotation events
transport.on('rotate', (oldFilename, newFilename) => {
  console.log(`Log file rotated: ${oldFilename} -> ${newFilename}`);
});

// Create the logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    transport, // Add the DailyRotateFile transport
  ],
});

// Add a console transport for non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// Example usage of the logger
// Middleware to log requests
app.use((req, res, next) => {
  logger.info(` Logger initialized successfully ${req.method} ${req.url}`);
  next();
});
// Middleware to log errors
// app.use((err, req, res, next) => {
//   // logger.error('This is an error message');
//   logger.error(err.stack);
//   next(err);
// });

app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Serve Swagger documentation

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/running', (req, res) => {
  res.status(200).send(`<h1>server is running</h1>`);
});
app.use('/auth', userRouter);
app.use('/tasks', authenticate, taskRouter);

// Middleware to handle "route not found" errors and log them
app.use((req, res, next) => {
  const errorMessage = `Route not found: ${req.method} ${req.originalUrl}`;
  logger.warn(errorMessage); // Log the 404 error with a warning level
  res.status(404).json({
    error: 'Route not found',
    message: errorMessage,
  });
});

// Middleware to handle all other errors and log them
app.use((err, req, res, next) => {
  logger.error(err.stack); // Log the error stack trace
  next(err);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
