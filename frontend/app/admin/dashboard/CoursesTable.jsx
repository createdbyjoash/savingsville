import React from "react";
import AccentButton from "@/components/AccentButton";

export default function CoursesTable({ courses, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-baloo text-xl font-bold mb-4">Courses</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Subscriptions</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-2 font-bold">{course.title}</td>
              <td className="p-2">{course.description}</td>
              <td className="p-2 text-center">{course.subscriptions}</td>
              <td className="p-2 flex gap-2">
                <AccentButton label="Edit" onClick={() => onEdit(course)} />
                <AccentButton label="Delete" onClick={() => onDelete(course)} className="bg-red-500 hover:bg-red-600 text-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
