import express from 'express';
import {registerUser, login, getUser} from '../services/user.js';
import {validateSignUP, validateLogin} from '../middleware/userAuth.js';

const router = express();

router.get('/', getUser);
router.post('/register', validateSignUP, registerUser);
router.post('/login', validateLogin, login);
router.post('/logout', (req, res) => {
  res.clearCookie('jwt', {path: '/'});
  res.status(200).json({message: 'Logged out successfully'});
});

export default router;
