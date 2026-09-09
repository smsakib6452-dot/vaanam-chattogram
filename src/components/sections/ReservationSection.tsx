"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Clock, MapPin, Phone } from "lucide-react";
import VideoScrubber from "@/components/video/VideoScrubber";

interface ReservationSectionProps {
  onOpenReservation: () => void;
}

export default function ReservationSection({ onOpenReservation }: ReservationSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoParallaxRef = useRef<HTMLDivElement>(null);
  const [quickDate, setQuickDate] = useState<string>("2026-09-18");
  const [quickGuests, setQuickGuests] = useState<number>(2);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (videoParallaxRef.current && window.innerWidth >= 768) {
        gsap.fromTo(
          videoParallaxRef.current,
          { y: -30, scale: 1.05 },
          {
            y: 30,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenReservation();
  };

  return (
    <footer
      id="reservation"
      ref={containerRef}
      className="relative w-full bg-[#FAFAF8] pt-24 pb-16 px-6 sm:px-12 lg:px-20 border-t border-[rgba(43,35,32,0.08)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Cinematic Parallax Background Spread Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#F5F2EA] border border-[rgba(43,35,32,0.08)] mb-16">
          <div ref={videoParallaxRef} className="w-full h-full relative will-change-transform">
            <VideoScrubber
              videoSrc="/assets/videos/finale-table-spread.mp4"
              fallbackImage="/assets/photos/img-poster.jpg"
              alt="Grand assembled dining spread and steaming chai in Chattogram daylight"
              accentColor="#C23B22"
              label="FINALE TABLE SPREAD"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Editorial Section Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(194,59,34,0.25)] bg-[rgba(250,250,248,0.9)] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C23B22]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#C23B22] font-semibold">
              08 — THE FINALE · FEAST & CHAI EXPERIENCE
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-light text-[#2B2320] tracking-tight leading-[1.05] mb-6">
            Where Heavy Feasts Meet <br />
            <span className="text-[#6B3F1D] italic">The Meditative Cha.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#61534E] font-inter font-light max-w-xl mx-auto leading-relaxed mb-10">
            In Chattogram, meals are not rushed. Savor our slow-cooked coastal meats, fragrant Chinigura rice, and finish with a warm clay cup of spiced tea and slow-dripped coffee.
          </p>

          {/* Large Chili Red Button with Magnetic Fill Effect */}
          <div className="mb-14">
            <button
              type="button"
              onClick={onOpenReservation}
              className="relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#C23B22] text-[#FAFAF8] text-sm sm:text-base font-semibold uppercase tracking-widest shadow-xl hover:bg-[#6B3F1D] hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <span>RESERVE YOUR TABLE</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Minimal Quick Booking Bar */}
          <form
            onSubmit={handleQuickSubmit}
            className="max-w-2xl mx-auto bg-[#FAF8F5] border border-[rgba(43,35,32,0.12)] p-2.5 sm:p-3 rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-16"
          >
            <div className="w-full sm:w-1/2 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[rgba(43,35,32,0.1)] text-left">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#96867F] block">
                Party Size
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-medium text-[#2B2320] focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"} (Feast & Chai)
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2 px-4 py-2 text-left">
              <label className="text-[9px] font-mono uppercase tracking-widest text-[#96867F] block">
                Preferred Seating
              </label>
              <input
                type="date"
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-[#2B2320] focus:outline-none cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2B2320] text-[#FAFAF8] text-xs font-medium uppercase tracking-wider hover:bg-[#C23B22] transition-colors cursor-pointer"
            >
              Check Availability
            </button>
          </form>

          {/* Editorial Colophon & Brand Details */}
          <div className="pt-12 border-t border-[rgba(43,35,32,0.08)] grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs font-inter">
            <div>
              <span className="font-fraunces text-2xl text-[#6B3F1D] font-light block mb-2">
                VAANAM
              </span>
              <p className="text-[11px] text-[#61534E] leading-relaxed">
                Coastal Culinary Atelier & Artisanal Cha Studio.
                Rooted in the century-old hospitality of Chattogram, Bangladesh.
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-[#61534E]">
              <div className="flex items-center gap-2 text-[#2B2320] font-medium font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#C23B22]" />
                <span>GEC Circle & Batali Hill Trail, Chattogram</span>
              </div>
              <p>Private Dining, Adda Courtyard & Tea Studio</p>
              <p className="pt-1 font-mono text-[10px] text-[#96867F]">
                Open Daily: 11:30 AM – 11:00 PM BST
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-[#61534E]">
              <div className="flex items-center gap-2 text-[#2B2320] font-medium font-mono">
                <Phone className="w-3.5 h-3.5 text-[#C23B22]" />
                <span>+880 1819-VAANAM (822626)</span>
              </div>
              <p>concierge@vaanam-chattogram.com</p>
              <p className="pt-1 font-mono text-[10px] text-[#96867F]">
                Table reservations & Tea Salon inquiries
              </p>
            </div>
          </div>

          {/* Minimal Bottom Line */}
          <div className="mt-12 pt-6 border-t border-[rgba(43,35,32,0.06)] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-[#96867F] uppercase">
            <span>VAANAM • CHATTOGRAM | COASTAL FEASTS & ARTISANAL CHA</span>
            <span>DESIGNED FOR 60 FPS REEL CAPTURE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
