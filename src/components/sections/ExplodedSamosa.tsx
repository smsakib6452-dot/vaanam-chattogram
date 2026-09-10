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
    desc: "Hand-kneaded dough studded with kalonji seeds, rolled paper-thin and fried gently in pure mustard oil for a shattering crunch.",
    pos: "top-[40%] left-[4%] sm:left-[6%] lg:left-[8%]",
    align: "left",
  },
  {
    id: "steam",
    shortTitle: "Aromatics",
    badge1: "WARM STEAM",
    badge2: "AROMATICS",
    title: "Pungent Ginger & Cumin Steam",
    desc: "Aromatic vapors of freshly crushed ginger root, toasted cumin, and roasted coriander escaping upon pastry rupture.",
    pos: "top-[16%] right-[4%] sm:right-[6%] lg:right-[8%]",
    align: "right",
  },
  {
    id: "filling",
    shortTitle: "Potato & Nut",
    badge1: "TEXTURE CORE",
    badge2: "HAND-CUT",
    title: "Diced Potatoes & Toasted Peanuts",
    desc: "Evenly cubed local potatoes tossed with ginger paste and roasted peanuts, delivering satisfying toothsome bite.",
    pos: "bottom-[16%] left-[4%] sm:left-[6%] lg:left-[8%]",
    align: "left",
  },
  {
    id: "spices",
    shortTitle: "Radhuni & Chili",
    badge1: "CHILI RED",
    badge2: "RADHUNI",
    title: "Crushed Bogura Chili & Radhuni",
    desc: "Toasted radhuni seeds and sun-dried fiery chillies imparting earthy citrus warmth and addictive spice resonance.",
    pos: "bottom-[16%] right-[4%] sm:right-[6%] lg:right-[8%]",
    align: "right",
  },
];

export default function ExplodedSamosa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

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
        scrub: 0.8,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });

      // Animate callouts in Chili Red as singara opens
      SAMOSA_LAYERS.forEach((layer, idx) => {
        const threshold = 0.18 + idx * 0.18;
        gsap.fromTo(
          `.singara-callout-${layer.id}`,
          { opacity: 0, scale: 0.85, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: `top -${threshold * 80}%`,
              end: `top -${(threshold + 0.15) * 80}%`,
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
      className="relative w-full md:h-[220vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="md:sticky md:top-0 md:left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Section Header with Chili Red Accent */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-6 md:mb-0 md:absolute md:top-8 md:left-0 md:right-0 z-20 pointer-events-none flex justify-start">
          <div className="max-w-md bg-[rgba(250,250,248,0.94)] backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.1)] shadow-xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C23B22]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C23B22] font-semibold">
                04 — THE ANATOMY · EXPLODED SINGARA
              </span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-light text-[#C23B22] tracking-tight">
              Street Food, Elevated.
            </h2>
            <p className="text-xs text-[#61534E] font-inter mt-2 leading-relaxed">
              Suspended in pure daylight, the iconic pastry fractures to reveal the intricate architecture of Bengal spice craft.
            </p>
          </div>
        </div>

        {/* Scrubbed Singara Video Frame: 100% Full-Screen Edge-to-Edge */}
        <div data-cursor="scrub" className="absolute inset-0 w-full h-full overflow-hidden">
          <VideoScrubber
            videoSrc="/assets/videos/exploded-samosa.mp4"
            fallbackImage="/assets/photos/img-samosa.jpg"
            alt="Anatomy of an exploded artisanal Singara with steam and crisp pastry shards in daylight"
            accentColor="#C23B22"
            label="EXPLODED SINGARA MOTION"
          />
        </div>

        {/* Desktop Chili Red Pop Callouts */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto p-6 sm:p-12">
          {SAMOSA_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className={`singara-callout-${layer.id} absolute ${layer.pos} max-w-xs pointer-events-auto opacity-0 will-change-transform`}
            >
              <div
                className={`bg-[rgba(250,250,248,0.96)] border border-[rgba(194,59,34,0.3)] p-4 rounded-2xl shadow-xl ${
                  layer.align === "right" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-[9px] font-mono text-[#C23B22] uppercase tracking-wider mb-1 font-semibold ${
                    layer.align === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C23B22]" />
                  <span>{layer.badge1}</span>
                  <span>·</span>
                  <span>{layer.badge2}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#2B2320]">
                  {layer.title}
                </h4>
                <p className="text-[11px] text-[#61534E] mt-1 leading-snug font-inter">
                  {layer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipeable Singara Cards */}
        <div className="md:hidden w-full max-w-md mx-auto mt-6 space-y-3 pointer-events-auto">
          {SAMOSA_LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="bg-[rgba(250,250,248,0.96)] border border-[rgba(194,59,34,0.25)] p-3.5 rounded-xl shadow-md"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#C23B22] uppercase tracking-wider mb-1 font-semibold">
                <span>{layer.title}</span>
                <span>{layer.badge1}</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                {layer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
