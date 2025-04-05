import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import verifyToken from "../lib/verifyToken.js";
const router = Router();

router.route("/:id").get(verifyToken, getMessages);
router.route("/send/:id").post(verifyToken, sendMessage);

export default router;
