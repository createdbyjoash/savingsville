const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

module.exports = mongoose.model("Savingsville-Game", gameSchema);
