"use client";
import React, { useState } from "react";
import AdminSidebar from "./Sidebar";
import OverviewCards from "./OverviewCards";
import CoursesTable from "./CoursesTable";
import UserAnalytics from "./UserAnalytics";
import AdminProfile from "./AdminProfile";
import AccentButton from "@/components/AccentButton";
import Input from "@/components/Input";
import AddCourseModal from "./AddCourseModal";

const initialCourses = [
  {
    id: 1,
    title: "Intro to Saving",
    age_group: "Kids",
    exercises: Array(2).fill({}),
    created_at: "01/15/2024"
  },
  {
    id: 2,
    title: "Budgeting Basics",
    age_group: "Teens",
    exercises: Array(5).fill({}),
    created_at: "04/25/2024"
  },
  {
    id: 3,
    title: "Financial Independence",
    age_group: "Young Adults",
    exercises: Array(2).fill({}),
    created_at: "03/05/2024"
  },
  {
    id: 4,
    title: "Smart Shopping",
    age_group: "Young Adults",
    exercises: Array(5).fill({}),
    created_at: "04/05/2024"
  },
  {
    id: 5,
    title: "Investing 101",
    age_group: "Young Adults",
    exercises: Array(5).fill({}),
    created_at: "04/05/2024"
  },
];
const initialAgeGroups = [
  { label: "Kids", count: 10 },
  { label: "Teens", count: 20 },
  { label: "Adults", count: 15 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState(initialCourses);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [chapter, setChapter] = useState("");
  const [order, setOrder] = useState("");
  const [story, setStory] = useState("");
  const [definition, setDefinition] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exerciseText, setExerciseText] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Overview stats
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((sum, c) => sum + (c.exercises ? c.exercises.length : 0), 0);
  const registeredStudents = 150; // Example static value, replace with real data
  const activeAgeGroups = [...new Set(courses.map(c => c.age_group))].length;

  // Course CRUD
  const handleAdd = () => {
    setEditCourse(null);
    setTitle("");
    setDescription("");
    setAgeGroup("");
    setChapter("");
    setOrder("");
    setStory("");
    setDefinition("");
    setExercises([]);
    setShowForm(true);
  };
  const handleEdit = (course) => {
    setEditCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setAgeGroup(course.age_group || "");
    setChapter(course.chapter || "");
    setOrder(course.order || "");
    setStory(course.story || "");
    setDefinition(course.definition || "");
    setExercises(course.exercises || []);
    setShowForm(true);
  };
  const handleDelete = (course) => {
    if (window.confirm(`Delete course "${course.title}"?`)) {
      setCourses(courses.filter((c) => c.id !== course.id));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !ageGroup || !chapter || !order) return;
    const courseData = {
      id: editCourse ? editCourse.id : Date.now(),
      title,
      description,
      age_group: ageGroup,
      chapter,
      order,
      story,
      definition,
      exercises,
      subscriptions: editCourse ? editCourse.subscriptions : 0,
    };
    if (editCourse) {
      setCourses(
        courses.map((c) => (c.id === editCourse.id ? courseData : c))
      );
    } else {
      setCourses([...courses, courseData]);
    }
    setShowForm(false);
  };

  // Exercise add logic
  const handleAddExercise = () => {
    if (!exerciseText || !correctAnswer || options.some(opt => !opt)) return;
    setExercises([
      ...exercises,
      {
        question_text: exerciseText,
        options,
        correct_answer: correctAnswer,
      },
    ]);
    setExerciseText("");
    setOptions([""]);
    setCorrectAnswer("");
  };

  return (
    <div className="min-h-screen bg-[#F6F4FF] flex font-baloo">
      <div className="sticky top-0 h-screen">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className="flex-1 px-6 py-10 md:px-12 md:py-14">
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full">
              <div className="bg-[#34A853] rounded-lg px-8 py-6 flex flex-col items-start min-w-[170px]">
                <span className="text-white text-sm font-semibold mb-2">Total Courses</span>
                <span className="text-white text-3xl font-extrabold">{totalCourses}</span>
              </div>
              <div className="bg-[#4285F4] rounded-lg px-8 py-6 flex flex-col items-start min-w-[170px]">
                <span className="text-white text-sm font-semibold mb-2">Total Lessons</span>
                <span className="text-white text-3xl font-extrabold">{totalLessons}</span>
              </div>
              <div className="bg-[#00B8D9] rounded-lg px-8 py-6 flex flex-col items-start min-w-[170px]">
                <span className="text-white text-sm font-semibold mb-2">Registered Students</span>
                <span className="text-white text-3xl font-extrabold">{registeredStudents}</span>
              </div>
              <div className="bg-[#6C63FF] rounded-lg px-8 py-6 flex flex-col items-start min-w-[170px]">
                <span className="text-white text-sm font-semibold mb-2">Active Age Groups</span>
                <span className="text-white text-3xl font-extrabold">{activeAgeGroups}</span>
              </div>
            </div>
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
                    <tr key={course.id} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="p-3 font-bold">{course.title}</td>
                      <td className="p-3">{course.age_group}</td>
                      <td className="p-3 text-center">{course.exercises ? course.exercises.length : 0}</td>
                      <td className="p-3">{course.created_at ? course.created_at : "01/01/2024"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activeTab === "courses" && (
          <>
            <div className="flex justify-between mb-6">
              <h3 className="font-baloo text-xl font-bold">Courses</h3>
              <AccentButton label="Add Course" onClick={handleAdd} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow text-left">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 font-semibold">Title</th>
                    <th className="p-3 font-semibold">Age Group</th>
                    <th className="p-3 font-semibold"># Lessons</th>
                    <th className="p-3 font-semibold">Created Date</th>
                    <th className="p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses
                    .sort((a, b) => b.exercises.length - a.exercises.length) // Default sort by # lessons
                    .map((course) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="p-3 font-bold">{course.title}</td>
                        <td className="p-3">{course.age_group}</td>
                        <td className="p-3 text-center">{course.exercises ? course.exercises.length : 0}</td>
                        <td className="p-3">{course.created_at ? course.created_at : "01/01/2024"}</td>
                        <td className="p-3 flex gap-2">
                          <button title="Edit" onClick={() => setEditCourse(course)} className="text-blue-500 text-xl">✎</button>
                          <button title="Delete" onClick={() => handleDelete(course)} className="text-red-500 text-xl">🗑️</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Popup for course details/actions */}
            {editCourse && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-xl" onClick={() => setEditCourse(null)}>✕</button>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-bold text-2xl text-primary">{editCourse.title}</span>
                    <button title="Edit" onClick={() => { setShowForm(true); }} className="text-blue-500 text-xl">✎</button>
                    <button title="Delete" onClick={() => { handleDelete(editCourse); setEditCourse(null); }} className="text-red-500 text-xl">🗑️</button>
                  </div>
                  <div className="mb-2 text-gray-700">{editCourse.description}</div>
                  <div className="mb-2 text-sm text-gray-500">Exercises: {editCourse.exercises ? editCourse.exercises.length : 0}</div>
                  {editCourse.story && <div className="mb-2 text-secondary">Story: {editCourse.story}</div>}
                  {editCourse.definition && <div className="mb-2 text-secondary">Definition: {editCourse.definition}</div>}
                </div>
              </div>
            )}
            {/* Course form for add/edit */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <AddCourseModal onClose={() => setShowForm(false)} />
              </div>
            )}
          </>
        )}
        {activeTab === "students" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Student Stats</h3>
                <div className="mb-4">
                  <span className="block text-gray-700 mb-2">Total Registered Students: 150</span>
                  <span className="block text-gray-700 mb-2">Active Students: 120</span>
                  <span className="block text-gray-700 mb-2">Average Course Completion: 75%</span>
                </div>
                {/* Example chart: Course Completion */}
                <div className="w-full h-32 bg-gradient-to-r from-blue-400 to-blue-200 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  Chart: Completion Rate
                </div>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-2">Recent Students</h3>
                <ul className="mt-2">
                  <li className="mb-2">zoe@example.com (Joined 2h ago)</li>
                  <li className="mb-2">liam@example.com (Joined Apr 20, 2024)</li>
                  <li className="mb-2">emma@example.com (Joined Mar 15, 2024)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-8">
            <h2 className="font-baloo text-xl font-bold mb-4">Admin Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6 mb-4">
                <h3 className="font-semibold text-lg mb-2">Change Email</h3>
                <input type="email" className="w-full mb-2 px-3 py-2 rounded border bg-white text-black" placeholder="New email address" />
                <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm">Update Email</button>
              </div>
              <div className="bg-white rounded-xl shadow p-6 mb-4">
                <h3 className="font-semibold text-lg mb-2">Change Password</h3>
                <input type="password" className="w-full mb-2 px-3 py-2 rounded border bg-white text-black" placeholder="New password" />
                <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm">Update Password</button>
              </div>
              <div className="bg-white rounded-xl shadow p-6 mb-4">
                <h3 className="font-semibold text-lg mb-2">Add New Admin</h3>
                <input type="email" className="w-full mb-2 px-3 py-2 rounded border bg-white text-black" placeholder="Admin email" />
                <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm">Add Admin</button>
              </div>
              <div className="bg-white rounded-xl shadow p-6 mb-4">
                <h3 className="font-semibold text-lg mb-2">Other Settings</h3>
                <ul className="mt-2">
                  <li className="mb-2">Notification preferences</li>
                  <li className="mb-2">Manage account</li>
                  <li className="mb-2">Delete account</li>
                </ul>
              </div>
            </div>
          </div>
        )}
              </main>
            </div>
  )};
