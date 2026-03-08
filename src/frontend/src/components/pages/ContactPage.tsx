import { CheckCircle, Github, Linkedin, Mail, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

// ─── Contact info ───────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ashutosh@example.com",
    href: "mailto:ashutosh@example.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ashutosh-tripathi",
    href: "https://github.com/ashutosh-tripathi",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ashutosh-tripathi",
    href: "https://linkedin.com/in/ashutosh-tripathi",
  },
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
  { icon: SiX, href: "https://x.com/ashutosh-tripathi", label: "X (Twitter)" },
];

// ─── ContactPage ────────────────────────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Contact — Ashutosh Tripathi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(30,41,59,0.7)",
    border: "1px solid rgba(148,163,184,0.15)",
    color: "#f8fafc",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };

  return (
    <main style={{ background: "#0f172a" }}>
      {/* Page Hero */}
      <section
        className="pt-32 pb-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse at 70% 0%, rgba(37,99,235,0.1) 0%, transparent 50%), #0f172a",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="section-eyebrow">Get in touch</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-[#f8fafc] mb-4"
            style={{ animation: "fade-up 0.5s ease forwards" }}
          >
            Contact <span className="gradient-text">Me</span>
          </h1>
          <p
            className="text-[#94a3b8] max-w-xl text-base leading-relaxed"
            style={{ animation: "fade-up 0.5s ease 0.1s forwards", opacity: 0 }}
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's build something great together.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Contact Info */}
            <div
              className="lg:col-span-2"
              style={{
                animation: "fade-up 0.6s ease 0.2s forwards",
                opacity: 0,
              }}
            >
              <div className="dev-card p-7 h-full">
                <h2 className="text-xl font-bold text-[#f8fafc] mb-2">
                  Let's Connect
                </h2>
                <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
                  Whether you have a project opportunity, a question, or just
                  want to say hello — my inbox is always open. I'll get back to
                  you within 24 hours.
                </p>

                {/* Contact details */}
                <div className="space-y-5 mb-8">
                  {contactInfo.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={
                        c.href.startsWith("mailto") ? undefined : "_blank"
                      }
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
                        style={{
                          background: "rgba(37,99,235,0.15)",
                          border: "1px solid rgba(37,99,235,0.25)",
                        }}
                      >
                        <c.icon className="w-4 h-4 text-[#2563eb]" />
                      </div>
                      <div>
                        <p className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-0.5">
                          {c.label}
                        </p>
                        <p className="text-[#f8fafc] text-sm group-hover:text-[#38bdf8] transition-colors">
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Divider */}
                <div
                  className="mb-6"
                  style={{ height: "1px", background: "rgba(148,163,184,0.1)" }}
                />

                {/* Social icons */}
                <div>
                  <p className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-4">
                    Follow Me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-[#94a3b8] hover:text-[#38bdf8] transition-all"
                        style={{
                          background: "rgba(148,163,184,0.08)",
                          border: "1px solid rgba(148,163,184,0.12)",
                        }}
                      >
                        <s.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div
              className="lg:col-span-3"
              style={{
                animation: "fade-up 0.6s ease 0.3s forwards",
                opacity: 0,
              }}
            >
              <div className="dev-card p-7">
                <h2 className="text-xl font-bold text-[#f8fafc] mb-6">
                  Send a Message
                </h2>

                {submitted ? (
                  /* Success state */
                  <div
                    data-ocid="contact.success_state"
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-[#4ade80]" />
                    </div>
                    <h3 className="text-[#f8fafc] font-bold text-lg mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#94a3b8] text-sm mb-6">
                      Thanks for reaching out. I'll get back to you within 24
                      hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="dev-btn-outline text-sm"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <div className="space-y-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" style={labelStyle}>
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          data-ocid="contact.input"
                          placeholder="Ashutosh Tripathi"
                          value={form.name}
                          onChange={handleChange}
                          required
                          style={inputStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(37,99,235,0.5)";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(37,99,235,0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "rgba(148,163,184,0.15)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" style={labelStyle}>
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          data-ocid="contact.input"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          style={inputStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(37,99,235,0.5)";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(37,99,235,0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "rgba(148,163,184,0.15)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" style={labelStyle}>
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          data-ocid="contact.textarea"
                          placeholder="Tell me about your project or question..."
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          required
                          style={{ ...inputStyle, resize: "vertical" }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "rgba(37,99,235,0.5)";
                            e.target.style.boxShadow =
                              "0 0 0 3px rgba(37,99,235,0.12)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor =
                              "rgba(148,163,184,0.15)";
                            e.target.style.boxShadow = "none";
                          }}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={sending}
                        className="dev-btn-primary w-full justify-center py-3"
                        style={{
                          opacity: sending ? 0.75 : 1,
                          cursor: sending ? "not-allowed" : "pointer",
                        }}
                      >
                        {sending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
