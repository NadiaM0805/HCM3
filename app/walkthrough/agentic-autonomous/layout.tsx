"use client";

import { AgenticContext } from "@/contexts/AgenticContext";
import { CursorProvider } from "@/contexts/CursorContext";
import { useState, useEffect } from "react";
import FakeCursor from "@/components/agentic/FakeCursor";
import { useAgenticCursor } from "@/contexts/CursorContext";

function CursorOverlay() {
  const { cursorPos } = useAgenticCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <FakeCursor x={cursorPos.x ?? undefined} y={cursorPos.y ?? undefined} />;
}

export default function AgenticLayout({ children }: { children: React.ReactNode }) {
  const [agenticMode, setAgenticMode] = useState(true);

  return (
    <AgenticContext.Provider value={{ agenticMode, setAgenticMode }}>
      <CursorProvider>
        <div data-agentic-layout="true">
          {children}
        </div>
        <CursorOverlay />
      </CursorProvider>
    </AgenticContext.Provider>
  );
}
