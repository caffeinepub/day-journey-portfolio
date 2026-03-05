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
      "As a UI/UX Designer, I build interfaces that guide users toward action. Every layout, visual hierarchy, and interaction is engineered to convert — not just impress.",
    ocid: "skills.card.1",
  },
  {
    icon: "⬡",
    name: "Development Architecture",
    description:
      "WordPress Developer and WooCommerce Expert. I build scalable eCommerce systems — from product variation logic to checkout optimization — deployed for performance from day one.",
    ocid: "skills.card.2",
  },
  {
    icon: "◎",
    name: "SEO & Performance",
    description:
      "SEO Optimization Specialist. I structure content, meta architecture, and Core Web Vitals to turn organic traffic into a compounding, sustainable revenue channel.",
    ocid: "skills.card.3",
  },
  {
    icon: "◉",
    name: "eCommerce Operations",
    description:
      "eCommerce Website Developer focused on conversion. Product management, pricing logic, inventory architecture — all built to reduce friction and increase average order value.",
    ocid: "skills.card.4",
  },
];

// Slower, more deliberate stagger — cards appear one-by-one
const STAGGER_BASE_MS = 100;
const STAGGER_INC_MS = 150;

export function DaySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Observe the header first — headline appears before cards
    const headerEl = headerRef.current;
    if (headerEl) {
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            headerEl.classList.add("is-visible");
            headerObserver.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      headerObserver.observe(headerEl);
      observers.push(headerObserver);
    }

    // Cards stagger after header
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
          ref={headerRef}
          className="reveal-card text-center"
          style={{ maxWidth: "640px", margin: "0 auto 4rem auto" }}
        >
          {/* Frost pill for eyebrow on bright day sky */}
          <span
            className="eyebrow eyebrow-pill inline-block mb-6"
            style={{ color: "rgba(40, 54, 24, 0.7)" }}
          >
            Day — Capability
          </span>
          <h2
            className="font-display font-bold heading-shadow-warm"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.2rem)",
              letterSpacing: "-0.03em",
              color: "#283618",
              lineHeight: 1.04,
            }}
          >
            Four Pillars.
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "rgba(40, 54, 24, 0.6)",
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
              className="reveal-card card-earthy rounded-2xl p-8 cursor-default"
              style={{
                transitionDelay: `${STAGGER_BASE_MS + i * STAGGER_INC_MS}ms`,
              }}
            >
              {/* Icon — larger, with its own breathing zone */}
              <div
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1,
                  color: "#1A1A2E",
                  opacity: 0.8,
                  marginBottom: "1.75rem",
                }}
              >
                {skill.icon}
              </div>

              {/* Skill name */}
              <h3
                className="font-display font-bold"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#1A1A2E",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  marginBottom: "0.6rem",
                }}
              >
                {skill.name}
              </h3>

              {/* Thin separator — earthy sand */}
              <div
                style={{
                  width: "24px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "rgba(221, 161, 94, 0.5)",
                  marginBottom: "0.8rem",
                }}
              />

              {/* Description */}
              <p
                className="font-ui"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(26,26,46, 0.75)",
                }}
              >
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
