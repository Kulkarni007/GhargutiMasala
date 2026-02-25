"use client";
import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: <HandmadeIcon />,
    marathi: "घरगुती बनावट",
    title: "Homemade with Care",
    desc: "Every batch is handcrafted in our home kitchen using traditional stone-grinding methods — never mass-produced. You taste the difference in every dish.",
    accent: "#D4881C",
    bg: "#F5EDD8",
  },
  {
    icon: <PureIcon />,
    marathi: "शुद्ध, कोणतेही प्रिझर्वेटिव्ह नाही",
    title: "Zero Preservatives",
    desc: "We use only sun-dried whole spices, slow-roasted to perfection. No artificial colours, no additives — just pure, honest flavour.",
    accent: "#6B1A1A",
    bg: "#F9F0E4",
  },
  {
    icon: <RecipeIcon />,
    marathi: "पारंपारिक महाराष्ट्रीयन रेसिपी",
    title: "Traditional Recipes",
    desc: "Our blends follow authentic Kolhapuri and Maharashtrian family recipes — refined over generations and never compromised for convenience.",
    accent: "#2C4A2E",
    bg: "#F0EDE4",
  },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative py-28 overflow-hidden texture-stone"
      style={{ backgroundColor: "#FBF6ED" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(212,136,28,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ backgroundColor: "#D4881C" }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#D4881C" }}
            >
              आमची विशेषता
            </span>
            <div className="h-px w-12" style={{ backgroundColor: "#D4881C" }} />
          </div>
          <h2
            className="font-devanagari font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1E0E0E",
            }}
          >
            आम्हाला का निवडावे?
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#7A6555", fontSize: "1rem", lineHeight: 1.8 }}
          >
            In a world of factory spices, we still do things the old way — 
            because we believe flavour cannot be manufactured.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`card-3d rounded-sm overflow-hidden transition-all duration-700`}
              style={{
                transitionDelay: `${i * 120}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                backgroundColor: r.bg,
                border: "1px solid rgba(180,150,100,0.15)",
              }}
            >
              {/* Accent top strip */}
              <div className="h-1" style={{ backgroundColor: r.accent }} />

              <div className="p-8">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center mb-6 shadow-warm-sm"
                  style={{ backgroundColor: r.accent + "18" }}
                >
                  <div style={{ color: r.accent, width: 32, height: 32 }}>
                    {r.icon}
                  </div>
                </div>

                {/* Marathi label */}
                <p
                  className="font-devanagari text-sm mb-2"
                  style={{ color: r.accent, fontWeight: 600 }}
                >
                  {r.marathi}
                </p>

                {/* English title */}
                <h3
                  className="font-semibold text-xl mb-4"
                  style={{ color: "#1E0E0E" }}
                >
                  {r.title}
                </h3>

                {/* Description */}
                <p
                  style={{ color: "#5A4030", lineHeight: 1.8, fontSize: "0.92rem" }}
                >
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative quote */}
        <div className="mt-20 text-center">
          <div className="divider-spice mb-8" />
          <blockquote
            className="font-devanagari text-xl font-medium max-w-2xl mx-auto"
            style={{ color: "#6B1A1A", lineHeight: 1.9 }}
          >
            "चव ती जी आईने शिकवली, मसाले ते जे घरी बनतात."
          </blockquote>
          <p className="mt-2 text-sm" style={{ color: "#A08060" }}>
            — The taste your mother taught, spices made at home.
          </p>
        </div>
      </div>
    </section>
  );
}

function HandmadeIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <path d="M8 22C8 22 6 19 6 14C6 11 8.5 8 12 8C14 8 15.5 9 16 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 10C16.5 8.5 18 7 20 7C22.5 7 24.5 9 24.5 11.5C24.5 12.5 24.2 13.5 23.5 14.5L18 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M8 22L10 26H22L24 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12C12 12 13 15 16 17C19 15 20 12 20 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function PureIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M11 16L14.5 19.5L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6V4M16 28V26M6 16H4M28 16H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function RecipeIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M10 10H22M10 15H22M10 20H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 22L22.5 23.5L24 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
