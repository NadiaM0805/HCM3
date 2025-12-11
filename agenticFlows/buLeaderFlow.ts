import { AgenticActions } from "@/types/agentic";
import type { MessageAction } from "@/contexts/AgentChatContext";

// Function to create the initial offer flow (with branching)
export function createBULeaderOfferFlow(
  agentChat: (message: string | { text: string; actions?: MessageAction[] }, actions?: MessageAction[]) => void,
  setStartAuto: (value: boolean) => void
) {
  return [
    {
      id: "offerAutoOKRs",
      label: "Offering OKR automation…",
      action: async ({ agentChat: agentChatAction }: AgenticActions) => {
        if (agentChatAction) {
          agentChatAction(
            {
              text: "Priya, would you like me to automatically draft your Objectives & Key Results for FY26 based on your strategy document?",
              actions: [
                {
                  label: "Yes, generate my OKRs",
                  onClick: () => {
                    console.log("YES clicked - starting auto OKR generation");
                    setStartAuto(true);
                  },
                },
                {
                  label: "No, I'll do it later",
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
export const buLeaderAutoOKRFlow = [
  {
    id: "scrollToOKR",
    label: "Scrolling to OKR section…",
    action: async ({ agentChat, act }: AgenticActions) => {
      if (agentChat) {
        agentChat("Great, I'll draft your OKRs now based on your strategy.");
      }
      if (typeof window !== "undefined") {
        const okrSection = document.querySelector("[data-testid='okr-section']");
        if (okrSection) {
          okrSection.scrollIntoView({ behavior: "smooth", block: "center" });
          await new Promise((res) => setTimeout(res, 600));
        }
      }
    },
  },
  {
    id: "clickAddObjective",
    label: "Clicking Add Objective button…",
    action: async ({ agentChat, act }: AgenticActions) => {
      if (agentChat) {
        agentChat("Creating an objective focused on transforming the in-branch experience.");
      }
      if (typeof window !== "undefined") {
        // Try data-testid first, then find by text
        let addButton = document.querySelector("[data-testid='add-objective-button']") as HTMLElement;
        if (!addButton) {
          const buttons = Array.from(document.querySelectorAll("button"));
          addButton = buttons.find(btn => btn.textContent?.includes("+ Add Objective")) as HTMLElement;
        }
        if (addButton) {
          await act("[data-testid='add-objective-button']", "click");
          await new Promise((res) => setTimeout(res, 1000));
        }
      }
    },
  },
  {
    id: "typeObjective1",
    label: "Typing Objective 1…",
    action: async ({ type, agentChat }: AgenticActions) => {
      await type("#okr-objective-1-input", "Transform the in-branch experience to be faster and advisory-focused");
      await new Promise((res) => setTimeout(res, 800));
    },
  },
  {
    id: "saveObjective1",
    label: "Saving Objective 1…",
    action: async ({ act }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const buttons = Array.from(document.querySelectorAll("button"));
        const saveBtn = buttons.find(btn => btn.textContent?.includes("Save Objective"));
        if (saveBtn) {
          (saveBtn as HTMLElement).click();
        }
      }
      await new Promise((res) => setTimeout(res, 1000));
    },
  },
  {
    id: "addKR1",
    label: "Adding first Key Result…",
    action: async ({ act, agentChat }: AgenticActions) => {
      await new Promise((res) => setTimeout(res, 500));
      if (typeof window !== "undefined") {
        const buttons = Array.from(document.querySelectorAll("button"));
        const addKRBtn = buttons.find(btn => btn.textContent?.includes("+ Add KR"));
        if (addKRBtn) {
          (addKRBtn as HTMLElement).click();
        }
      }
      await new Promise((res) => setTimeout(res, 800));
      if (agentChat) {
        agentChat("Adding Key Result: Increase branch NPS from 68 → 75 by Q4 FY26");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "typeKR1",
    label: "Typing KR1…",
    action: async ({ type }: AgenticActions) => {
      await type("#okr-kr-1-input", "Increase branch NPS from 68 → 75 by Q4 FY26");
      await new Promise((res) => setTimeout(res, 800));
    },
  },
  {
    id: "saveKR1",
    label: "Saving KR1…",
    action: async ({ act }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const buttons = Array.from(document.querySelectorAll("button"));
        const saveKRBtn = buttons.find(btn => btn.textContent?.includes("Save KR"));
        if (saveKRBtn) {
          (saveKRBtn as HTMLElement).click();
        }
      }
      await new Promise((res) => setTimeout(res, 1000));
    },
  },
  {
    id: "addKR2",
    label: "Adding second Key Result…",
    action: async ({ act, agentChat }: AgenticActions) => {
      await new Promise((res) => setTimeout(res, 500));
      if (typeof window !== "undefined") {
        const buttons = Array.from(document.querySelectorAll("button"));
        const addKRBtn = buttons.find(btn => btn.textContent?.includes("+ Add KR"));
        if (addKRBtn) {
          (addKRBtn as HTMLElement).click();
        }
      }
      await new Promise((res) => setTimeout(res, 800));
      if (agentChat) {
        agentChat("Adding Key Result: Reduce average in-branch wait time by 20% by Q2 FY26");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "typeKR2",
    label: "Typing KR2…",
    action: async ({ type }: AgenticActions) => {
      await type("#okr-kr-2-input", "Reduce average in-branch wait time by 20% by Q2 FY26");
      await new Promise((res) => setTimeout(res, 800));
    },
  },
  {
    id: "saveKR2",
    label: "Saving KR2…",
    action: async ({ act }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const buttons = Array.from(document.querySelectorAll("button"));
        const saveKRBtn = buttons.find(btn => btn.textContent?.includes("Save KR"));
        if (saveKRBtn) {
          (saveKRBtn as HTMLElement).click();
        }
      }
      await new Promise((res) => setTimeout(res, 1000));
    },
  },
  {
    id: "closing",
    label: "Finishing up…",
    action: async ({ agentChat }: AgenticActions) => {
      if (agentChat) {
        agentChat("Your FY26 OKRs are drafted, Priya. You can review and fine-tune them whenever you're ready.");
      }
    },
  },
];

// Legacy flow (kept for backward compatibility)
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
