"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

const CRAFT_STEPS = [
  {
    phase: "PHASE 01",
    title: "The Temper (Baghar)",
    temp: "Mustard Oil Awakens",
    desc: "Cold-pressed mustard oil is brought to heat in seasoned heavy iron vessels. Whole bay leaves, dried red chillies, and cracked radhuni release their fat-soluble essences.",
    metrics: "Cold-Pressed Mustard Oil • Whole Spices",
  },
  {
    phase: "PHASE 02",
    title: "The Koshano (Slow Braise)",
    temp: "Slow Clay Simmer",
    desc: "Onion, crushed ginger, garlic paste, and ground turmeric are slowly turned and coaxed until the raw pungency softens and the masala deepens in color and fragrance.",
    metrics: "Steady Fire • Continuous Turning",
  },
  {
    phase: "PHASE 03",
    title: "The Reduction (Jhol Ghono)",
    temp: "Sauce Concentration",
    desc: "The sauce concentrates into a darker, richer character as natural juices and marrow meld with toasted cumin and pepper, coating every piece in velvet intensity.",
    metrics: "Natural Reduction • Deep Caramelization",
  },
  {
    phase: "PHASE 04",
    title: "The Dum (Rest & Infusion)",
    temp: "Gentle Residual Heat",
    desc: "The degchi is sealed and rested over dying wood embers. Time and gentle heat allow volatile spices and roasted aromas to settle harmoniously throughout.",
    metrics: "Sealed Vessel • Resting Embers",
  },
];

export default function CraftProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
        scrub: 0.5,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            CRAFT_STEPS.length - 1,
            Math.floor(self.progress * CRAFT_STEPS.length)
          );
          setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentStep = CRAFT_STEPS[activeIndex];

  return (
    <section
      id="alchemy"
      ref={containerRef}
      className="relative w-full h-[240vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top: Timeline & Horizontal Progress Indicator */}
        <div className="z-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(43,35,32,0.08)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
                05 — THE CULINARY ALCHEMY
              </span>
            </div>
            <div className="text-[11px] font-mono text-[#2B2320]">
              STAGE {activeIndex + 1} OF {CRAFT_STEPS.length}
            </div>
          </div>

          {/* 4-Segment Horizontal Timeline Bar */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {CRAFT_STEPS.map((step, idx) => {
              const isPassed = idx <= activeIndex;
              const isCurrent = idx === activeIndex;
              return (
                <div key={step.phase} className="flex flex-col gap-1.5">
                  <div className="h-1 bg-[rgba(43,35,32,0.1)] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#2B2320] transition-all duration-300 ${
                        isPassed ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                      isCurrent ? "text-[#C86D3C] font-semibold" : "text-[#96867F]"
                    }`}
                  >
                    {step.phase}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Video 5 Backdrop with Split Information Display */}
        <div className="relative z-10 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Video 5 Window */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-[#F4F1EA] border border-[rgba(43,35,32,0.08)]">
            <VideoScrubber
              videoSrc="/videos/video-5 (2).mp4"
              fallbackImage="/images/IMAGE 03 — BANGLADESHI SPICE COMPOSITION.jpg"
              alt="Artisanal coastal cooking sequence of spices and slow-braised feast"
              zoomIntensity={0.06}
            />
          </div>

          {/* Step Narrative Card (Transforms dynamically with scroll) */}
          <div className="lg:col-span-5 bg-[rgba(250,250,248,0.94)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-2">
              <span>{currentStep.phase}</span>
              <span>{currentStep.temp}</span>
            </div>

            <h3 className="font-fraunces text-3xl sm:text-4xl font-light text-[#2B2320] mb-4">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#61534E] font-inter font-light leading-relaxed mb-6">
              {currentStep.desc}
            </p>

            <div className="p-3 bg-[#FAF8F5] border border-[rgba(43,35,32,0.08)] rounded-xl flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#96867F]">SPECIFICATION:</span>
              <span className="text-[#2B2320] font-medium">{currentStep.metrics}</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Footnote */}
        <div className="z-20 max-w-7xl mx-auto w-full pt-4 border-t border-[rgba(43,35,32,0.08)] flex justify-between items-center text-[10px] font-mono text-[#61534E]">
          <span>Continuous Scroll to Progress Process</span>
          <span>Authentic Coastal Fire Cookery</span>
        </div>
      </div>
    </section>
  );
}
