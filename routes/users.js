import express from 'express';
import {registerUser, login} from '../services/user.js';
import {validateSignUP, validateLogin} from '../middleware/userAuth.js';

const router = express();

router.post('/register', validateSignUP, registerUser);
router.post('/login', validateLogin, login);

export default router;
