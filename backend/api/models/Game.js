import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

export default mongoose.model("Savingsville-Game", gameSchema);
