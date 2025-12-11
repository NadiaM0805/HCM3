"use client";

import Dashboard from "@/app/dashboard/page";

// This page is deprecated - BU Leader flow is now handled in the shared dashboard
// Keeping this file for backward compatibility but redirecting to dashboard
export default function AgenticBULeader() {
  return (
    <div data-agentic-page="true" data-persona="bu-leader">
      <Dashboard />
    </div>
  );
}

