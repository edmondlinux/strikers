
import express from "express";
import { addToFavorites, removeFromFavorites, getFavorites } from "../controllers/favorite.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getFavorites);
router.post("/", protectRoute, addToFavorites);
router.delete("/:productId", protectRoute, removeFromFavorites);

export default router;
