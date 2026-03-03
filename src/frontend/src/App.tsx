import { useCallback, useEffect, useState } from "react";
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

// ─── Color Interpolation Helpers ──────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function lerpColor(from: string, to: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
}

// ─── Gradient phases ───────────────────────────────────────────────
type GradientStop = { topColor: string; bottomColor: string };

const PHASE_GRADIENTS: GradientStop[] = [
  { topColor: "#FFD9A0", bottomColor: "#BFD7EA" }, // 0.00 Morning
  { topColor: "#A3D5FF", bottomColor: "#EAF6FF" }, // 0.25 Day
  { topColor: "#F9A826", bottomColor: "#D383FF" }, // 0.50 Evening
  { topColor: "#0D1B2A", bottomColor: "#1a2d4a" }, // 0.75 Night
  { topColor: "#0D1B2A", bottomColor: "#1a2d4a" }, // 1.00 Night end
];

function getBackground(progress: number): string {
  const phaseCount = PHASE_GRADIENTS.length - 1;
  const scaledProgress = progress * phaseCount;
  const phaseIndex = Math.min(Math.floor(scaledProgress), phaseCount - 1);
  const phaseFraction = scaledProgress - phaseIndex;

  const current = PHASE_GRADIENTS[phaseIndex];
  const next = PHASE_GRADIENTS[phaseIndex + 1];

  const topColor = lerpColor(current.topColor, next.topColor, phaseFraction);
  const bottomColor = lerpColor(
    current.bottomColor,
    next.bottomColor,
    phaseFraction,
  );

  return `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
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
  const [background, setBackground] = useState(
    "linear-gradient(180deg, #FFD9A0 0%, #BFD7EA 100%)",
  );

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(progress);
    setBackground(getBackground(progress));
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

  return (
    <>
      {/* Fixed animated background — JS interpolation is the sole driver, no CSS transition */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background,
        }}
      />

      {/* Vignette overlay — adds cinematic depth without affecting text */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.14) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Stars layer — night sky */}
      <StarsLayer scrollProgress={scrollProgress} />

      {/* Landscape layer — hills + city skyline */}
      <LandscapeLayer scrollProgress={scrollProgress} />

      {/* Celestial layer — sun + moon */}
      <CelestialLayer scrollProgress={scrollProgress} />

      {/* Walking silhouette character */}
      <WalkingSilhouette
        scrollProgress={scrollProgress}
        phase={phase}
        phaseProgress={phaseProgress}
      />

      {/* Main content */}
      <main>
        <MorningSection />
        <DaySection />
        <EveningSection />
        <NightSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
