"use client";

import { AgenticContext } from "@/contexts/AgenticContext";
import { useState } from "react";

export default function AgenticLayout({ children }: { children: React.ReactNode }) {
  const [agenticMode, setAgenticMode] = useState(true);

  return (
    <AgenticContext.Provider value={{ agenticMode, setAgenticMode }}>
      {children}
    </AgenticContext.Provider>
  );
}

