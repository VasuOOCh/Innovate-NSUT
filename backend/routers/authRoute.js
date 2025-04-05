import express from 'express'
import { logout, signin, signup } from '../controllers/authController.js';
import verifyToken from '../lib/verifyToken.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/signin',signin )
router.get('/logout',verifyToken,logout )

export default router;
