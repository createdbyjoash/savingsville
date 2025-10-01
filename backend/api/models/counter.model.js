import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },   // e.g., "topic_chapter"
  seq: { type: Number, default: 8 },
});

export const Counter = mongoose.model("Savingsville-Counter", counterSchema);
