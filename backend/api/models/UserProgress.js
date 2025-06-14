const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed_lessons: [String],
  pending_lessons: [String],
  past_lessons: [String],
  calendar_activity: { type: Object },
});

module.exports = mongoose.model("Savingsville-UserProgress", userProgressSchema);
