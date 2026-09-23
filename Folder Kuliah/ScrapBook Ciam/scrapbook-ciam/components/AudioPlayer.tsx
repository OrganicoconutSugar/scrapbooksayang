"use client";

import { useState } from "react";

const TOTAL_SECONDS = 287; // 4:47

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const currentTime = Math.floor((progress / 100) * TOTAL_SECONDS);

  const handleToggle = () => setIsPlaying((p) => !p);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setProgress(pct);
  };

  return (
    <div
      className="mt-auto pt-6 border-t-2 border-[#141414]"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Label */}
      <p
        className="text-[11px] text-[#5A5A58] mb-3 italic leading-snug"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Let this recently played song lead you through our journey.
      </p>

      {/* Player bar */}
      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          id="audio-play-pause"
          onClick={handleToggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-9 h-9 rounded-none border-2 border-[#141414] bg-[#FF5E3A] flex items-center justify-center flex-shrink-0 transition-all hover:bg-[#e04a29]"
          style={{ boxShadow: "var(--shadow-brutal)" }}
        >
          {isPlaying ? (
            /* Pause icon */
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <rect x="0" y="0" width="4" height="14" fill="#fff" />
              <rect x="8" y="0" width="4" height="14" fill="#fff" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
              <path d="M1 1L12 7L1 13V1Z" fill="#fff" stroke="#fff" strokeWidth="1" />
            </svg>
          )}
        </button>

        {/* Waveform bars */}
        <div className="flex items-center gap-[3px] h-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`wave-bar ${isPlaying ? "" : "paused"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Timecode */}
        <span className="text-[11px] text-[#5A5A58] ml-auto whitespace-nowrap">
          {formatTime(currentTime)} / 4:47
        </span>
      </div>

      {/* Progress track */}
      <div
        id="audio-progress-track"
        className="mt-3 h-[3px] bg-[#D8D6CE] cursor-pointer relative"
        onClick={handleTrackClick}
        role="slider"
        aria-label="Playback progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div
          className="h-full bg-[#FF5E3A] transition-none"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FF5E3A] border-2 border-[#141414]"
          style={{ left: `calc(${progress}% - 5px)` }}
        />
      </div>
    </div>
  );
}
