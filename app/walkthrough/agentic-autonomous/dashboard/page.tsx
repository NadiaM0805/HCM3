"use client";

import Home from "@/app/page";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import { useAgenticCursor } from "@/contexts/CursorContext";
import AgentReasoningPanel from "@/components/agentic/AgentReasoningPanel";

export default function AgenticDashboard() {
  const { act, type, select } = useAgenticCursor();

  // Business Unit options for form filling
  const BUSINESS_UNIT_OPTIONS = [
    "Retail Banking (Branch & Consumer Focus) Optimize branch network efficiency while improving customer retention.",
    "Digital Transformation (Tech & Innovation) Shift from legacy systems to a mobile-first digital ecosystem.",
    "Risk, Compliance & Fraud Maintain a robust risk posture without stifling customer friction.",
  ];

  const steps = [
    {
      id: "openPlaybook",
      label: "Opening Workforce Planning playbook…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Navigating to Workforce Planning page…");
        await act("[data-testid='open-playbook']", "click");
      },
    },
    {
      id: "generatePlan",
      label: "Generating draft headcount plan…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Clicking 'Agent recommended headcount' button…");
        await act("[data-testid='generate-plan']", "click");
        addLog?.("Waiting for agent to generate plan…");
        await new Promise((res) => setTimeout(res, 2000));
      },
    },
    {
      id: "acceptPlan",
      label: "Accepting all suggested positions…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Reviewing draft plan…");
        await new Promise((res) => setTimeout(res, 1000));
        addLog?.("Clicking 'Accept all suggested'…");
        await act("[data-testid='accept-all-suggested']", "click");
      },
    },
    {
      id: "freezePlan",
      label: "Freezing plan for approval…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Confirming plan freeze…");
        await act("[data-testid='freeze-plan-button']", "click");
      },
    },
    {
      id: "createPositions",
      label: "Creating new positions…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Opening Create Position form…");
        await act("[data-testid='create-position']", "click");
        await new Promise((res) => setTimeout(res, 500));
      },
    },
    {
      id: "fillPositionForm",
      label: "Filling Position Creation Form…",
      action: async (addLog?: (message: string) => void) => {
        addLog?.("Filling Position Title…");
        await type("[data-testid='position-name']", "Customer Support Specialist");
        
        addLog?.("Entering Employee ID…");
        await type("[data-testid='employee-id']", "EMP-2024-001");
        
        addLog?.("Adding reason for position…");
        await type("[data-testid='position-reason']", "Expand customer support team to handle increased volume");
        
        addLog?.("Selecting location…");
        await select("[data-testid='position-location']", "New York");
        
        addLog?.("Selecting Business Unit…");
        await select("[data-testid='position-business-unit']", BUSINESS_UNIT_OPTIONS[0]);
        
        addLog?.("Entering Cost Centre…");
        await type("[data-testid='cost-centre']", "CC-1234");
        
        addLog?.("Entering Reports To…");
        await type("[data-testid='reports-to']", "John Smith");
        
        addLog?.("Entering Budget…");
        await type("[data-testid='position-budget']", "$120K");
        
        addLog?.("Submitting position creation…");
        await act("#submit-position", "click");
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
