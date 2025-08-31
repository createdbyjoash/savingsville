import mongoose from "mongoose";

const contentReviewSchema = new mongoose.Schema({
  content_type: { type: String, enum: ['quiz', 'course', 'practice', 'game'] },
  content_id: mongoose.Schema.Types.ObjectId,
  submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, enum: ['accept', 'decline'] },
  reviewed_at: { type: Date, default: Date.now },
});

export default mongoose.model("Savingsville-ContentReview", contentReviewSchema);
