// controllers/topicController.js
import { Topic, Lesson } from "../models/ContentModels.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getTopics = async (req, res) => {
  try {
    // user is attached from auth middleware
    const user = req.user;

    if (!user || !user.age_group) {
      return sendResponse(res, 400, false, "User age group not found. Please complete your profile.");
    }

    const { age_group } = user; // from token / DB

    // Fetch topics
    const topics = await Topic.find().select("chapter title description slug");

    // Fetch lessons only for this user's age group
    const lessons = await Lesson.find({ age_group }).select("title topic_id");

    // Map lessons into topics
    const topicWithLessons = topics.map((topic) => {
      const topicLessons = lessons.filter(
        (lesson) => lesson.topic_id.toString() === topic._id.toString()
      );

      return {
        ...topic.toObject(),
        lessons: topicLessons.map((lesson) => ({
          _id: lesson._id,
          title: lesson.title,
        })),
      };
    });

    return sendResponse(res, 200, true, "Topics fetched successfully", {
      topics: topicWithLessons,
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err);
  }
};


export const getTopicBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const topic = await Topic.findOne({ slug });
    if (!topic) {
      return sendResponse(res, 404, false, "Topic not found");
    }

    // fetch lessons grouped by audience
    const lessons = await Lesson.find({ topic_id: topic._id });
    const grouped = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.age_group]) acc[lesson.age_group] = [];
      acc[lesson.age_group].push(lesson);
      return acc;
    }, {});

    return sendResponse(res, 200, true, "Topic fetched successfully", {
      topic,
      lessons: grouped,
    });
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err);
  }
};
