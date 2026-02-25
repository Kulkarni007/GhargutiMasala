"use client";

import { useEffect } from "react";

interface Product {
  name: string;
  nameMarathi: string;
  desc: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
  ingredients: string[];
  uses: string[];
  shelfLife: string;
  packaging: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backgroundColor: "rgba(30, 14, 14, 0.7)" }}
    >
      <div 
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-warm-xl"
        style={{ backgroundColor: "#FBF6ED" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "#6B1A1A", color: "#F5EDD8" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Product header */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none" 
               style={{ background: "linear-gradient(to bottom, transparent, rgba(30,14,14,0.8))" }} />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: "#D4881C", color: "#1E0E0E" }}
            >
              {product.tag}
            </span>
            <h3 className="font-devanagari text-3xl font-bold mb-1">{product.nameMarathi}</h3>
            <p className="text-lg font-medium">{product.name}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg mb-3" style={{ color: "#4A0E0E" }}>
              About this Masala
            </h4>
            <p className="leading-relaxed" style={{ color: "#5C3D2A" }}>
              {product.desc}
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="font-semibold text-lg mb-3" style={{ color: "#4A0E0E" }}>
              Ingredients
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D4881C" }} />
                  <span className="text-sm" style={{ color: "#5C3D2A" }}>
                    {ingredient}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Uses */}
          <div>
            <h4 className="font-semibold text-lg mb-3" style={{ color: "#4A0E0E" }}>
              Uses
            </h4>
            <div className="space-y-2">
              {product.uses.map((use, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                       style={{ backgroundColor: "#6B1A1A" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 6l2 2 4-4" stroke="#F5EDD8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-sm" style={{ color: "#5C3D2A" }}>
                    {use}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#F5EDD8" }}>
              <h5 className="font-semibold mb-2" style={{ color: "#4A0E0E" }}>Shelf Life</h5>
              <p className="text-sm" style={{ color: "#7A4F35" }}>{product.shelfLife}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: "#F5EDD8" }}>
              <h5 className="font-semibold mb-2" style={{ color: "#4A0E0E" }}>Packaging</h5>
              <p className="text-sm" style={{ color: "#7A4F35" }}>{product.packaging}</p>
            </div>
          </div>

          {/* Order CTA */}
          <div className="text-center pt-4">
            <a
              href="https://wa.me/919850270518?text=Hello%2C%20I%20would%20like%20to%20order%20{encodeURIComponent(product.name)}%20from%20%E0%A4%98%E0%A4%B0%E0%A4%97%E0%A5%81%E0%A4%A4%E0%A5%80%20%E0%A4%AE%E0%A4%B8%E0%A4%BE%E0%A4%B2%E0%A5%87"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-warm-lg whatsapp-pulse"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1C5.03 1 1 5.03 1 10c0 1.7.43 3.3 1.19 4.7L1 19l5.47-1.17A9.96 9.96 0 0010 19c5.523 0 10-4.477 10-10S15.523 1 10 1z"
                      fill="#25D366" stroke="#fff" strokeWidth="1.5"/>
                <path d="M7 7.5c.2-.5.9-1 1.4-.5l1 1.5c.2.3.1.7-.1.9l-.5.5c.3.7.8 1.3 1.5 1.8l.6-.4c.3-.2.7-.1.9.2l1.2 1.3c.4.5 0 1.2-.5 1.4-1.8.7-5-2.1-5.5-4.3-.1-.5.1-1.1.5-1.4z"
                      fill="#fff"/>
              </svg>
              Order {product.name} on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
