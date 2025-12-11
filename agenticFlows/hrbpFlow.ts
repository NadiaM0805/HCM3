import { AgenticActions } from "@/types/agentic";
import type { MessageAction } from "@/contexts/AgentChatContext";

// Function to create the initial offer flow (with branching)
export function createHRBPOfferFlow(
  agentChat: (message: string | { text: string; actions?: MessageAction[] }, actions?: MessageAction[]) => void,
  setStartAuto: (value: boolean) => void
) {
  return [
    {
      id: "offerPlan",
      label: "Offer to generate headcount plan…",
      action: async ({ agentChat: agentChatAction }: AgenticActions) => {
        if (agentChatAction) {
          agentChatAction(
            {
              text: "Dana, I've pulled in Priya's objectives and key results for Retail Banking. Would you like me to generate a draft headcount plan from these?",
              actions: [
                {
                  label: "Yes, generate plan",
                  onClick: () => {
                    console.log("YES clicked - starting auto plan generation");
                    setStartAuto(true);
                  },
                },
                {
                  label: "No, I'll review manually",
                  onClick: () => {
                    console.log("NO clicked - skipping auto generation");
                    setStartAuto(false);
                  },
                },
              ],
            }
          );
        }
        await new Promise((res) => setTimeout(res, 500));
      },
    },
  ];
}

// Full automation flow when YES is clicked
export const hrbpAutoPlanFlow = [
  {
    id: "focusRetailCard",
    label: "Focusing Retail Banking strategy…",
    action: async ({ agentChat, act }: AgenticActions) => {
      if (agentChat) {
        agentChat("Great, I'll translate your Retail Banking OKRs into a draft headcount plan.");
      }
      if (typeof window !== "undefined") {
        const card = document.querySelector("[data-testid='wp-retail-card']");
        if (card) {
          (card as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
          await new Promise((res) => setTimeout(res, 600));
          card.classList.add("wp-highlight");
          setTimeout(() => card.classList.remove("wp-highlight"), 1000);
        }
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "expandRetail",
    label: "Expanding Retail details…",
    action: async ({ act }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const btn = document.querySelector("[data-testid='wp-retail-show-details']") as HTMLElement;
        if (btn && !btn.textContent?.includes("Hide details")) {
          await act("wp-retail-show-details", "click");
          await new Promise((res) => setTimeout(res, 600));
        }
      }
    },
  },
  {
    id: "walkKRs",
    label: "Walking through KRs…",
    action: async ({ agentChat }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const krs = document.querySelector("[data-testid='wp-retail-krs']");
        if (krs) {
          krs.classList.add("wp-highlight");
          setTimeout(() => krs.classList.remove("wp-highlight"), 1000);
        }
      }
      if (agentChat) {
        agentChat("For each key result, I infer the skills and roles needed and translate them into suggested headcount.");
        await new Promise((res) => setTimeout(res, 900));
        agentChat("For reducing lobby wait time, we'll staff additional branch advisors and queue managers in Q1–Q2.");
        await new Promise((res) => setTimeout(res, 900));
        agentChat("For shifting cash transactions to self-service, we'll add implementation specialists and digital ambassadors.");
        await new Promise((res) => setTimeout(res, 900));
      }
    },
  },
  {
    id: "openDraftTab",
    label: "Opening Draft Headcount Plan…",
    action: async ({ act, agentChat }: AgenticActions) => {
      if (typeof window !== "undefined") {
        await act("wp-tab-draft-plan", "click");
        await new Promise((res) => setTimeout(res, 800));
        const table = document.querySelector("[data-testid='wp-draft-plan-table']");
        if (table) {
          (table as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
          table.classList.add("wp-highlight");
          setTimeout(() => table.classList.remove("wp-highlight"), 1200);
        }
      }
      if (agentChat) {
        agentChat("I've created a draft headcount plan for Retail Banking based on those key results.");
        await new Promise((res) => setTimeout(res, 900));
      }
    },
  },
  {
    id: "showStatus",
    label: "Showing draft plan status…",
    action: async ({ agentChat }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const status = document.querySelector("[data-testid='wp-draft-plan-status']");
        if (status) {
          status.classList.remove("wp-status-hidden");
          status.classList.add("wp-status-visible");
        }
      }
      if (agentChat) {
        agentChat(
          "This plan is a starting point: you can adjust role mix, timing, or FTE counts, then submit it for approval when you're satisfied."
        );
      }
    },
  },
];

// Legacy flow (kept for backward compatibility)
export const hrbpFlow = [
  {
    id: "welcome",
    label: "Welcoming HRBP…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Welcome to Workforce Planning, Dana.");
      }
    },
  },
];
