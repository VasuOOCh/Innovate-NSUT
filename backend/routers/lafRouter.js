import express from 'express'
import verifyToken from '../lib/verifyToken.js';
import { deleteItem, getItems, getUserItems, markAsFound, uploadQuery } from '../controllers/lafController.js';
const router = express.Router();

router.post('/upload',verifyToken, uploadQuery)
router.get('/items', getItems)
router.get('/getuseritems',verifyToken,getUserItems )
router.post('/found', verifyToken, markAsFound);
router.post('/delete', verifyToken, deleteItem)

export default router;
