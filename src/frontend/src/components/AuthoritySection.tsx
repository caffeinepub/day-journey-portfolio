import { useEffect, useRef } from "react";

interface TrustPoint {
  number: string;
  title: string;
  description: string;
  ocid: string;
}

const TRUST_POINTS: TrustPoint[] = [
  {
    number: "01",
    title: "Business-First Thinking",
    description:
      "Every design decision starts with the business outcome — not aesthetics. Strategy drives execution.",
    ocid: "authority.card.1",
  },
  {
    number: "02",
    title: "Conversion-Focused Architecture",
    description:
      "User journeys are engineered to reduce friction and move people toward action. Design as a revenue lever.",
    ocid: "authority.card.2",
  },
  {
    number: "03",
    title: "Structured Execution",
    description:
      "Clear process. Defined milestones. Predictable delivery. No surprises — only results.",
    ocid: "authority.card.3",
  },
  {
    number: "04",
    title: "Long-Term Scalability",
    description:
      "Systems built to grow. Every architecture decision accounts for your next phase of expansion.",
    ocid: "authority.card.4",
  },
];

export function AuthoritySection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = [headlineRef.current, ...cardRefs.current].filter(
      Boolean,
    ) as HTMLElement[];
    const observers: IntersectionObserver[] = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const delay = i === 0 ? 0 : i * 130;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), delay);
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
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
        minHeight: "auto",
        paddingTop: "clamp(4rem, 8vh, 7rem)",
        paddingBottom: "clamp(4rem, 8vh, 7rem)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow + Headline */}
        <div ref={headlineRef} className="reveal-card text-center mb-16">
          <span
            className="eyebrow eyebrow-pill inline-block mb-6"
            style={{
              color: "rgba(254, 250, 224, 0.8)",
              background: "rgba(40,54,24,0.5)",
              borderColor: "rgba(221,161,94,0.18)",
            }}
          >
            Trust & Credibility
          </span>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "rgb(254, 250, 224)",
              lineHeight: 1.06,
            }}
          >
            Why Brands Trust My Work
          </h2>
        </div>

        {/* Trust point cards — 2×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(0.85rem, 2vw, 1.25rem)",
          }}
        >
          {TRUST_POINTS.map((point, i) => (
            <div
              key={point.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-ocid={point.ocid}
              className="reveal-card card-earthy"
              style={{
                padding: "clamp(1.5rem, 3vw, 2rem)",
                transitionDelay: `${i * 130}ms`,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  color: "rgba(221,161,94,0.3)",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                }}
              >
                {point.number}
              </span>
              <h3
                className="font-display font-semibold"
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "rgb(254, 250, 224)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  marginBottom: "0.5rem",
                }}
              >
                {point.title}
              </h3>
              <div
                style={{
                  width: "20px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "rgba(221,161,94,0.4)",
                  marginBottom: "0.85rem",
                }}
              />
              <p
                className="font-ui"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(254, 250, 224, 0.85)",
                }}
              >
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
