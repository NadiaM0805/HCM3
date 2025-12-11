import { AgenticActions } from "@/types/agentic";

export const hrbpFlow = [
  {
    id: "openPlaybook",
    label: "Opening Workforce Planning playbook…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='open-wfp']", "click");
    },
  },
  {
    id: "generatePlan",
    label: "Generating draft headcount plan…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='generate-headcount']", "click");
    },
  },
  {
    id: "freezePlan",
    label: "Freezing plan for approval…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='freeze-plan']", "click");
    },
  },
  {
    id: "createPositions",
    label: "Creating new positions…",
    action: async ({ act, type, select }: AgenticActions) => {
      await act("[data-testid='create-position']", "click");
      
      // Fill position form
      await type("#position-title", "Senior Support Specialist");
      await select("#location-select", "NYC");
      await act("[data-testid='submit-position']", "click");
    },
  },
];

