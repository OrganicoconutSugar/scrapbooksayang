// Ransom cutout chapter header — each letter has distinct style
import React from "react";

interface ChapterHeaderProps {
  chapter: 1 | 2;
}

// Letter style configurations for ransom note aesthetic
const chapterLetterStyles: Record<
  number,
  { char: string; font: string; color: string; bg?: string; rotate: number; size: string; shadow?: string }[]
> = {
  1: [
    // "CHAPTER" letters
    { char: "C", font: "'Anton', sans-serif", color: "#FFFFFF", bg: "#181615", rotate: -2, size: "56px" },
    { char: "H", font: "'Archivo Black', sans-serif", color: "#FF4E11", bg: "transparent", rotate: 1, size: "62px", shadow: "3px 3px 0 #141414" },
    { char: "A", font: "'Anton', sans-serif", color: "#FAED27", bg: "#121212", rotate: -1, size: "58px" },
    { char: "P", font: "'Archivo Black', sans-serif", color: "#FFFFFF", bg: "#FF4E11", rotate: 2, size: "60px" },
    { char: "T", font: "'Anton', sans-serif", color: "#121212", bg: "#FAFAF7", rotate: -3, size: "64px", shadow: "3px 3px 0 #FF4E11" },
    { char: "E", font: "'Archivo Black', sans-serif", color: "#FF5E3A", bg: "transparent", rotate: 1, size: "58px", shadow: "3px 3px 0 #141414" },
    { char: "R", font: "'Anton', sans-serif", color: "#FFFFFF", bg: "#2a2a2a", rotate: -1, size: "60px" },
  ],
  2: [
    { char: "C", font: "'Anton', sans-serif", color: "#FAED27", bg: "#181615", rotate: 2, size: "56px" },
    { char: "H", font: "'Archivo Black', sans-serif", color: "#FAFAF7", bg: "#FF4E11", rotate: -2, size: "60px" },
    { char: "A", font: "'Anton', sans-serif", color: "#38E4AE", bg: "transparent", rotate: 1, size: "62px", shadow: "3px 3px 0 #141414" },
    { char: "P", font: "'Archivo Black', sans-serif", color: "#121212", bg: "#FAFAF7", rotate: -1, size: "58px" },
    { char: "T", font: "'Anton', sans-serif", color: "#FFFFFF", bg: "#FF5E3A", rotate: 3, size: "64px" },
    { char: "E", font: "'Archivo Black', sans-serif", color: "#FF4E11", bg: "transparent", rotate: -2, size: "56px", shadow: "3px 3px 0 #FAED27" },
    { char: "R", font: "'Anton', sans-serif", color: "#FFFFFF", bg: "#1a1a1a", rotate: 1, size: "60px" },
  ],
};

const numeralStyles: Record<number, { color: string; bg: string; shadow: string }> = {
  1: { color: "#FAFAF7", bg: "#FF4E11", shadow: "6px 6px 0 #141414" },
  2: { color: "#FAED27", bg: "#FF4E11", shadow: "6px 6px 0 #141414" },
};

export default function ChapterHeader({ chapter }: ChapterHeaderProps) {
  const letters = chapterLetterStyles[chapter];
  const numStyle = numeralStyles[chapter];

  return (
    <header className="mb-8 pt-4" role="banner" aria-label={`Chapter ${chapter} header`}>
      {/* "CHAPTER" ransom letters */}
      <div className="flex items-end gap-[2px] flex-wrap">
        {letters.map((l, i) => (
          <span
            key={i}
            className="ransom-letter inline-flex items-center justify-center px-1 leading-none select-none"
            style={{
              fontFamily: l.font,
              color: l.color,
              background: l.bg || "transparent",
              transform: `rotate(${l.rotate}deg)`,
              fontSize: l.size,
              boxShadow: l.shadow || "none",
              border: l.bg && l.bg !== "transparent" ? "2px solid #141414" : "none",
              padding: l.bg && l.bg !== "transparent" ? "0 4px" : "0 2px",
              lineHeight: 1.05,
            }}
          >
            {l.char}
          </span>
        ))}
      </div>

      {/* Large numeral tile */}
      <div className="mt-3 flex items-center gap-4">
        <div
          className="flex items-center justify-center w-24 h-24 border-4 border-[#141414]"
          style={{
            background: numStyle.bg,
            boxShadow: numStyle.shadow,
          }}
          aria-label={`Chapter number ${chapter}`}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              color: numStyle.color,
              fontSize: "72px",
              lineHeight: 1,
            }}
          >
            {chapter}
          </span>
        </div>

        {/* Decorative dash rule */}
        <div className="flex-1 h-[3px] bg-[#FF4E11] relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF4E11] border-2 border-[#141414]" />
        </div>
      </div>
    </header>
  );
}
