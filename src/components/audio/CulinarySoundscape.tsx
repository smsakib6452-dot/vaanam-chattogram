"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function CulinarySoundscape() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<{
    noiseSource?: AudioBufferSourceNode;
    brownNoiseSource?: AudioBufferSourceNode;
    oscillators: OscillatorNode[];
    lfo?: OscillatorNode;
  }>({
    oscillators: [],
  });

  // Soft, warm organic entrance bell (gentle 216Hz singing bowl with long exponential decay)
  const playWarmSingingBowl = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm 216 Hz (Deep meditative tone, no harsh highs)
      osc.type = "sine";
      osc.frequency.setValueAtTime(216, now);

      overtone.type = "sine";
      overtone.frequency.setValueAtTime(432, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);

      // Very soft gain with long gentle decay over 2.5s
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(filter);
      overtone.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 2.6);
      overtone.stop(now + 2.6);
    } catch {
      // Safe skip
    }
  };

  // Start Organic Coastal Soundscape: Deep Ocean Breeze + Warm Tea Simmer + Low Acoustic Pad
  const startCoastalSoundscape = (ctx: AudioContext, masterGain: GainNode) => {
    const now = ctx.currentTime;
    const sampleRate = ctx.sampleRate;
    const bufferDuration = 5; // 5 seconds seamless loop
    const bufferSize = sampleRate * bufferDuration;

    // 1. Deep Brown Noise (1/f²): The peaceful, rhythmic breathing of the Bay of Bengal coast
    const brownBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const brownData = brownBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      brownData[i] = (lastOut + 0.025 * white) / 1.025;
      lastOut = brownData[i];
      brownData[i] *= 3.5; // Calibrate volume
    }

    const brownSource = ctx.createBufferSource();
    brownSource.buffer = brownBuffer;
    brownSource.loop = true;

    // Dual-stage warm low-pass filter: cuts all harsh treble, leaves only deep gentle wave murmur
    const brownFilter = ctx.createBiquadFilter();
    brownFilter.type = "lowpass";
    brownFilter.frequency.setValueAtTime(240, now);
    brownFilter.Q.setValueAtTime(0.7, now);

    // Slow LFO for gentle coastal swell (0.06Hz = 16-second breathing ocean wave)
    const swellLfo = ctx.createOscillator();
    swellLfo.frequency.setValueAtTime(0.06, now);

    const swellGain = ctx.createGain();
    swellGain.gain.setValueAtTime(0.04, now);

    const brownGain = ctx.createGain();
    brownGain.gain.setValueAtTime(0.12, now);

    swellLfo.connect(swellGain);
    swellGain.connect(brownGain.gain);
    swellLfo.start(now);

    brownSource.connect(brownFilter);
    brownFilter.connect(brownGain);
    brownGain.connect(masterGain);
    brownSource.start(now);

    // 2. Ultra-Soft Pink Noise: Gentle warm tea kettle simmer (velvety warmth, no high hissing)
    const pinkBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const pinkData = pinkBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + white * 0.05;
      b1 = 0.95 * b1 + white * 0.07;
      b2 = 0.85 * b2 + white * 0.1;
      pinkData[i] = (b0 + b1 + b2) * 0.08;
    }

    const pinkSource = ctx.createBufferSource();
    pinkSource.buffer = pinkBuffer;
    pinkSource.loop = true;

    const pinkFilter = ctx.createBiquadFilter();
    pinkFilter.type = "lowpass";
    pinkFilter.frequency.setValueAtTime(380, now); // Warm cut at 380Hz

    const pinkGain = ctx.createGain();
    pinkGain.gain.setValueAtTime(0.08, now);

    pinkSource.connect(pinkFilter);
    pinkFilter.connect(pinkGain);
    pinkGain.connect(masterGain);
    pinkSource.start(now);

    // 3. Low Meditative Acoustic Tanpura Pad (108Hz & 162Hz deep warm undertones)
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.06, now);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = "lowpass";
    droneFilter.frequency.setValueAtTime(220, now);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    const droneOscs: OscillatorNode[] = [];
    const lowChord = [108, 162, 216]; // Deep warm natural harmonic series

    lowChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq + (idx === 1 ? 0.3 : 0), now); // Natural warm chorus
      osc.connect(droneFilter);
      osc.start(now);
      droneOscs.push(osc);
    });

    activeNodesRef.current = {
      brownNoiseSource: brownSource,
      noiseSource: pinkSource,
      oscillators: droneOscs,
      lfo: swellLfo,
    };
  };

  // Stop Soundscape Smoothly
  const stopCoastalSoundscape = () => {
    const nodes = activeNodesRef.current;
    if (nodes.brownNoiseSource) {
      try {
        nodes.brownNoiseSource.stop();
        nodes.brownNoiseSource.disconnect();
      } catch {}
    }
    if (nodes.noiseSource) {
      try {
        nodes.noiseSource.stop();
        nodes.noiseSource.disconnect();
      } catch {}
    }
    if (nodes.oscillators) {
      nodes.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
    }
    if (nodes.lfo) {
      try {
        nodes.lfo.stop();
        nodes.lfo.disconnect();
      } catch {}
    }
    activeNodesRef.current = { oscillators: [] };
  };

  // Toggle Soundscape on User Click
  const toggleSound = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;

      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      if (!masterGainRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;
      }

      const gain = masterGainRef.current;

      if (isPlaying) {
        // Fade out smoothly over 0.6s
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

        setTimeout(() => {
          stopCoastalSoundscape();
        }, 650);

        setIsPlaying(false);
      } else {
        // Soft singing bowl tone
        playWarmSingingBowl(ctx);

        // Start soothing organic coastal atmosphere
        stopCoastalSoundscape();
        startCoastalSoundscape(ctx, gain);

        // Smoothly fade in master volume to a soothing, comfortable level (0.24)
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 1.2);

        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Error toggling soundscape:", err);
    }
  };

  useEffect(() => {
    return () => {
      stopCoastalSoundscape();
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold select-none cursor-pointer group shadow-sm active:scale-95 ${
        isPlaying
          ? "border-[#E38A2C] bg-[rgba(250,250,248,0.98)] text-[#2B2320] ring-2 ring-[rgba(227,138,44,0.3)] shadow-[0_4px_14px_rgba(227,138,44,0.25)]"
          : "border-[rgba(43,35,32,0.14)] hover:border-[#2B2320] bg-[rgba(250,250,248,0.88)] backdrop-blur-md text-[#2B2320] hover:shadow-md"
      }`}
      aria-label={isPlaying ? "Mute coastal soundscape" : "Enable calming coastal soundscape"}
      title="Calming Coastal Ambience (Bay of Bengal Breeze & Warm Kettle Simmer)"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E38A2C] opacity-80" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isPlaying ? "bg-[#E38A2C]" : "bg-[rgba(43,35,32,0.3)]"
          }`}
        />
      </span>
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#E38A2C] animate-pulse" />
          <span className="whitespace-nowrap text-[#E38A2C]">Sound: On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#61534E] opacity-70 group-hover:opacity-100" />
          <span className="whitespace-nowrap text-[#61534E]">Sound: Off</span>
        </>
      )}
    </button>
  );
}

