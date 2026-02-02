import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import protectRoute from "../middleware/auth.middleware.js"
import {archjetProtect} from "../middleware/archjet.middleware.js";

const router = express.Router();

router.use(archjetProtect, protectRoute)

router.get("/contacts",getAllContacts);
router.get("/chats",getChatPartners);
router.get("/:id",getMessagesByUserId);
router.post("/send/:id",  sendMessage);

export default router;