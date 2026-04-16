
import express from "express";
import { getContactSettings, updateContactSettings } from "../controllers/contactSettings.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getContactSettings);
router.put("/", protectRoute, adminRoute, updateContactSettings);

export default router;
