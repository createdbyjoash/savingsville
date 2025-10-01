import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

// POST /api/upload
router.post("/", upload.single("file"), uploadFile);

export default router;
