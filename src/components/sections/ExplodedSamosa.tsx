"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

const SAMOSA_LAYERS = [
  {
    id: "crust",
    shortTitle: "Pastry Shell",
    badge1: "CRISP CRUST",
    badge2: "KALO JEERE",
    title: "Nigella Seed Pastry Shell",
    desc: "Hand-kneaded dough studded with kalonji seeds, rolled thin and fried slowly for a delicate, shattering crunch.",
  },
  {
    id: "steam",
    shortTitle: "Aromatics",
    badge1: "WARM STEAM",
    badge2: "AROMATICS",
    title: "Pungent Roasted Aromas",
    desc: "Vapors of freshly pounded ginger, toasted cumin, and roasted spices escaping upon crust rupture.",
  },
  {
    id: "filling",
    shortTitle: "Potato & Nut",
    badge1: "TEXTURE CORE",
    badge2: "HAND-CUT",
    title: "Diced Potatoes & Roasted Peanuts",
    desc: "Evenly cubed local potatoes tossed with ginger paste and toasted peanuts, retaining firm toothsome bite.",
  },
  {
    id: "spices",
    shortTitle: "Radhuni Spices",
    badge1: "PUNCH & BALANCE",
    badge2: "RADHUNI",
    title: "Crushed Coastal Spices",
    desc: "Toasted radhuni seeds and dry chillies imparting their earthy citrus warmth to the potato filling.",
  },
  {
    id: "shards",
    shortTitle: "Crust Shards",
    badge1: "CRACKLE",
    badge2: "GOLDEN SHELL",
    title: "Golden Shell Fragments",
    desc: "Lightly blistered crust fragments suspended in studio light, revealing the flaky, short-textured crumb.",
  },
];

export default function ExplodedSamosa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Desktop GSAP scroll scrub triggers
      if (typeof window !== "undefined" && window.innerWidth < 768) return;

      const callouts = [
        { sel: ".samosa-callout-1", start: "top -10%", end: "top -28%" },
        { sel: ".samosa-callout-2", start: "top -24%", end: "top -42%" },
        { sel: ".samosa-callout-3", start: "top -38%", end: "top -56%" },
        { sel: ".samosa-callout-4", start: "top -52%", end: "top -70%" },
        { sel: ".samosa-callout-5", start: "top -66%", end: "top -84%" },
      ];

      callouts.forEach(({ sel, start, end }) => {
        gsap.fromTo(
          sel,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start,
              end,
              scrub: 0.8,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="singara"
      ref={containerRef}
      className="relative w-full md:h-[180vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div
        ref={stickyRef}
        className="md:sticky md:top-0 md:left-0 w-full min-h-[90vh] md:h-screen md:overflow-hidden flex flex-col justify-center items-center py-16 px-4 sm:px-6 md:py-0 md:px-0"
      >
        {/* Section Header (Mobile: natural header; Desktop: absolute top-left) */}
        <div className="w-full max-w-7xl mx-auto px-2 mb-6 md:mb-0 md:absolute md:top-12 md:left-12 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
              03 — ANATOMY OF A SINGARA
            </span>
          </div>
          <h3 className="font-fraunces text-3xl sm:text-4xl font-light text-[#2B2320]">
            Anatomy of a Singara.
          </h3>
          <p className="text-xs text-[#61534E] font-inter mt-1 max-w-xs">
            Suspended in studio light, every layer reveals its structural and flavor role.
          </p>
        </div>

        {/* Video Frame */}
        <div className="relative w-full max-w-[1920px] aspect-[16/10] md:h-full md:max-h-[1080px] rounded-2xl md:rounded-none overflow-hidden shadow-lg md:shadow-none">
          <div className="w-full h-full relative">
            <VideoScrubber
              videoSrc="/videos/video-2 (2).mp4"
              fallbackImage="/images/IMAGE 02 — EXPLODED SINGARA.jpg"
              alt="Anatomy of an exploded artisanal Singara in studio daylight"
              zoomIntensity={0.08}
            />
          </div>
        </div>

        {/* DESKTOP ONLY: Interactive Breakdown Callouts with Connector Lines */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto p-6 sm:p-12">
          {/* CALLOUT 1: Kalo Jeere Pastry Shell (Left-Center) */}
          <div className="samosa-callout-1 absolute left-6 sm:left-14 top-[32%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>CRISP CRUST</span>
                <span>KALO JEERE</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Nigella Seed Pastry Shell</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Hand-kneaded dough studded with kalonji seeds, rolled thin and fried slowly for a delicate, shattering crunch.
              </p>
            </div>
            <svg
              className="absolute top-1/2 left-full w-24 h-12 -translate-y-1/2 pointer-events-none hidden sm:block overflow-visible"
              aria-hidden="true"
            >
              <line x1="0" y1="24" x2="70" y2="24" stroke="#2B2320" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <circle cx="70" cy="24" r="3" fill="#C86D3C" />
            </svg>
          </div>

          {/* CALLOUT 2: Steam & Aromatics (Top-Right) */}
          <div className="samosa-callout-2 absolute right-6 sm:right-16 top-[18%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg text-right">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>WARM STEAM</span>
                <span>AROMATICS</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Pungent Roasted Aromas</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Vapors of freshly pounded ginger, toasted cumin, and roasted spices escaping upon crust rupture.
              </p>
            </div>
          </div>

          {/* CALLOUT 3: Diced Spiced Potatoes & Peanuts (Right-Center) */}
          <div className="samosa-callout-3 absolute right-6 sm:right-20 top-[48%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>TEXTURE CORE</span>
                <span>HAND-CUT</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Diced Potatoes & Roasted Peanuts</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Evenly cubed local potatoes tossed with ginger paste and toasted peanuts, retaining firm toothsome bite.
              </p>
            </div>
          </div>

          {/* CALLOUT 4: Whole Spices (Bottom-Left) */}
          <div className="samosa-callout-4 absolute left-6 sm:left-24 bottom-[18%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>PUNCH & BALANCE</span>
                <span>RADHUNI</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Crushed Coastal Spices</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Toasted radhuni seeds and dry chillies imparting their earthy citrus warmth to the potato filling.
              </p>
            </div>
          </div>

          {/* CALLOUT 5: Pastry Shards (Bottom-Right) */}
          <div className="samosa-callout-5 absolute right-6 sm:right-16 bottom-[14%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg text-right">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>CRACKLE</span>
                <span>GOLDEN SHELL</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Golden Shell Fragments</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Lightly blistered crust fragments suspended in studio light, revealing the flaky, short-textured crumb.
              </p>
            </div>
          </div>
        </div>

        {/* MOBILE ONLY: Interactive 5-Layer Touch Selector & Dossier Card */}
        <div className="md:hidden w-full max-w-lg mx-auto mt-5 z-20">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
            {SAMOSA_LAYERS.map((layer, idx) => (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(idx)}
                className={`snap-start shrink-0 px-3 py-1.5 rounded-full text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activeLayer === idx
                    ? "bg-[#2B2320] text-[#FAFAF8] shadow-md font-semibold"
                    : "bg-[#F4F1EA] text-[#61534E] hover:bg-[#EAE5DC]"
                }`}
              >
                0{idx + 1} • {layer.shortTitle}
              </button>
            ))}
          </div>

          <div className="bg-[rgba(250,250,248,0.98)] border border-[rgba(43,35,32,0.12)] p-4 rounded-2xl shadow-xl mt-2">
            <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
              <span>{SAMOSA_LAYERS[activeLayer].badge1}</span>
              <span>{SAMOSA_LAYERS[activeLayer].badge2}</span>
            </div>
            <h4 className="text-sm font-semibold text-[#2B2320]">
              {SAMOSA_LAYERS[activeLayer].title}
            </h4>
            <p className="text-xs text-[#61534E] mt-1.5 leading-relaxed font-light">
              {SAMOSA_LAYERS[activeLayer].desc}
            </p>
          </div>
        </div>

        {/* Footnote Badge at bottom (Desktop) */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 items-center gap-3 bg-[rgba(250,250,248,0.85)] backdrop-blur-sm border border-[rgba(43,35,32,0.08)] px-4 py-1.5 rounded-full">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#61534E]">
            SINGARA DISSECTION • 5 STRUCTURAL LAYERS
          </span>
        </div>
      </div>
    </section>
  );
}
