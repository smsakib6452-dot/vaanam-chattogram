"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EditorialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const imageMask = imageMaskRef.current;
    const textContainer = textContainerRef.current;
    if (!section || !imageMask || !textContainer) return;

    const ctx = gsap.context(() => {
      // Clipping mask reveal on image
      gsap.fromTo(
        imageMask,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.08,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "center center",
            scrub: false,
          },
        }
      );

      // Line-by-line staggered text reveal
      const textElements = textContainer.querySelectorAll(".story-reveal");
      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textContainer,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAF8] py-28 sm:py-36 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.06)]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Narrative Philosophy */}
        <div ref={textContainerRef} className="lg:col-span-6 space-y-8">
          <div className="story-reveal flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D3C]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#61534E]">
              02 — EVERY TABLE TELLS A STORY
            </span>
          </div>

          <h2 className="story-reveal font-fraunces text-4xl sm:text-5xl lg:text-6xl font-light text-[#2B2320] leading-[1.08] tracking-tight">
            Every ingredient carries the memory of the coast and the slow fire.
          </h2>

          <div className="story-reveal w-16 h-[1px] bg-[#2B2320]" />

          <p className="story-reveal text-sm sm:text-base text-[#61534E] font-inter font-light leading-relaxed">
            In Chattogram, a meal is never a solitary act; it is an open invitation. Rooted in centuries of coastal trade and the historic Mezbani hospitality traditions, the culinary rhythm of Bengal unites communal spirit with patient, deliberate cooking over seasoned wood and clay.
          </p>

          <p className="story-reveal text-sm sm:text-base text-[#61534E] font-inter font-light leading-relaxed">
            At VAANAM, we honor this living heritage. By deconstructing the table into its core elements, each component reveals its quiet poetry: the pungent clarity of cold-pressed mustard oil, the fragrance of freshly pounded radhuni, and the deep, caramelized soul of slow-simmered brass pots.
          </p>

          {/* Pull Quote */}
          <div className="story-reveal pl-6 border-l-2 border-[#C86D3C] py-2 my-6">
            <blockquote className="font-fraunces italic text-lg sm:text-xl text-[#2B2320]">
              &ldquo;A culinary narrative shaped by coastal estuaries, fragrant short grains, and generational spice lore.&rdquo;
            </blockquote>
            <cite className="block text-[11px] font-mono tracking-widest uppercase text-[#96867F] mt-2 not-italic">
              — Coastal Bengal Culinary Chronicle
            </cite>
          </div>

          {/* Metadata Specs */}
          <div className="story-reveal pt-6 border-t border-[rgba(43,35,32,0.08)] grid grid-cols-3 gap-6 font-mono">
            <div>
              <span className="text-[10px] text-[#96867F] uppercase tracking-wider block">Origin</span>
              <span className="text-xs text-[#2B2320] font-medium">Chattogram</span>
            </div>
            <div>
              <span className="text-[10px] text-[#96867F] uppercase tracking-wider block">Tradition</span>
              <span className="text-xs text-[#2B2320] font-medium">Mezbani Heritage</span>
            </div>
            <div>
              <span className="text-[10px] text-[#96867F] uppercase tracking-wider block">Philosophy</span>
              <span className="text-xs text-[#2B2320] font-medium">Slow Simmered</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mask-Revealed Editorial Image */}
        <div className="lg:col-span-6 relative">
          <div
            ref={imageMaskRef}
            data-cursor="view"
            className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-xl overflow-hidden shadow-2xl bg-[#EDE8E1]"
          >
            <Image
              src="/images/IMAGE 01 — HERO.jpg"
              alt="Editorial presentation of Chattogram feast on warm off-white studio background"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Subtle paper caption */}
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-[rgba(250,250,248,0.92)] backdrop-blur-sm border border-[rgba(43,35,32,0.08)] rounded-lg flex items-center justify-between text-[10px] font-mono tracking-wider text-[#61534E]">
              <span>FIG. 2.0 — THE COASTAL TABLE</span>
              <span>CHATTOGRAM • STUDIO TABLEAU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
