const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: String,
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  content: String,
  media_link: String,
});

module.exports = mongoose.model("Savingsville-Resource", resourceSchema);
