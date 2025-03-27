import express from "express";
import userService from "../services/user.js";
import userMiddleWare from "../middleware/userAuth.js";

const router = express();

router.post(
  "/register",
  userMiddleWare.validateSignUP,
  userService.registerUser
);
router.post("/login", userMiddleWare.validateLogin, userService.login);

export default router;


