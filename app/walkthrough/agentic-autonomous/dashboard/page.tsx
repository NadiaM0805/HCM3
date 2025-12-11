"use client";

import Home from "@/app/page";

export default function AgenticDashboard() {
  // The orchestrator is now handled in WorkforceAnalystView
  // No need to run it here to avoid duplicates
  return (
    <div data-agentic-page="true" data-persona="analyst">
      <Home />
    </div>
  );
}
