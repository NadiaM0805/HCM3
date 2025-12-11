import { AgenticActions } from "@/types/agentic";

export const analystFlow = [
  {
    id: "welcome",
    label: "Checking your strategic inputs…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Hi Alex — let me check your strategy inputs.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "validateUpload",
    label: "Validating strategy upload…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Your FY26 strategy file was uploaded successfully.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "validateBudget",
    label: "Reviewing budget allocations…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Global budget is confirmed at $11M across 3 Business Units.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "highlightPublished",
    label: "Highlighting published banner…",
    action: async () => {
      if (typeof window === "undefined") return;
      const el = document.querySelector("[data-testid='strategy-published']");
      if (el) {
        el.classList.add("agentic-highlight");
        setTimeout(() => el.classList.remove("agentic-highlight"), 1200);
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "closing",
    label: "Next step suggestion…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("All set, Alex. Your strategy is ready. When you're ready, switch to Dana to begin Workforce Planning.");
      }
    },
  },
];

