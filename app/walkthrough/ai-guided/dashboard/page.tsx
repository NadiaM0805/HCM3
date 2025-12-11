"use client";

import { AgenticProvider } from "@/contexts/AgenticContext";
import Home from "@/app/page";

export default function AIGuidedDashboard() {
  return (
    <AgenticProvider agenticMode={false}>
      <Home />
    </AgenticProvider>
  );
}

