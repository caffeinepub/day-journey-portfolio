export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="relative z-10 px-6 py-10 text-center"
      style={{
        background: "rgba(40, 54, 24, 0.8)",
        borderTop: "1px solid rgba(254, 250, 224, 0.06)",
      }}
    >
      <p
        className="font-ui text-sm"
        style={{ color: "rgba(254, 250, 224, 0.4)", letterSpacing: "0.02em" }}
      >
        © {year}. Built with <span style={{ color: "#DDA15E" }}>♥</span> using{" "}
        <a
          href={utm}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="nav.link"
          style={{
            color: "rgba(221, 161, 94, 0.75)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = "#DDA15E";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color =
              "rgba(221, 161, 94, 0.75)";
          }}
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}
