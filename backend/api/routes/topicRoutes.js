// routes/topicRoutes.js
import express from "express";
import { getTopics, getTopicBySlug, createTopic } from "../controllers/topicController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, getTopics);
router.get("/:slug", authMiddleware, getTopicBySlug);
router.post("/", createTopic);  

export default router;