"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function CulinarySoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Warm studio room tone (filtered gentle pink/brown noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.08;
        b2 = 0.86 * b2 + white * 0.15;
        output[i] = (b0 + b1 + b2) * 0.08;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(320, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      // 2. Harmonic warm drone (gentle fundamental resonance: 136.1 Hz)
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(136.1, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.04, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();

      // 3. Delicate micro-crackle of tempering spices (mustard oil & seeds)
      const playSpiceCrackle = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "triangle";
        clickOsc.frequency.setValueAtTime(800 + Math.random() * 1200, ctx.currentTime);

        clickGain.gain.setValueAtTime(0.015, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 0.05);
      };

      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.4) {
          playSpiceCrackle();
        }
      }, 350);
    } catch (err) {
      console.warn("Audio Context init error:", err);
    }
  };

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (!audioCtxRef.current || !masterGainRef.current) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;

    if (isPlaying) {
      // Fade out
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setIsPlaying(false);
    } else {
      // Fade in
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.8);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(43,35,32,0.14)] hover:border-[#2B2320] bg-[rgba(250,250,248,0.8)] backdrop-blur-sm text-[#2B2320] transition-all duration-300 text-[11px] uppercase tracking-wider font-medium select-none group"
      aria-label={isPlaying ? "Mute culinary soundscape" : "Enable culinary acoustic soundscape"}
      title="Ambient Culinary Acoustic Soundscape"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C86D3C] opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-[#C86D3C]" : "bg-[rgba(43,35,32,0.3)]"
          }`}
        />
      </span>
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#C86D3C]" />
          <span className="hidden sm:inline">Sound: Ambient</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          <span className="hidden sm:inline">Sound: Off</span>
        </>
      )}
    </button>
  );
}
