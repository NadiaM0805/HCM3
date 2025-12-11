import { AgenticActions } from "@/types/agentic";

export const buLeaderFlow = [
  {
    id: "openObjectives",
    label: "Opening Objectives & Key Results…",
    action: async ({ act }: AgenticActions) => {
      await act("[data-testid='okr-section']", "click");
    },
  },
  {
    id: "suggestKR",
    label: "Suggesting a Key Result based on strategy…",
    action: async ({ type }: AgenticActions) => {
      await type("#new-kr-input", "Improve NPS by 10%");
    },
  },
];

