"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { CgPlayTrackPrev, CgPlayTrackNext } from "react-icons/cg";
import { RiSendPlaneFill } from "react-icons/ri";
import AutoResizeTextarea from "@/components/AutoResizeTextarea";
import Comment from "@/components/Comment";

const comments = [
  { profileUrl: "/instructor.png", comment: "What do you guys think?", user: "Micheal B Jordan" },
  { profileUrl: "/ada.png",         comment: "Very insightfull, thank you!", user: "Eve Boyle" },
  { profileUrl: "/teen.png",        comment: "Can we have more of this?", user: "Cathy Smith" },
  { profileUrl: "/tayo.png",        comment: "hmnnn...", user: "Lola Stone" },
];

import FallbackHero from "./FallbackComponent";





const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // if you aren't using rewrites, swap to process.env.NEXT_PUBLIC_API_URL

export default function Lesson() {
  const router = useRouter();
  const params = useParams(); // expects /home/lesson/[slug]/[lessonId]
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  const lessonId = Array.isArray(params?.lessonId) ? params.lessonId[0] : params?.lessonId;

  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");

  const authHeaders = () => {
    if (typeof window === "undefined") return {};
    const token =
      localStorage.getItem("savingsville-token") ||
      localStorage.getItem("token") ||
      "";
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch lesson + all lessons for the topic by slug
  useEffect(() => {
    if (!slug || !lessonId) return;

    let mounted = true;
    setLoading(true);
    setError("");

    (async () => {
      try {
        // 1) Current lesson
        const lRes = await fetch(`${API_BASE}/api/lessons/${encodeURIComponent(lessonId)}`, {
          credentials: "include",
          headers: { ...authHeaders() },
        });
        const lJson = await lRes.json();
        if (!lRes.ok || lJson?.success === false) {
          throw new Error(lJson?.error || lJson?.message || "Failed to fetch lesson");
        }

        console.log("Fetched lesson response:", lJson);

        const currentLesson = lJson?.data || null;

        // 2) All lessons for topic (big limit to avoid pagination in UI)
        const tRes = await fetch(
          `${API_BASE}/api/lessons/topic/slug/${encodeURIComponent(slug)}`,
          { credentials: "include", headers: { ...authHeaders() } }
        );
        const tJson = await tRes.json();

        console.log("Fetched topic lessons response:", tJson);
        if (!tRes.ok || tJson?.success === false) {
          throw new Error(tJson?.error || tJson?.message || "Failed to fetch topic lessons");
        }
        const payload = tJson?.data || {};
        const topicDoc = payload.topic || null;
        const lessonList = Array.isArray(payload.lessons) ? payload.lessons : [];

        console.log("Fetched lesson:", { currentLesson, topicDoc, lessonList });

        if (!mounted) return;
        setLesson(currentLesson);
        setTopic(topicDoc);
        setLessons(lessonList);
      } catch (e) {
        console.error(e);
        if (mounted) setError(e.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [slug, lessonId]);

  // Sorted lessons (backend already sorts by order; we keep it stable)
  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => (a.order - b.order) || (a._id > b._id ? 1 : -1));
  }, [lessons]);

  // Find current index by ID; fallback by order if not found
  const { currentIndex, prevLesson, nextLesson } = useMemo(() => {
    if (!lesson) return { currentIndex: -1, prevLesson: null, nextLesson: null };

    let idx = sortedLessons.findIndex((l) => String(l._id) === String(lesson._id));
    if (idx === -1) {
      // fallback using order
      idx = sortedLessons.findIndex((l) => Number(l.order) === Number(lesson.order));
    }
    const prev = idx > 0 ? sortedLessons[idx - 1] : null;
    const next = idx >= 0 && idx < sortedLessons.length - 1 ? sortedLessons[idx + 1] : null;
    return { currentIndex: idx, prevLesson: prev, nextLesson: next };
  }, [lesson, sortedLessons]);

  // Video/thumbnail display logic
  const hasVideo = !!(lesson?.video && String(lesson.video).trim().length);
  const hasThumb = !!(lesson?.thumbnail && String(lesson.thumbnail).trim().length);

  const courseTitle = topic?.title || "Course";
  const courseHref = `/home/course/${encodeURIComponent(slug)}`;

  const goPrev = () => {
    if (!prevLesson) return;
    router.push(`/home/lesson/${encodeURIComponent(slug)}/${prevLesson._id}`);
  };
  const goNext = () => {
    if (!nextLesson) return;
    router.push(`/home/lesson/${encodeURIComponent(slug)}/${nextLesson._id}`);
  };

  return (
    <div className="w-full h-screen space-y-5 max-sm:pt-[3.5em] max-md:pt-[2em] md:pt-[2.4em] lg:pt-[3em] xl:pt-0">
      <div>
        {/* Breadcrumbs */}
        <div className="max-sm:hidden flex flex-wrap items-center gap-2 text-lg font-bold font-baloo">
          <Image src="/home.svg" alt="Home" width={28} height={28} className="inline-block" />
          <Link href="/dashboard?tab=home" className="text-secondary font-bold">Home</Link>
          <span className="mx-1">»</span>
          <Link href={courseHref} className="font-bold text-secondary">Browse lesson</Link>
          <span className="mx-1">»</span>
          <span className="text-black font-bold">{courseTitle}</span>
        </div>

        <section className="md:pb-[10em] w-full h-fit xl:h-screen grid">
          <section className="w-full lg:h-screen mt-7 grid lg:grid-cols-[62%_35%] gap-6 scrollbar-hide">

            {/* First Column */}
            <section className="flex flex-col lg:pb-[14em] h-fit lg:h-screen overflow-y-scroll scrollbar-hide">
              {/* Media: prioritize video, else thumbnail, else hide */}
              {!loading && hasVideo && (
                <div className="rounded-xl overflow-hidden border-2 border-[#75757552] shadow-lg">
                  <VideoPlayer src={lesson.video} />
                </div>
              )}

              {!loading && !hasVideo && hasThumb && (
                <div className="rounded-xl overflow-hidden border-2 border-[#75757552] shadow-lg">
                  {/* Use img for external URLs; next/image is fine too if domains are allowed */}
                  {/* Using <img> to avoid domain config requirements */}
                  <img
                    src={lesson.thumbnail}
                    alt="Lesson thumbnail"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {!loading && !hasVideo && !hasThumb && (
                <FallbackHero topic={topic} lesson={lesson} />
              )}

              {loading && (
                <div className="h-[220px] rounded-xl border-2 border-[#75757552] bg-[#E2C6FF] animate-pulse shadow-md" />
              )}

              {/* Prev/Next */}
              <section className="mr-0 ml-auto mb-5 w-fit max-sm:w-full justify-between mt-5 flex gap-4">
                <button
                  onClick={goPrev}
                  disabled={!prevLesson}
                  className={`shadow-md text-secondary border border-[#62226436] px-4 py-2 rounded-md transition font-baloo font-bold cursor-pointer flex gap-1 items-center justify-center ${
                    !prevLesson ? "opacity-50 cursor-not-allowed" : "hover:bg-white/40"
                  }`}
                >
                  <CgPlayTrackPrev size={25} />
                  Previous
                </button>

                <button
                  onClick={goNext}
                  disabled={!nextLesson}
                  className={`flex gap-1 text-white px-4 py-2 rounded-md font-baloo font-bold items-center cursor-pointer shadow-md ${
                    !nextLesson
                      ? "bg-secondary/60 opacity-60 cursor-not-allowed"
                      : "bg-secondary hover:bg-secondary-medium"
                  }`}
                >
                  Next
                  <CgPlayTrackNext size={25} />
                </button>
              </section>

              {/* Lesson text */}
              <section className="space-y-4">
                <hr className="max-md:hidden block md:mt-2 border-0 border-t border-secondary"></hr>
                <h2 className="font-baloo font-bold text-secondary max-sm:text-3xl text-4xl">
                  {loading ? "Loading…" : lesson?.title || "Untitled Lesson"}
                </h2>

                {!loading && (lesson?.definition || lesson?.story) && (
                  <div className="space-y-3">
                    {lesson?.definition && (
                      <p className="text-secondary-dark opacity-90">{lesson.definition}</p>
                    )}
                    {lesson?.story && (
                      <p className="text-secondary-dark opacity-80">{lesson.story}</p>
                    )}
                  </div>
                )}

                {!loading && !lesson?.definition && !lesson?.story && (
                  <p className="text-secondary-dark opacity-70 italic">No content for this lesson yet.</p>
                )}

                {error && (
                  <div className="rounded-[0.9em] px-[1em] py-[0.8em] bg-red-50 border-2 border-red-200 text-red-700">
                    {error}
                  </div>
                )}
              </section>
            </section>

            {/* Second Column (Comments sidebar) */}
            <section className="pb-[14em] space-y-4 h-screen lg:overflow-y-scroll scrollbar-hide">
              <div className="flex gap-1 rounded-[0.9em] px-3 py-[1em] bg-secondary border-2 shadow-md border-[#75757552] w-full h-fit">
                <Image src="/comment.png" unoptimized height={65} width={65} alt="comments" />
                <div>
                  <p className="font-baloo font-bold text-2xl text-white opacity-70">Comments</p>
                  <p className="text-white my-auto text-[0.95em]">Overall comments from users</p>
                </div>
              </div>

              <Comment imageUrl={"/instructor.png"} mainText={"Micheal B Jordan"} label={"Instructor"} />

              <div className="flex flex-col w-full rounded-2xl max-h-[240px] overflow-hidden backdrop-blur bg-white/60 border-2 border-[#ad46b185] shadow-xl">
                <AutoResizeTextarea maxHeight="240px" placeholder="Add a comment…" />
                <button className="bg-white w-fit p-2.5 rounded-md shadow-md border mr-4 ml-auto mb-4 mt-[-2em] border-[#62226436] hover:bg-secondary-medium text-secondary hover:text-white transition cursor-pointer">
                  <RiSendPlaneFill size={24} />
                </button>
              </div>

              <h3 className="text-2xl font-baloo font-bold mt-7">Comments</h3>

              <section className="space-y-3">
                {comments.map((item, index) => (
                  <Comment
                    key={index}
                    imageUrl={item.profileUrl}
                    mainText={item.user}
                    label={item.comment}
                  />
                ))}
              </section>
            </section>
          </section>
        </section>
      </div>
    </div>
  );
}
