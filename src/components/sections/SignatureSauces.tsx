"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

const SAUCES = [
  {
    name: "Shorshe Kasundi",
    type: "Stone-Ground Mustard Ferment",
    viscosity: "Silken Emulsion",
    notes: "Sun-cured indigenous mustard seeds ground with wild mango and salt. Unfiltered pungency, sharp heat, and earthy depth.",
    balance: { acidity: 78, pungency: 95, earth: 60, sweetness: 15 },
    badge: "Traditional Ferment",
  },
  {
    name: "Tentul Tok-Mishti",
    type: "Tamarind & Jaggery Reduction",
    viscosity: "Silken Ribbon",
    notes: "Sun-ripened tamarind simmered slowly with dark date palm jaggery, roasted cumin seeds, and a pinch of rock salt.",
    balance: { acidity: 82, sweetness: 85, earth: 40, heat: 30 },
    badge: "Slow Reduction",
  },
  {
    name: "Pora Morich & Tomato",
    type: "Smoked Ember Relish",
    viscosity: "Coarse Relish",
    notes: "Wood-charred local tomatoes crushed by stone pestle with blistered dry chillies, fresh coriander, and raw mustard oil.",
    balance: { acidity: 65, sweetness: 25, smoke: 90, heat: 80 },
    badge: "Fire-Roasted",
  },
];

export default function SignatureSauces() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sauces"
      ref={containerRef}
      className="relative w-full h-[220vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-6 sm:p-12"
      >
        {/* Kasundi & Tamarind Pour Video */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full h-full max-w-[1920px] max-h-[1080px] relative">
            <VideoScrubber
              videoSrc="/videos/video-4 (2).mp4"
              fallbackImage="/images/IMAGE 03 — BANGLADESHI SPICE COMPOSITION.jpg"
              alt="Artisanal Bengali Kasundi and tamarind condiments in editorial motion"
              zoomIntensity={0.07}
            />
          </div>
        </div>

        {/* Section Title Header */}
        <div className="absolute top-12 left-6 sm:left-12 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
              06 — KASUNDI & THE FERMENT
            </span>
          </div>
          <h3 className="font-fraunces text-3xl sm:text-5xl font-light text-[#2B2320]">
            Kasundi & Coastal Relishes.
          </h3>
          <p className="text-xs text-[#61534E] font-inter mt-1 max-w-sm">
            Three artisanal condiments rooted in stone-ground craft and slow fermentation.
          </p>
        </div>

        {/* 3 Floating Tilt Cards Over the Pour */}
        <div className="relative z-20 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 pointer-events-none">
          {SAUCES.map((sauce, idx) => (
            <div
              key={sauce.name}
              className="pointer-events-auto bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-6 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#2B2320] group"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-2">
                <span>0{idx + 1} • {sauce.badge}</span>
                <span>{sauce.viscosity}</span>
              </div>

              <h4 className="font-fraunces text-xl font-light text-[#2B2320] group-hover:text-[#C86D3C] transition-colors mb-1">
                {sauce.name}
              </h4>

              <p className="text-[10px] font-mono uppercase tracking-wider text-[#96867F] mb-3">
                {sauce.type}
              </p>

              <p className="text-xs text-[#61534E] font-inter font-light leading-relaxed mb-5">
                {sauce.notes}
              </p>

              {/* Flavor Profile Bars */}
              <div className="space-y-2 pt-3 border-t border-[rgba(43,35,32,0.08)]">
                {Object.entries(sauce.balance).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-[11px] font-mono text-[#61534E]">
                    <span className="capitalize">{key}</span>
                    <div className="w-24 h-1 bg-[rgba(43,35,32,0.1)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2B2320] group-hover:bg-[#C86D3C] transition-all duration-300"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Footnote */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-[rgba(250,250,248,0.85)] backdrop-blur-sm border border-[rgba(43,35,32,0.08)] px-4 py-1.5 rounded-full flex items-center gap-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#61534E]">
            CONDIMENT TEXTURE & POUR
          </span>
          <span className="text-[9px] font-mono text-[#2B2320] uppercase font-semibold">
            STONE-GROUND & SLOW-AGED
          </span>
        </div>
      </div>
    </section>
  );
}
