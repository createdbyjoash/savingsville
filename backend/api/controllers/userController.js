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

    console.log("[updateMe] Incoming request", {
      userId,
      body: req.body,
    });

    const user = await User.findById(userId);
    if (!user) {
      console.warn(`[updateMe] User not found: ${userId}`);
      return sendResponse(res, 404, false, "User not found");
    }

    console.log("[updateMe] Found user:", user._id);

    // 🧩 Check for duplicate username
    if (username !== undefined && username !== user.username) {
      console.log(`[updateMe] Attempting to change username to: ${username}`);

      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        console.warn("[updateMe] Username already taken:", username);
        return sendResponse(
          res,
          400,
          false,
          "Username is already taken. Please try another one."
        );
      }

      user.username = username;
    }

    if (preferred_language !== undefined) {
      console.log(`[updateMe] Updating preferred_language to: ${preferred_language}`);
      user.preferred_language = preferred_language;
    }

    if (age_group !== undefined && user.age_group !== age_group) {
      console.log(`[updateMe] Changing age_group from ${user.age_group} to ${age_group}`);
      user.age_group = age_group;

      // Get first topic
      const firstTopic = await Topic.findOne().sort({ chapter: 1 });
      console.log("[updateMe] First topic found:", firstTopic ? firstTopic._id : null);

      if (firstTopic) {
        // Get first lesson in that topic for this age group
        const firstLesson = await Lesson.findOne({
          topic_id: firstTopic._id,
          age_group: age_group,
        }).sort({ order: 1 });

        console.log("[updateMe] First lesson found:", firstLesson ? firstLesson._id : null);

        user.current_topic = firstTopic._id;
        user.current_lesson = firstLesson ? firstLesson._id : null;
      }

      // Reset progress
      console.log("[updateMe] Resetting completedTopics and completedLessons");
      user.completedTopics = [];
      user.completedLessons = [];
    }

    await user.save();
    console.log("[updateMe] User saved successfully:", user._id);

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.otp;
    delete safeUser.otpExpiry;

    console.log("[updateMe] Returning response for user:", safeUser._id);

    return sendResponse(res, 200, true, "Profile updated successfully", safeUser);
  } catch (err) {
    console.error("[updateMe] Error occurred:", err);
    return sendResponse(res, 500, false, "Server error", null, err.message);
  }
};


