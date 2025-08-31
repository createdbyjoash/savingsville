// controllers/quizController.js
import { Quiz, Topic } from "../models/ContentModels.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getQuiz = async (req, res) => {
  try {
   const slug = req.params.slug;
    const topic = await Topic.findOne({ slug });

    if (!topic) {
      return sendResponse(res, 404, false, "Topic not found");
    }
    const { age_group, type } = req.query;

    // 2. Find quiz by topic_id, age_group, and type
    const quiz = await Quiz.findOne({
      topic_id: topic._id,
      age_group,
      quiz_type: type,
    });

    if (!quiz) {
      return sendResponse(res, 404, false, "Quiz not found");
    }

    return sendResponse(res, 200, true, "Quiz fetched successfully", { quiz });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err);
  }
};




export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // answers: [{ questionId, answer }]

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] && answers[idx].answer === q.correct_answer) {
        score++;
      }
    });

    res.json({
      success: true,
      data: { score, total: quiz.questions.length },
      message: "Quiz submitted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
