import { AgenticActions } from "@/types/agentic";

export const analystFlow = [
  {
    id: "welcome",
    label: "Checking strategy inputs…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Alex, I'm reviewing your FY26 strategy inputs now.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "validateUpload",
    label: "Validating file upload…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Your strategy file (FY26_Strategy_Budget.xlsx) was uploaded and processed successfully.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "confirmBudget",
    label: "Confirming budget data…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Total FY26 budget is confirmed at $11M, allocated across 3 Business Units.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "publishStatus",
    label: "Highlighting published status…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("All Business Unit leaders have been notified and can now review their allocations.");
      }
      if (typeof window !== "undefined") {
        const el = document.querySelector("[data-testid='strategy-published']");
        if (el) {
          el.classList.add("agentic-highlight");
          setTimeout(() => el.classList.remove("agentic-highlight"), 1200);
        }
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "nextSteps",
    label: "Providing next steps…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Everything is in good shape, Alex. You can continue reviewing allocations or upload a revised strategy whenever needed.");
      }
    },
  },
];

