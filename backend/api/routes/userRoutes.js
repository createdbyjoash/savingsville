
import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Protected route
router.get("/me", authMiddleware, getMe);
router.patch("/me", authMiddleware, updateMe);
router.get('/profile', authMiddleware, async (req, res) => {
  // Assuming req.user is set by your auth middleware
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: { name: user.name, nickname: user.nickname } });
});

export default router;
