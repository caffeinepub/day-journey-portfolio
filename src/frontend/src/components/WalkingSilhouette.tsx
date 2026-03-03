type Phase = "morning" | "day" | "evening" | "night";

interface WalkingSilhouetteProps {
  scrollProgress: number;
  phase?: Phase;
  phaseProgress?: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

// Shadow filter by phase
// ctaProgress: 0–1 float (smooth ramp), used to gradually intensify night glow
function getShadowFilter(phase: Phase, ctaProgress: number): string {
  switch (phase) {
    case "morning":
      return "drop-shadow(-8px 12px 8px rgba(200, 140, 40, 0.45))";
    case "day":
      return "drop-shadow(0 6px 6px rgba(0, 0, 0, 0.25))";
    case "evening":
      return "drop-shadow(8px 10px 8px rgba(200, 100, 30, 0.4))";
    case "night": {
      // Smoothly intensify the halo as the character approaches the viewer
      const glowRadius = 12 + ctaProgress * 20;
      const glowAlpha = 0.6 + ctaProgress * 0.4;
      return `drop-shadow(0 0 ${glowRadius.toFixed(1)}px rgba(58, 134, 255, ${glowAlpha.toFixed(2)})) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))`;
    }
    default:
      return "drop-shadow(0 6px 6px rgba(0, 0, 0, 0.2))";
  }
}

export function WalkingSilhouette({
  scrollProgress,
  phase = "morning",
  phaseProgress: _phaseProgress = 0,
}: WalkingSilhouetteProps) {
  // Interpolate X position: 5% to 88% of viewport width
  const xPercent = 5 + scrollProgress * 83;

  // CTA turn — when scrollProgress > 0.95, smoothly ramps 0→1
  const ctaProgress = clamp((scrollProgress - 0.95) / 0.05, 0, 1);

  // Partial flip: scaleX from 1 to -0.85 (character "turns toward viewer")
  const scaleX = lerp(1, -0.85, ctaProgress);

  // Character size: slightly bigger in morning/evening (low sun = long shadow effect)
  const isLowSun = phase === "morning" || phase === "evening";
  const baseWidth = isLowSun ? 66 : 60;
  const baseHeight = isLowSun ? 132 : 120;

  // Shadow filter — ctaProgress drives smooth glow intensification in night phase
  const shadowFilter = getShadowFilter(phase, ctaProgress);

  // Silhouette fill color: lerp to cooler during night
  const silhouetteColor = phase === "night" ? "#0f0f24" : "#1a1a2e";
  const darkDetail = phase === "night" ? "#06061a" : "#0d0d1e";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: "0",
        left: `${xPercent}%`,
        // Separate translateX centering from the scaleX turn so they don't fight.
        // The centering is always applied; scaleX is smoothed by its own easing.
        transform: `translateX(-50%) scaleX(${scaleX})`,
        zIndex: 10,
        // No transition on 'left' — RAF-driven scroll already provides smoothness.
        // scaleX gets a slow ease-out to prevent a jarring snap at the CTA turn.
        // filter transitions phase-appropriate shadow blending.
        transition:
          "filter 0.55s ease, transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
        willChange: "left, transform",
      }}
    >
      <SilhouetteSVG
        width={baseWidth}
        height={baseHeight}
        fillColor={silhouetteColor}
        darkDetail={darkDetail}
        shadowFilter={shadowFilter}
      />
    </div>
  );
}

function SilhouetteSVG({
  width,
  height,
  fillColor,
  darkDetail,
  shadowFilter,
}: {
  width: number;
  height: number;
  fillColor: string;
  darkDetail: string;
  shadowFilter: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Walking professional silhouette"
      style={{
        filter: shadowFilter,
        display: "block",
        // Filter transition handled by parent wrapper — no double-transition here
      }}
    >
      {/* Animated body container */}
      <g className="silhouette-body">
        {/* Head */}
        <ellipse cx="30" cy="11" rx="8" ry="9" fill={fillColor} />

        {/* Neck */}
        <rect x="27" y="19" width="6" height="5" rx="2" fill={fillColor} />

        {/* Torso / Jacket — slight forward professional lean */}
        <path
          d="M18 24 C18 24 22 22 30 22 C38 22 42 24 42 24 L44 54 C44 54 38 57 30 57 C22 57 16 54 16 54 Z"
          fill={fillColor}
        />

        {/* Collar / Tie detail */}
        <path
          d="M27 22 L30 32 L33 22 Z"
          fill="rgba(42,42,78,0.6)"
          opacity="0.6"
        />

        {/* Left arm (front) */}
        <g className="silhouette-arm-left">
          <path
            d="M18 26 C15 30 13 38 14 46"
            stroke={fillColor}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left hand */}
          <ellipse cx="14" cy="48" rx="3" ry="4" fill={fillColor} />
        </g>

        {/* Right arm (back) */}
        <g className="silhouette-arm-right">
          <path
            d="M42 26 C45 30 47 38 46 46"
            stroke={fillColor}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right hand */}
          <ellipse cx="46" cy="48" rx="3" ry="4" fill={fillColor} />
        </g>

        {/* Trousers waistband */}
        <rect x="19" y="54" width="22" height="4" rx="1" fill={darkDetail} />

        {/* Left leg (front) */}
        <g className="silhouette-leg-left">
          <path
            d="M24 58 C23 70 23 82 24 92"
            stroke={fillColor}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left shoe */}
          <ellipse cx="24" cy="94" rx="5.5" ry="4" fill={fillColor} />
          <ellipse cx="20" cy="95.5" rx="3" ry="2.5" fill={darkDetail} />
        </g>

        {/* Right leg (back) */}
        <g className="silhouette-leg-right">
          <path
            d="M36 58 C37 70 37 82 36 92"
            stroke={fillColor}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right shoe */}
          <ellipse cx="36" cy="94" rx="5.5" ry="4" fill={fillColor} />
          <ellipse cx="40" cy="95.5" rx="3" ry="2.5" fill={darkDetail} />
        </g>

        {/* Shadow under feet */}
        <ellipse
          cx="30"
          cy="100"
          rx="16"
          ry="3"
          fill={fillColor}
          opacity="0.15"
        />
      </g>
    </svg>
  );
}
