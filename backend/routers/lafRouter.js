import express from 'express'
import verifyToken from '../lib/verifyToken.js';
import { uploadQuery } from '../controllers/lafController.js';
const router = express.Router();

router.post('/upload',verifyToken, uploadQuery)

export default router;
