"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

const THALI_ITEMS = [
  {
    id: "mezbani",
    name: "MEZBANI GOSHT",
    badge: "WOOD-PRESSED MUSTARD & RADHUNI",
    desc: "Prime slow-simmered beef steeped in aromatic roasted spices and crushed ginger.",
    pos: "top-[40%] left-[4%] sm:left-[6%] lg:left-[8%]",
    align: "left",
  },
  {
    id: "polao",
    name: "CHINIGURA POLAO",
    badge: "DESHI GHEE & BAY LEAF",
    desc: "Aromatic indigenous short-grain rice cooked to tender, separate pearls.",
    pos: "top-[16%] right-[4%] sm:right-[6%] lg:right-[8%]",
    align: "right",
  },
  {
    id: "ilish",
    name: "SHORSHE ILISH",
    badge: "BAY OF BENGAL HARVEST",
    desc: "Fresh Hilsa fish poached gently in cold-stone ground pungent yellow mustard gravy.",
    pos: "bottom-[16%] left-[4%] sm:left-[6%] lg:left-[8%]",
    align: "left",
  },
  {
    id: "kalabhuna",
    name: "KALA BHUNA",
    badge: "SLOW-CARAMELIZED POT",
    desc: "Deep blackened beef braised for hours until tender, infused with dried chilies and black cardamom.",
    pos: "bottom-[16%] right-[4%] sm:right-[6%] lg:right-[8%]",
    align: "right",
  },
];

export default function WhatWeServe() {
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

      // Animate Saffron pop labels as feast items settle
      THALI_ITEMS.forEach((item, index) => {
        const threshold = 0.2 + index * 0.16;
        gsap.fromTo(
          `.thali-label-${item.id}`,
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
      id="serve"
      ref={containerRef}
      className="relative w-full md:h-[220vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="md:sticky md:top-0 md:left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Section Header with Saffron Accent */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mb-6 md:mb-0 md:absolute md:top-8 md:left-0 md:right-0 z-20 pointer-events-none flex justify-start">
          <div className="max-w-md bg-[rgba(250,250,248,0.94)] backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-[rgba(43,35,32,0.1)] shadow-xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E38A2C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E38A2C] font-semibold">
                03 — WHAT WE SERVE · THE ASSEMBLED FEAST
              </span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-light text-[#2B2320] tracking-tight">
              The Coastal Banquet.
            </h2>
            <p className="text-xs text-[#61534E] font-inter mt-2 leading-relaxed">
              Scroll down to watch the banquet assemble into harmony; scroll up to deconstruct each sacred ingredient.
            </p>
          </div>
        </div>

        {/* Scrubbed Feast Video Frame: 100% Full-Screen Edge-to-Edge */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <VideoScrubber
            videoSrc="/assets/videos/exploded-thali.mp4"
            fallbackImage="/assets/photos/img-poster.jpg"
            alt="Exploded Grand Mezbani Banquet spreading across Kansha brass platters in daylight"
            accentColor="#E38A2C"
            label="EXPLODED FEAST MOTION"
          />
        </div>

        {/* Desktop Saffron Pop Labels Settling into Position */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto p-6 sm:p-12">
          {THALI_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`thali-label-${item.id} absolute ${item.pos} max-w-xs pointer-events-auto opacity-0 will-change-transform`}
            >
              <div
                className={`bg-[rgba(250,250,248,0.96)] border border-[rgba(227,138,44,0.35)] p-4 rounded-2xl shadow-xl ${
                  item.align === "right" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-[9px] font-mono text-[#E38A2C] uppercase tracking-wider mb-1 font-semibold ${
                    item.align === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E38A2C]" />
                  <span>{item.badge}</span>
                </div>
                <h4 className="text-sm font-fraunces font-semibold text-[#2B2320]">
                  {item.name}
                </h4>
                <p className="text-[11px] text-[#61534E] mt-1 leading-snug font-inter">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Exploded Feast Cards Strip */}
        <div className="md:hidden w-full max-w-md mx-auto mt-6 space-y-3 pointer-events-auto">
          {THALI_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[rgba(250,250,248,0.96)] border border-[rgba(227,138,44,0.3)] p-3.5 rounded-xl shadow-md"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#E38A2C] uppercase tracking-wider mb-1 font-semibold">
                <span>{item.name}</span>
                <span>{item.badge}</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
