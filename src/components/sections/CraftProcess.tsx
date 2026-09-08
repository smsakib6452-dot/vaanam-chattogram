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
      // Desktop-only scroll scrubbing
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;

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
      className="relative w-full lg:h-[240vh] bg-[#FAFAF8] border-t border-[rgba(43,35,32,0.06)]"
    >
      <div
        ref={stickyRef}
        className="lg:sticky lg:top-0 lg:left-0 w-full min-h-screen lg:h-screen lg:overflow-hidden flex flex-col justify-between py-16 px-4 sm:px-8 lg:p-16"
      >
        {/* Top: Timeline & Horizontal Progress Indicator */}
        <div className="z-20 max-w-7xl mx-auto w-full mb-8 lg:mb-0">
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

          {/* 4-Segment Interactive Timeline Bar (Clickable/Tappable on mobile & desktop) */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {CRAFT_STEPS.map((step, idx) => {
              const isPassed = idx <= activeIndex;
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={step.phase}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col gap-1.5 text-left cursor-pointer group"
                >
                  <div className="h-1.5 bg-[rgba(43,35,32,0.1)] rounded-full overflow-hidden transition-all group-hover:bg-[rgba(43,35,32,0.2)]">
                    <div
                      className={`h-full bg-[#2B2320] transition-all duration-300 ${
                        isPassed ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider transition-colors truncate ${
                      isCurrent ? "text-[#C86D3C] font-semibold" : "text-[#96867F]"
                    }`}
                  >
                    {step.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Video 5 Backdrop with Split Information Display */}
        <div className="relative z-10 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Video 5 Window */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl bg-[#F4F1EA] border border-[rgba(43,35,32,0.08)]">
            <VideoScrubber
              videoSrc="/videos/video-5 (2).mp4"
              fallbackImage="/images/IMAGE 03 — BANGLADESHI SPICE COMPOSITION.jpg"
              alt="Artisanal coastal cooking sequence of spices and slow-braised feast"
              zoomIntensity={0.06}
            />
          </div>

          {/* Step Narrative Card (Transforms dynamically with scroll or tab tap) */}
          <div className="lg:col-span-5 bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-2">
              <span>{currentStep.phase}</span>
              <span>{currentStep.temp}</span>
            </div>

            <h3 className="font-fraunces text-2xl sm:text-4xl font-light text-[#2B2320] mb-3">
              {currentStep.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#61534E] font-inter font-light leading-relaxed mb-5">
              {currentStep.desc}
            </p>

            <div className="p-3 bg-[#FAF8F5] border border-[rgba(43,35,32,0.08)] rounded-xl flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
              <span className="text-[#96867F]">SPECIFICATION:</span>
              <span className="text-[#2B2320] font-medium text-right">{currentStep.metrics}</span>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex lg:hidden items-center justify-between mt-4 pt-3 border-t border-[rgba(43,35,32,0.08)]">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                className="text-[10px] font-mono uppercase tracking-wider text-[#61534E] disabled:opacity-30 cursor-pointer"
              >
                ← Prev Stage
              </button>
              <button
                type="button"
                disabled={activeIndex === CRAFT_STEPS.length - 1}
                onClick={() => setActiveIndex((prev) => Math.min(CRAFT_STEPS.length - 1, prev + 1))}
                className="text-[10px] font-mono uppercase tracking-wider text-[#C86D3C] font-semibold disabled:opacity-30 cursor-pointer"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Status Footnote */}
        <div className="z-20 max-w-7xl mx-auto w-full pt-4 mt-8 lg:mt-0 border-t border-[rgba(43,35,32,0.08)] flex justify-between items-center text-[10px] font-mono text-[#61534E]">
          <span className="hidden sm:inline">Interactive Multi-Stage Alchemy</span>
          <span className="sm:hidden">Stage {activeIndex + 1} of 4</span>
          <span>Authentic Coastal Fire Cookery</span>
        </div>
      </div>
    </section>
  );
}
