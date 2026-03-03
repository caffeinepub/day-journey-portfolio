interface StarsLayerProps {
  scrollProgress: number;
}

// Hardcoded star data: [xPercent, yPercent, radius, baseOpacity, twinkleDelaySec]
// Confined to top 70% of viewport (y: 0–70%)
const STARS: [number, number, number, number, number][] = [
  [3.2, 5.1, 1.5, 0.9, 0.2],
  [7.8, 12.4, 1.0, 0.7, 1.1],
  [12.5, 3.8, 2.0, 0.85, 0.7],
  [18.3, 18.6, 1.2, 0.75, 2.3],
  [22.9, 8.3, 1.8, 0.95, 0.4],
  [28.1, 25.2, 1.0, 0.6, 1.8],
  [33.7, 11.5, 1.5, 0.8, 3.1],
  [39.4, 4.7, 2.5, 0.9, 0.9],
  [44.2, 19.8, 1.0, 0.65, 2.5],
  [49.6, 7.2, 1.8, 0.85, 1.3],
  [54.3, 30.4, 1.2, 0.7, 0.6],
  [59.8, 14.1, 2.0, 0.9, 3.8],
  [65.2, 22.7, 1.0, 0.6, 1.6],
  [70.7, 6.9, 1.5, 0.8, 2.9],
  [75.4, 35.3, 1.8, 0.75, 0.3],
  [80.9, 16.8, 1.2, 0.85, 4.2],
  [86.1, 9.4, 2.0, 0.7, 1.7],
  [91.5, 28.1, 1.5, 0.9, 0.8],
  [96.8, 42.5, 1.0, 0.65, 3.4],
  [5.6, 38.9, 2.5, 0.8, 1.2],
  [10.4, 55.2, 1.2, 0.6, 4.5],
  [15.7, 47.6, 1.8, 0.75, 2.1],
  [20.2, 62.4, 1.0, 0.85, 0.5],
  [25.8, 34.7, 2.0, 0.7, 3.6],
  [31.3, 58.8, 1.5, 0.9, 1.4],
  [36.9, 43.2, 1.2, 0.65, 2.8],
  [42.4, 51.9, 1.8, 0.8, 0.1],
  [47.7, 67.3, 1.0, 0.7, 4.0],
  [53.1, 41.5, 2.5, 0.85, 1.9],
  [58.6, 63.8, 1.2, 0.6, 3.2],
  [64.0, 48.4, 1.5, 0.9, 0.7],
  [69.4, 56.7, 1.8, 0.75, 2.6],
  [74.9, 39.1, 1.0, 0.8, 4.3],
  [80.3, 64.2, 2.0, 0.65, 1.0],
  [85.7, 52.6, 1.5, 0.85, 3.7],
  [91.2, 45.8, 1.2, 0.7, 0.4],
  [2.1, 21.3, 1.8, 0.9, 2.2],
  [8.4, 44.7, 1.0, 0.6, 1.5],
  [14.8, 68.1, 2.5, 0.75, 3.9],
  [19.5, 31.5, 1.2, 0.85, 0.6],
  [26.4, 52.3, 1.8, 0.8, 4.6],
  [32.0, 17.9, 1.5, 0.65, 2.4],
  [38.5, 66.5, 1.0, 0.9, 1.1],
  [43.9, 37.8, 2.0, 0.7, 3.5],
  [50.3, 23.4, 1.5, 0.85, 0.9],
  [55.7, 59.2, 1.2, 0.6, 2.0],
  [61.2, 32.6, 1.8, 0.8, 4.7],
  [66.6, 15.3, 2.5, 0.75, 1.3],
  [72.1, 50.9, 1.0, 0.9, 3.0],
  [77.5, 27.4, 1.5, 0.65, 0.2],
  [83.0, 43.7, 1.2, 0.85, 4.4],
  [88.4, 61.5, 1.8, 0.7, 1.8],
  [93.9, 36.2, 2.0, 0.9, 2.7],
  [98.2, 19.7, 1.0, 0.6, 3.3],
  [4.7, 29.6, 1.5, 0.8, 0.8],
  [11.2, 57.8, 2.5, 0.75, 2.9],
  [17.6, 13.2, 1.2, 0.85, 4.1],
  [23.0, 46.3, 1.8, 0.7, 1.6],
  [29.5, 69.7, 1.0, 0.9, 0.3],
  [35.0, 26.8, 2.0, 0.65, 3.8],
  [41.4, 54.1, 1.5, 0.8, 2.3],
  [46.8, 11.7, 1.2, 0.75, 1.0],
  [52.3, 48.5, 1.8, 0.9, 4.9],
  [57.7, 33.9, 1.0, 0.6, 0.5],
  [63.2, 66.8, 2.5, 0.85, 2.1],
  [68.6, 21.1, 1.5, 0.7, 3.6],
  [74.1, 55.4, 1.2, 0.9, 1.4],
  [79.5, 38.7, 1.8, 0.65, 0.7],
  [85.0, 14.5, 2.0, 0.8, 4.2],
  [90.4, 58.9, 1.0, 0.75, 2.8],
  [95.9, 32.3, 1.5, 0.85, 1.2],
  [1.3, 47.2, 1.2, 0.7, 3.5],
  [6.8, 65.4, 1.8, 0.9, 0.1],
  [13.3, 24.8, 2.5, 0.65, 4.8],
  [16.9, 40.5, 1.0, 0.8, 2.6],
  [45.6, 28.9, 1.5, 0.85, 1.9],
  [71.4, 44.3, 1.8, 0.7, 3.1],
  [87.3, 70.0, 2.0, 0.75, 0.6],
  [97.5, 53.7, 1.2, 0.9, 4.5],
  [50.0, 2.3, 3.0, 0.95, 1.7],
];

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function StarsLayer({ scrollProgress }: StarsLayerProps) {
  // Fade in: opacity 0 at 0.7, fully visible at 0.85
  const layerOpacity = clamp((scrollProgress - 0.7) / 0.15, 0, 1);

  if (layerOpacity <= 0) return null;

  return (
    <div
      className="stars-layer"
      aria-hidden="true"
      style={{ opacity: layerOpacity, willChange: "opacity" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
        aria-label="Night sky stars"
        style={{ position: "absolute", inset: 0 }}
      >
        {STARS.map(([x, y, r, baseOpacity, delay], i) => (
          <circle
            key={`star-${i}-${x.toFixed(1)}-${y.toFixed(1)}`}
            cx={x}
            cy={y}
            r={r * 0.18} // scale down since viewBox is 0–100
            fill="white"
            style={{
              opacity: baseOpacity,
              animation: `twinkle ${2 + (delay % 3)}s ${delay}s ease-in-out infinite`,
              // Use CSS custom property for twinkle keyframe reference opacity
              ["--star-opacity" as string]: baseOpacity,
            }}
          />
        ))}
      </svg>

      {/* Additional shimmer dots — absolute positioned for richer feel */}
      {STARS.filter((_, i) => i % 5 === 0).map(
        ([x, y, , baseOpacity, delay], i) => (
          <div
            key={`shimmer-${i}-${x.toFixed(1)}-${y.toFixed(1)}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(200, 220, 255, 0.9)",
              boxShadow: "0 0 4px rgba(200, 220, 255, 0.6)",
              opacity: baseOpacity * 0.8,
              animation: `twinkle ${3 + (delay % 2)}s ${delay + 0.5}s ease-in-out infinite`,
              ["--star-opacity" as string]: baseOpacity * 0.8,
              willChange: "opacity, transform",
            }}
          />
        ),
      )}
    </div>
  );
}
