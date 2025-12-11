import { AgenticActions } from "@/types/agentic";

export const managerFlow = [
  {
    id: "openApprovals",
    label: "Opening your pending approvals…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='approval-card']", "click");
    },
  },
  {
    id: "analyzeResignation",
    label: "Analyzing resignation request…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='resignation-task']", "click");
    },
  },
];

