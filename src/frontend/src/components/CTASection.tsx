import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";

type FormStatus = "idle" | "loading" | "success" | "error";

export function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { actor } = useActor();
  const contentRef = useRef<HTMLDivElement>(null);

  const submitMutation = useMutation({
    mutationFn: async (data: {
      email: string;
      name: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitMessage(data.email, data.name, data.content);
    },
    onSuccess: () => {
      setFormStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: () => {
      setFormStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or reach out directly.",
      );
    },
  });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setFormStatus("loading");
    setErrorMsg("");

    submitMutation.mutate({
      email: email.trim(),
      name: name.trim(),
      content: message.trim(),
    });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "14px 18px",
    color: "#F5F7FA",
    fontSize: "0.95rem",
    fontFamily: "Satoshi, Cabinet Grotesk, system-ui, sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "rgba(184,193,236,0.75)",
    fontFamily: "Cabinet Grotesk, Satoshi, system-ui, sans-serif",
  };

  const isLoading = formStatus === "loading" || submitMutation.isPending;
  const isDisabled =
    isLoading || !name.trim() || !email.trim() || !message.trim();

  return (
    <section
      className="portfolio-section px-6 relative"
      style={{
        minHeight: "auto",
        paddingTop: "clamp(5rem, 11vh, 9rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Single centered radial glow — subtle atmospheric depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(58, 134, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glass container wrapping entire form + heading */}
      <div
        ref={contentRef}
        className="reveal-card max-w-2xl mx-auto relative z-10"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)",
        }}
      >
        {/* Eyebrow */}
        <span
          className="eyebrow eyebrow-pill inline-block mb-8"
          style={{
            color: "rgba(184,193,236,0.85)",
            background: "rgba(58, 134, 255, 0.12)",
            borderColor: "rgba(58, 134, 255, 0.2)",
          }}
        >
          Let's Work Together
        </span>

        {/* Headline — clean, no gradient */}
        <h2
          className="font-display font-bold"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            letterSpacing: "-0.03em",
            color: "#F5F7FA",
            lineHeight: 1.04,
            marginBottom: "1rem",
          }}
        >
          Let's Build Something
          <br />
          That Performs.
        </h2>

        <p
          className="font-ui"
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            lineHeight: 1.7,
            color: "#B8C1EC",
            fontWeight: 400,
            marginBottom: "clamp(2.5rem, 5vh, 4rem)",
          }}
        >
          Have a project in mind? Let's create a solution that drives measurable
          growth.
        </p>

        {/* Contact Form */}
        {formStatus !== "success" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label htmlFor="cta-name" style={labelStyle}>
                Your Name
              </label>
              <input
                id="cta-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                required
                data-ocid="cta.input"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(58, 134, 255, 0.45)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.background = "rgba(255, 255, 255, 0.03)";
                }}
              />
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="cta-email" style={labelStyle}>
                Email Address
              </label>
              <input
                id="cta-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                required
                data-ocid="cta.email_input"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(58, 134, 255, 0.45)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.background = "rgba(255, 255, 255, 0.03)";
                }}
              />
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="cta-message" style={labelStyle}>
                Your Project
              </label>
              <textarea
                id="cta-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your business, your goals, and what you're trying to build or improve..."
                required
                rows={5}
                data-ocid="cta.textarea"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "140px",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(58, 134, 255, 0.45)";
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.background = "rgba(255, 255, 255, 0.03)";
                }}
              />
            </div>

            {/* Error state */}
            {(formStatus === "error" || submitMutation.isError) && (
              <div
                data-ocid="cta.error_state"
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <AlertCircle
                  size={18}
                  style={{ color: "#f87171", marginTop: 1, flexShrink: 0 }}
                />
                <p className="font-ui text-sm" style={{ color: "#fca5a5" }}>
                  {errorMsg}
                </p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isDisabled}
              data-ocid="cta.submit_button"
              className="glow-btn btn-lift w-full flex items-center justify-center gap-3 rounded-xl font-ui font-semibold"
              style={{
                padding: "16px 32px",
                fontSize: "1rem",
                letterSpacing: "0.02em",
                color: "#fff",
                background: "#3A86FF",
                border: "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={18}
                    data-ocid="cta.loading_state"
                    className="animate-spin"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success state */
          <div
            data-ocid="cta.success_state"
            className="text-center py-16 flex flex-col items-center gap-6"
            style={{
              background: "rgba(58, 134, 255, 0.05)",
              border: "1px solid rgba(58, 134, 255, 0.15)",
              borderRadius: "16px",
              padding: "3rem 2rem",
            }}
          >
            <CheckCircle size={48} style={{ color: "#3A86FF" }} />
            <div>
              <h3
                className="font-display font-bold mb-3"
                style={{ fontSize: "1.5rem", color: "#F5F7FA" }}
              >
                Message Received
              </h3>
              <p
                className="font-ui text-base leading-relaxed"
                style={{ color: "#B8C1EC" }}
              >
                Thank you for reaching out. I review every inquiry personally
                and will respond within 24 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormStatus("idle")}
              className="font-ui text-sm link-underline"
              style={{
                color: "rgba(58, 134, 255, 0.85)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
