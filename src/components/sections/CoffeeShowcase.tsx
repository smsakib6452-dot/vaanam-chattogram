"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";
import { Coffee, Flame, Droplets, Clock } from "lucide-react";

export default function CoffeeShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for right column content
      if (rightColRef.current) {
        const elements = rightColRef.current.querySelectorAll(".reveal-item");
        gsap.fromTo(
          elements,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // Parallax float on the video frame
      if (leftColRef.current && window.innerWidth >= 768) {
        gsap.fromTo(
          leftColRef.current,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-24 sm:py-32 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Split-screen Video Showcase */}
        <div ref={leftColRef} className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative aspect-[4/5] sm:aspect-[1/1] max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#F5F2EB] border border-[rgba(43,35,32,0.08)]">
            <VideoScrubber
              videoSrc="/assets/videos/filter-coffee-pour.mp4"
              fallbackImage="/assets/photos/img-filter-coffee.jpg"
              alt="Artisanal slow-dripped filter coffee decoction poured into brass tumbler in daylight"
              accentColor="#8A5A2B"
              label="ARTISANAL POUR DECOCTION"
            />
          </div>
        </div>

        {/* Right Column: Roasted Tan Heading & Editorial Copy */}
        <div ref={rightColRef} className="lg:col-span-6 order-1 lg:order-2 space-y-8">
          {/* Section Kicker */}
          <div className="reveal-item flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#8A5A2B]" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8A5A2B] font-semibold">
              ARTISANAL BREW · ROASTED DECOCTION
            </span>
          </div>

          {/* Display Heading in Roasted Tan (#8A5A2B) */}
          <div className="reveal-item">
            <h2 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-light text-[#8A5A2B] tracking-tight leading-[1.05]">
              Slow-Dripped. Coastal Roast.
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#61534E] mt-3">
              Tradition Refined · Dark Chicory & Arabica · Est. 2026
            </p>
          </div>

          {/* Narrative Body */}
          <p className="reveal-item text-sm sm:text-base text-[#2B2320] font-inter font-light leading-relaxed">
            In Chattogram, where conversations stretch late into breezy coastal evenings, our coffee is crafted with reverent patience. High-elevation beans are roasted dark with slow-caramelized chicory, steeped through double-chambered brass filters, and aerated into frothy, velvety warmth.
          </p>

          {/* Staggered Stat Callouts */}
          <div className="reveal-item grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[rgba(43,35,32,0.1)]">
            <div className="bg-[rgba(250,250,248,0.9)] p-4 rounded-2xl border border-[rgba(43,35,32,0.08)] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#8A5A2B] mb-1">
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">ROAST METHOD</span>
              </div>
              <div className="font-fraunces text-xl text-[#2B2320]">Dark Wood</div>
              <p className="text-[11px] text-[#61534E] mt-0.5">Slow drum roasted with chicory</p>
            </div>

            <div className="bg-[rgba(250,250,248,0.9)] p-4 rounded-2xl border border-[rgba(43,35,32,0.08)] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#8A5A2B] mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">EXTRACTION</span>
              </div>
              <div className="font-fraunces text-xl text-[#2B2320]">85°C Precision</div>
              <p className="text-[11px] text-[#61534E] mt-0.5">Slow gravitational brass drip</p>
            </div>

            <div className="bg-[rgba(250,250,248,0.9)] p-4 rounded-2xl border border-[rgba(43,35,32,0.08)] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#8A5A2B] mb-1">
                <Droplets className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">VESSEL</span>
              </div>
              <div className="font-fraunces text-xl text-[#2B2320]">Kansha Brass</div>
              <p className="text-[11px] text-[#61534E] mt-0.5">Retains deep froth and aroma</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
