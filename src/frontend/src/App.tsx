import { useCallback, useEffect, useState } from "react";
import { AuthoritySection } from "./components/AuthoritySection";
import { CTASection } from "./components/CTASection";
import { CelestialLayer } from "./components/CelestialLayer";
import { DaySection } from "./components/DaySection";
import { EveningSection } from "./components/EveningSection";
import { Footer } from "./components/Footer";
import { LandscapeLayer } from "./components/LandscapeLayer";
import { MorningSection } from "./components/MorningSection";
import { NightSection } from "./components/NightSection";
import { StarsLayer } from "./components/StarsLayer";
import { WalkingSilhouette } from "./components/WalkingSilhouette";

// ─── Types ─────────────────────────────────────────────────────────
type Phase = "morning" | "day" | "evening" | "night";

// ─── Math helpers ──────────────────────────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// ─── Sky layer opacities ────────────────────────────────────────────
// Each returns 0–1 opacity based on scroll progress
function getMorningOpacity(p: number): number {
  if (p < 0.25) return 1;
  return Math.max(0, 1 - (p - 0.25) / 0.2);
}

function getDayOpacity(p: number): number {
  const fadeIn = clamp((p - 0.15) / 0.2, 0, 1);
  const fadeOut = p < 0.5 ? 1 : Math.max(0, 1 - (p - 0.5) / 0.2);
  return fadeIn * fadeOut;
}

function getEveningOpacity(p: number): number {
  const fadeIn = clamp((p - 0.4) / 0.2, 0, 1);
  const fadeOut = p < 0.75 ? 1 : Math.max(0, 1 - (p - 0.75) / 0.2);
  return fadeIn * fadeOut;
}

function getNightOpacity(p: number): number {
  return clamp((p - 0.65) / 0.2, 0, 1);
}

// ─── Atmospheric overlay color ─────────────────────────────────────
// 4 phase colors: [r, g, b, a]
const OVERLAY_COLORS: [number, number, number, number][] = [
  [255, 200, 100, 0.12], // morning: warm golden wash
  [200, 230, 255, 0.08], // day: cool-blue haze
  [180, 80, 30, 0.14], // evening: amber-mauve warm wash
  [5, 10, 30, 0.35], // night: deep navy darkening
];

function getAtmosOverlay(p: number): string {
  // Map progress to 4 phases (0–3)
  const phaseCount = OVERLAY_COLORS.length - 1;
  const scaled = p * phaseCount;
  const idx = Math.min(Math.floor(scaled), phaseCount - 1);
  const frac = scaled - idx;

  const a = OVERLAY_COLORS[idx];
  const b = OVERLAY_COLORS[Math.min(idx + 1, phaseCount)];

  const r = Math.round(lerp(a[0], b[0], frac));
  const g = Math.round(lerp(a[1], b[1], frac));
  const bl = Math.round(lerp(a[2], b[2], frac));
  const alpha = lerp(a[3], b[3], frac);

  return `rgba(${r},${g},${bl},${alpha.toFixed(3)})`;
}

// ─── Phase computation ─────────────────────────────────────────────
function computePhase(scrollProgress: number): {
  phase: Phase;
  phaseProgress: number;
} {
  if (scrollProgress < 0.25) {
    return { phase: "morning", phaseProgress: scrollProgress / 0.25 };
  }
  if (scrollProgress < 0.5) {
    return { phase: "day", phaseProgress: (scrollProgress - 0.25) / 0.25 };
  }
  if (scrollProgress < 0.75) {
    return { phase: "evening", phaseProgress: (scrollProgress - 0.5) / 0.25 };
  }
  return { phase: "night", phaseProgress: (scrollProgress - 0.75) / 0.25 };
}

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  const { phase, phaseProgress } = computePhase(scrollProgress);

  // Sky layer opacities
  const morningOp = getMorningOpacity(scrollProgress);
  const dayOp = getDayOpacity(scrollProgress);
  const eveningOp = getEveningOpacity(scrollProgress);
  const nightOp = getNightOpacity(scrollProgress);

  // Atmospheric overlay
  const atmosColor = getAtmosOverlay(scrollProgress);

  return (
    <>
      {/* ── Sky crossfade layers — z:0 ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="sky-layer"
        style={{
          zIndex: 0,
          backgroundImage:
            "url(/assets/generated/sky-morning.dim_1920x1080.jpg)",
          opacity: morningOp,
        }}
      />
      <div
        aria-hidden="true"
        className="sky-layer"
        style={{
          zIndex: 0,
          backgroundImage: "url(/assets/generated/sky-day.dim_1920x1080.jpg)",
          opacity: dayOp,
        }}
      />
      <div
        aria-hidden="true"
        className="sky-layer"
        style={{
          zIndex: 0,
          backgroundImage:
            "url(/assets/generated/sky-evening.dim_1920x1080.jpg)",
          opacity: eveningOp,
        }}
      />
      <div
        aria-hidden="true"
        className="sky-layer"
        style={{
          zIndex: 0,
          backgroundImage: "url(/assets/generated/sky-night.dim_1920x1080.jpg)",
          opacity: nightOp,
        }}
      />

      {/* ── Atmospheric overlay — z:1 ───────────────────────────── */}
      <div
        aria-hidden="true"
        className="atmos-overlay"
        style={{
          zIndex: 1,
          backgroundColor: atmosColor,
        }}
      />

      {/* ── Vignette overlay — z:2 ──────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Stars layer — z:3 */}
      <StarsLayer scrollProgress={scrollProgress} />

      {/* Landscape layer — z:4 */}
      <LandscapeLayer scrollProgress={scrollProgress} />

      {/* Celestial layer — z:5 */}
      <CelestialLayer scrollProgress={scrollProgress} />

      {/* Walking silhouette — z:10 */}
      <WalkingSilhouette
        scrollProgress={scrollProgress}
        phase={phase}
        phaseProgress={phaseProgress}
      />

      {/* Main content — z:20 */}
      <main>
        <MorningSection />
        <DaySection />
        <EveningSection />
        <AuthoritySection />
        <NightSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
