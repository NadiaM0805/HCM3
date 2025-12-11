"use client";

import { AgenticProvider } from "@/contexts/AgenticContext";
import Home from "@/app/page";

export default function AgenticDashboard() {
  return (
    <AgenticProvider agenticMode={true}>
      <Home />
    </AgenticProvider>
  );
}

