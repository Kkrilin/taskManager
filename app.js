import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import config from './config.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import userRouter from './routes/users.js';
import taskRouter from './routes/tasks.js';
import { authenticate } from './middleware/userAuth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = config.port;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream })); // Logs to a file
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve Swagger documentation

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/running', (req, res) => {
  res.status(200).send(`<h1>Server is running</h1>`);
});
app.use('/auth', userRouter);
app.use('/tasks', authenticate, taskRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
