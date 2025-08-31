import mongoose from "mongoose";
import slugify from "slugify"

// Topic (Chapter)
const topicSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, unique: true, index: true }
});

// Pre-save hook to auto-generate slug from title
topicSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Topic = mongoose.model("Topic", topicSchema);

// Lesson
const lessonSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  age_group: { type: String, enum: ["Kid", "Teen", "Adult"], required: true },
  title: { type: String, required: true },
  definition: { type: String },  // <-- changed from "description" to match JSON
  story: { type: String },
});

export const Lesson = mongoose.model("Lesson", lessonSchema);

// Quiz Question
const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: [{ type: String }],
  correct_answer: { type: String, required: true },
});

// Quiz (Pre-test or Test, per Audience, per Chapter)
const quizSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  age_group: { type: String, enum: ["Kid", "Teen", "Adult"], required: true },
  quiz_type: { type: String, enum: ["Pre-Test", "Test"], required: true },
  questions: [questionSchema],
});

export const Quiz = mongoose.model("Quiz", quizSchema);
