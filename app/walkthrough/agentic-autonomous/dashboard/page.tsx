"use client";

import Home from "@/app/page";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import AgentReasoningPanel from "@/components/agentic/AgentReasoningPanel";

export default function AgenticDashboard() {
  const steps = [
    {
      id: "openPlaybook",
      label: "Opening Workforce Planning playbook…",
      action: async () => {
        // Future: Navigate to workforce planning
        // Future: Auto-open assistant panel
      },
    },
    {
      id: "generatePlan",
      label: "Generating draft headcount plan…",
      action: async () => {
        // Future: Trigger agent to generate plan
      },
    },
    {
      id: "freezePlan",
      label: "Freezing plan for approval…",
      action: async () => {
        // Future: Auto-freeze plan
      },
    },
    {
      id: "createPositions",
      label: "Creating new positions…",
      action: async () => {
        // Future: Auto-create positions
      },
    },
  ];

  const { log } = useAgenticOrchestrator(steps);

  return (
    <>
      <Home />
      <AgentReasoningPanel log={log} />
    </>
  );
}
