import express from 'express';
import config from './config.js';
import cookieParser from 'cookie-parser';

import db from './migrations/index.js';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import userMiddleWare from './middleware/userAuth.js';
import errorHandler from './middleware/errorHandler.js';
const app = express();
const port = config.port;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/running', (req, res) => {
  // console.log(req.cookies); // All cookies
  // console.log(req.cookies.jwt); // Specific cookie

  res.status(200).send('Check your console for cookies');
});
app.use('/auth', userRouter);
app.use('/task', userMiddleWare.authenticate, taskRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
