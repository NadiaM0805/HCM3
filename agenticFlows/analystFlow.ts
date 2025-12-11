import { AgenticActions } from "@/types/agentic";

export const analystFlow = [
  {
    id: "checkStrategy",
    label: "Checking published strategy…",
    action: async ({ act }: AgenticActions) => {
      // Small, relevant analyst action
      await act("[data-testid='source-document']", "move");
    },
  },
  {
    id: "openPlanningMetadata",
    label: "Reviewing strategic inputs…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='business-unit-allocation']", "move");
    },
  },
];

