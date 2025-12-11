import type { MessageAction } from "@/contexts/AgentChatContext";

export interface AgenticActions {
  agentChat?: (message: string | { text: string; actions?: MessageAction[] }, actions?: MessageAction[]) => void;
  act: (selector: string, action: "move" | "click") => Promise<void>;
  type: (selector: string, text: string) => Promise<void>;
  select: (selector: string, value: string) => Promise<void>;
  scrollToSelector?: (selector: string, options?: ScrollIntoViewOptions) => Promise<void>;
}

export type AgenticStep = {
  id: string;
  label: string;
  action: (actions: AgenticActions) => Promise<void>;
};

