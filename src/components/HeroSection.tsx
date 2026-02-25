"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Deep maroon background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundColor: "#2A0A0A",
          backgroundImage: `
            radial-gradient(ellipse at 70% 40%, rgba(107,26,26,0.9) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(212,136,28,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 90%, rgba(44,74,46,0.15) 0%, transparent 45%)
          `,
        }}
      />

      {/* Grain/texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative spice dust scatters */}
      <div className="absolute top-20 right-16 w-96 h-96 opacity-20 pointer-events-none">
        <SpiceDust color="#D4881C" />
      </div>
      <div className="absolute bottom-10 left-10 w-64 h-64 opacity-15 pointer-events-none">
        <SpiceDust color="#8B2E2E" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div
                className="h-px w-8"
                style={{ backgroundColor: "#D4881C" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#D4881C" }}
              >
                कोल्हापूर, महाराष्ट्र
              </span>
            </div>

            {/* Marathi headline */}
            <h1
              className="font-devanagari font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "#FBF6ED",
                lineHeight: 1.25,
                textShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              घरचा स्वाद,
              <br />
              <span style={{ color: "#E8A83A" }}>शुद्ध मसाले.</span>
            </h1>

            {/* English subhead */}
            <h2
              className="font-devanagari mb-6"
              style={{
                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                color: "rgba(251,246,237,0.75)",
                fontWeight: 400,
              }}
            >
              आजीच्या रेसिपीतून, आपल्या घरापर्यंत
            </h2>
            <p
              className="mb-10 max-w-lg leading-relaxed"
              style={{
                color: "rgba(245,237,216,0.7)",
                fontSize: "1rem",
              }}
            >
              Authentic homemade Maharashtrian spice blends — crafted in small
              batches, without preservatives, with the same recipes passed down
              for generations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03]"
                style={{
                  backgroundColor: "#D4881C",
                  color: "#1E0E0E",
                  boxShadow: "0 4px 20px rgba(212,136,28,0.4)",
                }}
              >
                आमचे मसाले पहा
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </a>
              <a
                href="#order"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-300"
                style={{
                  border: "1px solid rgba(245,237,216,0.35)",
                  color: "#F5EDD8",
                  backgroundColor: "rgba(245,237,216,0.05)",
                }}
              >
                Order on WhatsApp
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="mt-14 flex flex-wrap gap-8"
              style={{ color: "rgba(245,237,216,0.55)", fontSize: "0.8rem" }}
            >
              {[
                { num: "१५+", label: "Years of Tradition" },
                { num: "०%", label: "Preservatives" },
                { num: "१००%", label: "Homemade" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span
                    className="font-devanagari text-2xl font-bold"
                    style={{ color: "#E8A83A" }}
                  >
                    {item.num}
                  </span>
                  <span className="text-xs tracking-wider uppercase mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero visual */}
          <div className="relative flex justify-center items-center animate-fade-up animate-fade-up-delay-2">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #FBF6ED)",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-widest uppercase" style={{ color: "#D4881C" }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, #D4881C, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function SpiceDust({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (Math.sin(i * 2.4) * 0.5 + 0.5) * 280 + 10;
        const y = (Math.cos(i * 1.7) * 0.5 + 0.5) * 280 + 10;
        const r = 1 + (i % 4) * 0.8;
        const op = 0.3 + (i % 5) * 0.14;
        return (
          <circle key={i} cx={x} cy={y} r={r} fill={color} opacity={op} />
        );
      })}
    </svg>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-md" style={{ perspective: "800px" }}>
      {/* Large bowl shadow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 h-8 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Main spice bowl */}
      <div
        className="relative mx-auto spice-glow"
        style={{
          width: 320,
          height: 320,
          transform: "rotateX(8deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Wooden bowl base */}
        <div
          className="absolute inset-0 rounded-full texture-wood"
          style={{
            background: `
              radial-gradient(ellipse at 35% 30%, #C4844A 0%, #8B5A2B 35%, #5C3317 65%, #3D200A 100%)
            `,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,200,100,0.1)",
          }}
        />

        {/* Bowl rim highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "none",
            boxShadow: "inset 0 -6px 20px rgba(0,0,0,0.3), inset 0 4px 12px rgba(200,140,60,0.15)",
          }}
        />

        {/* Spice powder fill */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "14%",
            background: `
              radial-gradient(ellipse at 40% 35%, #E8621A 0%, #C94A0A 25%, #A83508 55%, #7A2505 80%, #5C1A03 100%)
            `,
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.4), inset 0 -2px 8px rgba(255,120,30,0.2)",
          }}
        />

        {/* Spice surface texture dots */}
        {[
          { cx: "38%", cy: "40%", r: "3%", op: 0.6, c: "#F5A050" },
          { cx: "55%", cy: "35%", r: "2%", op: 0.4, c: "#FF8530" },
          { cx: "45%", cy: "55%", r: "4%", op: 0.5, c: "#E86020" },
          { cx: "62%", cy: "48%", r: "2.5%", op: 0.35, c: "#F5A050" },
          { cx: "30%", cy: "52%", r: "2%", op: 0.45, c: "#FF9040" },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: d.cx,
              top: d.cy,
              width: d.r,
              height: d.r,
              backgroundColor: d.c,
              opacity: d.op,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Spice highlight sheen */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "14%",
            background:
              "radial-gradient(ellipse at 30% 25%, rgba(255,200,100,0.18) 0%, transparent 55%)",
          }}
        />

        {/* Small scattered spices around */}
        {[
          { x: -30, y: 60, size: 24, bg: "#C4884A", spice: "#E8A83A" },
          { x: 290, y: 80, size: 20, bg: "#3D200A", spice: "#8B2E2E" },
          { x: 10, y: 240, size: 18, bg: "#8B5A2B", spice: "#2C4A2E" },
          { x: 270, y: 220, size: 22, bg: "#5C3317", spice: "#D4881C" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
              background: `radial-gradient(circle at 35% 30%, ${b.spice}80, ${b.bg})`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      {/* Floating label */}
      <div
        className="absolute -top-4 right-0 px-5 py-3 rounded-sm"
        style={{
          backgroundColor: "#D4881C",
          boxShadow: "0 8px 24px rgba(212,136,28,0.4)",
        }}
      >
        <p
          className="font-devanagari text-sm font-semibold"
          style={{ color: "#1E0E0E" }}
        >
          गोडा मसाला
        </p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(30,14,14,0.7)" }}>
          Traditional Blend
        </p>
      </div>

      {/* Bottom label */}
      <div
        className="absolute -bottom-2 left-4 px-4 py-2 rounded-sm"
        style={{
          backgroundColor: "rgba(44,74,46,0.95)",
          boxShadow: "0 4px 16px rgba(44,74,46,0.4)",
        }}
      >
        <p className="text-xs font-semibold tracking-wider" style={{ color: "#F5EDD8" }}>
          NO PRESERVATIVES
        </p>
      </div>
    </div>
  );
}
