import express from "express";
import { loginAdmin, addAdmin, getAdminTopics } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add", addAdmin);
router.get("/topics", getAdminTopics);

export default router;
