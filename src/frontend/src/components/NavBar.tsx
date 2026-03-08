import { Link, useLocation } from "@tanstack/react-router";
import { Code2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally tracking pathname
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15, 23, 42, 0.97)"
          : "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(148, 163, 184, 0.12)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Ashutosh Tripathi - Home"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2563eb] flex items-center justify-center font-bold text-sm text-white group-hover:bg-[#1d4ed8] transition-colors">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-semibold text-[#f8fafc] text-sm hidden sm:block tracking-tight">
            Ashutosh Tripathi
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.link.${i + 1}`}
              className={[
                "nav-link px-3 py-2 rounded-md text-sm font-medium transition-all",
                location.pathname === link.to
                  ? "text-[#f8fafc] active"
                  : "text-[#94a3b8] hover:text-[#f8fafc]",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-3 dev-btn-primary text-xs py-2 px-4"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.hamburger_button"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] transition-all"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(15, 23, 42, 0.98)",
            borderTop: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.link.${i + 1}`}
                className={[
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  location.pathname === link.to
                    ? "bg-[#2563eb]/15 text-[#f8fafc] border border-[#2563eb]/30"
                    : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2 dev-btn-primary justify-center">
              Hire Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
