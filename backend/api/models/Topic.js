const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Savingsville-Topic", topicSchema);
