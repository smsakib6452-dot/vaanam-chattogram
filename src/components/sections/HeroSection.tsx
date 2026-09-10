"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoScrubber from "@/components/video/VideoScrubber";

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export default function HeroSection({ onOpenReservation }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // 1. Initial Hero Text Reveal
      gsap.fromTo(
        ".hero-char",
        { opacity: 0, y: 40, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // 2. Scroll indicator fades out quickly on scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "top -15%",
            scrub: 0.6,
          },
        });
      }

      // 3. Headline fades out and moves up smoothly on scroll
      if (textGroupRef.current) {
        gsap.to(textGroupRef.current, {
          y: -110,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "top -50%",
            scrub: 0.8,
          },
        });
      }

      // 4. Callouts smoothly fade in and float up
      if (calloutsRef.current) {
        gsap.fromTo(
          calloutsRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top -15%",
              end: "top -50%",
              scrub: 0.8,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const heroBrand = "VAANAM";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[140vh] md:h-[180vh] bg-[#FAFAF8]"
    >
      {/* Pinned Full-Viewport Single Focal Canvas (100% Full-Bleed Edge-to-Edge) */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Full-width Cinematic Video Container: 100% Full Bleed Edge-to-Edge */}
        <div data-cursor="scrub" className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative will-change-transform overflow-hidden">
            <VideoScrubber
              videoSrc="/assets/videos/hero-banquet.mp4"
              fallbackImage="/images/IMAGE 01 — HERO.jpg"
              alt="The complete royal feast banquet of VAANAM laid with Chattogram hospitality in pure daylight"
              priority
              accentColor="#E38A2C"
              label="THE GRAND CHATTOGRAM FEAST"
              isActive={true}
              pauseOnEnd={true}
            />
          </div>
        </div>


        {/* Center Editorial Title */}
        <div
          ref={textGroupRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none"
        >
          {/* Saffron Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(250,250,248,0.96)] border border-[rgba(227,138,44,0.4)] shadow-md mb-4 sm:mb-6 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-[#E38A2C] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#E38A2C] font-semibold">
              COASTAL FEAST · MATIR KULHAD CHA · CHATTOGRAM
            </span>
          </div>

          {/* Monumental Single Name: VAANAM with High-Legibility Contrast */}
          <h1 className="font-fraunces text-7xl sm:text-9xl md:text-[9.5rem] lg:text-[11.5rem] font-light tracking-tight text-[#2B2320] leading-[0.88] drop-shadow-[0_2px_14px_rgba(250,250,248,0.95)] flex flex-wrap justify-center">
            {heroBrand.split("").map((char, i) => (
              <span
                key={i}
                className="hero-char inline-block will-change-transform"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Frosted Glass Description Capsule */}
          <div className="mt-4 sm:mt-5 max-w-lg bg-[rgba(250,250,248,0.95)] backdrop-blur-md px-6 py-3 rounded-2xl border border-[rgba(43,35,32,0.12)] shadow-xl">
            <p className="text-xs sm:text-sm text-[#2B2320] font-inter font-normal tracking-wide leading-relaxed">
              In Chattogram, rich celebratory feasts are consecrated with steaming clay cups of slow-brewed tea. One ancestral home for the feast and the adda.
            </p>
          </div>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
            <button
              type="button"
              onClick={onOpenReservation}
              className="btn-luxury-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] shadow-xl group"
            >
              <span>Reserve Table</span>
              <span className="ml-2.5 inline-block group-hover:translate-x-1 transition-transform font-mono">→</span>
            </button>
            <a
              href="#beverages"
              className="btn-luxury-secondary px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] group"
            >
              <span>Explore Menu</span>
              <span className="ml-2 inline-block group-hover:translate-y-0.5 transition-transform text-[#C23B22]">↓</span>
            </a>
          </div>
        </div>

        {/* 4 Corner Annotations */}
        <div
          ref={calloutsRef}
          className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-300"
        >
          {/* Desktop 4 Corner Annotations */}
          <div className="hidden lg:flex absolute inset-0 max-w-7xl mx-auto p-8 sm:p-12 flex-col justify-between pointer-events-none">
            {/* Top Left */}
            <div className="self-start mt-20 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-left max-w-xs pointer-events-auto">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#E38A2C] uppercase tracking-wider mb-1 font-semibold">
                <span>01 • MEZBANI GOSHT</span>
                <span>HEAVY FEAST</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                Prime beef slow-braised in wood-pressed mustard oil with roasted radhuni.
              </p>
            </div>

            {/* Top Right */}
            <div className="self-end mt-20 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-right max-w-xs pointer-events-auto">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#6B3F1D] uppercase tracking-wider mb-1 font-semibold">
                <span>MATIR KULHAD</span>
                <span>02 • SHONDHANI CHA</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                Steaming orthodox Sylhet tea brewed in porous clay cups with bruised cardamom.
              </p>
            </div>

            {/* Bottom Left */}
            <div className="self-start mb-20 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-left max-w-xs pointer-events-auto">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#E38A2C] uppercase tracking-wider mb-1 font-semibold">
                <span>03 • CHINIGURA POLAO</span>
                <span>DESHI GHEE</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                Fragrant Bengal short grains perfumed with whole spices and ghee.
              </p>
            </div>

            {/* Bottom Right */}
            <div className="self-end mb-20 bg-[rgba(250,250,248,0.95)] border border-[rgba(43,35,32,0.12)] rounded-2xl p-3.5 shadow-xl text-right max-w-xs pointer-events-auto">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8A5A2B] uppercase tracking-wider mb-1 font-semibold">
                <span>SLOW-DRIPPED</span>
                <span>04 • ROASTED COFFEE</span>
              </div>
              <p className="text-xs text-[#2B2320] font-medium leading-snug">
                Dark chicory roast slow-dripped into traditional brass carafes.
              </p>
            </div>
          </div>
        </div>

        {/* Pulsing Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(250,250,248,0.92)] backdrop-blur-md border border-[rgba(43,35,32,0.12)] shadow-md">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#6B3F1D] font-semibold">
              SCROLL TO EXPLORE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E38A2C] animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
}
