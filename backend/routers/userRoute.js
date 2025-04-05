import express from 'express'
import verifyToken from '../lib/verifyToken.js';
import { getUsers } from '../controllers/userController.js';
const router = express.Router();

router.get('/all',verifyToken,getUsers )

export default router;
