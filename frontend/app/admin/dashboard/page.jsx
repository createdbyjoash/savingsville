"use client";
import React, { useState } from "react";
import AdminSidebar from "./Sidebar";
import OverviewCards from "./OverviewCards";
import CoursesTable from "./CoursesTable";
import UserAnalytics from "./UserAnalytics";
import AdminProfile from "./AdminProfile";
import AccentButton from "@/components/AccentButton";
import Input from "@/components/Input";

const initialCourses = [
  {
    id: 1,
    title: "Investing Basics",
    description: "Learn the basics of investing.",
    age_group: "Teen",
    chapter: 1,
    order: 1,
    subscriptions: 12
  },
  {
    id: 2,
    title: "Cryptocurrency",
    description: "Introduction to crypto.",
    age_group: "Adult",
    chapter: 2,
    order: 1,
    subscriptions: 8
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

  // Overview stats
  const totalUsers = 42;
  const totalCourses = courses.length;

  // Course CRUD
  const handleAdd = () => {
    setEditCourse(null);
    setTitle("");
    setDescription("");
    setAgeGroup("");
    setChapter("");
    setOrder("");
    setShowForm(true);
  };
  const handleEdit = (course) => {
    setEditCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setAgeGroup(course.age_group || "");
    setChapter(course.chapter || "");
    setOrder(course.order || "");
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
    if (editCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editCourse.id
            ? { ...c, title, description, age_group: ageGroup, chapter, order }
            : c
        )
      );
    } else {
      setCourses([
        ...courses,
        {
          id: Date.now(),
          title,
          description,
          age_group: ageGroup,
          chapter,
          order,
          subscriptions: 0,
        },
      ]);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#F6F4FF] flex font-baloo">
      <div className="sticky top-0 h-screen">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className="flex-1 px-6 py-10 md:px-12 md:py-14">
        {activeTab === "overview" && (
          <>
            <OverviewCards totalUsers={totalUsers} totalCourses={totalCourses} />
            <CoursesTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
        {activeTab === "courses" && (
          <>
            <div className="flex justify-between mb-6">
              <h3 className="font-baloo text-xl font-bold">Courses</h3>
              <AccentButton label="Add Course" onClick={handleAdd} />
            </div>
            <CoursesTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
            {showForm && (
              <form className="mt-8 space-y-4 max-w-lg" onSubmit={handleSubmit}>
                <Input
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div>
                  <label className="block mb-2 font-semibold">Age Group</label>
                  <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="" disabled>Select age group</option>
                    <option value="Kid">Kid</option>
                    <option value="Teen">Teen</option>
                    <option value="Adult">Adult</option>
                  </select>
                </div>
                <Input
                  placeholder="Chapter (number)"
                  value={chapter}
                  onChange={e => setChapter(e.target.value)}
                  required
                  type="number"
                />
                <Input
                  placeholder="Order (number)"
                  value={order}
                  onChange={e => setOrder(e.target.value)}
                  required
                  type="number"
                />
                <div className="flex gap-2">
                  <AccentButton type="submit" label={editCourse ? "Update" : "Add"} />
                  <AccentButton type="button" label="Cancel" onClick={() => setShowForm(false)} className="bg-gray-300 text-gray-700" />
                </div>
              </form>
            )}
          </>
        )}
        {activeTab === "analytics" && (
          <UserAnalytics ageGroups={initialAgeGroups} />
        )}
        {activeTab === "profile" && (
          <AdminProfile />
        )}
      </main>
    </div>
  );
}
