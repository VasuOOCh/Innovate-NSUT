import express from 'express'
import verifyToken from '../lib/verifyToken.js';
import { getItems, uploadQuery } from '../controllers/lafController.js';
const router = express.Router();

router.post('/upload',verifyToken, uploadQuery)
router.get('/items', getItems)

export default router;
