export interface AgenticActions {
  act: (selector: string, action: "move" | "click") => Promise<void>;
  type: (selector: string, text: string) => Promise<void>;
  select: (selector: string, value: string) => Promise<void>;
}

export type AgenticStep = {
  id: string;
  label: string;
  action: (actions: AgenticActions) => Promise<void>;
};

