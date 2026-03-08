import { useEffect, useRef, useState } from "react";

interface Project {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  industry: string;
  challenge: string;
  strategy: string;
  execution: string;
  impact: string;
  accentColor: string;
  borderColor: string;
  ocid: string;
  imageUrl: string;
  imageAlt: string;
}

const PROJECTS: Project[] = [
  {
    id: "drpro",
    number: "01",
    name: "DrPro",
    subtitle: "Healthcare Digital Platform",
    industry: "Healthcare Technology",
    challenge:
      "A growing clinic network needed a digital system to manage patient flow, appointments, and online presence — with zero tolerance for broken UX.",
    strategy:
      "Led a full UI/UX redesign focusing on workflow clarity, role-based navigation, and trust-building visual language aligned with healthcare standards.",
    execution:
      "WordPress development, custom UI system, performance-optimized build, structured SEO foundation with semantic HTML and metadata architecture.",
    impact:
      "Measurably reduced task completion time, improved appointment throughput, and established a scalable digital foundation for future feature expansion.",
    accentColor: "#DDA15E",
    borderColor: "rgba(221, 161, 94, 0.35)",
    ocid: "projects.item.1",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=75",
    imageAlt: "Healthcare platform dashboard interface",
  },
  {
    id: "red-royal",
    number: "02",
    name: "Red Royal Jewelry",
    subtitle: "Luxury eCommerce Experience",
    industry: "Jewelry & Luxury Retail",
    challenge:
      "A premium jewelry brand needed an eCommerce experience that matched the quality of their products — not a generic WooCommerce template.",
    strategy:
      "Conversion-Focused Design approach: elevated visual hierarchy, product story-driven layouts, and a checkout flow engineered to minimize drop-off.",
    execution:
      "WooCommerce Expert implementation — product variation systems, SEO-friendly product descriptions, image optimization, and custom conversion-focused layout structuring.",
    impact:
      "Significantly improved product page engagement, reduced cart abandonment, and positioned the brand correctly in the premium digital retail space.",
    accentColor: "#BC6C25",
    borderColor: "rgba(188, 108, 37, 0.35)",
    ocid: "projects.item.2",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=75",
    imageAlt: "Luxury jewelry product showcase",
  },
  {
    id: "getslot",
    number: "03",
    name: "GetSlot",
    subtitle: "Smart Booking System",
    industry: "Booking & Scheduling Technology",
    challenge:
      "Service businesses were losing bookings to a confusing, friction-heavy scheduling experience that required too many steps.",
    strategy:
      "Simplified the entire booking journey to a 3-step flow. Designed a clean interface that removed cognitive load and made slot selection instant and intuitive.",
    execution:
      "UI/UX system design, custom booking interface components, mobile-first responsive architecture, and user testing-informed iteration.",
    impact:
      "Streamlined appointment management reduced average booking time and increased completed bookings through better UX clarity.",
    accentColor: "#DDA15E",
    borderColor: "rgba(221, 161, 94, 0.35)",
    ocid: "projects.item.3",
    imageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=75",
    imageAlt: "Calendar and scheduling interface",
  },
  {
    id: "orpho",
    number: "04",
    name: "Orpho",
    subtitle: "Modern Brand Experience",
    industry: "Branding & Digital Identity",
    challenge:
      "The brand lacked a cohesive digital presence — the website didn't communicate the brand's real quality and positioning to its target audience.",
    strategy:
      "Built a brand-first digital experience: visual identity, typography system, content hierarchy, and UI that reflected premium brand authority.",
    execution:
      "Full brand design, WordPress-powered website, structured content flow, responsive layout, and conversion-optimized page architecture.",
    impact:
      "Clear brand positioning, improved first-impression quality, and a digital presence that aligned the perceived brand value with the actual product.",
    accentColor: "#DDA15E",
    borderColor: "rgba(221, 161, 94, 0.35)",
    ocid: "projects.item.4",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=75",
    imageAlt: "Modern brand and design interface",
  },
  {
    id: "optirental",
    number: "05",
    name: "OptiRental",
    subtitle: "Property Management Dashboard",
    industry: "Real Estate Technology",
    challenge:
      "A property management company was operating on spreadsheets and fragmented tools — no central system to manage units, tenants, and financials.",
    strategy:
      "Designed a dashboard-first interface prioritizing data clarity, quick-access workflows, and role-appropriate information hierarchy.",
    execution:
      "Dashboard UI design, interface architecture, data display systems, and a scalable component structure for future integrations.",
    impact:
      "Centralized multi-unit property management, eliminated workflow fragmentation, and created an operational foundation built for scale.",
    accentColor: "#BC6C25",
    borderColor: "rgba(188, 108, 37, 0.35)",
    ocid: "projects.item.5",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=75",
    imageAlt: "Property management dashboard",
  },
  {
    id: "octanode",
    number: "06",
    name: "Octanode",
    subtitle: "Web Development Company Platform",
    industry: "Software & Web Development",
    challenge:
      "A web development agency needed a website that sold their services as clearly and confidently as they actually delivered them.",
    strategy:
      "Applied Conversion-Focused Design to the service presentation: clear value propositions, trust signals, structured service tiers, and a strong brand voice.",
    execution:
      "Website design, content hierarchy, responsive layout system, SEO structure, and performance-optimized WordPress build.",
    impact:
      "Elevated the agency's perceived authority, improved inbound lead quality, and created a platform that communicates expertise before a single conversation.",
    accentColor: "#DDA15E",
    borderColor: "rgba(221, 161, 94, 0.35)",
    ocid: "projects.item.6",
    imageUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=75",
    imageAlt: "Web development and tech platform interface",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay = `${index * 0.07}s`;

  return (
    <div
      ref={cardRef}
      data-ocid={project.ocid}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgb(40, 54, 24)",
        border: "1px solid rgba(254,250,224,0.12)",
        borderRadius: "18px",
        overflow: "hidden",
        padding: 0,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(24px)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.5)"
          : "0 12px 30px rgba(0,0,0,0.35)",
        transition: `opacity 0.55s ease ${delay}, transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}, box-shadow 0.3s ease`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Image area ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
        {/* Bottom gradient overlay — separates image from text */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, rgba(40,54,24,0.95))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content area ── */}
      <div
        style={{
          padding: "1.75rem 1.75rem 2rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Number + Industry tag row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.85rem",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "rgba(254,250,224,0.45)",
              lineHeight: 1,
            }}
          >
            {project.number}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: "#DDA15E",
              background: "rgba(221,161,94,0.1)",
              padding: "3px 10px",
              borderRadius: "20px",
              border: "1px solid rgba(221,161,94,0.25)",
            }}
          >
            {project.industry}
          </span>
        </div>

        {/* Project name */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 2.5vw, 1.55rem)",
            color: "rgb(254,250,224)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: "0.35rem",
            margin: "0 0 0.35rem",
          }}
        >
          {project.name}
        </h3>

        {/* Project subtitle */}
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "rgba(254,250,224,0.75)",
            marginBottom: "1.5rem",
            letterSpacing: "0.02em",
            margin: "0 0 1.5rem",
          }}
        >
          {project.subtitle}
        </p>

        {/* Separator */}
        <div
          style={{
            height: "1px",
            background: "rgba(254,250,224,0.08)",
            marginBottom: "1.25rem",
            flexShrink: 0,
          }}
        />

        {/* Case study rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Challenge", value: project.challenge },
            { label: "Strategy", value: project.strategy },
            { label: "Execution", value: project.execution },
            { label: "Impact", value: project.impact },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase" as const,
                  color: "#DDA15E",
                  paddingTop: "3px",
                  minWidth: "72px",
                }}
              >
                {label}
              </span>
              <p
                style={{
                  fontSize: "0.84rem",
                  color: "rgba(254,250,224,0.85)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EveningSection() {
  return (
    <section
      className="portfolio-section px-6"
      style={{
        minHeight: "auto",
        paddingTop: "clamp(3.5rem, 7vh, 6rem)",
        paddingBottom: "clamp(3.5rem, 7vh, 6rem)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header — compact, with frost for legibility on sunset sky */}
        <div
          style={{
            marginBottom: "clamp(2rem, 4vh, 3rem)",
            display: "inline-block",
          }}
        >
          <span
            className="eyebrow eyebrow-pill inline-block"
            style={{
              color: "rgba(254, 250, 224, 0.75)",
              marginBottom: "1rem",
              background: "rgba(40,54,24,0.5)",
              borderColor: "rgba(254,250,224,0.12)",
            }}
          >
            Evening — Proof
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 4.5vw, 3.8rem)",
              letterSpacing: "0.5px",
              color: "rgb(254, 250, 224)",
              lineHeight: 1.04,
              marginBottom: "0.6rem",
              opacity: 1,
            }}
          >
            Six Projects. Measurable Impact.
          </h2>
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "rgba(254, 250, 224, 0.85)",
              fontWeight: 600,
              letterSpacing: "0.5px",
              opacity: 1,
            }}
          >
            Designed. Engineered. Optimized for growth.
          </p>
        </div>

        {/* 2-column grid on desktop, 1-column on mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(0.85rem, 2vw, 1.25rem)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
