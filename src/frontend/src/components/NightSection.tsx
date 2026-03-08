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

/** Minimal sitting-with-laptop silhouette SVG */
function SittingWithLaptopSVG() {
  return (
    <svg
      width="180"
      height="140"
      viewBox="0 0 180 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        display: "block",
        filter:
          "drop-shadow(0 0 12px rgba(221,161,94,0.2)) drop-shadow(0 8px 18px rgba(0,0,0,0.55))",
        flexShrink: 0,
      }}
    >
      {/* Soft ground shadow */}
      <ellipse cx="88" cy="136" rx="62" ry="5" fill="#111814" opacity="0.6" />

      {/* Chair / stool seat — subtle bench shape */}
      <rect x="48" y="88" width="72" height="8" rx="4" fill="#0d0f1a" />
      {/* Chair legs */}
      <rect x="54" y="96" width="5" height="30" rx="2" fill="#0d0f1a" />
      <rect x="109" y="96" width="5" height="30" rx="2" fill="#0d0f1a" />
      {/* Chair back */}
      <rect x="48" y="58" width="5" height="32" rx="2" fill="#0d0f1a" />

      {/* Body — slightly leaning forward */}
      <path
        d="M70 60 C68 72 66 82 68 88 L100 88 C102 82 102 72 100 60 Z"
        fill="#111814"
      />

      {/* Head */}
      <ellipse cx="84" cy="48" rx="11" ry="12" fill="#111814" />

      {/* Neck */}
      <rect x="80" y="58" width="8" height="6" rx="3" fill="#111814" />

      {/* Left arm — bent toward laptop */}
      <path
        d="M70 68 C62 72 56 80 54 90"
        stroke="#111814"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Right arm — bent toward laptop */}
      <path
        d="M100 68 C108 72 114 80 116 90"
        stroke="#111814"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Legs — crossed / bent at knee sitting position */}
      <path
        d="M72 88 C70 100 68 112 70 126"
        stroke="#111814"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M96 88 C98 100 100 112 98 126"
        stroke="#111814"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Feet */}
      <ellipse cx="68" cy="128" rx="8" ry="4" fill="#111814" />
      <ellipse cx="100" cy="128" rx="8" ry="4" fill="#111814" />

      {/* Laptop base */}
      <rect x="44" y="88" width="80" height="6" rx="3" fill="#0d0f1a" />
      {/* Laptop lid — slightly open */}
      <path
        d="M50 88 C52 74 62 68 84 67 C106 68 116 74 118 88 Z"
        fill="#0d0f1a"
      />
      {/* Laptop screen — soft blue glow to imply work */}
      <path
        d="M55 87 C57 76 64 71 84 70 C104 71 111 76 113 87 Z"
        fill="rgba(221,161,94,0.08)"
      />
      {/* Screen glow lines — code/work feel */}
      <line
        x1="68"
        y1="81"
        x2="100"
        y2="81"
        stroke="rgba(221,161,94,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="68"
        y1="77"
        x2="92"
        y2="77"
        stroke="rgba(221,161,94,0.12)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="68"
        y1="84"
        x2="85"
        y2="84"
        stroke="rgba(221,161,94,0.10)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small India desk flag SVG — tricolor saffron/white/green with Ashoka chakra */
function IndiaFlagSVG() {
  return (
    <svg
      width="38"
      height="62"
      viewBox="0 0 38 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0, opacity: 0.9 }}
    >
      {/* Flagpole */}
      <rect x="3" y="14" width="2" height="46" rx="1" fill="#8B7355" />
      {/* Pole base */}
      <ellipse cx="4" cy="60" rx="5" ry="2" fill="#6B5A3E" opacity="0.7" />

      {/* Flag body — 3 bands */}
      {/* Saffron top */}
      <rect x="5" y="14" width="32" height="10.67" rx="1" fill="#FF9933" />
      {/* White middle */}
      <rect x="5" y="24.67" width="32" height="10.67" fill="#FFFFFF" />
      {/* Green bottom */}
      <rect
        x="5"
        y="35.33"
        width="32"
        height="10.67"
        rx="1"
        style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
        fill="#138808"
      />

      {/* Ashoka Chakra — navy blue circle with 8 spokes, centered in white band */}
      {/* Circle outline */}
      <circle
        cx="21"
        cy="30"
        r="4"
        fill="none"
        stroke="#000080"
        strokeWidth="0.8"
      />
      {/* 8 spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 21 + Math.cos(rad) * 3.5;
        const y2 = 30 + Math.sin(rad) * 3.5;
        return (
          <line
            key={angle}
            x1="21"
            y1="30"
            x2={x2.toFixed(2)}
            y2={y2.toFixed(2)}
            stroke="#000080"
            strokeWidth="0.7"
            strokeLinecap="round"
          />
        );
      })}
      {/* Center dot */}
      <circle cx="21" cy="30" r="0.8" fill="#000080" />
    </svg>
  );
}

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
        position: "relative",
      }}
    >
      {/* Deep night atmosphere overlay — #283618 → #111814, subtle but present */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          background:
            "linear-gradient(170deg, rgba(40,54,24,0.55) 0%, rgba(17,24,20,0.72) 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Eyebrow — pill for legibility on dark sky photo */}
        <span
          className="eyebrow eyebrow-pill inline-block mb-10"
          style={{
            color: "rgba(254, 250, 224, 0.85)",
            background: "rgba(40, 54, 24, 0.5)",
            borderColor: "rgba(221, 161, 94, 0.2)",
          }}
        >
          Night — Authority
        </span>

        {/* ── Headline — scroll-pause reveal ─────────────────────── */}
        <div ref={headlineRef} className="reveal-card mb-24">
          {/* Headline row: text on left, sitting silhouette + flag on right */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "clamp(1.5rem, 4vw, 3rem)",
              flexWrap: "wrap",
            }}
          >
            {/* Text block */}
            <div style={{ flex: "1 1 320px" }}>
              <h2
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(2.2rem, 5.5vw, 4.8rem)",
                  letterSpacing: "0.5px",
                  color: "rgb(254, 250, 224)",
                  lineHeight: 1.04,
                  maxWidth: "820px",
                  fontWeight: 700,
                }}
              >
                I Don't Just Design.
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #DDA15E 0%, #BC6C25 100%)",
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
                  color: "rgba(254, 250, 224, 0.85)",
                  maxWidth: "540px",
                  fontWeight: 400,
                }}
              >
                Every project is a revenue system. As a UI/UX Designer,
                WordPress Developer, and eCommerce specialist, I approach
                design, development, and optimization as interconnected levers —
                each calibrated to drive profit, reduce friction, and scale.
              </p>
            </div>

            {/* Sitting silhouette + India flag */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                flexShrink: 0,
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.5rem",
                  position: "relative",
                }}
              >
                <SittingWithLaptopSVG />
                {/* India flag positioned beside the laptop on the desk */}
                <div
                  style={{
                    position: "absolute",
                    right: "-10px",
                    bottom: "30px",
                  }}
                >
                  <IndiaFlagSVG />
                </div>
              </div>
              {/* Subtle "working late" caption */}
              <span
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(221,161,94,0.5)",
                  fontWeight: 500,
                }}
              >
                Ashutosh Tripathi · India
              </span>
            </div>
          </div>
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
              className="reveal-card card-earthy card-lift rounded-2xl p-8"
              style={{
                transitionDelay: `${300 + (i + 1) * 150}ms`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1.75rem",
                  color: "#DDA15E",
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
                  color: "rgb(254, 250, 224)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  marginBottom: "0.5rem",
                }}
              >
                {card.title}
              </h3>

              {/* Thin separator — earthy sand */}
              <div
                style={{
                  width: "20px",
                  height: "1.5px",
                  borderRadius: "2px",
                  background: "rgba(221, 161, 94, 0.45)",
                  marginBottom: "0.9rem",
                }}
              />

              {/* Description */}
              <p
                className="font-ui"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.7,
                  color: "rgba(254, 250, 224, 0.85)",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Background atmospheric moon glow — diffused, calm */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(221,161,94,0.06) 0%, transparent 65%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Soft star field — very subtle, low opacity */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {(
            [
              {
                id: "s1",
                top: "8%",
                left: "12%",
                size: 1.5,
                opacity: 0.35,
                dur: 2.5,
                delay: 0,
              },
              {
                id: "s2",
                top: "15%",
                left: "38%",
                size: 1,
                opacity: 0.25,
                dur: 3.3,
                delay: 0.4,
              },
              {
                id: "s3",
                top: "6%",
                left: "62%",
                size: 2,
                opacity: 0.4,
                dur: 4.1,
                delay: 0.8,
              },
              {
                id: "s4",
                top: "22%",
                left: "80%",
                size: 1.5,
                opacity: 0.3,
                dur: 2.5,
                delay: 1.2,
              },
              {
                id: "s5",
                top: "4%",
                left: "90%",
                size: 1,
                opacity: 0.2,
                dur: 3.3,
                delay: 1.6,
              },
              {
                id: "s6",
                top: "30%",
                left: "5%",
                size: 1,
                opacity: 0.22,
                dur: 4.1,
                delay: 2.0,
              },
              {
                id: "s7",
                top: "12%",
                left: "50%",
                size: 1,
                opacity: 0.18,
                dur: 2.5,
                delay: 2.4,
              },
              {
                id: "s8",
                top: "18%",
                left: "70%",
                size: 1.5,
                opacity: 0.28,
                dur: 3.3,
                delay: 2.8,
              },
              {
                id: "s9",
                top: "25%",
                left: "25%",
                size: 1,
                opacity: 0.2,
                dur: 4.1,
                delay: 3.2,
              },
              {
                id: "s10",
                top: "3%",
                left: "76%",
                size: 1,
                opacity: 0.3,
                dur: 2.5,
                delay: 3.6,
              },
            ] as {
              id: string;
              top: string;
              left: string;
              size: number;
              opacity: number;
              dur: number;
              delay: number;
            }[]
          ).map((star) => (
            <div
              key={star.id}
              style={{
                position: "absolute",
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: "50%",
                background: "rgb(254, 250, 224)",
                opacity: star.opacity,
                animation: `star-twinkle ${star.dur}s ease-in-out infinite alternate`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Ground shadow line — very subtle, grounds the scene */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background:
              "linear-gradient(to top, rgba(17,24,20,0.4) 0%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      </div>
    </section>
  );
}
