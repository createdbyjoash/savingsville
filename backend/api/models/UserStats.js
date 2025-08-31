import mongoose from "mongoose";

const userStatsSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizzes_taken: { type: Number, default: 0 },
  practice_taken: { type: Number, default: 0 },
  streak_data: { type: Object },
  dashboard_score_percentage: { type: Number, default: 0 },
  daily_goal: { type: Object },
});

export default mongoose.model("Savingsville-UserStats", userStatsSchema);
