import UserController from "../controllers/user.js";
import config from "../config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userService = {};

userService.registerUser = async function (req, res, next) {
  const value = req.body;
  try {
    const user = await UserController.registerUser(value);
    if (user) {
      let token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: "1d",
      });
      res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(201).json({ success: 1, userId: user.id });
    } else {
      res.status(409).send({ success: 0, message: "Details are not correct" });
    }
  } catch (error) {
    next(error)
    // res.status(500).json({ success: 0, message: error.message });
  }
};

userService.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserController.findOneByEmail(email);
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, config.secretKey, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        const userWithTask = await UserController.findAllForListing(user.id);
        res.status(200).json({ success: 1, user: userWithTask });
      } else {
        res.status(401).json({ success: 0, message: "Authentication failed" });
      }
    } else {
      res.status(401).json({ success: 0, message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ success: 0, message: error.message });
  }
};

export default userService;
