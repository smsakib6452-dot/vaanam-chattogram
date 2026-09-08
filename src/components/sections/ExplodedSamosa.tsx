"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

export default function ExplodedSamosa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
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
              scrub: true,
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
      className="relative w-full h-[220vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Pinned Video / Editorial Scrubber */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-full h-full max-w-[1920px] max-h-[1080px] relative">
            <VideoScrubber
              videoSrc="/videos/video-2 (2).mp4"
              fallbackImage="/images/IMAGE 02 — EXPLODED SINGARA.jpg"
              alt="Anatomy of an exploded artisanal Singara in studio daylight"
              zoomIntensity={0.08}
            />
          </div>
        </div>

        {/* Section Header (Subtle & Floating) */}
        <div className="absolute top-12 left-6 sm:left-12 z-20 pointer-events-none">
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

        {/* Interactive Breakdown Callouts with Connector Lines */}
        <div className="absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto p-6 sm:p-12">
          {/* CALLOUT 1: Kalo Jeere Pastry Shell (Left-Center) */}
          <div className="samosa-callout-1 absolute left-6 sm:left-14 top-[32%] max-w-xs pointer-events-auto opacity-0">
            <div className="bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
                <span>CRISP CRUST</span>
                <span>KALO JEERE</span>
              </div>
              <h4 className="text-xs font-semibold text-[#2B2320]">Nigella Seed Pastry Shell</h4>
              <p className="text-[11px] text-[#61534E] mt-1 leading-snug">
                Hand-kneaded dough studded with kalonji seeds, rolled thin and fried slowly for a delicate, shattering crunch.
              </p>
            </div>
            {/* SVG Connector Dot & Line */}
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
            <div className="bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg text-right">
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
            <div className="bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
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
            <div className="bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg">
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
            <div className="bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-3.5 rounded-xl shadow-lg text-right">
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

        {/* Footnote Badge at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-[rgba(250,250,248,0.85)] backdrop-blur-sm border border-[rgba(43,35,32,0.08)] px-4 py-1.5 rounded-full">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#61534E]">
            SINGARA DISSECTION • 5 STRUCTURAL LAYERS
          </span>
        </div>
      </div>
    </section>
  );
}
