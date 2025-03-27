import db from '../migrations/index.js';
import UserController from '../controllers/user.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const user = db.User;

const userMiddleWare = {};

userMiddleWare.validateSignUP = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const userName = await UserController.findOneByName(name);
    if (userName) {
      throw new Error('Invalid request: email is already in use.');
    }
    const user = await UserController.findOneByEmail(email);
    if (user) {
      throw new Error('Invalid request: email is already in use.');
    }
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

userMiddleWare.validateLogin = async (req, res, next) => {
  const { email } = req.body;
  try {
    // const userName = await UserController.findOneByName(name);
    // if (!userName) {
    //   throw new Error("username does not exist");
    // }
    const user = await UserController.findOneByEmail(email);
    if (!user) {
      throw new Error('Please check the email and try again');
    }
    next();
  } catch (error) {
    error.status = 401;
    next(error);
    // res.status(404).json({ message: error.message, success: 0 });
  }
};

userMiddleWare.authenticate = async (req, res, next) => {
  console.log('task.......');
  const token = req.cookies.jwt;
  if (!token)
    return res
      .status(401)
      .json({ succes: 0, message: 'user authentication falied' });
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
    // res.status(403).json({ error: error.message });
  }
};

export default userMiddleWare;
