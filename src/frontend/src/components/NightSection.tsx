import { useEffect, useRef } from "react";

interface ValueCard {
  icon: string;
  title: string;
  description: string;
  ocid: string;
}

const VALUE_CARDS: ValueCard[] = [
  {
    icon: "⟡",
    title: "Revenue-Focused Design Thinking",
    description:
      "Every design decision is evaluated against one question: does this move the needle? Aesthetics serve business outcomes — not the other way around.",
    ocid: "night.card.1",
  },
  {
    icon: "◈",
    title: "Conversion Architecture",
    description:
      "I engineer user journeys for action. From landing page structure to checkout flow optimization, every touchpoint reduces drop-off and increases conversion rate.",
    ocid: "night.card.2",
  },
  {
    icon: "◎",
    title: "Performance & SEO Optimization",
    description:
      "Speed is revenue. I optimize Core Web Vitals, image pipelines, and technical SEO — turning your digital presence into a compounding organic growth channel.",
    ocid: "night.card.3",
  },
  {
    icon: "⟢",
    title: "Scalable Systems Thinking",
    description:
      "Every architecture decision accounts for your next 100 products, next market expansion, and next growth phase — built to scale without rebuilding from scratch.",
    ocid: "night.card.4",
  },
];

export function NightSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [headlineRef.current, ...cardRefs.current].filter(
      Boolean,
    ) as HTMLElement[];

    const observers: IntersectionObserver[] = [];

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      const idx = i;
      // Headline gets 300ms scroll-pause delay, cards stagger after
      const delay = idx === 0 ? 300 : 300 + idx * 150;

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
        { threshold: 0.18 },
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
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 10vh, 8rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow — pill for legibility on dark sky photo */}
        <span
          className="eyebrow eyebrow-pill inline-block mb-10"
          style={{
            color: "rgba(184,193,236,0.85)",
            background: "rgba(58, 134, 255, 0.12)",
            borderColor: "rgba(58, 134, 255, 0.2)",
          }}
        >
          Night — Authority
        </span>

        {/* ── Headline — scroll-pause reveal ─────────────────────── */}
        <div ref={headlineRef} className="reveal-card mb-24">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
              letterSpacing: "-0.03em",
              color: "#F5F7FA",
              lineHeight: 1.04,
              maxWidth: "820px",
            }}
          >
            I Don't Just Design.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #3A86FF 0%, #4F8CC9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              I Engineer Digital Growth.
            </span>
          </h2>

          <p
            className="font-ui"
            style={{
              marginTop: "2rem",
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.7,
              color: "#B8C1EC",
              maxWidth: "540px",
              fontWeight: 400,
            }}
          >
            Every project is a revenue system. As a UI/UX Designer, WordPress
            Developer, and eCommerce specialist, I approach design, development,
            and optimization as interconnected levers — each calibrated to drive
            profit, reduce friction, and scale.
          </p>
        </div>

        {/* ── Value cards ────────────────────────────────────────── */}
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {VALUE_CARDS.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-ocid={card.ocid}
              className="reveal-card glass-card-dark card-lift rounded-2xl p-8"
              style={{
                transitionDelay: `${300 + (i + 1) * 150}ms`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1.75rem",
                  color: "#3A86FF",
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className="font-display font-semibold"
                style={{
                  fontSize: "1.1rem",
                  color: "#F5F7FA",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  marginBottom: "0.5rem",
                }}
              >
                {card.title}
              </h3>

              {/* Thin separator */}
              <div
                style={{
                  width: "20px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "rgba(58, 134, 255, 0.4)",
                  marginBottom: "0.9rem",
                }}
              />

              {/* Description */}
              <p
                className="font-ui"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "#B8C1EC",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Background atmospheric light */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(58, 134, 255, 0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      </div>
    </section>
  );
}
