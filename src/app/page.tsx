"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import EditorialPreloader from "@/components/loader/EditorialPreloader";
import CustomCursor from "@/components/cursor/CustomCursor";
import SpiceParticleCanvas from "@/components/3d/SpiceParticleCanvas";
import EditorialNav from "@/components/navigation/EditorialNav";
import ReservationModal from "@/components/modal/ReservationModal";

import HeroSection from "@/components/sections/HeroSection";
import EditorialStory from "@/components/sections/EditorialStory";
import ExplodedSamosa from "@/components/sections/ExplodedSamosa";
import IngredientsConstellation from "@/components/sections/IngredientsConstellation";
import CraftProcess from "@/components/sections/CraftProcess";
import SignatureSauces from "@/components/sections/SignatureSauces";
import DiningExperience from "@/components/sections/DiningExperience";
import ReservationSection from "@/components/sections/ReservationSection";

export default function Home() {
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-[#FAFAF8] text-[#2B2320] min-h-screen selection:bg-[#2B2320] selection:text-[#FAFAF8]">
      {/* 1. Editorial Preloader (Percentage counter & paper morph) */}
      <EditorialPreloader onComplete={() => setIsPreloaded(true)} />

      {/* 2. Magnetic Custom Cursor with Context Badges */}
      <CustomCursor />



      {/* 4. Editorial Navigation Header */}
      <EditorialNav onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 5. Orchestrated Editorial Flow */}
      <div className={`transition-opacity duration-1000 ${isPreloaded ? "opacity-100" : "opacity-0"}`}>
        {/* SECTION 1: Hero (01 — The Taste of Chattogram Video Scrub) */}
        <HeroSection onOpenReservation={() => setIsReservationOpen(true)} />

        {/* SECTION 2: Editorial Story (02 — Every Table Tells a Story) */}
        <EditorialStory />

        {/* SECTION 3: Anatomy of a Singara (03 — Anatomy of a Singara Video Scrub) */}
        <ExplodedSamosa />

        {/* SECTION 4: The Spice Language (04 — The Spice Language & 7-Spice Constellation) */}
        <IngredientsConstellation />

        {/* SECTION 5: The Culinary Alchemy (05 — Four-Stage Cooking Alchemy) */}
        <CraftProcess />

        {/* SECTION 6: Kasundi & The Ferment (06 — Artisanal Condiments & Pour) */}
        <SignatureSauces />

        {/* SECTION 7: The Table (07 — Reassembled Coastal Table & Gallery) */}
        <DiningExperience />

        {/* SECTION 8: Reservation CTA & Editorial Colophon */}
        <ReservationSection onOpenReservation={() => setIsReservationOpen(true)} />
      </div>

      {/* Private Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </main>
  );
}
