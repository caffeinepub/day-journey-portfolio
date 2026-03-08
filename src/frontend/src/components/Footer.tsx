import { Link } from "@tanstack/react-router";
import { Code2, Heart } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const socialLinks = [
  {
    icon: SiGithub,
    href: "https://github.com/ashutosh-tripathi",
    label: "GitHub",
  },
  {
    icon: SiLinkedin,
    href: "https://linkedin.com/in/ashutosh-tripathi",
    label: "LinkedIn",
  },
  {
    icon: SiX,
    href: "https://x.com/ashutosh-tripathi",
    label: "X (Twitter)",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  )}`;

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "#0a1020",
        borderColor: "rgba(148, 163, 184, 0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-[#f8fafc] text-sm">
                Ashutosh Tripathi
              </span>
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Full Stack Developer crafting digital experiences with clean code
              and thoughtful design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#f8fafc] font-semibold text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#94a3b8] text-sm hover:text-[#38bdf8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-[#f8fafc] font-semibold text-sm mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#38bdf8] transition-all"
                  style={{ border: "1px solid rgba(148, 163, 184, 0.1)" }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-[#94a3b8] text-sm mt-4">
              <a
                href="mailto:ashutosh@example.com"
                className="hover:text-[#38bdf8] transition-colors"
              >
                ashutosh@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(148, 163, 184, 0.1)" }}
        >
          <p className="text-[#94a3b8] text-xs flex items-center gap-1 flex-wrap justify-center sm:justify-start">
            © {currentYear} Ashutosh Tripathi. Built with{" "}
            <Heart className="w-3 h-3 text-[#2563eb] inline" /> using React &
            Node.js
          </p>
          <p className="text-[#94a3b8] text-xs">
            Built with{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#38bdf8] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
