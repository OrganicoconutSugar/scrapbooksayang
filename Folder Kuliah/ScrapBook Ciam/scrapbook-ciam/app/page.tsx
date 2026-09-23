"use client";

import { useState } from "react";
import LeftPane from "@/components/LeftPane";
import RightPane from "@/components/RightPane";

export default function Home() {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  return (
    /*
     * Desktop: 2-column split — left 40% sticky, right 60% scrollable
     * Mobile: stacks vertically (LeftPane on top, RightPane below)
     */
    <div
      className="flex flex-col md:flex-row min-h-screen"
      style={{ background: "var(--canvas-right)" }}
    >
      {/* ── Left Sticky Pane (desktop: 40%, mobile: full width) ── */}
      <div
        className="w-full md:w-[40%] md:flex-shrink-0"
        style={{ position: "sticky", top: 0, height: "100vh", alignSelf: "flex-start", overflow: "hidden" }}
      >
        <LeftPane activeChapter={activeChapter} />
      </div>

      {/* ── Right Scrollable Narrative Feed (desktop: 60%) ── */}
      <div className="flex-1 md:min-w-0">
        <RightPane onChapterChange={setActiveChapter} />
      </div>
    </div>
  );
}
