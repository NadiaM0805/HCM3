import { AgenticActions } from "@/types/agentic";
import type { MessageAction } from "@/contexts/AgentChatContext";

// Function to get the initial offer flow (with branching)
export function getBULeaderFlow(
  sendAgentMessage: (message: string | { text: string; actions?: MessageAction[] }, actions?: MessageAction[]) => void,
  startAutoOKR: (value: boolean) => void
) {
  return [
    {
      id: "offerAutoGenerate",
      label: "Offering OKR automation…",
      action: async ({ agentChat }: AgenticActions) => {
        if (agentChat) {
          agentChat(
            {
              text: "Priya, I reviewed your FY26 strategy inputs. Would you like me to automatically generate your Objectives & Key Results?",
              actions: [
                {
                  label: "Yes, generate OKRs",
                  onClick: () => startAutoOKR(true),
                },
                {
                  label: "No, maybe later",
                  onClick: () => startAutoOKR(false),
                },
              ],
            }
          );
        }
      },
    },
  ];
}

// Full automation flow when YES is clicked
export const autoOKRFlow = [
  {
    id: "scrollToOKR",
    label: "Scrolling to OKR section…",
    action: async ({ act, agentChat }: AgenticActions) => {
      if (typeof window !== "undefined") {
        const section = document.querySelector("[data-testid='okr-section']");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          section.classList.add("agentic-highlight");
          setTimeout(() => section.classList.remove("agentic-highlight"), 1200);
        }
      }
      if (agentChat) {
        agentChat("Let me draft your FY26 OKRs based on strategic priorities…");
      }
      await new Promise((res) => setTimeout(res, 800));
    },
  },
  {
    id: "clickAddObjective",
    label: "Clicking Add Objective button…",
    action: async ({ act, agentChat }: AgenticActions) => {
      if (typeof window !== "undefined") {
        // Find and click the "Add Objective" button
        const buttons = Array.from(document.querySelectorAll("button"));
        const addButton = buttons.find(btn => btn.textContent?.includes("+ Add Objective"));
        if (addButton) {
          await act(`button:contains("+ Add Objective")`, "click");
          await new Promise((res) => setTimeout(res, 800));
        }
      }
      if (agentChat) {
        agentChat("Creating Objective: Improve Branch Experience.");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "typeObjective1",
    label: "Typing Objective 1…",
    action: async ({ type, agentChat }: AgenticActions) => {
      await type("#okr-objective-1-input", "Improve Branch Experience");
      await new Promise((res) => setTimeout(res, 800));
    },
  },
  {
    id: "saveObjective1",
    label: "Saving Objective 1…",
    action: async ({ act }: AgenticActions) => {
      if (typeof window !== "undefined") {
        // Find and click the "Save Objective" button
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
        agentChat("Adding Key Result: Increase branch NPS from 68 → 75 by Q4");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "typeKR1",
    label: "Typing KR1…",
    action: async ({ type }: AgenticActions) => {
      await type("#okr-kr-1-input", "Increase branch NPS from 68 → 75 by Q4");
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
        agentChat("Adding Key Result: Reduce average wait time by 20%");
      }
      await new Promise((res) => setTimeout(res, 700));
    },
  },
  {
    id: "typeKR2",
    label: "Typing KR2…",
    action: async ({ type }: AgenticActions) => {
      await type("#okr-kr-2-input", "Reduce average wait time by 20%");
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
        agentChat("Your FY26 OKRs are drafted, Priya. You can refine them anytime.");
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
