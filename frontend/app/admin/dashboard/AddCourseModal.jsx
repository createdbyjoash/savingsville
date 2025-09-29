"use client";
import React, { useState } from "react";

export default function AddCourseModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [topics, setTopics] = useState([{ title: "", lessons: [{ title: "", content: "" }] }]);
  const [publishNow, setPublishNow] = useState(true);
  const [publishDate, setPublishDate] = useState("");

  const tabNames = ["Informations", "Content", "Publish"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-0 w-full max-w-3xl relative">
      <button className="absolute top-4 right-4 text-xl" onClick={onClose}>✕</button>
      <div className="border-b px-8 pt-8 pb-4">
        <h2 className="text-2xl font-bold text-black mb-2">Add new course</h2>
        <div className="flex gap-2 items-center">
          {tabNames.map((tab, idx) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded font-semibold text-sm flex items-center gap-1 ${step === idx ? "bg-[#1A4EFF] text-white" : "bg-[#F5F6FA] text-black"}`}
              onClick={() => setStep(idx)}
              disabled={idx > step}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-500">Saved</span>
          {step < 4 && (
            <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm" onClick={() => setStep(step + 1)}>Next step</button>
          )}
        </div>
      </div>
      <div className="px-8 py-6">
          {step === 0 && (
          <div className="bg-[#F5F6FA] rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-black mb-4 flex items-center gap-2">Informations <span className="text-gray-400 text-xs">ⓘ</span></h3>
              <label className="block text-sm font-semibold mb-1">Course Title</label>
              <input type="text" className="w-full mb-4 px-3 py-2 rounded border bg-white text-black" placeholder="Content Creation Course" />
              <label className="block text-sm font-semibold mb-1">Course Description</label>
              <textarea className="w-full mb-4 px-3 py-2 rounded border bg-white text-black" placeholder="This course will be about..." />
              <label className="block text-sm font-semibold mb-1">Age Group</label>
              <div className="flex gap-2 mb-4">
                {['Kids', 'Teens', 'Young Adults'].map(age => (
                  <button key={age} type="button" className={`px-3 py-1 rounded border font-semibold text-sm bg-white text-black`}>{age}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Thumbnail(s)</h3>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center mb-4">
                <span className="text-gray-500 mb-2 text-center">Drag and drop your thumbnail(s) to upload</span>
                <span className="text-xs text-gray-400 mb-2 text-center">For best results, thumbnail image should be at least 1530 x 944 pixels.</span>
                <input
                  type="file"
                  id="thumbnail-upload"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={e => {
                    // You can handle the uploaded files here
                    // Example: setThumbnails(Array.from(e.target.files));
                  }}
                />
                <button
                  type="button"
                  className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm"
                  onClick={() => document.getElementById("thumbnail-upload").click()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
  {step === 1 && (
          <div className="bg-[#F5F6FA] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-black mb-4">Topics & Lessons</h3>
            {topics.map((topic, tIdx) => (
              <div key={tIdx} className="bg-white rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <input type="text" className="font-semibold text-black px-3 py-2 rounded border w-2/3" placeholder={`Topic ${tIdx + 1} Title`} value={topic.title} onChange={e => {
                    const newTopics = [...topics];
                    newTopics[tIdx].title = e.target.value;
                    setTopics(newTopics);
                  }} />
                  <button className="text-red-500 text-sm" onClick={() => setTopics(topics.filter((_, i) => i !== tIdx))}>Delete Topic</button>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold mb-2">Lessons</h4>
                  {topic.lessons.map((lesson, lIdx) => (
                    <div key={lIdx} className="flex gap-2 items-center mb-2">
                      <input type="text" className="px-3 py-2 rounded border w-1/2" placeholder={`Lesson ${lIdx + 1} Title`} value={lesson.title} onChange={e => {
                        const newTopics = [...topics];
                        newTopics[tIdx].lessons[lIdx].title = e.target.value;
                        setTopics(newTopics);
                      }} />
                      <input type="file" accept="image/*,video/*" className="px-2 py-1" onChange={e => {
                        const newTopics = [...topics];
                        newTopics[tIdx].lessons[lIdx].content = e.target.files[0];
                        setTopics(newTopics);
                      }} />
                      <button className="text-red-500 text-xs" onClick={() => {
                        const newTopics = [...topics];
                        newTopics[tIdx].lessons = newTopics[tIdx].lessons.filter((_, i) => i !== lIdx);
                        setTopics(newTopics);
                      }}>Delete Lesson</button>
                    </div>
                  ))}
                  <button className="bg-[#1A4EFF] text-white px-3 py-1 rounded font-semibold text-xs" onClick={() => {
                    const newTopics = [...topics];
                    newTopics[tIdx].lessons.push({ title: "", content: "" });
                    setTopics(newTopics);
                  }}>New Lesson</button>
                </div>
              </div>
            ))}
            <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm" onClick={() => setTopics([...topics, { title: "", lessons: [{ title: "", content: "" }] }])}>New Topic</button>
          </div>
        )}
  {step === 2 && (
          <div className="bg-[#F5F6FA] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-black mb-4">Publish</h3>
            <div className="flex gap-4 items-center mb-4">
              <label className="font-semibold">Post now</label>
              <input type="radio" checked={publishNow} onChange={() => setPublishNow(true)} />
              <label className="font-semibold">Schedule</label>
              <input type="radio" checked={!publishNow} onChange={() => setPublishNow(false)} />
            </div>
            {!publishNow && (
              <div className="mb-4">
                <label className="block font-semibold mb-1">Publish Date & Time</label>
                <input type="datetime-local" className="px-3 py-2 rounded border w-1/2" value={publishDate} onChange={e => setPublishDate(e.target.value)} />
              </div>
            )}
            <button className="bg-[#1A4EFF] text-white px-4 py-2 rounded font-semibold text-sm">Publish</button>
          </div>
        )}
      </div>
    </div>
  );
}
