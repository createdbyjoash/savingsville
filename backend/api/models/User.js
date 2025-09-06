import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },

  // Track lessons completed inside this topic (age_group-specific)
  lessons_completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],

  // Track quizzes completed inside this topic
  quizzes_completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],

  // Mark if this topic is fully completed
  is_completed: { type: Boolean, default: false },

  started_at: { type: Date, default: Date.now },
  completed_at: { type: Date },
});

const userSchema = new mongoose.Schema({
  // Basic info
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  // Profile
  username: { type: String, unique: true, sparse: true },
  preferred_language: { type: String, default: "en" },
  age_group: { type: String, enum: ["Kid", "Teen", "Adult"] },

  // Gamification
  current_streak: { type: Number, default: 0 },
  total_hearts: { type: Number, default: 5 },
  total_coins: { type: Number, default: 0 },
  leaderboard_position: { type: Number, default: 0 },
  total_logins: { type: Number, default: 0 },

  // --- Progress tracking ---
  progress: [progressSchema], // progress per topic
  current_topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", default: null },
  current_lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", default: null },

  // Meta
  created_at: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },

  // OTP verification
  otp: { type: String },
  otpExpiry: { type: Date },
});

export default mongoose.model("Savingsville-User", userSchema);
