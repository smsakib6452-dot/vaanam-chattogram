"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";
import { ArrowDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export default function HeroSection({ onOpenReservation }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Scroll indicator fades out immediately on first scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "top -20%",
            scrub: true,
          },
        });
      }

      // Headline fades out and moves up as user scrolls so the feast visual is 100% visible
      if (textGroupRef.current) {
        gsap.to(textGroupRef.current, {
          y: -140,
          opacity: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "top -50%",
            scrub: true,
          },
        });
      }

      // Callouts smoothly fade in and float up as feast is revealed
      if (calloutsRef.current) {
        gsap.fromTo(
          calloutsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top -20%",
              end: "top -60%",
              scrub: true,
            },
          }
        );
      }

      // Video subtle cinematic dolly zoom on scroll
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { scale: 1 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[240vh] bg-[#FAFAF8]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Scrubbed Feast Video / Studio Visual (Pin-sharp, zero haze) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div
            ref={videoWrapperRef}
            className="w-full h-full max-w-[1920px] max-h-[1080px] relative will-change-transform"
          >
            <VideoScrubber
              videoSrc="/videos/Video-1 (2).mp4"
              fallbackImage="/images/IMAGE 01 — HERO.jpg"
              alt="The Taste of Chattogram — Contemporary Coastal Culinary Experience"
              priority
              zoomIntensity={0}
            />
          </div>
        </div>

        {/* Editorial culinary annotations (Fade in as headline fades out) */}
        <div
          ref={calloutsRef}
          className="absolute inset-0 pointer-events-none max-w-7xl mx-auto p-6 sm:p-12 flex flex-col justify-between transition-opacity duration-300 z-20 opacity-0"
        >
          {/* Top Left Annotation */}
          <div className="self-start mt-24 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-left max-w-xs pointer-events-auto">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
              <span>ITEM 01 • MEZBANI GOSHT</span>
              <span>SLOW-SIMMERED</span>
            </div>
            <p className="text-xs text-[#2B2320] font-medium leading-snug">
              Tender beef simmered in mustard oil, roasted spices, and ground radhuni.
            </p>
          </div>

          {/* Top Right Annotation */}
          <div className="self-end mt-28 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-right max-w-xs pointer-events-auto">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
              <span>CHINIGURA GRAIN</span>
              <span>ITEM 02 • POLAO</span>
            </div>
            <p className="text-xs text-[#2B2320] font-medium leading-snug">
              Short-grain aromatic rice perfumed with bay leaf, ghee, and whole cardamom.
            </p>
          </div>

          {/* Bottom Left Annotation */}
          <div className="self-start mb-24 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-left max-w-xs pointer-events-auto">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
              <span>ITEM 03 • SHORSHE ILISH</span>
              <span>BAY HARVEST</span>
            </div>
            <p className="text-xs text-[#2B2320] font-medium leading-snug">
              Hilsa steeped in pungent cold-pressed mustard paste and fresh green chillies.
            </p>
          </div>

          {/* Bottom Right Annotation */}
          <div className="self-end mb-24 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-right max-w-xs pointer-events-auto">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#C86D3C] uppercase tracking-wider mb-1">
              <span>ROASTED CHILLI</span>
              <span>ITEM 04 • ALOO BHORTA</span>
            </div>
            <p className="text-xs text-[#2B2320] font-medium leading-snug">
              Stone-mashed local potatoes with toasted dry chillies and raw mustard oil.
            </p>
          </div>
        </div>

        {/* Primary Editorial Headline & CTAs (Fades smoothly as user scrolls down) */}
        <div
          ref={textGroupRef}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pointer-events-auto transition-transform"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(43,35,32,0.12)] bg-[#FAFAF8] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C86D3C]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#61534E]">
              01 — The Taste of Chattogram
            </span>
          </div>

          <h1 className="font-fraunces text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-[#2B2320] leading-[0.95] mb-6">
            The Taste of <br className="hidden sm:inline" />
            <span className="italic font-normal">Chattogram.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#61534E] max-w-2xl mx-auto font-inter font-light leading-relaxed mb-8">
            A coastal table shaped by spice, fire and tradition. Explore the slow-curated culinary heritage of Bangladesh choreographed to your scroll.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenReservation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2B2320] text-[#FAFAF8] text-xs uppercase tracking-widest font-medium hover:bg-[#C86D3C] transition-all duration-300 shadow-lg cursor-pointer"
            >
              Reserve Table
            </button>
            <a
              href="#story"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[rgba(43,35,32,0.2)] hover:border-[#2B2320] text-[#2B2320] text-xs uppercase tracking-widest font-medium transition-all duration-300 bg-[#FAFAF8] cursor-pointer shadow-sm"
            >
              Explore Menu Anatomy
            </a>
          </div>
        </div>

        {/* Scroll Indicator at Bottom */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#61534E] font-mono text-[10px] tracking-[0.25em] uppercase select-none opacity-80 animate-bounce"
        >
          <span>Scroll to Explore Feast</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
