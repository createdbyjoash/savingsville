import express from "express";
import { loginAdmin, addAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add", addAdmin);

export default router;
