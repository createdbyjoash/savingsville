
import { Topic, Lesson } from "../models/ContentModels.js";

/**
 * Ensures the DB has at least one Topic and one Lesson.
 * Returns { firstTopic, firstLesson }.
 */
export async function ensureInitialContent() {
  let firstTopic = await Topic.findOne().sort({ chapter: 1 });
  if (!firstTopic) {
    firstTopic = await Topic.create({
      chapter: 1,
      title: "Getting Started",
      description: "Introductory topic",
      slug: "getting-started"
    });
  }

  let firstLesson = await Lesson.findOne({ topic_id: firstTopic._id }).sort({ order: 1 });
  if (!firstLesson) {
    firstLesson = await Lesson.create({
      topic_id: firstTopic._id,
      age_group: "Kid", // adjust as needed
      title: "Lesson 1",
      definition: "Introductory lesson",
      order: 1
    });
  }

  return { firstTopic, firstLesson };
}