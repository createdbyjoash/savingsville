"use client";
import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./Sidebar";
import AccentButton from "@/components/AccentButton";
import AddCourseModal from "./AddCourseModal";



const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// ----------------- Admin Dashboard -----------------
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  // Stats (derived)
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((sum, c) => sum + (c.lessonsCount || 0), 0);
  const registeredStudents = 150; // TODO: real stats later

  // NOTE: your response doesn't include an age group per topic.
  // We'll show "—" in the table and hide the "Active Age Groups" card if all are "—".
  const hasAnyAgeGroup = courses.some((c) => c.age_group && c.age_group !== "—");
  const activeAgeGroups = hasAnyAgeGroup
    ? new Set(courses.map((c) => c.age_group).filter((g) => g && g !== "—")).size
    : 0;

  // ------------- Fetch Courses (robust to array / wrapped data) -------------
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("savingsville-token") ||
        localStorage.getItem("token") ||
        "";

      const res = await fetch(`${API_BASE}/api/admin/topics`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const raw = await res.json();

      // Your sample shows a bare array:
      // [
      //   { "id": "...", "title": "...", "description": "", "slug": "...", "lessonsCount": 9 },
      //   ...
      // ]
      const list = Array.isArray(raw) ? raw : raw?.data || [];

      const mapped = list.map((t) => ({
        id: t.id || t._id,                         // support either style
        slug: t.slug || "",
        title: t.title || "",
        description: t.description || "",
        age_group: "—",                            // not provided by API
        lessonsCount:
          typeof t.lessonsCount === "number"
            ? t.lessonsCount
            : Array.isArray(t.lessons)
            ? t.lessons.length
            : 0,
        created_at: t.createdAt
          ? new Date(t.createdAt).toLocaleDateString()
          : "—",
      }));

      setCourses(mapped);
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ----------------- CRUD -----------------
  const handleAdd = () => {
    setEditCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (course) => {
    if (!course?.slug) {
      return alert("This topic has no slug; cannot delete.");
    }
    if (window.confirm(`Delete course "${course.title}"?`)) {
      try {
        const token =
          localStorage.getItem("savingsville-token") ||
          localStorage.getItem("token") ||
          "";

        const res = await fetch(
          `${API_BASE}/api/topics/${course.slug}`,
          {
            method: "DELETE",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = await res.json();

        // Be tolerant: success can be boolean or inferred by status code
        if (res.ok && (data.success === undefined || data.success === true)) {
          setCourses((prev) => prev.filter((c) => c.id !== course.id));
        } else {
          alert(data?.error || "Failed to delete topic.");
        }
      } catch (err) {
        console.error("Error deleting:", err);
        alert("Delete failed.");
      }
    }
  };

  // After AddCourseModal finishes, we close AND refresh list
  const handleModalClose = () => {
    setShowForm(false);
    fetchCourses(); // refresh with latest topics
  };

  // ----------------- UI -----------------
  return (
    <div className="min-h-screen bg-[#F6F4FF] flex flex-col md:flex-row font-baloo">
      {/* Sidebar */}
      <div className="hidden md:block md:w-[260px] sticky top-0 h-auto md:h-screen z-20">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className="flex-1 px-2 py-4 sm:px-4 sm:py-6 md:px-12 md:py-14 overflow-x-auto">
        {/* ----------------- Overview ----------------- */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8 w-full lg:w-[60%]">
              <div className="bg-[#34A853] rounded-lg px-8 py-6 flex flex-col items-start">
                <span className="text-white text-sm font-semibold mb-2">
                  Total Courses
                </span>
                <span className="text-white text-3xl font-extrabold">
                  {totalCourses}
                </span>
              </div>
              <div className="bg-[#4285F4] rounded-lg px-8 py-6 flex flex-col items-start">
                <span className="text-white text-sm font-semibold mb-2">
                  Total Lessons
                </span>
                <span className="text-white text-3xl font-extrabold">
                  {totalLessons}
                </span>
              </div>

              {/* Only show if we actually have age group data */}
              {hasAnyAgeGroup && (
                <div className="bg-[#6C63FF] rounded-lg px-8 py-6 flex flex-col items-start">
                  <span className="text-white text-sm font-semibold mb-2">
                    Active Age Groups
                  </span>
                  <span className="text-white text-3xl font-extrabold">
                    {activeAgeGroups}
                  </span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading courses…
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No courses yet. Add one from the Courses tab.
              </div>
            ) : (
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white rounded-xl shadow text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 font-semibold">Title</th>
                      <th className="p-3 font-semibold">Age Group</th>
                      <th className="p-3 font-semibold"># Lessons</th>
                      <th className="p-3 font-semibold">Created Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b hover:bg-blue-50 cursor-pointer transition"
                      >
                        <td className="p-3 font-bold">{course.title}</td>
                        <td className="p-3">{course.age_group}</td>
                        <td className="p-3 text-center">
                          {course.lessonsCount}
                        </td>
                        <td className="p-3">{course.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ----------------- Courses ----------------- */}
        {activeTab === "courses" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="font-baloo text-xl font-bold">Courses</h3>
              <AccentButton label="Add Course" onClick={handleAdd} />
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">
                Loading courses…
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No courses yet. Add one!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 font-semibold">Title</th>
                      <th className="p-3 font-semibold"># Lessons</th>
                      <th className="p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b hover:bg-blue-50 transition"
                      >
                        <td className="p-3 font-bold">{course.title}</td>
                        <td className="p-3 text-center mx-auto">
                          {course.lessonsCount}
                        </td>
                        <td className="p-3 flex gap-2">
                          <button
                            title="Edit"
                            onClick={() => handleEdit(course)}
                            className="text-blue-500 text-xl"
                          >
                            ✎
                          </button>
                          <button
                            title="Delete"
                            onClick={() => handleDelete(course)}
                            className="text-red-500 text-xl"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showForm && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                {/* Close modal will also refresh topics */}
                <AddCourseModal onClose={handleModalClose} />
              </div>
            )}
          </>
        )}

        {/* ----------------- Students ----------------- */}
        {activeTab === "students" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Students</h2>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Coming soon…</p>
            </div>
          </div>
        )}

        {/* ----------------- Settings ----------------- */}
        {activeTab === "settings" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Admin Settings</h2>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Coming soon…</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}