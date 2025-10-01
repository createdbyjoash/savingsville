// controllers/lessonController.js
import User from "../models/User.js";
import { Lesson, Topic } from "../models/ContentModels.js";
import { sendResponse } from "../utils/responseHandler.js";
import mongoose from "mongoose";

export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    // must have an authenticated user (authMiddleware sets req.user)
    const userAge = req.user?.age_group;
    if (!userAge) {
      return res
        .status(400)
        .json({ success: false, message: "User age_group not set" });
    }

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid lesson id" });
    }

    // only return lesson for the user's age group
    const lesson = await Lesson.findOne({ _id: id, age_group: userAge });
    if (!lesson) {
      // Optional: clarify if the id exists but for a different age group
      const exists = await Lesson.exists({ _id: id });
      const msg = exists
        ? "Lesson not available for your age group"
        : "Lesson not found";
      return res.status(404).json({ success: false, message: msg });
    }

    // keep the original shape so your frontend continues to work
    return res.json({ success: true, data: lesson });
  } catch (err) {
    console.error("getLessonById error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};



export const completeLesson = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth middleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.current_lesson) {
      return res.status(400).json({ message: "No current lesson set" });
    }

    // ✅ Fetch current lesson
    const currentLesson = await Lesson.findById(user.current_lesson);
    if (!currentLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // ✅ Find progress entry for current topic
    let progressEntry = user.progress.find(
      (p) => p.topic_id.toString() === currentLesson.topic_id.toString()
    );
    if (!progressEntry) {
      return res.status(400).json({ message: "Progress not initialized for this topic" });
    }

    // ✅ Mark this lesson as completed
    if (!progressEntry.lessons_completed.includes(currentLesson._id)) {
      progressEntry.lessons_completed.push(currentLesson._id);
    }

    // ✅ Find the next lesson in this topic
    const nextLesson = await Lesson.findOne({
      topic_id: currentLesson.topic_id,
      age_group: user.age_group,
      order: currentLesson.order + 1,
    });

    if (nextLesson) {
      // still inside the same topic
      user.current_lesson = nextLesson._id;
      user.current_topic = currentLesson.topic_id;
    } else {
      // move to next topic
      const nextTopic = await Topic.findOne({
        chapter: { $gt: (await Topic.findById(currentLesson.topic_id)).chapter }
      }).sort({ chapter: 1 });

      if (nextTopic) {
        const firstLessonNextTopic = await Lesson.findOne({
          topic_id: nextTopic._id,
          age_group: user.age_group,
        }).sort({ order: 1 });

        if (firstLessonNextTopic) {
          user.current_topic = nextTopic._id;
          user.current_lesson = firstLessonNextTopic._id;

          // init new progress entry
          user.progress.push({
            topic_id: nextTopic._id,
            lessons_completed: [],
            quizzes_completed: [],
            is_completed: false,
            started_at: new Date(),
          });
        }
      } else {
        // ✅ No more topics → user finished everything
        user.current_topic = null;
        user.current_lesson = null;
        progressEntry.is_completed = true;
        progressEntry.completed_at = new Date();
      }
    }

    await user.save();

    res.json({
      message: "Lesson completed successfully",
      progress: progressEntry,
      current_topic: user.current_topic,
      current_lesson: user.current_lesson,
    });

  } catch (err) {
    console.error("completeLesson error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




export const createLesson = async (req, res) => {
  try {
    const { topic_id, age_group, title, definition, story, order, thumbnail, video } = req.body;

    const lesson = new Lesson({
      topic_id,
      age_group,
      title,
      definition,
      story,
      order,
      thumbnail,
      video,
    });

    await lesson.save();
    sendResponse(res, 200, true, "Lesson created sucessfully", { data: lesson });
  } catch (err) {
    console.error("Create lesson error:", err);
    res.status(500).json({ success: false, error: "Failed to create lesson" });
  }
};





export const getLessonsByTopicSlug = async (req, res) => {
  // ---- simple debug gate ----
  const DEBUG =
    process.env.DEBUG_LOGS === "true" || process.env.NODE_ENV !== "production";
  const log = (...args) => DEBUG && console.log("[getLessonsByTopicSlug]", ...args);
  const time = (label, end = false) =>
    DEBUG && (end ? console.timeEnd(label) : console.time(label));

  const REQ_LABEL = `slug:${req.params?.slug || "∅"} reqId:${req.id || "-"}`
  time(REQ_LABEL);

  try {
    const rawSlug = req.params.slug;
    if (!rawSlug) {
      log("❌ Missing slug param");
      return sendResponse(res, 400, false, "Missing slug");
    }

    const slug = decodeURIComponent(String(rawSlug)).toLowerCase();
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const rawLimit = Math.max(parseInt(req.query.limit || "50", 10), 1);
    const limit = Math.min(rawLimit, 100);
    const skip = (page - 1) * limit;

    // auth/user context
    const user = req.user || {};
    const userId = user?._id || user?.id || null;
    const userRole = user?.role || "unknown";
    const userAge = user?.age_group || null;
    const requestedAge = req.query.age_group;
    const validAges = ["Kid", "Teen", "Adult"];
    const isAdmin = ["admin", "superadmin"].includes(userRole);

    log("▶️ Incoming", {
      rawSlug,
      slug,
      query: req.query,
      page,
      limit,
      skip,
      user: { id: String(userId || ""), role: userRole, age_group: userAge },
      requestedAge,
      isAdmin,
    });

    // find topic
    const topic = await Topic.findOne({ slug }).lean();
    if (!topic) {
      log("❌ Topic not found", { slug });
      return sendResponse(res, 404, false, "Topic not found");
    }
    log("✅ Topic found", {
      topic_id: String(topic._id),
      title: topic.title,
      chapter: topic.chapter,
    });

    // age-group enforcement
    let effectiveAge = userAge;
    if (isAdmin && requestedAge && validAges.includes(requestedAge)) {
      effectiveAge = requestedAge;
      log("👮 Admin override: using requested age_group", { effectiveAge });
    }

    if (!effectiveAge || !validAges.includes(effectiveAge)) {
      log("❌ Invalid or missing effectiveAge", {
        effectiveAge,
        userAge,
        requestedAge,
        isAdmin,
      });
      return sendResponse(res, 400, false, "User age_group not set or invalid");
    }

    const filter = { topic_id: topic._id, age_group: effectiveAge };
    log("🔎 Query filter", filter);

    // query lessons + counts (parallel)
    const parallelLabel = `${REQ_LABEL} DBParallel`;
    time(parallelLabel);
    const [items, total, totalAll, countsAgg, firstLesson] = await Promise.all([
      Lesson.find(filter).sort({ order: 1, _id: 1 }).skip(skip).limit(limit).lean(),
      Lesson.countDocuments(filter),
      Lesson.countDocuments({ topic_id: topic._id }),
      Lesson.aggregate([
        { $match: { topic_id: topic._id } },
        { $group: { _id: "$age_group", count: { $sum: 1 } } },
      ]),
      Lesson.findOne(filter).sort({ order: 1, _id: 1 }).select("_id").lean(),
    ]);
    time(parallelLabel, true);

    const pages = Math.max(Math.ceil(total / limit), 1);
    const countsByAgeGroup = countsAgg.reduce((acc, cur) => {
      if (cur._id) acc[cur._id] = cur.count;
      return acc;
    }, {});

    // summarize payload for logs (don’t spam console with huge arrays)
    log("📦 Result summary", {
      returnedLessons: items.length,
      totalFiltered: total,
      totalAll,
      pages,
      limit,
      page,
      countsByAgeGroup,
      firstLessonId: firstLesson?._id || null,
      sampleIds: items.slice(0, 3).map((x) => String(x._id)), // first 3 ids
    });

    const responsePayload = {
      topic,
      lessons: items,
      meta: {
        total,
        totalAllLessons: totalAll,
        countsByAgeGroup,
        page,
        pages,
        limit,
        filters: { age_group: effectiveAge, requestedAge: requestedAge || null },
        firstLessonId: firstLesson?._id || null,
      },
    };

    time(REQ_LABEL, true);
    return sendResponse(res, 200, true, "Lessons fetched successfully", responsePayload);
  } catch (err) {
    console.error("[getLessonsByTopicSlug] ❌ error:", err);
    time(REQ_LABEL, true);
    return sendResponse(res, 500, false, "Server error", { error: err.message });
  }
};