import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	createCheckoutSession,
	checkoutSuccess,
	checkoutCancel,
	getUserOrders,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
router.post("/checkout-cancel", protectRoute, checkoutCancel);
router.get("/orders", protectRoute, getUserOrders);

export default router;