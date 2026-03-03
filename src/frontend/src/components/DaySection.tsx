import { useEffect, useRef } from "react";

interface Skill {
  icon: string;
  name: string;
  description: string;
  ocid: string;
}

const SKILLS: Skill[] = [
  {
    icon: "◈",
    name: "Design Strategy",
    description:
      "UI/UX interfaces, brand identity, visual systems, and marketing assets engineered to build trust and drive conversion — not just look good.",
    ocid: "skills.card.1",
  },
  {
    icon: "⬡",
    name: "Development Architecture",
    description:
      "WordPress, WooCommerce, and Elementor ecosystems built for speed, scalability, and zero-friction user journeys — from responsive layout to production deployment.",
    ocid: "skills.card.2",
  },
  {
    icon: "◎",
    name: "SEO & Performance",
    description:
      "On-page SEO, meta structure, keyword architecture, and speed optimization that compound over time — turning organic traffic into a sustainable growth channel.",
    ocid: "skills.card.3",
  },
  {
    icon: "◉",
    name: "eCommerce Operations",
    description:
      "Product systems, variation logic, conversion-focused layout structuring, and inventory management built to reduce friction and maximize cart value.",
    ocid: "skills.card.4",
  },
];

// Fix 3: slower, more deliberate stagger — 100ms first, 90ms between each
const STAGGER_BASE_MS = 100;
const STAGGER_INC_MS = 90;

export function DaySection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (let i = 0; i < cardRefs.current.length; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      const idx = i;
      const delay = STAGGER_BASE_MS + idx * STAGGER_INC_MS;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("is-visible");
              }, delay);
            }
          }
        },
        { threshold: 0.12 },
      );

      observer.observe(card);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return (
    <section
      className="portfolio-section px-6"
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 10vh, 8rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section header ───────────────────────────────────────── */}
        <div
          className="mb-20 text-center"
          style={{ maxWidth: "640px", margin: "0 auto 5rem auto" }}
        >
          <span
            className="eyebrow inline-block mb-7"
            style={{ color: "rgba(10, 26, 46, 0.45)" }}
          >
            Strategic Capabilities
          </span>
          {/* Fix 1: bigger display heading, tighter tracking */}
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "#0a1a2e",
              lineHeight: 1.04,
            }}
          >
            Four Pillars.
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(10, 26, 46, 0.5)",
              }}
            >
              One System.
            </em>
          </h2>
        </div>

        {/* ── Skills grid ──────────────────────────────────────────── */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
        >
          {SKILLS.map((skill, i) => (
            <div
              key={skill.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-ocid={skill.ocid}
              /* Fix 2: glass-card now has hover state from CSS */
              className="reveal-card glass-card rounded-2xl p-8 cursor-default"
              /* Fix 3: stagger delay baked into transition-delay */
              style={{
                transitionDelay: `${STAGGER_BASE_MS + i * STAGGER_INC_MS}ms`,
              }}
            >
              {/* Icon — larger, with its own breathing zone */}
              <div
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1,
                  color: "#0a1a2e",
                  opacity: 0.75,
                  marginBottom: "1.75rem",
                }}
              >
                {skill.icon}
              </div>

              {/* Skill name */}
              <h3
                className="font-display font-bold"
                style={{
                  fontSize: "1.15rem",
                  color: "#0a1a2e",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  marginBottom: "0.6rem",
                }}
              >
                {skill.name}
              </h3>

              {/* Thin separator */}
              <div
                style={{
                  width: "24px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "rgba(10, 26, 46, 0.2)",
                  marginBottom: "0.8rem",
                }}
              />

              {/* Description */}
              <p
                className="font-ui"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                  color: "rgba(10, 26, 46, 0.55)",
                }}
              >
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Background atmospheric orb */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          right: "-5%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(163, 213, 255, 0.35) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Floating geometric shapes ─────────────────────────────── */}
      {/* Shape 1: Thin outlined circle, top-right, slow float */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "12%",
          right: "8%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "1.5px solid rgba(10, 26, 46, 0.12)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "shape-float 6s ease-in-out infinite",
          ["--shape-base-transform" as string]: "translateY(0px)",
          ["--shape-float-transform" as string]: "translateY(-12px)",
        }}
      />

      {/* Shape 2: Small square rotated 45°, mid-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "48%",
          left: "5%",
          width: "40px",
          height: "40px",
          border: "1.5px solid rgba(10, 26, 46, 0.10)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "shape-float 8s 1.5s ease-in-out infinite",
          ["--shape-base-transform" as string]: "rotate(45deg) translateY(0px)",
          ["--shape-float-transform" as string]:
            "rotate(45deg) translateY(-10px)",
        }}
      />

      {/* Shape 3: Elongated thin rounded rect, mid-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "62%",
          right: "12%",
          width: "120px",
          height: "6px",
          borderRadius: "3px",
          background: "rgba(10, 26, 46, 0.08)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "shape-float 7s 0.8s ease-in-out infinite",
          ["--shape-base-transform" as string]: "translateY(0px)",
          ["--shape-float-transform" as string]: "translateY(-8px)",
        }}
      />

      {/* Shape 4: Large transparent circle outline, bottom-left, slow rotation */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "3%",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(10, 26, 46, 0.07)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "shape-rotate 22s linear infinite",
          opacity: 0.8,
        }}
      />
    </section>
  );
}
