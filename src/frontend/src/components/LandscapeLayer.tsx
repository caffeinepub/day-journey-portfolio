interface LandscapeLayerProps {
  scrollProgress: number;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function LandscapeLayer({ scrollProgress }: LandscapeLayerProps) {
  // Hills: visible 0–0.45, fade to 0 at 0.55
  const hillsOpacity = (() => {
    if (scrollProgress <= 0.45) return 1;
    if (scrollProgress <= 0.55)
      return clamp(1 - (scrollProgress - 0.45) / 0.1, 0, 1);
    return 0;
  })();

  // Hill fill color: morning darker, day lighter
  const hillOpacity =
    scrollProgress < 0.25
      ? lerp(0.12, 0.12, scrollProgress / 0.25)
      : lerp(0.12, 0.08, (scrollProgress - 0.25) / 0.25);

  // Skyline: 0 at 0.45, 1 at 0.6, stays visible
  const skylineOpacity = (() => {
    if (scrollProgress <= 0.45) return 0;
    if (scrollProgress <= 0.6)
      return clamp((scrollProgress - 0.45) / 0.15, 0, 1);
    return 1;
  })();

  // Skyline fill: evening vs night
  const skylineFill =
    scrollProgress >= 0.75
      ? `rgba(5, 10, 30, ${lerp(0.25, 0.6, clamp((scrollProgress - 0.75) / 0.15, 0, 1))})`
      : "rgba(0, 0, 0, 0.25)";

  // Window glow opacity for night only
  const windowGlow = clamp((scrollProgress - 0.75) / 0.15, 0, 1);

  return (
    <div className="landscape-layer" aria-hidden="true">
      {/* ── Rolling Hills (morning/day) ──────────────────────────── */}
      <svg
        width="100%"
        height="120"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        role="img"
        aria-label="Rolling hills landscape"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          opacity: hillsOpacity,
          willChange: "opacity",
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Foreground ground strip — very subtle dark base */}
        <rect x="0" y="112" width="1440" height="8" fill="rgba(0,0,0,0.15)" />

        {/* Primary foreground hill */}
        <path
          d="M0,120 
             C60,120 80,85 140,80 
             C200,75 240,95 300,90 
             C360,85 400,65 480,60 
             C540,57 580,72 640,70 
             C700,68 740,55 820,52 
             C900,49 940,68 1000,65 
             C1060,62 1100,45 1160,42 
             C1220,39 1300,58 1360,60 
             C1400,62 1420,75 1440,80 
             L1440,120 Z"
          fill={`rgba(0, 0, 0, ${hillOpacity})`}
        />
        {/* Secondary hill layer for depth — blurred background hill */}
        <g
          className="landscape-bg-layer"
          style={{
            transform: `translateY(${scrollProgress * -8}px)`,
          }}
        >
          <path
            d="M0,120 
               C100,120 120,100 200,98 
               C280,96 320,108 400,105 
               C480,102 520,92 600,90 
               C680,88 720,98 800,96 
               C880,94 920,85 1000,84 
               C1080,83 1120,92 1200,90 
               C1280,88 1360,100 1440,102 
               L1440,120 Z"
            fill={`rgba(0, 0, 0, ${hillOpacity * 0.6})`}
          />
        </g>
      </svg>

      {/* ── City Skyline (evening/night) ─────────────────────────── */}
      <svg
        width="100%"
        height="160"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        role="img"
        aria-label="City skyline silhouette"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          opacity: skylineOpacity,
          willChange: "opacity",
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Skyline silhouette */}
        <path
          d="M0,160 L0,140 
             L20,140 L20,110 L30,110 L30,120 L40,120 L40,100 L55,100 L55,115 L65,115 L65,95 
             L80,95 L80,130 L90,130 L90,85 L100,85 L100,75 L115,75 L115,90 L125,90 L125,65 L140,65 L140,80 L155,80
             L155,130 L165,130 L165,105 L175,105 L175,95 L185,95 L185,115 
             L200,115 L200,120 L215,120 L215,88 L230,88 L230,75 L245,75 L245,85 L255,85 L255,70 L270,70 L270,60 L285,60 L285,50 L300,50 L300,45 L315,45 L315,55 L325,55 L325,65 L335,65
             L335,110 L350,110 L350,90 L365,90 L365,80 L380,80 L380,100 L390,100 L390,120
             L405,120 L405,95 L420,95 L420,82 L435,82 L435,70 L450,70 L450,58 L465,58 L465,50 L480,50 L480,42 L495,42 L495,48 L510,48 L510,62 L525,62
             L525,100 L540,100 L540,110 L555,110 L555,90 L570,90 L570,78 L585,78 L585,85 L600,85 L600,72 L615,72 L615,60 L630,60 L630,52 L645,52 L645,62 L655,62
             L655,105 L670,105 L670,90 L685,90 L685,80 L700,80 L700,92 L715,92 L715,75 L730,75 L730,65 L745,65 L745,55 L760,55 L760,48 L775,48 L775,55 L790,55 L790,68 L800,68
             L800,100 L815,100 L815,85 L830,85 L830,72 L845,72 L845,62 L860,62 L860,78 L875,78 L875,90 
             L890,90 L890,115 L905,115 L905,95 L920,95 L920,80 L935,80 L935,68 L950,68 L950,55 L965,55 L965,45 L980,45 L980,55 L995,55 L995,65 L1005,65
             L1005,105 L1020,105 L1020,90 L1035,90 L1035,78 L1050,78 L1050,88 L1065,88 L1065,100 
             L1080,100 L1080,110 L1095,110 L1095,85 L1110,85 L1110,75 L1125,75 L1125,85 L1140,85 L1140,100 L1155,100
             L1155,120 L1170,120 L1170,95 L1185,95 L1185,82 L1200,82 L1200,70 L1215,70 L1215,58 L1230,58 L1230,50 L1245,50 L1245,62 L1255,62
             L1255,105 L1270,105 L1270,90 L1285,90 L1285,80 L1300,80 L1300,95 L1315,95 L1315,108 
             L1330,108 L1330,120 L1345,120 L1345,100 L1360,100 L1360,115 L1375,115 L1375,130 L1390,130 L1390,140 L1440,140 L1440,160 Z"
          fill={skylineFill}
        />

        {/* Window lights — only visible during night, subtle parallax */}
        {windowGlow > 0 && (
          <g
            opacity={windowGlow * 0.7}
            style={{ transform: `translateY(${scrollProgress * -4}px)` }}
          >
            {/* Row of glowing windows across buildings */}
            {[
              [105, 82],
              [110, 82],
              [300, 52],
              [305, 52],
              [310, 52],
              [465, 56],
              [470, 56],
              [480, 48],
              [485, 48],
              [635, 58],
              [640, 58],
              [645, 58],
              [760, 54],
              [765, 54],
              [780, 53],
              [965, 51],
              [970, 51],
              [975, 51],
              [980, 51],
              [1215, 64],
              [1220, 64],
              [1230, 58],
              [1235, 58],
              [125, 70],
              [130, 70],
              [140, 70],
              [270, 65],
              [275, 65],
              [285, 55],
              [450, 55],
              [455, 65],
              [460, 65],
              [750, 60],
              [755, 48],
              [950, 62],
              [955, 62],
              [1200, 76],
              [1205, 76],
            ].map(([x, y], idx) => (
              <rect
                key={`w-${x}-${y}`}
                x={x}
                y={y}
                width="4"
                height="4"
                rx="0.5"
                fill={
                  idx % 3 === 0
                    ? "rgba(255, 220, 100, 0.8)"
                    : idx % 3 === 1
                      ? "rgba(180, 210, 255, 0.7)"
                      : "rgba(255, 240, 180, 0.6)"
                }
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
