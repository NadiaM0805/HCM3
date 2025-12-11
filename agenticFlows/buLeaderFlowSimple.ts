import { AgenticActions } from "@/types/agentic";

// Simple BU Leader flow for the shared dashboard
export const buLeaderFlowSimple = [
  {
    id: "welcome",
    label: "Reviewing FY26 objectives…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Priya, I've loaded your Retail Banking objectives for FY26.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "focusOKR",
    label: "Focusing OKR section…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Here are your current Objectives & Key Results.");
      }
      if (typeof window !== "undefined") {
        const okrSection = document.querySelector("[data-testid='okr-section']");
        if (okrSection) {
          okrSection.scrollIntoView({ behavior: "smooth", block: "center" });
          okrSection.classList.add("agentic-highlight");
          setTimeout(
            () => okrSection.classList.remove("agentic-highlight"),
            1200
          );
        }
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "suggestKR",
    label: "Suggesting a new Key Result…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat(
          "Based on your strategic focus on in-branch experience, I recommend adding a Key Result around NPS improvement."
        );
      }
      await new Promise((res) => setTimeout(res, 900));
    },
  },
  {
    id: "exampleKR",
    label: "Showing example KR…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Example: Increase branch NPS from 68 → 75 by Q4 FY26.");
      }
      await new Promise((res) => setTimeout(res, 900));
    },
  },
  {
    id: "closing",
    label: "Final guidance…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat(
          "Your FY26 objectives look aligned with the strategy. You can refine these KRs or add new ones whenever you're ready."
        );
      }
    },
  },
];

