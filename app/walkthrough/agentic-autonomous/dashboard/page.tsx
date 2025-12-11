"use client";

import Home from "@/app/page";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import { useAgenticCursor } from "@/contexts/CursorContext";
import AgentReasoningPanel from "@/components/agentic/AgentReasoningPanel";

export default function AgenticDashboard() {
  const { act } = useAgenticCursor();

  const steps = [
    {
      id: "openPlaybook",
      label: "Opening Workforce Planning playbook…",
      action: async () => {
        await act("[data-testid='open-playbook']", "click");
      },
    },
    {
      id: "generatePlan",
      label: "Generating draft headcount plan…",
      action: async () => {
        await act("[data-testid='generate-plan']", "click");
      },
    },
    {
      id: "freezePlan",
      label: "Freezing plan…",
      action: async () => {
        await act("[data-testid='freeze-plan-button']", "click");
      },
    },
    {
      id: "createPositions",
      label: "Creating positions…",
      action: async () => {
        await act("[data-testid='create-position']", "click");
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
