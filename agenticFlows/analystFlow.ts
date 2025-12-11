import { AgenticActions } from "@/types/agentic";

export const analystFlow = [
  {
    id: "welcome",
    label: "Checking your strategic inputs…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Hi Alex — I'll quickly check your strategy inputs.");
      }
    },
  },
  {
    id: "validateUpload",
    label: "Validating strategy upload…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Your FY26 strategy file was uploaded successfully.");
      }
    },
  },
  {
    id: "validateBudget",
    label: "Reviewing budget allocations…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Global budget is confirmed at $11M across 3 Business Units.");
      }
    },
  },
  {
    id: "nextStep",
    label: "Next step suggestion…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("You can proceed to Workforce Planning whenever you're ready.");
      }
    },
  },
];

