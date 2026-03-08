import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Github,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";

// ─── Reveal hook ───────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Skill badges around profile ───────────────────────────────────
const floatingSkills = [
  {
    label: "React",
    color: "#38bdf8",
    delay: "0s",
    pos: "top-4 -left-12 sm:-left-16",
  },
  {
    label: "Node.js",
    color: "#4ade80",
    delay: "0.5s",
    pos: "top-4 -right-12 sm:-right-16",
  },
  {
    label: "MongoDB",
    color: "#34d399",
    delay: "1s",
    pos: "bottom-16 -left-14 sm:-left-20",
  },
  {
    label: "CSS",
    color: "#a78bfa",
    delay: "1.5s",
    pos: "bottom-16 -right-14 sm:-right-20",
  },
];

// ─── Projects preview data ─────────────────────────────────────────
const featuredProjects = [
  {
    title: "E-Commerce Dashboard",
    description:
      "Full-stack admin dashboard with real-time analytics, inventory management, and order tracking.",
    tech: ["React", "Node.js", "MongoDB"],
    image: "/assets/generated/project-ecommerce.dim_800x500.jpg",
  },
  {
    title: "Task Manager Pro",
    description:
      "Feature-rich task management app with team collaboration, deadlines, and progress tracking.",
    tech: ["React", "CSS", "REST API"],
    image: "/assets/generated/project-taskmanager.dim_800x500.jpg",
  },
  {
    title: "Social Connect",
    description:
      "Social media platform with posts, follows, real-time notifications, and profile customization.",
    tech: ["React", "Node.js", "Socket.io"],
    image: "/assets/generated/project-social.dim_800x500.jpg",
  },
];

// ─── Core tech for preview ─────────────────────────────────────────
const coreTech = [
  { label: "HTML5", emoji: "🌐" },
  { label: "CSS3", emoji: "🎨" },
  { label: "JavaScript", emoji: "⚡" },
  { label: "React", emoji: "⚛️" },
  { label: "Node.js", emoji: "🟢" },
  { label: "MongoDB", emoji: "🍃" },
  { label: "Git", emoji: "📦" },
  { label: "REST APIs", emoji: "🔌" },
];

// ─── Hero Section ─────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center pt-20 pb-12"
      style={{
        background:
          "radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.08) 0%, transparent 60%), #0f172a",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span className="section-eyebrow">Hello, I'm</span>
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            </div>

            {/* Name */}
            <h1
              className="font-bold mb-3 leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                animationDelay: "0.1s",
                animation: "fade-up 0.6s ease forwards",
              }}
            >
              <span className="gradient-text">Ashutosh</span>
              <br />
              <span className="text-[#f8fafc]">Tripathi</span>
            </h1>

            {/* Title */}
            <p
              className="text-[#38bdf8] font-semibold text-lg mb-5"
              style={{
                animation: "fade-up 0.6s ease 0.15s forwards",
                opacity: 0,
              }}
            >
              Full Stack Developer
            </p>

            {/* Intro */}
            <p
              className="text-[#94a3b8] leading-relaxed mb-8 max-w-md"
              style={{
                fontSize: "1rem",
                animation: "fade-up 0.6s ease 0.25s forwards",
                opacity: 0,
              }}
            >
              I build scalable, performant web applications from front to back.
              Passionate about clean architecture, intuitive UX, and shipping
              products that make an impact.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                animation: "fade-up 0.6s ease 0.35s forwards",
                opacity: 0,
              }}
            >
              <Link
                to="/projects"
                data-ocid="hero.primary_button"
                className="dev-btn-primary"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                data-ocid="hero.secondary_button"
                className="dev-btn-outline"
              >
                Contact Me
              </Link>
            </div>

            {/* Social row */}
            <div
              className="flex items-center gap-4 mt-8"
              style={{
                animation: "fade-up 0.6s ease 0.45s forwards",
                opacity: 0,
              }}
            >
              <a
                href="https://github.com/ashutosh-tripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/ashutosh-tripathi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-5 h-5" />
              </a>
              <span
                className="h-px flex-1 max-w-[80px]"
                style={{ background: "rgba(148,163,184,0.2)" }}
              />
              <span className="text-[#94a3b8] text-xs">Available for work</span>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full profile-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
                }}
              />
              {/* Blue border ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 180deg, #2563eb, #38bdf8, #2563eb)",
                  padding: "2px",
                  borderRadius: "9999px",
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "#0f172a" }}
                />
              </div>

              {/* Profile photo */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src="/assets/generated/profile-ashutosh.dim_400x400.jpg"
                  alt="Ashutosh Tripathi - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating skill badges */}
              {floatingSkills.map((s) => (
                <div
                  key={s.label}
                  className={`absolute ${s.pos} float-badge`}
                  style={{ animationDelay: s.delay }}
                >
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap"
                    style={{
                      background: `${s.color}22`,
                      border: `1px solid ${s.color}55`,
                      color: s.color,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16">
          <a
            href="#featured"
            className="flex flex-col items-center gap-2 text-[#94a3b8] hover:text-[#38bdf8] transition-colors"
            aria-label="Scroll to featured projects"
          >
            <span className="text-xs font-medium tracking-widest uppercase">
              Scroll
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Projects ─────────────────────────────────────────────
function FeaturedProjects() {
  const ref = useReveal();

  return (
    <section
      id="featured"
      className="py-20 px-4 sm:px-6"
      style={{ background: "#0f172a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-12">
          <p className="section-eyebrow">Portfolio</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f8fafc]">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <Link
              to="/projects"
              className="text-[#38bdf8] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((p, i) => (
            <div
              key={p.title}
              className="dev-card card-lift img-zoom"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden rounded-t-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-[#f8fafc] mb-2 text-base">
                  {p.title}
                </h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="dev-btn-outline flex-1 justify-center py-2 text-xs"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </button>
                  <button
                    type="button"
                    className="dev-btn-primary flex-1 justify-center py-2 text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills Preview ────────────────────────────────────────────────
function SkillsPreview() {
  const ref = useReveal();

  return (
    <section
      className="py-20 px-4 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.06) 0%, transparent 60%), #0f172a",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="reveal-up mb-12 text-center">
          <p className="section-eyebrow">What I Work With</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f8fafc]">
            Core <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[#94a3b8] mt-3 max-w-md mx-auto text-sm">
            A curated set of tools and technologies I use to build modern web
            applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {coreTech.map((t, i) => (
            <div
              key={t.label}
              className="dev-card p-5 text-center group cursor-default"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {t.emoji}
              </div>
              <p className="text-[#f8fafc] font-semibold text-sm">{t.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/skills" className="dev-btn-outline inline-flex">
            View All Skills <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────
export function HomePage() {
  useEffect(() => {
    document.title = "Ashutosh Tripathi — Full Stack Developer";
  }, []);

  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <SkillsPreview />
    </main>
  );
}
