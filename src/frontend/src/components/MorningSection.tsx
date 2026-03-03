import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

// Expo.Out — Apple's signature motion curve
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function MorningSection() {
  return (
    <section
      className="portfolio-section flex flex-col items-center justify-center text-center px-6"
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(6rem, 12vh, 10rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Eyebrow ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.15 }}
      >
        <span
          className="eyebrow inline-flex items-center gap-3 mb-12"
          style={{ color: "rgba(45, 31, 14, 0.5)" }}
        >
          <span
            style={{
              display: "inline-block",
              width: 24,
              height: 1,
              background: "rgba(45, 31, 14, 0.3)",
              verticalAlign: "middle",
            }}
          />
          Ashutosh Tripathi
          <span
            style={{
              display: "inline-block",
              width: 24,
              height: 1,
              background: "rgba(45, 31, 14, 0.3)",
              verticalAlign: "middle",
            }}
          />
        </span>
      </motion.div>

      {/* ── Headline — monumental ──────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EXPO_OUT, delay: 0.3 }}
        className="font-display font-bold"
        style={{
          /* Fix 1: ceiling raised to 8rem, tighter lineHeight */
          fontSize: "clamp(3rem, 8.5vw, 8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.02,
          color: "#2d1f0e",
          maxWidth: "960px",
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        Design. Build.
        <br />
        {/* Italic line — slightly lighter colour for two-tone contrast */}
        <em
          style={{
            fontStyle: "italic",
            /* Subtle warm offset against the headline colour */
            color: "rgba(74, 53, 32, 0.72)",
          }}
        >
          Grow.
        </em>
      </motion.h1>

      {/* ── Subtitle — wide, breathing ────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: EXPO_OUT, delay: 0.55 }}
        className="font-ui leading-relaxed"
        style={{
          /* Fix 1: max-width wider, font size bumped, lighter weight */
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          fontWeight: 400,
          maxWidth: "520px",
          color: "rgba(45, 31, 14, 0.62)",
          letterSpacing: "0.015em",
          marginBottom: "clamp(3.5rem, 7vw, 6rem)",
        }}
      >
        Graphic Designer · UI/UX Designer · WordPress & eCommerce Specialist. I
        engineer conversion-focused digital systems — from pixel-perfect
        interfaces to performance-optimized eCommerce infrastructure that drives
        measurable revenue.
      </motion.p>

      {/* ── Scroll hint ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EXPO_OUT, delay: 1.0 }}
        className="flex flex-col items-center gap-3"
      >
        <span className="eyebrow" style={{ color: "rgba(45, 31, 14, 0.32)" }}>
          Scroll to explore
        </span>
        <div style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}>
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            style={{ color: "rgba(45, 31, 14, 0.38)" }}
          />
        </div>
      </motion.div>

      {/* ── Decorative orbs ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "6%",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,217,160,0.55) 0%, rgba(191,215,234,0.18) 60%, transparent 100%)",
          filter: "blur(55px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "18%",
          left: "4%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(191,215,234,0.45) 0%, transparent 70%)",
          filter: "blur(35px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </section>
  );
}
