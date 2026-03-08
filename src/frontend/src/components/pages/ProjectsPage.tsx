import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  category: string;
}

// ─── Projects data ─────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A full-stack e-commerce admin dashboard with real-time analytics, inventory management, and order tracking. Features dynamic charts, role-based access control, and bulk action support.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: "/assets/generated/project-ecommerce.dim_800x500.jpg",
    github: "#",
    demo: "#",
    category: "Full Stack",
  },
  {
    title: "Task Manager Pro",
    description:
      "A feature-rich task management application with team collaboration, deadlines, and progress tracking. Supports drag-and-drop boards, priority tagging, and email reminders.",
    tech: ["React", "CSS", "JavaScript", "REST API"],
    image: "/assets/generated/project-taskmanager.dim_800x500.jpg",
    github: "#",
    demo: "#",
    category: "Frontend",
  },
  {
    title: "Social Connect",
    description:
      "A social media platform with posts, follows, real-time notifications, and user profile customization. Implements WebSocket for live updates and image upload via S3.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "/assets/generated/project-social.dim_800x500.jpg",
    github: "#",
    demo: "#",
    category: "Full Stack",
  },
];

// ─── Reveal hook ───────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Project Card ──────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  const ocidIndex = index + 1;

  return (
    <article
      data-ocid={`projects.card.${ocidIndex}`}
      className="dev-card flex flex-col overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Image */}
      <div className="img-zoom aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div className="mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.25)",
              color: "#38bdf8",
            }}
          >
            {project.category}
          </span>
        </div>

        <h2 className="text-[#f8fafc] font-bold text-lg mb-2">
          {project.title}
        </h2>

        <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="dev-btn-outline flex-1 justify-center py-2.5 text-sm"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="dev-btn-primary flex-1 justify-center py-2.5 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── ProjectsPage ──────────────────────────────────────────────────
export function ProjectsPage() {
  const { ref, visible } = useReveal(0.1);

  useEffect(() => {
    document.title = "Projects — Ashutosh Tripathi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main style={{ background: "#0f172a" }}>
      {/* Page Hero */}
      <section
        className="pt-32 pb-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%), #0f172a",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="section-eyebrow">Portfolio</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-4"
            style={{ animation: "fade-up 0.5s ease forwards" }}
          >
            My <span className="gradient-text">Projects</span>
          </h1>
          <p
            className="text-[#94a3b8] max-w-xl text-base leading-relaxed"
            style={{ animation: "fade-up 0.5s ease 0.1s forwards", opacity: 0 }}
          >
            A collection of projects I've built — from full-stack web apps to
            API integrations. Each project demonstrates my approach to
            problem-solving and clean code.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ background: "rgba(30,41,59,0.3)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-3">
            Interested in working together?
          </h2>
          <p className="text-[#94a3b8] text-sm mb-6 max-w-md mx-auto">
            I'm open to freelance projects, full-time roles, and interesting
            collaborations.
          </p>
          <a href="/contact" className="dev-btn-primary inline-flex">
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
