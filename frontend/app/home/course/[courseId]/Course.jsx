"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PiNote } from "react-icons/pi";

const FILTERS = [
  { id: 0, label: "ALL LESSONS" },
  { id: 1, label: "NOT STARTED" },
  { id: 2, label: "COMPLETED" },
  { id: 3, label: "PENDING" },
];

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // if you’re not using rewrites, change to `${process.env.NEXT_PUBLIC_API_URL}`

export default function Course() {
  const router = useRouter();
  const params = useParams(); // expects route /home/course/[slug]
  const slug = Array.isArray(params?.courseId) ? params.courseId[0] : params?.courseId;

  const [activeFilter, setActiveFilter] = useState(0);

  // topic + lessons state
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");

  // naive statuses (until you wire real progress): mark all as NOT STARTED
  const statusByLesson = useMemo(() => {
    const map = new Map();
    lessons.forEach((l) => map.set(l._id, "NOT STARTED"));
    return map;
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    if (activeFilter === 0) return lessons;
    if (activeFilter === 1)
      return lessons.filter((l) => statusByLesson.get(l._id) === "NOT STARTED");
    if (activeFilter === 2)
      return lessons.filter((l) => statusByLesson.get(l._id) === "COMPLETED");
    if (activeFilter === 3)
      return lessons.filter((l) => statusByLesson.get(l._id) === "PENDING");
    return lessons;
  }, [lessons, activeFilter, statusByLesson]);

  const authHeaders = () => {
    if (typeof window === "undefined") return {};
    const token =
      localStorage.getItem("savingsville-token") ||
      localStorage.getItem("token") ||
      "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    setLoading(true);
    setError("");

    (async () => {
      try {
        // 1) Topic details (title/description)
        const tRes = await fetch(`${API_BASE}/api/topics/${encodeURIComponent(slug)}`, {
          credentials: "include",
          headers: { ...authHeaders() },
        });
        const tJson = await tRes.json();
        if (!tRes.ok || tJson?.success === false) {
          throw new Error(tJson?.error || tJson?.message || "Failed to fetch topic");
        }
        const topicData = tJson?.data?.topic || null;
        if (isMounted) setTopic(topicData);

        // 2) Lessons list (sorted; paginated)
        const lRes = await fetch(
          `${API_BASE}/api/lessons/topic/slug/${encodeURIComponent(slug)}`,
          { credentials: "include", headers: { ...authHeaders() } }
        );
        const lJson = await lRes.json();
        if (!lRes.ok || lJson?.success === false) {
          throw new Error(lJson?.error || lJson?.message || "Failed to fetch lessons");
        }
        // Your controller returns { data: { data: [lessons], meta: {...} } }
        const lessonList = Array.isArray(lJson?.data?.lessons) ? lJson.data.lessons : [];
        if (isMounted) setLessons(lessonList);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const courseTitle = topic?.title || "Course";
  const courseDescription =
    (topic?.description && topic.description.trim()) ||
    "No description yet. This course is coming to life!";

  const goToFirstLesson = () => {
    if (lessons?.length && lessons[0]?._id) {
      // Prefer a descriptive route if you have it:
      // e.g. /home/course/[slug]/lesson/[lessonId]
      router.push(`/home/course/${encodeURIComponent(slug)}/lesson/${lessons[0]._id}`);
    } else {
      // Fallback if you only have a generic lesson page
      router.push(`/home/course/lesson`);
    }
  };

  const goToLesson = (lessonId) => {
    if (!lessonId) return;
    router.push(`/home/course/${encodeURIComponent(slug)}/lesson/${lessonId}`);
  };

  return (
    <div className="w-full h-screen space-y-5 max-sm:pt-[3em]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-lg font-bold font-baloo">
        <Image src="/home.svg" alt="Home" width={28} height={28} className="inline-block" />
        <Link href="/dashboard?tab=home" className="text-secondary font-bold">
          Home
        </Link>
        <span className="mx-1">»</span>
        <span className="text-black font-bold">Browse lesson</span>
      </div>

      <section className="grid lg:grid-cols-[55%_42%] w-full gap-8">
        {/* Column 1 */}
        <section className="w-full h-fit lg:h-screen overflow-y-hidden">
          <div className="relative space-y-4 lg:pb-[8.5em] h-fit lg:h-screen overflow-y-scroll scrollbar-hide">
            {/* Header */}
            <p className="font-baloo font-bold max-sm:text-xl text-2xl flex flex-col">
              Course
              <span className="font-baloo font-bold max-sm:text-3xl md:mt-3 text-4xl text-secondary">
                {loading ? "Loading…" : courseTitle}
              </span>
            </p>

            {/* Course card */}
            <div className="text-white w-full h-fit bg-secondary rounded-2xl px-6 py-6 space-y-2 shadow-xl">
              <p className="font-baloo font-bold text-white opacity-60 text-xl">Course Description</p>
              <p className="opacity-90">
                {loading ? "Fetching description…" : courseDescription}
              </p>

              <div className="flex flex-wrap gap-5 my-6">
                <div className="flex gap-2">
                  <div className="bg-white h-8 w-8 rounded-full items-center overflow-hidden">
                    <Image
                      src={"/profile 3.png"}
                      width={100}
                      height={100}
                      className="max-w-8 max-h-8"
                      alt="instructor"
                    />
                  </div>
                  <p className="font-baloo font-bold my-auto">Instructor Nicholas</p>
                </div>

                <div className="flex gap-2">
                  <Image src="/time.png" alt="time" height={35} width={35} />
                  <p className="font-baloo font-bold my-auto">
                    {/* If you’ll compute total duration later, swap here */}
                    ~{Math.max(lessons.length * 2, 5)} mins
                  </p>
                </div>
              </div>

              <hr className="mb-4 border-t-[0.12em] opacity-60 border-dashed" />

              <div className="flex flex-wrap justify-between">
                <p className="font-baloo font-bold my-auto">Earn the following perks:</p>
                <div className="flex gap-[1.2em] text-2xl items-center font-baloo font-bold">
                  <div className="flex item-center gap-2 opacity-90">
                    <Image src={"/streak.svg"} alt="streak" height={30} width={30} /> 0
                  </div>
                  <div className="flex item-center gap-2 opacity-90">
                    <Image src={"/lives.svg"} alt="hearts" height={30} width={30} /> 0
                  </div>
                  <div className="flex item-center gap-2 opacity-90">
                    <Image src={"/coin.svg"} alt="coins" height={30} width={30} /> 0
                  </div>
                </div>
              </div>

              <hr className="mt-4 border-t-[0.12em] opacity-60 border-dashed" />

              <div className="flex mt-6 gap-3">
                <Link
                  href={`/home/lesson/${slug}/${lessons?.[0]?._id || ""}`}
                  onClick={goToFirstLesson}
                  className="hover:bg-[#16161618] transition my-auto font-baloo font-bold text-white px-4 py-3 items-center h-fit shadow-xl border-2 border-[#ffffff6e] cursor-pointer bg-[#fff1] rounded-xl flex gap-2"
                >
                  <PiNote size={24} />
                  Get Started
                </Link>
                <p className="my-auto opacity-95">
                  {loading ? "…" : `${lessons.length} Lesson${lessons.length === 1 ? "" : "s"}`}
                </p>
              </div>
            </div>

            {/* FILTER */}
            <section>
              <p className="font-baloo font-bold">FILTER</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {FILTERS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFilter(item.id)}
                    className={`${
                      item.id === activeFilter ? "bg-secondary text-white" : ""
                    } transition cursor-pointer font-baloo font-bold border-[#75757552] border rounded-lg text-sm px-3 py-2 shadow-md`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Lessons list */}
            {error && (
              <div className="rounded-[0.9em] px-[1em] py-[0.8em] bg-red-50 border-2 border-red-200 text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF]/40 border-2 shadow-md border-[#75757552] w-full h-fit animate-pulse">
                <p className="font-baloo font-bold opacity-70">Loading lessons…</p>
                <p className="opacity-40 text-sm">This will be quick.</p>
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
                <p className="font-baloo my-auto font-bold flex gap-2">
                  <Image src={"/invest.png"} alt="empty" height={30} width={30} />
                  <span className="my-auto">No lessons match this filter</span>
                </p>
                <p className="opacity-60 my-auto text-sm">
                  Try switching back to “ALL LESSONS”.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLessons.map((l) => (
                  <div
                    key={l._id}
                    className="rounded-[0.9em] px-[1.1em] py-[0.9em] bg-white border-2 shadow-md border-[#75757552] w-full hover:shadow-lg transition cursor-pointer"
                    onClick={() => goToLesson(l._id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-baloo font-bold text-[1.05rem] text-gray-900">
                          {l.title}
                        </p>
                        <p className="opacity-60 text-sm line-clamp-2">
                          {l.definition || l.story || "No description provided."}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2 py-[2px] rounded-full bg-[#E2C6FF] text-[#4F1E8A] font-semibold">
                            {l.age_group}
                          </span>
                          <span className="px-2 py-[2px] rounded-full bg-gray-100 text-gray-700">
                            {statusByLesson.get(l._id)}
                          </span>
                        </div>
                      </div>
                      {/* Thumbnail preview if you add it to Lesson schema */}
                      {l.thumbnail && (
                        <div className="shrink-0 w-[88px] h-[64px] rounded-md overflow-hidden border">
                          <img
                            src={l.thumbnail}
                            alt="thumb"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Column 2 (sidebar) */}
        <section className="pb-[10em] h-screen lg:overflow-y-scroll scrollbar-hide">
          <div className="space-y-3 rounded-[0.9em] px-[2em] py-[1em] bg-[#E2C6FF] border-2 shadow-md border-[#75757552] w-full h-fit">
            <p className="opacity-40 my-auto">
              It can be hard to stay motivated so... Make cent is designed to be fun like a game!
            </p>
          </div>

          <Image
            src="/penguin_3.png"
            unoptimized
            height={600}
            width={600}
            className="mx-auto max-h-[15em] mt-6 max-w-[15em]"
            alt="penguin"
          />

          <div className="flex gap-1 rounded-[0.9em] px-3 py-[1em] bg-secondary border-2 shadow-md border-[#75757552] w-full h-fit">
            <Image src="/cartoon_file.png" unoptimized height={60} width={60} alt="file" />
            <div>
              <p className="font-baloo font-bold text-2xl text-white opacity-70">Progress</p>
              <p className="text-white my-auto text-[0.95em]">Your overall progress report</p>
            </div>
          </div>

          <Image
            src="/speedometer.png"
            unoptimized
            height={500}
            width={500}
            className="mx-auto max-h-[12em] max-w-[12em] mt-9"
            alt="progress"
          />
          <p className="text-center font-baloo font-bold text-3xl mt-[-2em]">
            {/* Replace with real progress later */}
            0 OF {Math.max(lessons.length, 1)}
          </p>
        </section>
      </section>
    </div>
  );
}
