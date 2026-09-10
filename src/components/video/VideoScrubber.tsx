"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { resolveAsset } from "@/lib/assetResolver";
import WarmWhitePlaceholder from "./WarmWhitePlaceholder";

interface VideoScrubberProps {
  videoSrc?: string;
  fallbackImage?: string;
  alt: string;
  priority?: boolean;
  className?: string;
  zoomIntensity?: number;
  label?: string;
  accentColor?: string;
  showBadge?: boolean;
  isActive?: boolean;
  pauseOnEnd?: boolean;
}

// Global singleton to guarantee ONLY one video decodes and plays at a time across the entire site
let currentlyPlayingVideo: HTMLVideoElement | null = null;

export default function VideoScrubber({
  videoSrc,
  fallbackImage,
  alt,
  priority = false,
  className = "",
  label = "60 FPS CINEMATIC MOTION",
  accentColor = "#E38A2C",
  showBadge = true,
  isActive = true,
  pauseOnEnd = false,
}: VideoScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [shouldPreload, setShouldPreload] = useState<boolean>(priority);

  const isInViewportRef = useRef<boolean>(false);
  useEffect(() => {
    isInViewportRef.current = isInViewport;
  }, [isInViewport]);

  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;
    if (video.paused) {
      if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
        try {
          currentlyPlayingVideo.pause();
        } catch {}
      }
      currentlyPlayingVideo = video;
      const p = video.play();
      playPromiseRef.current = p;
      if (p !== undefined) {
        p.then(() => {
          playPromiseRef.current = null;
          setIsPlaying(true);
        }).catch(() => {
          playPromiseRef.current = null;
        });
      }
    }
  }, [isActive]);

  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          video.pause();
          if (currentlyPlayingVideo === video) currentlyPlayingVideo = null;
          setIsPlaying(false);
        })
        .catch(() => {
          video.pause();
          if (currentlyPlayingVideo === video) currentlyPlayingVideo = null;
          setIsPlaying(false);
        });
    } else {
      video.pause();
      if (currentlyPlayingVideo === video) currentlyPlayingVideo = null;
      setIsPlaying(false);
    }
  }, []);

  // Sync active state (e.g. Hero crossfade tabs)
  useEffect(() => {
    if (!isActive) {
      safePause();
    } else if (isInViewportRef.current && videoLoaded) {
      safePlay();
    }
  }, [isActive, videoLoaded, safePlay, safePause]);

  // 1. Two-Stage Observer: Preload proximity buffer + Play ONLY when on-screen
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    // A. Early Proximity Buffer Observer (Starts network buffering 600px before reaching screen)
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldPreload(true);
          if (video && video.preload !== "auto") {
            video.preload = "auto";
          }
        }
      },
      { rootMargin: "600px 0px", threshold: 0 }
    );

    // B. Active Viewport Observer (Plays strictly when in view, pauses any others)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInViewport(true);
          if (isActive) {
            safePlay();
          }
        } else {
          setIsInViewport(false);
          safePause();
        }
      },
      { rootMargin: "0px", threshold: 0.12 }
    );

    preloadObserver.observe(container);
    activeObserver.observe(container);

    return () => {
      preloadObserver.disconnect();
      activeObserver.disconnect();
      safePause();
    };
  }, [isActive, safePlay, safePause]);

  // 2. Robust Video Buffer Readiness
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    setHasError(false);

    const checkAndActivate = () => {
      if (!video) return;
      if (video.readyState >= 2) {
        setVideoLoaded(true);
        if (isInViewportRef.current && isActive) {
          safePlay();
        }
      }
    };

    const handleVideoError = () => {
      setHasError(true);
      setVideoLoaded(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (currentlyPlayingVideo === video) {
        currentlyPlayingVideo = null;
      }
    };

    video.addEventListener("canplay", checkAndActivate);
    video.addEventListener("loadedmetadata", checkAndActivate);
    video.addEventListener("playing", () => {
      setVideoLoaded(true);
      setIsPlaying(true);
    });
    video.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleVideoError);

    if (video.readyState >= 2) {
      checkAndActivate();
    }

    return () => {
      video.removeEventListener("canplay", checkAndActivate);
      video.removeEventListener("loadedmetadata", checkAndActivate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleVideoError);
    };
  }, [videoSrc]);

  // 3. Play / Pause toggle with Replay support
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
      }
      safePlay();
    } else {
      safePause();
    }
  }, [safePlay, safePause]);

  const resolvedVideoSrc = videoSrc ? resolveAsset(videoSrc) : undefined;
  const resolvedFallbackImage = fallbackImage ? resolveAsset(fallbackImage) : undefined;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#FAFAF8] select-none ${className}`}
    >
      {/* 1. Real 1080p HD MP4 Video Element (Hardware-accelerated 60fps, single active decoder) */}
      {resolvedVideoSrc && !hasError && (
        <video
          ref={videoRef}
          src={resolvedVideoSrc}
          playsInline
          muted
          loop={!pauseOnEnd}
          autoPlay
          preload={priority || shouldPreload ? "auto" : "metadata"}
          disablePictureInPicture
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out will-change-transform ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            contain: "paint",
          }}
        />
      )}

      {/* 2. Fallback Base Image while video buffers */}
      {resolvedFallbackImage && (
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={resolvedFallbackImage}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1920px"
            className="object-cover object-center"
            quality={90}
          />
        </div>
      )}

      {/* 3. Graceful Warm-White Placeholder if neither video nor image is available */}
      {(!resolvedVideoSrc || hasError) && !resolvedFallbackImage && (
        <WarmWhitePlaceholder
          label={alt || label}
          category="cinematic"
          accentColor={accentColor}
        />
      )}

      {/* 4. Sleek Luxury Editorial Motion Status Pill */}
      {showBadge && (
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 bg-[rgba(250,250,248,0.96)] border border-[rgba(43,35,32,0.12)] px-3 py-1.5 rounded-full shadow-md pointer-events-auto">
          <button
            type="button"
            onClick={togglePlay}
            className="w-6 h-6 rounded-full bg-[#2B2320] text-[#FAFAF8] flex items-center justify-center hover:bg-[#C86D3C] transition-colors cursor-pointer shadow-sm"
            title={isPlaying ? "Pause Motion" : "Play / Replay 60fps Motion"}
            aria-label={isPlaying ? "Pause Motion" : "Play / Replay 60fps Motion"}
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 ml-0.5" />}
          </button>
          <div className="flex items-center gap-1.5 pr-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-emerald-600 animate-pulse" : "bg-[#96867F]"
              }`}
            />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#61534E]">
              {isPlaying ? "60 FPS MOTION" : pauseOnEnd ? "REPLAY" : "PAUSED"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
