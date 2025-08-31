import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, unique: true, required: true },

  password: { type: String, required: true },

  // Optional fields for later profile completion
  username: { type: String, unique: true, sparse: true }, // sparse = only unique if value exists
  preferred_language: { type: String, default: "en" },
  age_group: { type: String, enum: ["Kid", "Teen", "Adult"] },

  // Gamification & stats
  current_streak: { type: Number, default: 0 },
  total_hearts: { type: Number, default: 5 },
  total_coins: { type: Number, default: 0 },
  leaderboard_position: { type: Number, default: 0 },
  total_logins: { type: Number, default: 0 },

  // Account meta
  created_at: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },

  // OTP verification
  otp: { type: String },
  otpExpiry: { type: Date },
});

export default mongoose.model("Savingsville-User", userSchema);
