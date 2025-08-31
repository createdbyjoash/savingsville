// routes/quizRoutes.js
import express from "express";
import { getQuiz, submitQuiz } from "../controllers/quizController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:slug", authMiddleware, getQuiz);
router.post("/:id/submit", authMiddleware, submitQuiz);

export default router;