import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coins: { type: Number, default: 0 },
  rank: Number,
  badge_level: String,
});

export default mongoose.model("Savingsville-Leaderboard", leaderboardSchema);
