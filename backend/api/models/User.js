const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true },
  preferred_language: String,
  age_group: { type: String, enum: ['Kid', 'Teen', 'Young Adult'] },
  current_streak: { type: Number, default: 0 },
  total_hearts: { type: Number, default: 5 },
  total_coins: { type: Number, default: 0 },
  leaderboard_position: { type: Number, default: 0 },
  total_logins: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Savingsville-User", userSchema);
