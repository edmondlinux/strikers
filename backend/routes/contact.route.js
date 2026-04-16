
import express from "express";
import { sendInquiry } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/inquiry", sendInquiry);

export default router;
