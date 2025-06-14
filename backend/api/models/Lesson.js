
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  title: String,
  description: String,
  level: { type: String, enum: ['Basic', 'Intermediate', 'Advanced'] },
});

module.exports = mongoose.model("Savingsville-Lesson", lessonSchema);
