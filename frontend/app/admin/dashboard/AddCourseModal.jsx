"use client";
import React, { useState } from "react";

export default function AddCourseModal({ onClose }) {
  const [step, setStep] = useState(0);

  // Topic fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // One ageGroup for all lessons, per your note
  const [ageGroup, setAgeGroup] = useState(""); // "Kid" | "Teen" | "Adult"

  // Optional course thumbnail (UI only for now)
  const [thumbnail, setThumbnail] = useState(null);

  // Lessons
  const [lessons, setLessons] = useState([
    {
      title: "",
      definition: "",
      story: "",
      thumbnailFile: null,
      videoFile: null,
      thumbnailUrl: "",
      videoUrl: "",
      uploadingThumb: false,
      uploadingVideo: false,
    },
  ]);

  // Quiz
  const [quizType, setQuizType] = useState("Pre-Test"); // or "Test"
  const [questions, setQuestions] = useState([
    { question_text: "", options: ["", "", "", ""], correctIndex: null },
  ]);

  // Publish controls
  const [publishNow, setPublishNow] = useState(true);
  const [publishDate, setPublishDate] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);

  const tabNames = ["Information", "Content", "Quiz", "Publish"];

  // ----------------- Upload helper -----------------
  const uploadToServer = async (file, type /* "image" | "video" */) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data?.error || "Upload failed");
    }
    return data.url;
  };

  // ----------------- Lessons helpers -----------------
  const addLesson = () => {
    setLessons((prev) => [
      ...prev,
      {
        title: "",
        definition: "",
        story: "",
        thumbnailFile: null,
        videoFile: null,
        thumbnailUrl: "",
        videoUrl: "",
        uploadingThumb: false,
        uploadingVideo: false,
      },
    ]);
  };

  const removeLesson = (idx) => {
    setLessons((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateLessonField = (idx, field, value) => {
    setLessons((prev) => {
      const copy = [...prev];
      copy[idx][field] = value;
      return copy;
    });
  };

  const handleThumbChange = async (idx, file) => {
    updateLessonField(idx, "thumbnailFile", file);
    if (!file) return;
    try {
      updateLessonField(idx, "uploadingThumb", true);
      const url = await uploadToServer(file, "image");
      updateLessonField(idx, "thumbnailUrl", url);
    } catch (e) {
      alert(`Thumbnail upload failed: ${e.message}`);
    } finally {
      updateLessonField(idx, "uploadingThumb", false);
    }
  };

  const handleVideoChange = async (idx, file) => {
    updateLessonField(idx, "videoFile", file);
    if (!file) return;
    try {
      updateLessonField(idx, "uploadingVideo", true);
      const url = await uploadToServer(file, "video");
      updateLessonField(idx, "videoUrl", url);
    } catch (e) {
      alert(`Video upload failed: ${e.message}`);
    } finally {
      updateLessonField(idx, "uploadingVideo", false);
    }
  };

  // ----------------- Quiz helpers (fixed) -----------------
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question_text: "", options: ["", "", "", ""], correctIndex: null },
    ]);
  };

  const removeQuestion = (qIdx) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIdx));
  };

  const updateQuestionText = (qIdx, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].question_text = value;
      return copy;
    });
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].options[oIdx] = value;
      return copy;
    });
  };

  const addOption = (qIdx) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].options.push("");
      return copy;
    });
  };

  const removeOption = (qIdx, oIdx) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].options.splice(oIdx, 1);
      if (copy[qIdx].correctIndex === oIdx) copy[qIdx].correctIndex = null;
      // shift correctIndex if needed
      if (
        copy[qIdx].correctIndex !== null &&
        copy[qIdx].correctIndex > oIdx
      ) {
        copy[qIdx].correctIndex -= 1;
      }
      return copy;
    });
  };

  const setCorrect = (qIdx, oIdx) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].correctIndex = oIdx;
      return copy;
    });
  };

  // ----------------- Publish flow -----------------
  const handlePublish = async () => {
    // Validation
    if (!title.trim()) return alert("Please enter a course title.");
    if (!ageGroup) return alert("Please select an Age Group.");
    if (lessons.length === 0) return alert("Add at least one lesson.");
    if (lessons.some((l) => !l.title.trim()))
      return alert("Every lesson needs a title.");

    setLoading(true);
    try {
      // 1) Create Topic (server will auto-assign chapter)
      const topicRes = await fetch("http://localhost:5000/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const topicData = await topicRes.json();
      if (!topicRes.ok || !topicData.success) {
        throw new Error(topicData?.error || "Failed to create topic");
      }
      const topicId = topicData.data?.data?._id;

      console.log(topicData)

      // 2) Create Lessons (ensure media is uploaded)
      for (let i = 0; i < lessons.length; i++) {
        const L = lessons[i];

        let thumbnailUrl = L.thumbnailUrl;
        if (L.thumbnailFile && !thumbnailUrl) {
          thumbnailUrl = await uploadToServer(L.thumbnailFile, "image");
        }
        let videoUrl = L.videoUrl;
        if (L.videoFile && !videoUrl) {
          videoUrl = await uploadToServer(L.videoFile, "video");
        }

        const lessonRes = await fetch("http://localhost:5000/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic_id: topicId,
            age_group: ageGroup, // required: "Kid" | "Teen" | "Adult"
            title: L.title,
            definition: L.definition || "",
            story: L.story || "",
            order: i + 1,
            thumbnail: thumbnailUrl || "",
            video: videoUrl || "",
          }),
        });

        const lessonData = await lessonRes.json();
        if (!lessonRes.ok || !lessonData.success) {
          throw new Error(
            lessonData?.error || `Failed to create lesson #${i + 1}`
          );
        }
      }

      // 3) Create Quiz if valid questions exist
      const cleanedQuestions = questions
        .map((q) => {
          const opts = q.options.map((o) => o.trim()).filter(Boolean);
          if (
            !q.question_text.trim() ||
            opts.length < 2 ||
            q.correctIndex == null ||
            q.correctIndex >= opts.length
          ) {
            return null;
          }
          return {
            question_text: q.question_text.trim(),
            options: opts,
            correct_answer: opts[q.correctIndex],
          };
        })
        .filter(Boolean);

      if (cleanedQuestions.length) {
        const quizRes = await fetch("http://localhost:5000/api/quizzes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic_id: topicId,
            age_group: ageGroup,
            quiz_type: quizType,
            questions: cleanedQuestions,
          }),
        });
        const quizData = await quizRes.json();
        if (!quizRes.ok || !quizData.success) {
          throw new Error(quizData?.error || "Failed to create quiz");
        }
      }

      // (Optional) publishNow & publishDate could be persisted here if you add support server-side

      alert("✅ Course published successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert(`⚠️ ${err.message || "Something went wrong."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b bg-secondary">
        <h2 className="text-xl font-bold text-white">Add New Course</h2>
        <button
          className="text-white text-2xl hover:scale-110 transition"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Step Tabs */}
      <div className="flex gap-3 px-8 py-4 border-b bg-gray-50">
        {tabNames.map((tab, idx) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              step === idx
                ? "bg-blue-600 text-white shadow"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setStep(idx)}
            disabled={idx > step}
          >
            {tab}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-500 italic self-center">
          {loading ? "Saving..." : "Auto-saved"}
        </span>
        {step < tabNames.length - 1 && (
          <button
            className="ml-3 bg-secondary text-white px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-700 transition"
            onClick={() => setStep(step + 1)}
          >
            Next →
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
        {/* Step 1: Information */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-10">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Information <span className="text-gray-400 text-xs">ⓘ</span>
              </h3>

              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Content Creation Course"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Course Description
              </label>
              <textarea
                className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-400  focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="This course will be about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />

            </div>


          </div>
        )}

        {/* Step 2: Content (Lessons UI) */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Lessons</h3>
              <button
                type="button"
                onClick={addLesson}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                + Add Lesson
              </button>
            </div>

            {lessons.map((l, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border rounded-xl shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">
                    Lesson {idx + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeLesson(idx)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <label className="block text-sm font-semibold text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Lesson title"
                  value={l.title}
                  onChange={(e) =>
                    updateLessonField(idx, "title", e.target.value)
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Definition (optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                      rows={3}
                      placeholder="Short definition for this lesson"
                      value={l.definition}
                      onChange={(e) =>
                        updateLessonField(idx, "definition", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Story (optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                      rows={3}
                      placeholder="Add a brief story/example"
                      value={l.story}
                      onChange={(e) =>
                        updateLessonField(idx, "story", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Media uploads */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-gray-400 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        Thumbnail (image)
                      </span>
                      {l.uploadingThumb && (
                        <span className="text-xs text-blue-600">Uploading…</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={(e) =>
                        handleThumbChange(idx, e.target.files?.[0] || null)
                      }
                    />
                    {l.thumbnailUrl && (
                      <img
                        src={l.thumbnailUrl}
                        alt="thumb"
                        className="mt-2 h-28 w-auto rounded-md border"
                      />
                    )}
                  </div>

                  <div className="p-3 border border-gray-400 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        Video (optional)
                      </span>
                      {l.uploadingVideo && (
                        <span className="text-xs text-blue-600">Uploading…</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      className="mt-2"
                      onChange={(e) =>
                        handleVideoChange(idx, e.target.files?.[0] || null)
                      }
                    />
                    {l.videoUrl && (
                      <video
                        className="mt-2 w-full rounded-md border"
                        controls
                        src={l.videoUrl}
                      />
                    )}
                  </div>
                </div>

                {/* Age group reminder */}
                <div className="flex gap-2 mb-2">
                  {["Kid", "Teen", "Adult"].map((age) => (
                    <button
                      key={age}
                      type="button"
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        ageGroup === age
                          ? "bg-blue-600 text-white"
                          : "bg-white border text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setAgeGroup(age)}
                    >
                      {age}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  The selected Age Group will apply to all lessons by default.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Quiz (fixed to match state/handlers) */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800">Quiz</h3>
                <select
                  value={quizType}
                  onChange={(e) => setQuizType(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                >
                  <option value="Pre-Test">Pre-Test</option>
                  <option value="Test">Test</option>
                </select>
              </div>
              <button
                onClick={addQuestion}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                + Add Question
              </button>
            </div>

            {questions.map((q, qi) => (
              <div key={qi} className="p-4 border rounded-lg space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">
                    Question {qi + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qi)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <label className="block text-sm font-semibold text-gray-700">
                  Question text
                </label>
                <input
                  type="text"
                  placeholder="Type the question here"
                  value={q.question_text}
                  onChange={(e) => updateQuestionText(qi, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      Options
                    </span>
                    <button
                      type="button"
                      onClick={() => addOption(qi)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      + Add option
                    </button>
                  </div>

                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${qi}`}
                        checked={q.correctIndex === oi}
                        onChange={() => setCorrect(qi, oi)}
                        className="mt-0.5"
                        title="Mark as correct"
                      />
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={(e) => updateOption(qi, oi, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(qi, oi)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 4: Publish */}
        {step === 3 && (
          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">Publish</h3>
            <div className="flex gap-6 items-center mb-4">
              <label className="flex items-center gap-2 font-medium text-gray-700">
                <input
                  type="radio"
                  checked={publishNow}
                  onChange={() => setPublishNow(true)}
                />
                Post now
              </label>
            </div>
            {!publishNow && (
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-gray-700">
                  Publish Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="px-3 py-2 rounded-lg border w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
            )}
            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}