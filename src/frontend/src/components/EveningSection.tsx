import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  industry: string;
  challenge: string;
  strategy: string;
  execution: string;
  impact: string;
  accentColor: string;
  borderColor: string;
  ocid: string;
}

const PROJECTS: Project[] = [
  {
    id: "drpro",
    number: "01",
    name: "DrPro",
    subtitle: "Healthcare Platform",
    industry: "Healthcare Technology",
    challenge:
      "Build a streamlined digital system for patient and clinic management.",
    strategy:
      "User-focused UI + structured workflow + performance optimization.",
    execution:
      "UI/UX design, WordPress development, system structure, SEO setup.",
    impact: "Improved usability, better workflow clarity, scalable foundation.",
    accentColor: "#F9A826",
    borderColor: "rgba(249, 168, 38, 0.35)",
    ocid: "projects.item.1",
  },
  {
    id: "red-royal",
    number: "02",
    name: "Red Royal Jewelry",
    subtitle: "Luxury eCommerce",
    industry: "Jewelry & Retail",
    challenge: "Create a premium online shopping experience.",
    strategy: "High-end UI design + optimized WooCommerce structure.",
    execution:
      "Product variation system, SEO-friendly descriptions, conversion-focused layout.",
    impact: "Improved product presentation and purchase flow.",
    accentColor: "#E8956D",
    borderColor: "rgba(232, 149, 109, 0.35)",
    ocid: "projects.item.2",
  },
  {
    id: "getslot",
    number: "03",
    name: "GetSlot",
    subtitle: "Appointment Booking System",
    industry: "Booking & Scheduling",
    challenge: "Simplify appointment management.",
    strategy: "Clean interface + structured booking logic.",
    execution: "UI system design + workflow clarity.",
    impact: "Smooth booking experience.",
    accentColor: "#D383FF",
    borderColor: "rgba(211, 131, 255, 0.35)",
    ocid: "projects.item.3",
  },
  {
    id: "orpho",
    number: "04",
    name: "Orpho",
    subtitle: "Digital Brand Platform",
    industry: "Branding / Digital",
    challenge: "Build strong brand presence online.",
    strategy: "Visual identity + modern interface.",
    execution: "Branding, layout design, structured content flow.",
    impact: "Clear brand positioning.",
    accentColor: "#F9A826",
    borderColor: "rgba(249, 168, 38, 0.35)",
    ocid: "projects.item.4",
  },
  {
    id: "optirental",
    number: "05",
    name: "OptiRental",
    subtitle: "Property Management System",
    industry: "Real Estate Tech",
    challenge: "Manage multi-unit property workflows.",
    strategy: "Dashboard-focused UI + structured data display.",
    execution: "Interface design + system logic structure.",
    impact: "Organized property management flow.",
    accentColor: "#E8956D",
    borderColor: "rgba(232, 149, 109, 0.35)",
    ocid: "projects.item.5",
  },
  {
    id: "octanode",
    number: "06",
    name: "Octanode",
    subtitle: "Web Development Company",
    industry: "Software Development",
    challenge: "Present services clearly and professionally.",
    strategy: "Clean service structure + strong messaging.",
    execution: "Website design + content hierarchy + responsive layout.",
    impact: "Strong professional presentation.",
    accentColor: "#D383FF",
    borderColor: "rgba(211, 131, 255, 0.35)",
    ocid: "projects.item.6",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
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

  return (
    <div
      ref={cardRef}
      data-ocid={project.ocid}
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${project.borderColor}`,
        borderRadius: "14px",
        padding: "clamp(1.25rem, 3vw, 1.75rem)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.07}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${project.accentColor} 0%, transparent 100%)`,
          borderRadius: "14px 14px 0 0",
        }}
      />

      {/* Number + Industry row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: `${project.accentColor}55`,
            lineHeight: 1,
          }}
        >
          {project.number}
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: project.accentColor,
            background: `${project.accentColor}15`,
            padding: "3px 10px",
            borderRadius: "20px",
            border: `1px solid ${project.accentColor}30`,
          }}
        >
          {project.industry}
        </span>
      </div>

      {/* Project name */}
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)",
          color: "#2a1505",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          marginBottom: "0.25rem",
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "rgba(42,21,5,0.5)",
          marginBottom: "1.1rem",
          letterSpacing: "0.02em",
        }}
      >
        {project.subtitle}
      </p>

      {/* Case study rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {[
          { label: "Challenge", value: project.challenge },
          { label: "Strategy", value: project.strategy },
          { label: "Execution", value: project.execution },
          { label: "Impact", value: project.impact },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}
          >
            <span
              style={{
                flexShrink: 0,
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: project.accentColor,
                paddingTop: "2px",
                minWidth: "62px",
              }}
            >
              {label}
            </span>
            <p
              style={{
                fontSize: "0.82rem",
                color: "rgba(42,21,5,0.72)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EveningSection() {
  return (
    <section
      className="portfolio-section px-6"
      style={{
        minHeight: "auto",
        paddingTop: "clamp(3.5rem, 7vh, 6rem)",
        paddingBottom: "clamp(3.5rem, 7vh, 6rem)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header — compact */}
        <div style={{ marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(42,21,5,0.45)",
              marginBottom: "0.75rem",
            }}
          >
            Selected Work
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              letterSpacing: "-0.03em",
              color: "#2a1505",
              lineHeight: 1.04,
              marginBottom: "0.6rem",
            }}
          >
            Six Projects. Real Impact.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "rgba(42,21,5,0.55)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Real platforms. Real challenges. Measurable outcomes.
          </p>
        </div>

        {/* 2-column grid on desktop, 1-column on mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(0.85rem, 2vw, 1.25rem)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
