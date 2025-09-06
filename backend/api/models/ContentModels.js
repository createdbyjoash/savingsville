import mongoose from "mongoose";
import slugify from "slugify";

// Topic (Chapter)
const topicSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  slug: { type: String, unique: true, index: true }
});

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
  definition: { type: String },
  story: { type: String },
  order: { type: Number, required: true, default: 1 } // new: order inside topic
});

// index to make finding first/next lesson efficient
lessonSchema.index({ topic_id: 1, order: 1 });

export const Lesson = mongoose.model("Lesson", lessonSchema);

// Quiz (unchanged)
const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: [{ type: String }],
  correct_answer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  topic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  age_group: { type: String, enum: ["Kid", "Teen", "Adult"], required: true },
  quiz_type: { type: String, enum: ["Pre-Test", "Test"], required: true },
  questions: [questionSchema],
});

export const Quiz = mongoose.model("Quiz", quizSchema);
