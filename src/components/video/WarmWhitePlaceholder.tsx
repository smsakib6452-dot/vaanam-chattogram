"use client";

import React from "react";
import { Film, Image as ImageIcon } from "lucide-react";

interface WarmWhitePlaceholderProps {
  label: string;
  category?: "video" | "photo" | "cinematic";
  accentColor?: string;
  className?: string;
  subtext?: string;
}

export default function WarmWhitePlaceholder({
  label,
  category = "video",
  accentColor = "#E38A2C",
  className = "",
  subtext = "EDITORIAL ASSET PLACEHOLDER · HIGH-KEY DAYLIGHT CANVAS",
}: WarmWhitePlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[220px] bg-[#FAFAF8] border border-[rgba(43,35,32,0.12)] rounded-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden shadow-inner select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 50% 40%, rgba(227, 138, 44, 0.04) 0%, transparent 70%)`,
      }}
    >
      {/* Subtle editorial corner notches */}
      <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[rgba(43,35,32,0.2)]" />
      <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[rgba(43,35,32,0.2)]" />
      <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[rgba(43,35,32,0.2)]" />
      <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[rgba(43,35,32,0.2)]" />

      {/* Center Icon badge */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm border border-[rgba(43,35,32,0.08)]"
        style={{ backgroundColor: "#F5F3EF" }}
      >
        {category === "video" || category === "cinematic" ? (
          <Film className="w-5 h-5" style={{ color: accentColor }} />
        ) : (
          <ImageIcon className="w-5 h-5" style={{ color: accentColor }} />
        )}
      </div>

      {/* Label and Category badge */}
      <span
        className="text-[9px] font-mono tracking-[0.25em] uppercase font-semibold px-2.5 py-0.5 rounded-full mb-2"
        style={{
          backgroundColor: `${accentColor}15`,
          color: accentColor,
        }}
      >
        {category} asset
      </span>

      <h4 className="font-fraunces text-base sm:text-lg font-light text-[#2B2320] max-w-sm leading-snug">
        {label}
      </h4>

      <p className="text-[10px] font-mono text-[#61534E] tracking-wider uppercase mt-2 opacity-80">
        {subtext}
      </p>

      {/* Subtle simulated steam or shimmer bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E38A2C] to-transparent opacity-30 animate-pulse" />
    </div>
  );
}
