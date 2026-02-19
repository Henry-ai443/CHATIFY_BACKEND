import express from "express";
import { signup, login, logout , updateProfile} from "../controllers/auth.controller.js";
import  protectRoute  from "../middleware/auth.middleware.js";
import { archjetProtect } from "../middleware/archjet.middleware.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
router.use(archjetProtect)

router.post("/signup",  signup)

router.post("/login",  login);

router.post("/logout", logout);

router.put("/update-profile",  protectRoute, upload.single("profilePic"), updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user))

export default router