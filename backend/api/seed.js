// seed.js
import mongoose from "mongoose";

//import { Topic, Lesson, Quiz } from "./models/ContentModels.js"; // <-- your updated schema

import { Topic, Lesson, Quiz } from "./models/ContentModels.js";


// Import JSON chapters (you can merge all JSON into one file, e.g. chaptersData.js)
import chaptersData from "./topics.js";


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pydev385:xzdyfyqi8ScDKuc@cluster0.jjhk0gq.mongodb.net/savingsville?retryWrites=true&w=majority");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🚀 Starting seeding...");

    // Clear existing collections
    await Topic.deleteMany();
    await Lesson.deleteMany();
    await Quiz.deleteMany();

    for (const chapter of chaptersData) {
      // Create Topic
      const topic = new Topic({
        chapter: chapter.chapter,
        title: chapter.title,
        description: chapter.description || "",
      });
      await topic.save();
      console.log(`✅ Topic added: ${chapter.title}`);

      // Loop through audiences (Kids, Teens, Adults)
      for (const audienceBlock of chapter.age_groups) {
        const { age_group, lessons, pre_test, test } = audienceBlock;

        // Insert Lessons
        for (const lesson of lessons) {
          const newLesson = new Lesson({
            topic_id: topic._id,
            age_group,
            title: lesson.title,
            definition: lesson.definition,
            story: lesson.story,
          });
          await newLesson.save();
          console.log(`   📘 Lesson added: [${age_group}] ${lesson.title}`);
        }

        // Insert Quizzes (Pre-Test + Test)
        const quizzes = [
          { type: "Pre-Test", data: pre_test },
          { type: "Test", data: test },
        ];

        for (const quizBlock of quizzes) {
          if (quizBlock.data && quizBlock.data.length > 0) {
            const quiz = new Quiz({
              topic_id: topic._id,
              age_group,
              quiz_type: quizBlock.type,
              questions: quizBlock.data.map((q) => ({
                question_text: q.question,
                options: q.options,
                correct_answer: q.correct_answer,
              })),
            });
            await quiz.save();

            quiz.questions.forEach((q, idx) => {
              console.log(
                `      📝 [${age_group}] ${quizBlock.type} Q${idx + 1}: ${q.question_text}`
              );
            });
          }
        }
      }
    }

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during seeding:", err.message);
    process.exit(1);
  }
};

seedDatabase();
