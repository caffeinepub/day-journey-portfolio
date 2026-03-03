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
    title: "Revenue-Focused Mindset",
    description:
      "Every design decision is evaluated against a single question: does this move the needle? Aesthetics serve business outcomes — not the other way around.",
    ocid: "night.card.1",
  },
  {
    icon: "◈",
    title: "Conversion Architecture",
    description:
      "I build user journeys engineered for action. From landing page structure to checkout flow, every touchpoint is designed to reduce drop-off and increase conversion.",
    ocid: "night.card.2",
  },
  {
    icon: "◎",
    title: "Performance Optimization",
    description:
      "Speed is revenue. I optimize Core Web Vitals, image pipelines, and technical SEO to ensure your digital presence performs as well as it looks.",
    ocid: "night.card.3",
  },
  {
    icon: "⟢",
    title: "Scalability Planning",
    description:
      "Systems designed to grow without breaking. Every architecture decision accounts for your next 100 products, your next market, and your next phase of growth.",
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
      // Fix 3: stagger more deliberate — headline at 0ms, cards at 140ms intervals
      const delay = idx === 0 ? 0 : 80 + (idx - 1) * 140;

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
        {/* Eyebrow */}
        <span
          className="eyebrow inline-block mb-10"
          style={{ color: "rgba(58, 134, 255, 0.65)" }}
        >
          Strategic Positioning
        </span>

        {/* ── Headline — Fix 1: monumental scale ────────────────────── */}
        <div ref={headlineRef} className="reveal-card mb-28">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              letterSpacing: "-0.03em",
              color: "#e8f0ff",
              lineHeight: 1.04,
              maxWidth: "820px",
            }}
          >
            I Don't Just Design.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3A86FF 0%, #7EB8FF 45%, #B89AFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              I Engineer Digital Growth.
            </span>
          </h2>

          {/* Fix 1: subtitle has more breathing room */}
          <p
            className="font-ui"
            style={{
              marginTop: "2rem",
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              lineHeight: 1.7,
              color: "rgba(232, 240, 255, 0.48)",
              maxWidth: "440px",
              fontWeight: 400,
            }}
          >
            Every project is a revenue system. I approach design, development,
            and optimization as interconnected levers — each one calibrated to
            drive profit, reduce friction, and scale without limits.
          </p>
        </div>

        {/* ── Value cards — Fix 2: glass-card-dark hover from CSS ─── */}
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
              className="reveal-card glass-card-dark rounded-2xl p-8"
              style={{
                /* Fix 3: stagger via transitionDelay */
                transitionDelay: `${80 + i * 140}ms`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1.75rem",
                  color: "#3A86FF",
                  lineHeight: 1,
                  opacity: 0.9,
                }}
              >
                {card.icon}
              </div>

              {/* Title */}
              <h3
                className="font-display font-semibold"
                style={{
                  fontSize: "1.1rem",
                  color: "#e8f0ff",
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
                  lineHeight: 1.65,
                  color: "rgba(232, 240, 255, 0.48)",
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
