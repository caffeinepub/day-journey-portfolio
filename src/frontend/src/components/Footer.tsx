export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="relative z-10 px-6 py-10 text-center"
      style={{
        background: "rgba(13, 27, 42, 0.8)",
        borderTop: "1px solid rgba(58, 134, 255, 0.08)",
      }}
    >
      <p
        className="font-ui text-sm"
        style={{ color: "rgba(232, 240, 255, 0.3)", letterSpacing: "0.02em" }}
      >
        © {year}. Built with{" "}
        <span style={{ color: "#3A86FF", opacity: 0.7 }}>♥</span> using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.link"
          style={{
            color: "rgba(58, 134, 255, 0.6)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = "#3A86FF";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color =
              "rgba(58, 134, 255, 0.6)";
          }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}
