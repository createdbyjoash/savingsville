const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  lesson_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  question_type: { type: String, enum: ['fill_text', 'fill_order', 'multiple_choice'] },
  difficulty: { type: String, enum: ['Basic', 'Intermediate', 'Advanced'] },
  question_text: String,
  options: [mongoose.Schema.Types.Mixed], // text, image, or both
  correct_answer: mongoose.Schema.Types.Mixed,
  media: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("Savingsville-Quiz", quizSchema);
