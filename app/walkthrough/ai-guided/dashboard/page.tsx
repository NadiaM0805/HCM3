"use client";

import { AgenticProvider } from "@/contexts/AgenticContext";
import Dashboard from "@/app/dashboard/page";

export default function AIGuidedDashboard() {
  return (
    <AgenticProvider agenticMode={false}>
      <Dashboard />
    </AgenticProvider>
  );
}
