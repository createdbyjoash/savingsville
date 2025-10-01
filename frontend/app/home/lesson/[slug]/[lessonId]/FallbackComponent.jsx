import Image from "next/image";

const words = (t) => (t ? String(t).trim().split(/\s+/).length : 0);
const estimateReadMins = (text) => Math.max(1, Math.round(words(text) / 200));
const excerpt = (text, n = 160) => {
  const s = (text || "").replace(/\s+/g, " ").trim();
  return s.length > n ? s.slice(0, n) + "…" : s;
};




export default function FallbackHero({ topic, lesson }) {
  const title = lesson?.title || topic?.title || "Untitled";
  const blurb = excerpt(lesson?.definition || lesson?.story || topic?.description || "", 180);
  const chips = [
    lesson?.age_group ? { label: lesson.age_group } : null,
    Number.isFinite(lesson?.order) ? { label: `Lesson ${lesson.order}` } : null,
    { label: `${estimateReadMins((lesson?.definition || "") + " " + (lesson?.story || ""))} min read` },
  ].filter(Boolean);

  return (
    <div
      className="relative overflow-hidden rounded-xl border-2 border-[#75757552] shadow-lg"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(226,198,255,0.65), transparent 45%), radial-gradient(circle at 80% 0%, rgba(111,66,193,0.20), transparent 40%), linear-gradient(135deg, #F7F2FF 0%, #FFF 60%)",
      }}
    >
      {/* subtle dotted pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(#6c63ff20 1px, transparent 1px), radial-gradient(#6c63ff20 1px, transparent 1px)",
          backgroundPosition: "0 0, 10px 10px",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-secondary/80 mb-2">No media for this lesson</p>
          <h1 className="font-baloo font-bold text-2xl sm:text-3xl text-secondary mb-2 line-clamp-2">
            {title}
          </h1>
          {!!blurb && <p className="text-secondary-dark/80 text-sm sm:text-[0.95rem]">{blurb}</p>}

          <div className="mt-4 flex md:mt-2  flex-wrap gap-2">
            {chips.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-[3.5px]  rounded-full bg-[#E2C6FF] text-[#4F1E8A] text-xs font-semibold border border-[#4F1E8A14]"
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <Image
            src="/penguin_3.png"
            alt="Lesson mascot"
            width={350}
            height={350}
            className="mx-auto w-[200px] h-auto sm:w-[220px]"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}