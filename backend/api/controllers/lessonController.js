// controllers/lessonController.js
import User from "../models/User.js";
import { Lesson, Topic } from "../models/ContentModels.js";

export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ success: false, message: "Lesson not found" });

    res.json({ success: true, data: lesson });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
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