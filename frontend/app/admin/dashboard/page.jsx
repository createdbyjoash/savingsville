"use client";
import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./Sidebar";
import AccentButton from "@/components/AccentButton";
import AddCourseModal from "./AddCourseModal";

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

      const res = await fetch("http://localhost:5000/api/admin/topics", {
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
          `http://localhost:5000/api/topics/${course.slug}`,
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

  // ----------------- UI -----------------
  return (
    <main className="min-h-screen bg-[#F6F4FF] flex flex-col md:flex-row font-baloo">
      {/* Sidebar */}
      <div className="hidden md:block md:w-[260px] sticky top-0 h-auto md:h-screen z-20">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg px-8 py-6 flex flex-col items-start">
              <span className="text-gray-700 text-sm font-semibold mb-2">Total Courses</span>
              <span className="text-secondary text-3xl font-extrabold">{totalCourses}</span>
            </div>
            <div className="bg-[#00B8D9] rounded-lg px-8 py-6 flex flex-col items-start">
              <span className="text-white text-sm font-semibold mb-2">Registered Students</span>
              <span className="text-white text-3xl font-extrabold">{registeredStudents}</span>
            </div>
            {hasAnyAgeGroup && (
              <div className="bg-[#6C63FF] rounded-lg px-8 py-6 flex flex-col items-start">
                <span className="text-white text-sm font-semibold mb-2">Active Age Groups</span>
                <span className="text-white text-3xl font-extrabold">{activeAgeGroups}</span>
              </div>
            )}
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="font-baloo text-xl font-bold">Courses</h3>
              <AccentButton label="Add Course" onClick={handleAdd} />
            </div>
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading courses…</div>
            ) : courses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No courses yet. Add one!</div>
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
                      <tr key={course.id} className="border-b hover:bg-blue-50 transition">
                        <td className="p-3 font-bold">{course.title}</td>
                        <td className="p-3 text-center">{course.lessonsCount}</td>
                        <td className="p-3 flex gap-2">
                          <button title="Edit" onClick={() => handleEdit(course)} className="text-blue-500 text-xl">✎</button>
                          <button title="Delete" onClick={() => handleDelete(course)} className="text-red-500 text-xl">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {showForm && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <AddCourseModal onClose={handleModalClose} editCourse={editCourse} />
              </div>
            )}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Students</h2>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Coming soon…</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Admin Settings</h2>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500">Coming soon…</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
