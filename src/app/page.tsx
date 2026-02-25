"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Product Data
───────────────────────────────────────────────*/
interface Product {
  name: string;
  nameMarathi: string;
  desc: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  ingredients: string[];
  usedIn: string[];
  flavourProfile: string;
  heatLevel: string;
  bestFor: string;
  storage: string;
  shelfLife: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Goda Masala",
    nameMarathi: "गोडा मसाला",
    desc: "The soul of Maharashtrian cooking. Aromatic, balanced, and complex — crafted from over 20 whole spices.",
    tag: "Bestseller",
    imageSrc: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Goda Masala spice blend in a wooden bowl",
    ingredients: [
      "Coriander (Dhane)", "Cumin (Jeera)", "Black Cardamom (Badi Elaichi)",
      "Cloves (Lavang)", "Cinnamon (Dalchini)", "Bay Leaf (Tejpatta)",
      "Star Anise (Chakri Phool)", "Sesame Seeds (Til)", "Dry Coconut (Khopra)",
      "Dagad Phool", "Nagkesar", "Triphal", "Red Chilli", "Turmeric (Haldi)"
    ],
    usedIn: ["Varan-Bhat", "Amti Dal", "Bharli Vangi", "Batata Rassa", "Chicken Masala", "Mutton Curry"],
    flavourProfile: "Warm, aromatic, mildly sweet with subtle depth",
    heatLevel: "Medium",
    bestFor: "Everyday Maharashtrian cooking — dal, sabzi, curries",
    storage: "Store in a cool, dry place. Keep lid tightly closed.",
    shelfLife: "12–18 months",
  },
  {
    name: "Lasun Masala",
    nameMarathi: "लसूण मसाला",
    desc: "Fiery garlic-forward blend from Kolhapuri tradition. Adds bold depth to curries, bhajis, and stir-fries.",
    tag: "Kolhapuri",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/39017045-5906-49ee-a9f9-0b8e0a842c92/image-1771941339465.png?width=600&height=400&resize=cover",
    imageAlt: "लसूण मसाला — Kolhapuri Lasun Masala",
    ingredients: [
      "Garlic (Lasun) — stone-ground", "Red Chilli (Lal Mirchi)", "Coriander (Dhane)",
      "Cumin (Jeera)", "Onion (Kanda) — dry roasted", "Dry Coconut (Khopra)",
      "Black Pepper (Kali Miri)", "Cloves (Lavang)", "Turmeric (Haldi)", "Salt (optional)"
    ],
    usedIn: ["Kolhapuri Chicken", "Mutton Curry", "Egg Masala", "Pithla", "Bhakri-Thecha", "Zunka"],
    flavourProfile: "Bold, pungent, garlicky with Kolhapuri heat",
    heatLevel: "High",
    bestFor: "Non-veg curries, bold Kolhapuri gravies",
    storage: "Store in an airtight container, away from moisture.",
    shelfLife: "10–14 months",
  },
  {
    name: "Sadha Masala",
    nameMarathi: "साधा मसाला",
    desc: "The everyday spice blend for dal, sabzi, and simple home cooking. Clean flavour, no heat overload.",
    tag: "Daily Use",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/39017045-5906-49ee-a9f9-0b8e0a842c92/image-1771941779951.png?width=600&height=400&resize=cover",
    imageAlt: "साधा मसाला — traditional spice tray with whole spices",
    ingredients: [
      "Coriander (Dhane)", "Cumin (Jeera)", "Turmeric (Haldi)", "Red Chilli (Lal Mirchi)",
      "Black Pepper (Kali Miri)", "Cinnamon (Dalchini)", "Cloves (Lavang)",
      "Mustard Seeds (Mohri)", "Dry Mango Powder (Amchur)", "Asafoetida (Hing)"
    ],
    usedIn: ["Dal Tadka", "Potato Bhaji", "Mixed Vegetable Sabzi", "Misal", "Poha", "Upma"],
    flavourProfile: "Mild, balanced, clean — suits everyday cooking",
    heatLevel: "Low to Medium",
    bestFor: "Daily vegetarian meals, light curries, dals",
    storage: "Store in a cool, dry place. Avoid direct sunlight.",
    shelfLife: "12–18 months",
  },
  {
    name: "Mirchi Powder",
    nameMarathi: "मिरची पावडर",
    desc: "Sun-dried Kolhapuri red chillies ground to a vibrant powder. Deep colour, controlled heat, real aroma.",
    tag: "Pure",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/39017045-5906-49ee-a9f9-0b8e0a842c92/image-1771941641582.png?width=600&height=400&resize=cover",
    imageAlt: "मिरची पावडर — Kolhapuri red chilli powder",
    ingredients: [
      "100% Kolhapuri Red Chilli (Lal Mirchi) — sun-dried",
      "No additives. No colour. No blending agents.",
    ],
    usedIn: ["All Maharashtrian Curries", "Chutneys", "Marinades", "Dry Masala Rubs", "Pickles"],
    flavourProfile: "Deep red colour, earthy heat, fruity aroma",
    heatLevel: "High — pure Kolhapuri",
    bestFor: "Whenever bold colour and authentic chilli heat is needed",
    storage: "Keep in a sealed container, away from humidity.",
    shelfLife: "18–24 months",
  },
];

/* ─────────────────────────────────────────────
   Product Modal
───────────────────────────────────────────────*/
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const heatColor = product.heatLevel.startsWith("High")
    ? "#B91C1C"
    : product.heatLevel.startsWith("Medium")
    ? "#D4881C"
    : "#2C4A2E";

  const heatDots = product.heatLevel.startsWith("High") ? 3
    : product.heatLevel.startsWith("Medium") ? 2 : 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(30,14,14,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl flex flex-col"
        style={{
          background: "#FBF6ED",
          boxShadow: "0 32px 80px rgba(30,14,14,0.5)",
        }}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:opacity-70"
          style={{ background: "rgba(30,14,14,0.12)" }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="#4A0E0E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* image */}
        <div className="relative w-full overflow-hidden rounded-t-3xl sm:rounded-t-3xl flex-shrink-0" style={{ height: 220 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(30,14,14,0.05) 0%, rgba(30,14,14,0.45) 100%)" }}
          />
          {/* tag */}
          <span
            className="absolute bottom-4 left-5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
            style={{ background: "#6B1A1A", color: "#F5EDD8" }}
          >
            {product.tag}
          </span>
        </div>

        {/* body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* title */}
          <div>
            <h2 className="font-devanagari text-3xl mb-1" style={{ color: "#4A0E0E" }}>
              {product.nameMarathi}
            </h2>
            <p className="text-sm font-semibold tracking-wide" style={{ color: "#7A4F35" }}>
              {product.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#5C3D2A" }}>
              {product.desc}
            </p>
          </div>

          {/* heat level */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#7A6555" }}>
              Heat Level
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((d) => (
                <span
                  key={d}
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: d <= heatDots ? heatColor : "rgba(107,26,26,0.12)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-medium" style={{ color: heatColor }}>
              {product.heatLevel}
            </span>
          </div>

          {/* divider */}
          <div className="h-px" style={{ background: "rgba(107,26,26,0.1)" }} />

          {/* ingredients */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#6B1A1A" }}>
              Ingredients (साहित्य)
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(107,26,26,0.07)",
                    color: "#4A0E0E",
                    border: "1px solid rgba(107,26,26,0.12)",
                  }}
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="h-px" style={{ background: "rgba(107,26,26,0.1)" }} />

          {/* used in */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#6B1A1A" }}>
              Best Used In (वापर)
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.usedIn.map((dish) => (
                <span
                  key={dish}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(212,136,28,0.1)",
                    color: "#7A4F35",
                    border: "1px solid rgba(212,136,28,0.18)",
                  }}
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="h-px" style={{ background: "rgba(107,26,26,0.1)" }} />

          {/* info rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Flavour Profile", value: product.flavourProfile },
              { label: "Best For", value: product.bestFor },
              { label: "Storage", value: product.storage },
              { label: "Shelf Life", value: product.shelfLife },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{ background: "rgba(107,26,26,0.04)", border: "1px solid rgba(107,26,26,0.08)" }}
              >
                <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: "#6B1A1A" }}>
                  {label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#4A0E0E" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/919850270518?text=Hello%2C%20I%20would%20like%20to%20order%20*${encodeURIComponent(product.nameMarathi + " (" + product.name + ")")}*%20from%20%E0%A4%98%E0%A4%B0%E0%A4%97%E0%A5%81%E0%A4%A4%E0%A5%80%20%E0%A4%AE%E0%A4%B8%E0%A4%BE%E0%A4%B2%E0%A5%87`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path d="M11 1C5.477 1 1 5.477 1 11c0 1.7.43 3.3 1.19 4.7L1 21l5.47-1.17A9.96 9.96 0 0011 21c5.523 0 10-4.477 10-10S16.523 1 11 1z" fill="#25D366" stroke="#fff" strokeWidth="1.5" />
              <path d="M8 8.5c.2-.5.9-1 1.4-.5l1 1.5c.2.3.1.7-.1.9l-.5.5c.3.7.8 1.3 1.5 1.8l.6-.4c.3-.2.7-.1.9.2l1.2 1.3c.4.5 0 1.2-.5 1.4-1.8.7-5-2.1-5.5-4.3-.1-.5.1-1.1.5-1.4z" fill="#fff" />
            </svg>
            Order {product.nameMarathi} on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SVG Spice Illustrations
───────────────────────────────────────────────*/
function SpiceOrb({ color1, color2, size = 120 }: { color1: string; color2: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`g-${color1}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.9" />
          <stop offset="60%" stopColor={color2} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color2} stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id={`highlight-${color1}`} cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`shadow-${color1}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor={color2} floodOpacity="0.4" />
        </filter>
      </defs>
      <circle cx="60" cy="60" r="52" fill={`url(#g-${color1})`} filter={`url(#shadow-${color1})`} />
      <circle cx="60" cy="60" r="52" fill={`url(#highlight-${color1})`} />
      {[[42,55],[55,45],[70,58],[48,70],[65,72],[58,62],[44,63],[72,45],[38,45],[78,65]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill="#fff" opacity={0.12} />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Product Card
───────────────────────────────────────────────*/
function WoodenBowlCard({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="card-3d group relative flex flex-col rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-all duration-500 cursor-pointer"
      style={{ background: "linear-gradient(160deg, #F5EDD8 0%, #EBD9B4 100%)" }}
    >
      {/* tag */}
      <span
        className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
        style={{ background: "#6B1A1A", color: "#F5EDD8" }}
      >
        {product.tag}
      </span>

      {/* product image */}
      <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(30,14,14,0.05) 0%, rgba(30,14,14,0.35) 100%)" }}
        />
      </div>

      {/* content */}
      <div className="flex flex-col items-center p-6 flex-1">
        <h3 className="font-devanagari text-xl mb-1 text-center" style={{ color: "#4A0E0E" }}>
          {product.nameMarathi}
        </h3>
        <p className="text-sm font-medium tracking-wide mb-3" style={{ color: "#7A4F35" }}>
          {product.name}
        </p>
        <p className="text-center text-sm leading-relaxed" style={{ color: "#5C3D2A" }}>
          {product.desc}
        </p>

        {/* view details hint */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#6B1A1A" }}>
          <span>View Details</span>
          <span>→</span>
        </div>

        <div className="mt-3 h-0.5 w-12 rounded-full" style={{ background: "linear-gradient(90deg, #6B1A1A, #D4881C)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Parallax hook
───────────────────────────────────────────────*/
function useParallax(ref: React.RefObject<HTMLDivElement | null>, factor = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const child = el.querySelector<HTMLElement>(".parallax-bg");
      if (child) child.style.transform = `translateY(${center * factor}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, factor]);
}

/* ─────────────────────────────────────────────
   Fade-in-on-scroll
───────────────────────────────────────────────*/
function useFadeOnScroll(className = ".fade-on-scroll") {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(className);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────*/
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  useParallax(heroRef, 0.12);
  useFadeOnScroll();

  return (
    <div style={{ background: "#FBF6ED", color: "#1E0E0E" }}>

      {/* ── MODAL ───────────────────────────── */}
      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}

      {/* ── NAV ─────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 animate-fade-in"
        style={{
          background: "rgba(251,246,237,0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(107,26,26,0.1)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          <img 
            src="/logo.svg" 
            alt="Gharguti Masala Logo" 
            className="w-10 h-10 rounded-lg"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
          />
          <div className="flex flex-col leading-tight ml-3">
            <span className="font-devanagari text-xl font-bold" style={{ color: "#4A0E0E" }}>
              घरगुती मसाले
            </span>
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "#7A4F35" }}>
              Kolhapur's Authentic Spices
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "#3D2B1E" }}>
          {["Products", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative py-2 px-3 rounded-lg hover:bg-white/50 transition-all duration-300 hover:scale-105 focus-ring"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary focus-ring"
            style={{ background: "#6B1A1A", color: "#F5EDD8" }}
          >
            Order Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* <a
          href="#contact"
          className="md:hidden btn-primary focus-ring text-xs px-4 py-2"
          style={{ background: "#6B1A1A", color: "#F5EDD8" }}
        >
          Order
        </a> */}
      </nav>

      {/* ── HERO ────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "#1E0E0E" }}
      >
        <div
          className="parallax-bg absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(212,136,28,0.12) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(107,26,26,0.25) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
        <div className="absolute right-8 top-32 opacity-20 md:opacity-40 pointer-events-none">
          <SpiceOrb color1="#D4881C" color2="#A06020" size={180} />
        </div>
        <div className="absolute right-48 bottom-24 opacity-10 md:opacity-25 pointer-events-none">
          <SpiceOrb color1="#6B1A1A" color2="#4A0E0E" size={120} />
        </div>
        <div className="absolute left-4 bottom-16 opacity-10 md:opacity-20 pointer-events-none">
          <SpiceOrb color1="#C8A068" color2="#9B6E3A" size={90} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 py-24">
          <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
            <div className="h-px w-12" style={{ background: "#D4881C" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "#D4881C" }}>
              Kolhapur · Since Generations
            </span>
          </div>

          <h1
            className="font-devanagari leading-tight mb-8 animate-fade-in-up text-shadow"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#F5EDD8", textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            घरच्या चवीचे
            <br />
            <span style={{ color: "#D4881C" }}>शुद्ध मसाले</span>
          </h1>

          <p className="font-devanagari text-lg md:text-2xl mb-4 max-w-xl" style={{ color: "#C8A87E", lineHeight: 1.7 }}>
            कोणतेही रंग नाही · कोणतेही preservatives नाही
          </p>
          <p className="text-base md:text-lg mb-10 max-w-lg leading-relaxed" style={{ color: "#9B8070" }}>
            Hand-crafted Maharashtrian masalas made from family recipes passed down over generations. Pure, fresh, and full of the taste that makes Kolhapuri cooking legendary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up">
            <a
              href="#products"
              className="btn-primary focus-ring"
              style={{ background: "#D4881C", color: "#1E0E0E" }}
            >
              Explore Masalas
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-primary focus-ring"
              style={{ 
                background: "transparent", 
                color: "#F5EDD8",
                border: "2px solid rgba(245,237,216,0.3)",
                boxShadow: "none"
              }}
            >
              Order on WhatsApp
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13 1H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9l3 3V3c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap gap-6 mt-14">
            {[{ n: "100%", label: "Natural Ingredients" }, { n: "0", label: "Artificial Additives" }, { n: "4+", label: "Signature Masalas" }].map(({ n, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-bold" style={{ color: "#D4881C" }}>{n}</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "#7A6555" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #FBF6ED)" }}
        />
      </section>

      {/* ── WHY CHOOSE US ────────────────────── */}
      <section className="relative py-24 px-6 md:px-16 texture-spice" style={{ background: "#FBF6ED" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-4 fade-on-scroll opacity-0">
            <div className="h-px w-8" style={{ background: "#6B1A1A" }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "#6B1A1A" }}>
              Our Promise
            </span>
          </div>
          <h2 className="font-devanagari mb-4 fade-on-scroll opacity-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#4A0E0E" }}>
            आम्ही वेगळे का आहोत?
          </h2>
          <p className="text-base mb-16 max-w-xl leading-relaxed fade-on-scroll opacity-0" style={{ color: "#5C3D2A" }}>
            Not manufactured. Not packaged in a factory. Made at home — with the same care your grandmother put into every meal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#6B1A1A" fillOpacity="0.1" />
                    <path d="M14 20c0-4 2.5-7 6-7s6 3 6 7-2.5 8-6 8-6-4-6-8z" fill="#6B1A1A" opacity="0.8" />
                    <path d="M20 13v-4M20 31v2" stroke="#D4881C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 16l-3-2M28 24l3 2" stroke="#D4881C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Homemade with Heart", titleMr: "घरी बनवलेले",
                body: "Every batch is prepared in a home kitchen using stone-ground spices, slow-roasted whole spices, and the patience that only a family recipe can demand.",
              },
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#2C4A2E" fillOpacity="0.1" />
                    <path d="M20 10l2.5 7.5H30l-6.5 4.5 2.5 7.5L20 25l-6 4.5 2.5-7.5L10 17.5h7.5z" fill="#2C4A2E" opacity="0.75" />
                  </svg>
                ),
                title: "Zero Preservatives", titleMr: "कोणतेही chemicals नाही",
                body: "No artificial colours, no MSG, no preservatives. Just the spice — nothing else. What you taste is exactly what goes in.",
              },
              {
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#D4881C" fillOpacity="0.12" />
                    <path d="M12 28c0-6 3-10 8-10s8 4 8 10" stroke="#D4881C" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <circle cx="20" cy="16" r="3.5" fill="#D4881C" opacity="0.8" />
                    <path d="M16 28c1-3 2-5 4-5s3 2 4 5" stroke="#D4881C" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </svg>
                ),
                title: "Traditional Recipes", titleMr: "पारंपारिक पाककृती",
                body: "Authentic Maharashtrian recipes — Goda Masala, Lasun Masala, Sadhya Masala — the same proportions, the same method, the same taste every single time.",
              },
            ].map(({ icon, title, titleMr, body }, i) => (
              <div
                key={title}
                className={`fade-on-scroll opacity-0 animate-fade-up-delay-${i + 1} group relative rounded-2xl p-8 transition-all duration-400 hover:shadow-warm-md`}
                style={{
                  background: i === 1 ? "linear-gradient(135deg, #F5EDD8 0%, #EBD9B4 100%)" : "white",
                  border: "1px solid rgba(107,26,26,0.08)",
                }}
              >
                <div className="mb-5">{icon}</div>
                <h3 className="font-devanagari text-lg mb-1" style={{ color: "#4A0E0E" }}>{titleMr}</h3>
                <p className="text-sm font-semibold tracking-wide mb-3" style={{ color: "#7A4F35" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5C3D2A" }}>{body}</p>
                <div className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, #6B1A1A, #D4881C)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-spice mx-16" />

      {/* ── PRODUCTS ────────────────────────── */}
      <section id="products" className="py-24 px-6 md:px-16 texture-wood" style={{ background: "#F5EDD8" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4 fade-on-scroll opacity-0">
            <div className="h-px w-8" style={{ background: "#6B1A1A" }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "#6B1A1A" }}>Our Masalas</span>
          </div>
          <h2 className="font-devanagari mb-4 fade-on-scroll opacity-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#4A0E0E" }}>
            आमचे मसाले
          </h2>
          <p className="text-base mb-4 max-w-xl leading-relaxed fade-on-scroll opacity-0" style={{ color: "#5C3D2A" }}>
            Each masala is stone-ground in small batches, sun-dried, and sealed within 24 hours to lock in freshness.
          </p>
          <p className="text-xs mb-12 fade-on-scroll opacity-0 flex items-center gap-2" style={{ color: "#7A6555" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#7A6555" strokeWidth="1.2"/><path d="M7 4.5v3l2 1.5" stroke="#7A6555" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Tap any card to view ingredients, uses & details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <WoodenBowlCard
                key={product.name}
                product={product}
                onClick={() => setActiveProduct(product)}
              />
            ))}
          </div>

          <div className="mt-14 flex justify-center fade-on-scroll opacity-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-warm-md"
              style={{ background: "#6B1A1A", color: "#F5EDD8" }}
            >
              Order Any Masala on WhatsApp <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────── */}
      <section id="about" className="relative py-24 px-6 md:px-16 overflow-hidden" style={{ background: "#2C1A0E" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(212,136,28,0.07) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(107,26,26,0.15) 0%, transparent 50%)" }} />
        <div className="absolute -right-16 top-12 opacity-15 pointer-events-none">
          <SpiceOrb color1="#D4881C" color2="#A06020" size={200} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4 fade-on-scroll opacity-0">
              <div className="h-px w-8" style={{ background: "#D4881C" }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "#D4881C" }}>Our Story</span>
            </div>
            <h2 className="font-devanagari mb-6 fade-on-scroll opacity-0" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#F5EDD8" }}>
              कोल्हापुरातील<br /><span style={{ color: "#D4881C" }}>आमचं घरकुल</span>
            </h2>
            <div className="space-y-5 fade-on-scroll opacity-0">
              <p className="text-base leading-relaxed" style={{ color: "#C8A87E" }}>
                घरगुती मसाले is a small, family-run business from Kolhapur, Maharashtra. What started as a grandmother&apos;s kitchen ritual has become a trusted name among families who refuse to compromise on taste.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#9B8070" }}>
                Every batch is made by hand — whole spices are sourced locally, cleaned, slow-roasted on a wood fire, and stone-ground using traditional methods. We prepare in limited quantities to ensure every packet you receive is fresh, aromatic, and true to the original recipe.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#9B8070" }}>
                No middlemen. No factory. No shortcuts. Just the honest taste of a Kolhapuri home — delivered to yours.
              </p>
            </div>
          </div>

          <div className="fade-on-scroll opacity-0 flex flex-col gap-5">
            {[
              { label: "Spices sourced from", value: "Local Kolhapur farms" },
              { label: "Preparation method", value: "Stone-ground, hand-roasted" },
              { label: "Batch size", value: "Small — made to order" },
              { label: "Shelf life", value: "1 to 2 Years (no preservatives)" },
              { label: "Packaging", value: "Sealed within 24 hrs of grinding" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-6 py-3 border-b" style={{ borderColor: "rgba(245,237,216,0.08)" }}>
                <span className="text-sm" style={{ color: "#7A6555" }}>{label}</span>
                <span className="text-sm font-semibold text-right" style={{ color: "#C8A87E" }}>{value}</span>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 mt-4">
              {["No Preservatives", "No Artificial Colour", "Handmade", "Kolhapur Made"].map((b) => (
                <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(212,136,28,0.12)", color: "#D4881C", border: "1px solid rgba(212,136,28,0.2)" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / ORDER ─────────────────── */}
      <section id="contact" className="relative py-24 px-6 md:px-16 texture-stone" style={{ background: "#FBF6ED" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4 fade-on-scroll opacity-0">
            <div className="h-px w-8" style={{ background: "#6B1A1A" }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "#6B1A1A" }}>Order Now</span>
            <div className="h-px w-8" style={{ background: "#6B1A1A" }} />
          </div>
          <h2 className="font-devanagari mb-4 fade-on-scroll opacity-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#4A0E0E" }}>
            मागवा आताच
          </h2>
          <p className="text-base mb-12 max-w-lg mx-auto leading-relaxed fade-on-scroll opacity-0" style={{ color: "#5C3D2A" }}>
            We accept orders via WhatsApp. Message us with the masala name and quantity and we will confirm availability and delivery details.
          </p>

          <div className="fade-on-scroll opacity-0 flex flex-col items-center gap-5">
            <a
              href="https://wa.me/919850270518?text=Hello%2C%20I%20would%20like%20to%20order%20from%20%E0%A4%98%E0%A4%B0%E0%A4%97%E0%A5%81%E0%A4%A4%E0%A5%80%20%E0%A4%AE%E0%A4%B8%E0%A4%BE%E0%A4%B2%E0%A5%87"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-pulse inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 hover:opacity-90 hover:-translate-y-1 shadow-warm-lg"
              style={{ background: "#25D366", color: "#fff" }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 1C5.477 1 1 5.477 1 11c0 1.7.43 3.3 1.19 4.7L1 21l5.47-1.17A9.96 9.96 0 0011 21c5.523 0 10-4.477 10-10S16.523 1 11 1z" fill="#25D366" stroke="#fff" strokeWidth="1.5" />
                <path d="M8 8.5c.2-.5.9-1 1.4-.5l1 1.5c.2.3.1.7-.1.9l-.5.5c.3.7.8 1.3 1.5 1.8l.6-.4c.3-.2.7-.1.9.2l1.2 1.3c.4.5 0 1.2-.5 1.4-1.8.7-5-2.1-5.5-4.3-.1-.5.1-1.1.5-1.4z" fill="#fff" />
              </svg>
              Order on WhatsApp
            </a>
            <p className="text-sm" style={{ color: "#7A6555" }}>We reply within a few hours ·</p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 fade-on-scroll opacity-0">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 3C9.03 3 5 7.03 5 12c0 7 9 15 9 15s9-8 9-15c0-4.97-4.03-9-9-9z" fill="#6B1A1A" fillOpacity="0.15" stroke="#6B1A1A" strokeWidth="1.5" />
                    <circle cx="14" cy="12" r="3" fill="#6B1A1A" />
                  </svg>
                ),
                title: "Location",
                body: "Vathar Tarf Vadgoan, Kolhapur, Maharashtra",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="3" fill="#6B1A1A" fillOpacity="0.12" stroke="#6B1A1A" strokeWidth="1.5" />
                    <path d="M4 10l10 7 10-7" stroke="#6B1A1A" strokeWidth="1.5" fill="none" />
                  </svg>
                ),
                title: "Enquiries",
                body: "Message us on WhatsApp for pricing and availability",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="10" fill="#6B1A1A" fillOpacity="0.1" stroke="#6B1A1A" strokeWidth="1.5" />
                    <path d="M14 9v5.5l3.5 3.5" stroke="#6B1A1A" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                title: "Order Lead Time",
                body: "1–2 days for fresh preparation & packing",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl p-6 text-center shadow-warm-sm" style={{ background: "white", border: "1px solid rgba(107,26,26,0.07)" }}>
                <div className="flex justify-center mb-4">{icon}</div>
                <p className="text-sm font-semibold mb-2" style={{ color: "#4A0E0E" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#5C3D2A" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────── */}
      <footer className="py-10 px-6 md:px-16 text-center" style={{ background: "#1E0E0E", borderTop: "1px solid rgba(107,26,26,0.2)" }}>
        <p className="font-devanagari text-xl mb-1" style={{ color: "#C8A87E" }}>घरगुती मसाले</p>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#5C3D2A" }}>Authentic Maharashtrian Spices · Kolhapur</p>
        <div className="divider-spice mx-auto mb-5" style={{ maxWidth: 200 }} />
        <p className="text-xs" style={{ color: "#3D2B1E" }}>Made with love in Kolhapur · No preservatives · No artificial flavours</p>
      </footer>

      {/* Product Modal */}
      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
