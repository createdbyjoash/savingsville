import User from "../models/User.js";
import { Lesson, Topic } from "../models/ContentModels.js";

import { sendResponse } from "../utils/responseHandler.js";

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from authMiddleware

    const user = await User.findById(userId)
      .select("-password -otp -otpExpiry") // hide sensitive fields
      .populate("current_topic", "chapter title description slug")
      .populate("current_lesson", "title definition story order")
      .populate("progress.topic_id", "chapter title slug");

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    return sendResponse(res, 200, true, "User profile fetched successfully", user);
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};



export const updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, preferred_language, age_group } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    if (username !== undefined) user.username = username;
    if (preferred_language !== undefined) user.preferred_language = preferred_language;

    if (age_group !== undefined && user.age_group !== age_group) {
      user.age_group = age_group;

      // Get first topic
      const firstTopic = await Topic.findOne().sort({ chapter: 1 });
      if (firstTopic) {
        // Get first lesson in that topic for this age group
        const firstLesson = await Lesson.findOne({
          topic_id: firstTopic._id,
          age_group: age_group,
        }).sort({ order: 1 });

        user.current_topic = firstTopic._id;
        user.current_lesson = firstLesson ? firstLesson._id : null;
      }

      // Reset progress
      user.completedTopics = [];
      user.completedLessons = [];
    }

    await user.save();

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.otp;
    delete safeUser.otpExpiry;

    return sendResponse(res, 200, true, "Profile updated successfully", safeUser);
  } catch (err) {
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};
