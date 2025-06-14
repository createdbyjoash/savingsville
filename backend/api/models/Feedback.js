const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Savingsville-Feedback", feedbackSchema);
