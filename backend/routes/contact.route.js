import express from "express";
import { sendInquiry, sendPurchaseNotification, upload } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/inquiry", sendInquiry);
router.post("/purchase", upload.single("screenshot"), sendPurchaseNotification);

export default router;
