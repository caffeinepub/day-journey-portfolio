import { useEffect, useRef, useState } from "react";

// ─── Reveal + skill animation hook ─────────────────────────────────
function useSkillReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Data ──────────────────────────────────────────────────────────
const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "#38bdf8",
    skills: [
      { name: "HTML5", pct: 90, emoji: "🌐" },
      { name: "CSS3 / Tailwind", pct: 85, emoji: "🎨" },
      { name: "JavaScript (ES6+)", pct: 88, emoji: "⚡" },
      { name: "React", pct: 85, emoji: "⚛️" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "#4ade80",
    skills: [
      { name: "Node.js", pct: 80, emoji: "🟢" },
      { name: "MongoDB", pct: 75, emoji: "🍃" },
      { name: "REST APIs", pct: 82, emoji: "🔌" },
      { name: "Express.js", pct: 78, emoji: "🚀" },
    ],
  },
];

const toolsData = [
  {
    name: "Git & GitHub",
    emoji: "📦",
    desc: "Version control, branching, PRs",
  },
  { name: "VS Code", emoji: "💻", desc: "Primary IDE with custom workflows" },
  { name: "npm / yarn", emoji: "📦", desc: "Package management" },
  { name: "Postman", emoji: "🔧", desc: "API testing and documentation" },
  { name: "Figma", emoji: "🎨", desc: "UI design and prototyping" },
  { name: "Linux / Terminal", emoji: "⌨️", desc: "Command-line proficiency" },
];

const learningData = [
  { name: "TypeScript", emoji: "🔷", level: "Intermediate", color: "#38bdf8" },
  { name: "Next.js", emoji: "▲", level: "Learning", color: "#f8fafc" },
  { name: "Docker", emoji: "🐳", level: "Beginner", color: "#38bdf8" },
  { name: "GraphQL", emoji: "💠", level: "Exploring", color: "#a78bfa" },
];

// ─── Skill bar component ────────────────────────────────────────────
function SkillBar({
  name,
  pct,
  emoji,
  visible,
  delay,
  accentColor,
}: {
  name: string;
  pct: number;
  emoji: string;
  visible: boolean;
  delay: number;
  accentColor: string;
}) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <span className="text-[#f8fafc] font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: accentColor }}>
          {pct}%
        </span>
      </div>
      {/* Track */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(148,163,184,0.12)" }}
      >
        {/* Fill */}
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${pct}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${accentColor}99, ${accentColor})`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Category Section ───────────────────────────────────────────────
function SkillCategory({
  category,
}: {
  category: (typeof skillCategories)[0];
}) {
  const { ref, visible } = useSkillReveal();

  return (
    <div ref={ref} className="dev-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="text-xl font-bold" style={{ color: category.color }}>
          {category.title}
        </h2>
      </div>

      <div className="space-y-5">
        {category.skills.map((s, i) => (
          <SkillBar
            key={s.name}
            name={s.name}
            pct={s.pct}
            emoji={s.emoji}
            visible={visible}
            delay={i * 150}
            accentColor={category.color}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Tools Section ──────────────────────────────────────────────────
function ToolsGrid() {
  const { ref, visible } = useSkillReveal();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`mb-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="section-eyebrow">Tooling</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            Tools & <span className="gradient-text">Workflow</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {toolsData.map((t, i) => (
            <div
              key={t.name}
              className="dev-card p-4 text-center group"
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
              }}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                {t.emoji}
              </div>
              <p className="text-[#f8fafc] font-semibold text-xs mb-1">
                {t.name}
              </p>
              <p className="text-[#94a3b8] text-xs leading-tight hidden lg:block">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Currently Learning ─────────────────────────────────────────────
function CurrentlyLearning() {
  const { ref, visible } = useSkillReveal();

  return (
    <section
      className="py-16 px-4 sm:px-6"
      style={{ background: "rgba(30, 41, 59, 0.3)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`mb-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="section-eyebrow">Always Growing</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            Currently <span className="gradient-text">Learning</span>
          </h2>
          <p className="text-[#94a3b8] text-sm mt-2">
            Technologies I'm actively exploring to expand my capabilities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {learningData.map((l, i) => (
            <div
              key={l.name}
              className="dev-card p-5 text-center"
              style={{
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              }}
            >
              <div className="text-3xl mb-3">{l.emoji}</div>
              <h3 className="text-[#f8fafc] font-bold text-sm mb-1">
                {l.name}
              </h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  color: l.color,
                  background: `${l.color}18`,
                  border: `1px solid ${l.color}40`,
                }}
              >
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SkillsPage ─────────────────────────────────────────────────────
export function SkillsPage() {
  useEffect(() => {
    document.title = "Skills — Ashutosh Tripathi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main data-ocid="skills.section" style={{ background: "#0f172a" }}>
      {/* Page Hero */}
      <section
        className="pt-32 pb-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse at 30% 0%, rgba(56,189,248,0.08) 0%, transparent 50%), #0f172a",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="section-eyebrow">Technical Expertise</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-4"
            style={{ animation: "fade-up 0.5s ease forwards" }}
          >
            My <span className="gradient-text">Skills</span>
          </h1>
          <p
            className="text-[#94a3b8] max-w-xl text-base leading-relaxed"
            style={{ animation: "fade-up 0.5s ease 0.1s forwards", opacity: 0 }}
          >
            A breakdown of my technical stack — what I build with, how deep I
            go, and what I'm actively learning next.
          </p>
        </div>
      </section>

      {/* Skills grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <SkillCategory key={cat.title} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <ToolsGrid />
      <CurrentlyLearning />
    </main>
  );
}
