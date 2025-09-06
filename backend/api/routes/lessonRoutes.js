// routes/lessonRoutes.js
import express from "express";
import { getLessonById, completeLesson } from "../controllers/lessonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:id", authMiddleware, getLessonById);
router.post("/complete-lesson", authMiddleware, completeLesson);

export default router;