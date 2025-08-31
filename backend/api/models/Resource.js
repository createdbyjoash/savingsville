import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  content: String,
  media_link: String,
});

export default mongoose.model("Savingsville-Resource", resourceSchema);
