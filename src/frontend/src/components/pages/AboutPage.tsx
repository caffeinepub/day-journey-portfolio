import {
  Briefcase,
  Calendar,
  Coffee,
  GraduationCap,
  MapPin,
  Rocket,
  Target,
  User,
} from "lucide-react";
import { useEffect, useRef } from "react";

// ─── Reveal hook ───────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

// ─── Data ──────────────────────────────────────────────────────────
const stats = [
  { label: "Years Experience", value: "3+", icon: Calendar },
  { label: "Projects Completed", value: "20+", icon: Rocket },
  { label: "Technologies", value: "15+", icon: Coffee },
];

const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Dr. APJ Abdul Kalam Technical University",
    year: "2020 – 2024",
    description:
      "Focused on software engineering, data structures, algorithms, and web technologies. Graduated with distinction.",
    icon: "🎓",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Delhi Public School",
    year: "2018 – 2020",
    description:
      "Science stream with Computer Science, Mathematics, and Physics.",
    icon: "📚",
  },
];

const experience = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2023 – Present",
    description:
      "Designed and developed end-to-end web applications for multiple clients. Delivered React-based frontends with Node.js REST API backends and MongoDB databases.",
    tags: ["React", "Node.js", "MongoDB", "REST APIs"],
    icon: "💻",
  },
  {
    role: "Frontend Developer Intern",
    company: "TechSprint Solutions",
    period: "Jan 2023 – Jun 2023",
    description:
      "Built responsive UI components, implemented design systems, and collaborated with backend engineers on feature development.",
    tags: ["React", "CSS", "JavaScript", "Figma"],
    icon: "🚀",
  },
  {
    role: "Web Development Intern",
    company: "CodeCraft Labs",
    period: "Jul 2022 – Dec 2022",
    description:
      "Developed and maintained landing pages, improved page performance, and wrote reusable component libraries.",
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    icon: "⚡",
  },
];

const journey = [
  {
    year: "2018",
    title: "First Line of Code",
    desc: "Wrote my first HTML page. Immediately knew this was my path.",
    icon: "🌱",
  },
  {
    year: "2020",
    title: "Discovered JavaScript",
    desc: "Fell in love with dynamic web development. Built my first interactive app.",
    icon: "⚡",
  },
  {
    year: "2022",
    title: "Into Full Stack",
    desc: "Learned Node.js, Express, and MongoDB. Started building complete applications.",
    icon: "🔧",
  },
  {
    year: "2023",
    title: "Professional Work",
    desc: "First internship, first client projects. Real-world experience sharpened my skills.",
    icon: "💼",
  },
  {
    year: "Now",
    title: "Growing Continuously",
    desc: "Learning TypeScript, Next.js, and cloud services to build scalable systems.",
    icon: "🚀",
  },
];

const careerGoals = [
  {
    icon: "🏗️",
    title: "Build Scalable Systems",
    desc: "Work on large-scale distributed applications that serve millions of users reliably.",
  },
  {
    icon: "🌍",
    title: "Open Source Contribution",
    desc: "Give back to the developer community by contributing to meaningful open-source projects.",
  },
  {
    icon: "📈",
    title: "Lead Engineering Teams",
    desc: "Grow into a technical leadership role, mentoring developers and driving architectural decisions.",
  },
];

// ─── Components ────────────────────────────────────────────────────
function PageHero() {
  return (
    <section
      className="pt-32 pb-12 px-4 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, rgba(37,99,235,0.1) 0%, transparent 50%), #0f172a",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <p className="section-eyebrow">Get to know me</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-4"
          style={{ animation: "fade-up 0.5s ease forwards" }}
        >
          About <span className="gradient-text">Me</span>
        </h1>
        <p
          className="text-[#94a3b8] max-w-xl text-base leading-relaxed"
          style={{ animation: "fade-up 0.5s ease 0.1s forwards", opacity: 0 }}
        >
          A passionate developer who loves turning complex problems into
          elegant, efficient solutions.
        </p>
      </div>
    </section>
  );
}

function PersonalIntro() {
  const ref = useReveal();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Bio */}
          <div ref={ref} className="reveal-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#2563eb]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[#2563eb]" />
              </div>
              <h2 className="text-2xl font-bold text-[#f8fafc]">Who I Am</h2>
            </div>
            <div className="space-y-4 text-[#94a3b8] leading-relaxed text-sm">
              <p>
                I'm{" "}
                <span className="text-[#f8fafc] font-semibold">
                  Ashutosh Tripathi
                </span>
                , a Full Stack Developer based in India with 3+ years of
                experience building web applications. I specialize in the
                JavaScript ecosystem — React on the frontend, Node.js on the
                backend, and MongoDB for data storage.
              </p>
              <p>
                My approach is to write clean, maintainable code that solves
                real problems. I believe great software is a blend of technical
                excellence and deep understanding of user needs. I'm obsessed
                with performance, accessibility, and developer experience.
              </p>
              <p>
                Outside of coding, I explore UI design trends, contribute to
                developer communities, and keep up with the latest in cloud
                infrastructure and DevOps tooling.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: MapPin, text: "Lucknow, India" },
                { icon: Briefcase, text: "Available for Freelance" },
              ].map((f) => (
                <div
                  key={f.text}
                  className="flex items-center gap-2 text-sm text-[#94a3b8]"
                >
                  <f.icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                  {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="dev-card p-6 text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#2563eb]/15 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {s.value}
                </div>
                <p className="text-[#94a3b8] text-xs font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  const ref = useReveal();

  return (
    <section
      className="py-16 px-4 sm:px-6"
      style={{ background: "rgba(30, 41, 59, 0.3)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-5 h-5 text-[#38bdf8]" />
            <p className="section-eyebrow mb-0">Academic Background</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((e, i) => (
            <div
              key={e.degree}
              className="dev-card p-6"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl mb-4">{e.icon}</div>
              <h3 className="text-[#f8fafc] font-bold text-base mb-1">
                {e.degree}
              </h3>
              <p className="text-[#38bdf8] text-sm font-semibold mb-1">
                {e.institution}
              </p>
              <p className="text-[#94a3b8] text-xs mb-3">{e.year}</p>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  const ref = useReveal();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-[#38bdf8]" />
            <p className="section-eyebrow mb-0">Work History</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-4 bottom-4 w-0.5 hidden sm:block"
            style={{
              background:
                "linear-gradient(180deg, #2563eb 0%, rgba(37,99,235,0.1) 100%)",
            }}
          />

          <div className="space-y-6">
            {experience.map((e, i) => (
              <div
                key={e.role}
                className="relative flex gap-6"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Dot */}
                <div className="hidden sm:flex flex-shrink-0 w-12 justify-center">
                  <div
                    className="w-10 h-10 rounded-full bg-[#1e293b] border-2 border-[#2563eb] flex items-center justify-center text-base z-10"
                    style={{ marginTop: "1rem" }}
                  >
                    {e.icon}
                  </div>
                </div>

                {/* Card */}
                <div className="dev-card p-5 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-[#f8fafc] font-bold text-base">
                        {e.role}
                      </h3>
                      <p className="text-[#38bdf8] text-sm font-semibold">
                        {e.company}
                      </p>
                    </div>
                    <span
                      className="text-xs text-[#94a3b8] px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(148,163,184,0.1)",
                        border: "1px solid rgba(148,163,184,0.15)",
                      }}
                    >
                      {e.period}
                    </span>
                  </div>

                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
                    {e.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="tech-badge text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DeveloperJourney() {
  const ref = useReveal();

  return (
    <section
      className="py-16 px-4 sm:px-6"
      style={{ background: "rgba(30, 41, 59, 0.3)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-10 text-center">
          <p className="section-eyebrow">The Story</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {journey.map((j, i) => (
            <div
              key={j.year}
              className="dev-card p-5 flex-1 text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-2xl mb-3">{j.icon}</div>
              <div className="text-[#38bdf8] text-xs font-bold tracking-widest uppercase mb-2">
                {j.year}
              </div>
              <h3 className="text-[#f8fafc] font-semibold text-sm mb-2">
                {j.title}
              </h3>
              <p className="text-[#94a3b8] text-xs leading-relaxed">{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CareerGoals() {
  const ref = useReveal();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-[#38bdf8]" />
            <p className="section-eyebrow mb-0">Looking Ahead</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            What I'm <span className="gradient-text">Looking For</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerGoals.map((g, i) => (
            <div
              key={g.title}
              className="dev-card p-6"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl mb-4">{g.icon}</div>
              <h3 className="text-[#f8fafc] font-bold text-base mb-2">
                {g.title}
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AboutPage ─────────────────────────────────────────────────────
export function AboutPage() {
  useEffect(() => {
    document.title = "About — Ashutosh Tripathi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main style={{ background: "#0f172a" }}>
      <PageHero />
      <PersonalIntro />
      <Education />
      <ExperienceTimeline />
      <DeveloperJourney />
      <CareerGoals />
    </main>
  );
}
