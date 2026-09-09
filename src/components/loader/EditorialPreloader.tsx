"use client";

import React, { useEffect, useState } from "react";

import { assetPath } from "@/lib/assets";

interface EditorialPreloaderProps {
  onComplete: () => void;
}

export default function EditorialPreloader({ onComplete }: EditorialPreloaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Preload the lightweight optimized hero image instead of choking bandwidth with 4MB video
    const heroImg = new window.Image();
    heroImg.src = assetPath("/images/IMAGE 01 — HERO.jpg");

    let isImgLoaded = false;
    heroImg.onload = () => {
      isImgLoaded = true;
    };
    if (heroImg.complete) {
      isImgLoaded = true;
    }

    const startTime = Date.now();
    const targetDuration = 800; // 0.8s swift, elegant editorial intro

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

  const getSubtext = (val: number) => {
    if (val < 30) return "01 / GATHERING COASTAL SPICES & MUSTARD OIL";
    if (val < 65) return "02 / PREPARING SLOW-SIMMERED CLAY POTS";
    if (val < 92) return "03 / SETTING THE CONTEMPORARY EDITORIAL TABLE";
    return "04 / VAANAM CHATTOGRAM READY";
  };

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#FAFAF8] text-[#2B2320] flex flex-col justify-between p-8 sm:p-14 transition-all duration-800 ${
        isFinished
          ? "opacity-0 -translate-y-6 pointer-events-none scale-[1.01]"
          : "opacity-100 translate-y-0"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[rgba(43,35,32,0.08)] pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C86D3C]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#2B2320]">
            VAANAM • CHATTOGRAM
          </span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#61534E]">
          CONTEMPORARY COASTAL DINING
        </div>
      </div>

      {/* Center typography & percentage */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-[rgba(43,35,32,0.1)] pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C86D3C] font-mono mb-3">
              Editorial Experience
            </p>
            <h1 className="font-fraunces text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#2B2320] leading-[1.05]">
              The Taste of Chattogram.
            </h1>
          </div>

          <div className="font-mono text-5xl sm:text-7xl md:text-8xl font-extralight text-[#2B2320] tracking-tighter self-end tabular-nums">
            {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
            <span className="text-lg sm:text-2xl text-[#C86D3C] ml-1 font-sans">%</span>
          </div>
        </div>

        {/* Dynamic Curated Stage */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#61534E]">
            {getSubtext(progress)}
          </p>
          <p className="text-[11px] tracking-wider text-[#96867F] font-mono">
            CHATTOGRAM, BANGLADESH
          </p>
        </div>

        {/* Minimal Hairline Progress */}
        <div className="mt-8 w-full h-[2px] bg-[rgba(43,35,32,0.06)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2B2320] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between border-t border-[rgba(43,35,32,0.08)] pt-6 text-[10px] sm:text-[11px] text-[#61534E] font-mono tracking-widest uppercase">
        <span>Curated for Mindful Scroll</span>
        <span>60 FPS Frame Lock</span>
      </div>
    </div>
  );
}
