import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

// Expo.Out — Apple's signature motion curve
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export function MorningSection() {
  return (
    <section
      className="portfolio-section portfolio-section-hero flex flex-col items-center justify-center text-center px-6"
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(6rem, 12vh, 10rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/*
        Frost content island — barely perceptible frosted panel that
        lifts text legibility off the morning sky photo without boxing it.
      */}
      <div
        className="section-frost-light flex flex-col items-center text-center w-full"
        style={{
          maxWidth: "900px",
          padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {/* ── Eyebrow ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.15 }}
        >
          <span
            className="eyebrow eyebrow-pill inline-flex items-center gap-3 mb-10"
            style={{ color: "rgba(45, 31, 14, 0.65)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: 18,
                height: 1,
                background: "rgba(45, 31, 14, 0.25)",
                verticalAlign: "middle",
              }}
            />
            Ashutosh Tripathi — UI/UX Designer & WordPress Developer
            <span
              style={{
                display: "inline-block",
                width: 18,
                height: 1,
                background: "rgba(45, 31, 14, 0.25)",
                verticalAlign: "middle",
              }}
            />
          </span>
        </motion.div>

        {/* ── Headline — monumental ──────────────────────────────────── */}
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EXPO_OUT, delay: 0.2 }}
          className="font-display font-bold heading-shadow-warm"
          style={{
            fontSize: "clamp(3rem, 8.5vw, 8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            color: "#2d1f0e",
            maxWidth: "860px",
            marginBottom: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          Every Great Vision
          <br />
          {/* Italic line — slightly lighter colour for two-tone contrast */}
          <em
            style={{
              fontStyle: "italic",
              color: "rgba(74, 53, 32, 0.75)",
            }}
          >
            Starts with an Idea.
          </em>
        </motion.h1>

        {/* ── Subtitle — wide, breathing ────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: EXPO_OUT, delay: 0.7 }}
          className="font-ui leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            fontWeight: 400,
            maxWidth: "500px",
            color: "rgba(45, 31, 14, 0.7)",
            letterSpacing: "0.012em",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          I'm a Conversion-Focused UI/UX Designer and WordPress Developer
          specializing in WooCommerce and eCommerce systems. I engineer digital
          products that look premium and perform harder — from brand identity to
          production-ready storefronts.
        </motion.p>

        {/* ── Scroll hint ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EXPO_OUT, delay: 1.0 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="eyebrow" style={{ color: "rgba(45, 31, 14, 0.38)" }}>
            Scroll to explore
          </span>
          <div style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}>
            <ChevronDown
              size={20}
              strokeWidth={1.5}
              style={{ color: "rgba(45, 31, 14, 0.42)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
