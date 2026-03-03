interface CelestialLayerProps {
  scrollProgress: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function CelestialLayer({ scrollProgress }: CelestialLayerProps) {
  // ── Sun position ────────────────────────────────────────────────
  // X: 20% morning → 50% noon (at 0.5) → 80% evening
  const sunX = (() => {
    if (scrollProgress <= 0.5) {
      return lerp(20, 50, scrollProgress / 0.5);
    }
    return lerp(50, 80, (scrollProgress - 0.5) / 0.25);
  })();

  // Y: 85vh morning → 15vh noon → 85vh evening
  const sunY = (() => {
    if (scrollProgress <= 0.5) {
      return lerp(85, 15, scrollProgress / 0.5);
    }
    return lerp(15, 85, (scrollProgress - 0.5) / 0.25);
  })();

  // Opacity: 0 at 0 → 1 at 0.05 → 1 at 0.7 → 0 at 0.8
  const sunOpacity = (() => {
    if (scrollProgress < 0.05) return clamp(scrollProgress / 0.05, 0, 1);
    if (scrollProgress <= 0.7) return 1;
    if (scrollProgress <= 0.8)
      return clamp(1 - (scrollProgress - 0.7) / 0.1, 0, 1);
    return 0;
  })();

  // ── Moon position ───────────────────────────────────────────────
  // Visible only during night (0.75–1.0)
  // Y: 80vh at 0.75 → 25vh at 1.0
  const moonProgress = clamp((scrollProgress - 0.75) / 0.25, 0, 1);
  const moonY = lerp(80, 25, moonProgress);
  const moonOpacity = clamp((scrollProgress - 0.75) / 0.08, 0, 1);

  return (
    <div className="celestial-layer" aria-hidden="true">
      {/* ── Sun ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: `${sunX}%`,
          top: `${sunY}vh`,
          transform: "translate(-50%, -50%)",
          opacity: sunOpacity,
          willChange: "transform, opacity",
          transition: "opacity 0.3s ease",
          filter: "drop-shadow(0 0 20px rgba(255, 200, 50, 0.8))",
        }}
      >
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Sun"
        >
          <defs>
            <radialGradient id="sun-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF7D4" />
              <stop offset="35%" stopColor="#FFD84D" />
              <stop offset="70%" stopColor="#F9A826" />
              <stop offset="100%" stopColor="#E87A1A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE066" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#FFB347" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F9A826" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Outer glow ring */}
          <circle cx="35" cy="35" r="35" fill="url(#sun-glow)" />
          {/* Main sun body */}
          <circle cx="35" cy="35" r="20" fill="url(#sun-core)" />
          {/* Inner highlight */}
          <circle cx="30" cy="29" r="6" fill="rgba(255,255,240,0.5)" />
        </svg>
      </div>

      {/* ── Moon ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "78%",
          top: `${moonY}vh`,
          transform: "translate(-50%, -50%)",
          opacity: moonOpacity,
          willChange: "transform, opacity",
          animation:
            moonOpacity > 0.5
              ? "moon-glow-pulse 4s ease-in-out infinite"
              : "none",
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Moon"
        >
          <defs>
            <radialGradient id="moon-body" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E8F0FF" />
              <stop offset="50%" stopColor="#C4D4F0" />
              <stop offset="100%" stopColor="#8AAAD8" />
            </radialGradient>
          </defs>
          {/* Moon disc */}
          <circle cx="25" cy="25" r="20" fill="url(#moon-body)" />
          {/* Crescent shadow — offset circle to carve out crescent shape */}
          <circle cx="32" cy="22" r="17" fill="#0D1B2A" opacity="0.85" />
          {/* Soft edge highlight */}
          <circle cx="19" cy="20" r="5" fill="rgba(232,240,255,0.25)" />
          <circle cx="17" cy="30" r="2.5" fill="rgba(232,240,255,0.15)" />
        </svg>
      </div>
    </div>
  );
}
