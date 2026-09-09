"use client";

import React, { useEffect, useState } from "react";
import { resolveAsset } from "@/lib/assetResolver";

interface EditorialPreloaderProps {
  onComplete: () => void;
}

const TITLE_LETTERS = "VAANAM · CHATTOGRAM".split("");

export default function EditorialPreloader({ onComplete }: EditorialPreloaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Preload hero photo
    const heroImg = new window.Image();
    heroImg.src = resolveAsset("/assets/photos/img-kulhad-hero.jpg");

    const startTime = Date.now();
    const targetDuration = 1100; // Snappy < 1.5s reveal

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const linear = Math.min(elapsed / targetDuration, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      const currentVal = Math.floor(eased * 100);
      setProgress(currentVal);

      if (linear < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setIsDismissed(true);
            onComplete();
          }, 350);
        }, 120);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  if (isDismissed) return null;

  const letterProgress = Math.floor((progress / 100) * TITLE_LETTERS.length);

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#FAFAF8] text-[#2B2320] flex flex-col justify-between p-8 sm:p-14 transition-all duration-700 select-none ${
        isFinished
          ? "opacity-0 -translate-y-8 pointer-events-none scale-[1.01]"
          : "opacity-100 translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E38A2C] animate-ping" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#2B2320]">
            VAANAM • CHATTOGRAM
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#61534E] font-mono">
          COASTAL FEASTS & ARTISANAL CHA
        </div>
      </div>

      {/* Center Staggered Letter Typography & Percentage */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#E38A2C] font-mono mb-4 font-semibold">
          Coastal Culinary Atelier · Chattogram
        </p>

        {/* Letter-by-letter reveal */}
        <div className="flex flex-wrap items-baseline gap-x-1 sm:gap-x-2 border-b border-[rgba(43,35,32,0.1)] pb-8 mb-6">
          <h1 className="font-fraunces text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#6B3F1D] leading-[1.1] flex flex-wrap">
            {TITLE_LETTERS.map((char, index) => (
              <span
                key={index}
                className="transition-all duration-300"
                style={{
                  opacity: index <= letterProgress ? 1 : 0.15,
                  transform: index <= letterProgress ? "translateY(0)" : "translateY(8px)",
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Dynamic Context & Progress Counter */}
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono tracking-[0.2em] text-[#61534E] uppercase">
            {progress < 35
              ? "01 / GATHERING COASTAL SPICES & SYLHET TEA LEAVES"
              : progress < 70
              ? "02 / SLOW-SIMMERED MEZBANI POTS & CLAY KULHAD"
              : "03 / ELEVATING CHATTOGRAM DINING & ADDA"}
          </div>

          <div className="font-mono text-3xl sm:text-5xl font-light text-[#2B2320] tabular-nums">
            {progress}
            <span className="text-base sm:text-xl text-[#E38A2C] ml-1 font-sans font-normal">%</span>
          </div>
        </div>

        {/* Thin Saffron Accent Progress Bar */}
        <div className="mt-6 w-full h-[3px] bg-[rgba(43,35,32,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E38A2C] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Minimal Footer */}
      <div className="flex items-center justify-between border-t border-[rgba(43,35,32,0.08)] pt-6 text-[10px] sm:text-[11px] text-[#61534E] font-mono tracking-widest uppercase">
        <span>High-Key Daylight Experience</span>
        <span>Chattogram, Bangladesh</span>
      </div>
    </div>
  );
}
