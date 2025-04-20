import UserController from '../controllers/user.js';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async function (req, res, next) {
  const value = req.body;
  try {
    const user = await UserController.registerUser(value);
    if (user) {
      const token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: config.jwtExpiration,
      });
      // res.cookie('jwt', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json({
        success: 1,
        user: { id: user.id, name: user.name, email: user.email },
        token,
      });
    } else {
      res.status(409).send({ success: 0, message: 'Details are not correct' });
    }
  } catch (error) {
    error.status = 409;
    next(error);
  }
};

export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserController.findOneByEmail(email);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const token = jwt.sign({ id: user.id }, config.secretKey, {
          expiresIn: config.jwtExpiration,
        });
        res.cookie('jwt', token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        // const userWithTask = await UserController.findAllForListing(user.id);
        res.status(200).json({
          success: 1,
          user: { id: user.id, name: user.name, email: user.email },
          token,
        });
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

// get task by id
export const getUser = async function (req, res, next) {
  try {
    const { userId } = req;
    const userWithTask = await UserController.findAllForListing(userId);
    if (!userWithTask) {
      throw new Error('user not found');
    }
    res.status(200).json({ succes: 1, user: userWithTask });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
