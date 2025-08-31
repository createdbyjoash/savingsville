// controllers/lessonController.js
import { Lesson } from "../models/ContentModels.js";

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ success: false, message: "Lesson not found" });

    res.json({ success: true, data: lesson });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
