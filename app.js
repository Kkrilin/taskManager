import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { logger, transport } from './config/logger.js';

import userRouter from './routes/users.js';
import taskRouter from './routes/tasks.js';
import { authenticate } from './middleware/userAuth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = config.serverPort || 3000;

// Handle errors in the transport
transport.on('error', (error) => {
  logger.error('Error in DailyRotateFile transport:', error);
});

// Handle log rotation events
transport.on('rotate', (oldFilename, newFilename) => {
  logger.info(`Log file rotated: ${oldFilename} -> ${newFilename}`);
});

// Middleware to log requests
app.use((req, res, next) => {
  logger.info(`Logger initialized successfully ${req.method} ${req.url}`);
  next();
});

app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend origin
    credentials: true, // 🔥 allows cookies to be accepted
  }),
);
app.use(express.static('public'));
// Serve Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/running', (req, res) => {
  res.status(200).send('<h1>server is running</h1>');
});
app.use('/auth', userRouter);

// protected Route
// app.use('/users', authenticate, userRouter);
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
  logger.info(`app listening on port ${port}`);
});
