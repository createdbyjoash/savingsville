// controllers/topicController.js
import { Topic, Lesson } from "../models/ContentModels.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().select("chapter title description slug");
    return sendResponse(res, 200, true, "Topics fetched successfully", { topics });
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
