"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ChapterHeader from "./ChapterHeader";
import PolaroidCard from "./PolaroidCard";
import HighlightText from "./HighlightText";
import { UnderlineDoodle } from "./Doodles";

// Data untuk 6 kartu Chapter 1
const chapter1Cards = [
  {
    id: "card-quiet-start",
    title: "A QUIET START",
    caption: "THE FIRST PLACE WE MET",
    highlightColor: "lavender" as const,
    body: "You walked in, and the— world tilted slightly. Everything got louder, then quieter, all at once.",
    rotate: -2,
    badgeColor: "#E0B0FF",
    badgeTextColor: "#121212",
    tapeRotate: -2,
    imageSrc: "/assets/foto1.jpeg",
  },
  {
    id: "card-research",
    title: "DOIN SOME RESEARCH",
    caption: "DOIN SOME RESEARCH 'BOUT U",
    highlightColor: "yellow" as const,
    body: "Part of organization, running project, chasing you. Always love to learn. The way you talk about things you care about — I took notes.",
    rotate: 2,
    badgeColor: "#FAED27",
    badgeTextColor: "#121212",
    tapeRotate: 2,
    imageSrc: "/assets/foto2.jpeg",
  },
  {
    id: "card-3",
    title: "COFFEE NOTES",
    caption: "LATE NIGHT CONVERSATIONS",
    highlightColor: "mint" as const,
    body: "Hours felt like minutes. Two cups of coffee, one shared dream. The world outside didn't matter when we were talking.",
    rotate: -1,
    badgeColor: "#38E4AE",
    badgeTextColor: "#121212",
    tapeRotate: -1,
    imageSrc: "/assets/foto3.jpeg",
  },
  {
    id: "card-4",
    title: "STOLEN GLANCES",
    caption: "WHEN YOU WEREN'T LOOKING",
    highlightColor: "lavender" as const,
    body: "I caught myself staring more times than I'd admit. There's a certain magic in the way your eyes light up when you laugh.",
    rotate: 3,
    badgeColor: "#E0B0FF",
    badgeTextColor: "#121212",
    tapeRotate: 3,
    imageSrc: "/assets/foto4.jpeg",
  },
  {
    id: "card-5",
    title: "OUR SPOT",
    caption: "JUST US TWO",
    highlightColor: "yellow" as const,
    body: "We claimed this corner of the world. It wasn't about where we were, but who I was with. Everything just felt right.",
    rotate: -3,
    badgeColor: "#FAED27",
    badgeTextColor: "#121212",
    tapeRotate: -3,
    imageSrc: "/assets/foto5.jpeg",
  },
  {
    id: "card-6",
    title: "THE FEELING",
    caption: "SOMETHING MORE",
    highlightColor: "mint" as const,
    body: "It wasn't just a quiet start anymore. It was the beginning of everything. And I wouldn't trade these moments for anything.",
    rotate: 1,
    badgeColor: "#38E4AE",
    badgeTextColor: "#121212",
    tapeRotate: 1,
    imageSrc: "/assets/foto6.jpeg",
  }
];

interface RightPaneProps {
  onChapterChange?: (chapter: number) => void;
}

export default function RightPane({ onChapterChange }: RightPaneProps) {
  const containerRef = useRef<HTMLElement>(null);

// Efek scroll dengan GSAP
   useEffect(() => {
// 1. Observer untuk memicu animasi GSAP saat masuk viewport
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // hide other cards and reset their style
              const cards = document.querySelectorAll('.scroll-card');
              cards.forEach((c) => {
                c.classList.remove('revealed');
                const el = c as HTMLElement;
                el.style.opacity = '0';
                el.style.transform = 'translateY(120px)';
                el.style.zIndex = '0';
                el.style.pointerEvents = 'none';
              });
              // animate current card
              const target = entry.target as HTMLElement;
              gsap.fromTo(
                target,
                { transform: 'translateY(120px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1, duration: 0.8, ease: 'power2.out' }
              );
              target.classList.add('revealed');
              target.style.zIndex = '10';
              target.style.pointerEvents = 'auto';
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        }
      );

     const cards = document.querySelectorAll(".scroll-card");
     cards.forEach((card) => {
       revealObserver.observe(card);
     });

     // 2. Observer untuk melacak Chapter yang aktif
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && onChapterChange) {
            if (entry.target.id === "chapter-1") onChapterChange(1);
            if (entry.target.id === "chapter-2") onChapterChange(2);
          }
        });
      },
      // Aktif saat section ada di tengah viewport
      { root: null, rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );

    const chapterSections = document.querySelectorAll("section[id^='chapter-']");
    chapterSections.forEach((section) => chapterObserver.observe(section));

    return () => {
      cards.forEach((card) => revealObserver.unobserve(card));
      chapterSections.forEach((section) => chapterObserver.unobserve(section));
    };
  }, [onChapterChange]);

  return (
    <main
      id="main-narrative"
      ref={containerRef}
      className="flex-1 overflow-y-auto"
      style={{
        background: "var(--canvas-right)",
        minHeight: "100vh",
      }}
      aria-label="Scrapbook narrative chapters"
    >
      {/* ══════════════════════════════════
          CHAPTER 1 — A QUIET START
          ══════════════════════════════════ */}
      <section
        id="chapter-1"
        className="px-8 py-14 border-b-2 border-[#2a2a26]"
        aria-labelledby="chapter-1-heading"
      >
        <ChapterHeader chapter={1} />

        {/* Chapter 1 description copy */}
        <p
          className="text-[13px] mb-10 max-w-md"
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a8a82",
            lineHeight: 1.7,
          }}
        >
          Everything starts somewhere quiet.{" "}
          <HighlightText color="mint">Before the noise, there was this.</HighlightText>
        </p>

{/* Card stack – sequential, one card per viewport, replaces on scroll */}
        <div className="flex flex-col items-center">
          {chapter1Cards.map((card) => (
            <div key={card.id} className="h-screen w-full flex items-center justify-center" style={card.id === "card-6" ? {marginLeft: "-10px", marginBottom: "100vh"} : {marginLeft: "-10px"}}>
              <div
                className="scroll-card"
                style={{
                  width: "60%",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              >
                <PolaroidCard
                  id={card.id}
                  title={card.title}
                  caption={card.caption}
                  highlightColor={card.highlightColor}
                  body={card.body}
                  rotate={card.rotate}
                  badgeColor={card.badgeColor}
                  badgeTextColor={card.badgeTextColor}
                  tapeRotate={card.tapeRotate}
                  className="w-full"
                >
                  <img src={card.imageSrc} alt={card.title} className="w-full h-auto object-cover" />
                </PolaroidCard>
              </div>
            </div>
          ))}
        </div>

        {/* Ink annotation doodle */}
        <div className="mt-8 flex items-center justify-center gap-3 w-full">
          <UnderlineDoodle color="#FF5E3A" className="w-24" />
          <span
            className="text-[13px] italic text-[#5a5a52]"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            end of chapter 1
          </span>
          <span style={{ transform: "scaleX(-1)", display: "inline-block" }}>
            <UnderlineDoodle color="#FF5E3A" className="w-24" />
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════
          CHAPTER 2 — HOW WE GROW
          ══════════════════════════════════ */}
      <section
        id="chapter-2"
        className="px-8 py-20"
        aria-labelledby="chapter-2-heading"
      >
        <ChapterHeader chapter={2} />

        <p
          className="text-[13px] mb-8 max-w-md"
          style={{
            fontFamily: "var(--font-body)",
            color: "#8a8a82",
            lineHeight: 1.7,
          }}
        >
          Some things don{"'"}t just happen.{" "}
          <HighlightText color="yellow">everything should have a plan.</HighlightText>
        </p>

        {/* Chapter 2 large card */}
        <div className="scroll-card w-full flex justify-center mt-12 mb-12">
          <PolaroidCard
            id="card-grow"
            title="HOW WE GROW"
            caption="Some Things Don't Just Happen"
            highlightColor="mint"
            body="We dreamed out loud. Now we just have to live it. Every conversation, every late night plan session — this is what it adds up to."
            rotate={1}
            badgeColor="#38E4AE"
            badgeTextColor="#121212"
            tapeRotate={1}
            className="w-full max-w-[360px]"
          >
            <div className="w-full h-48 bg-[#d0d0d0] flex items-center justify-center font-bold text-gray-500">
              {/* Nanti diisi konten chapter 2 */}
              [ Chapter 2 Image Placeholder ]
            </div>
          </PolaroidCard>
        </div>

        {/* Closing poetic note */}
        <div
          className="scroll-card mt-12 p-6 border-2 border-[#2a2a26] relative max-w-md mx-auto"
          style={{
            background: "#1a1814",
            boxShadow: "4px 4px 0 #FF4E11",
          }}
        >
          {/* Red dot decoration */}
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#FF5E3A] border-2 border-[#141414]" aria-hidden="true" />

          <p
            className="text-[13px] text-[#c8c4b8] italic mb-3 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We dreamed out loud. Now we just have to live it.
          </p>
          <span
            className="text-[20px] text-[#FAED27]"
            style={{ fontFamily: "var(--font-cursive)", fontWeight: 700 }}
          >
            — always, for you ♡
          </span>

          {/* Underline doodle */}
          <UnderlineDoodle color="#FAED27" className="mt-2 w-full" />
        </div>

        {/* Bottom spacer with decoration */}
        <div className="mt-24 mb-16 flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-[#2a2a26]" />
          <span
            className="text-[22px] text-[#FF5E3A]"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            ✦ to be continued... ✦
          </span>
          <div className="flex-1 h-[2px] bg-[#2a2a26]" />
        </div>
      </section>
    </main>
  );
}
