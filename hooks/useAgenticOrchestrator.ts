"use client";

import { useEffect, useState } from "react";
import { useAgentic } from "@/contexts/AgenticContext";

type AgenticStep = {
  id: string;
  label: string;
  action: (addLog?: (message: string) => void) => Promise<void>;
};

export function useAgenticOrchestrator(steps: AgenticStep[] = []) {
  const { agenticMode } = useAgentic();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // Expose log setter for narration
  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
  };

  async function runSteps() {
    if (!agenticMode || running) return;

    setRunning(true);

    // Add welcome message
    setLog(prev => [
      ...prev,
      "👋 Welcome to Agentic Autonomous Workflow. I'll perform this workflow for you. You can pause or override at any time."
    ]);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const step = steps[i];
      setLog(prev => [...prev, `🤖 ${step.label}`]);
      await step.action(addLog); // The agent performs the step, passing narration function
      await new Promise(res => setTimeout(res, 600));
    }

    setRunning(false);
  }

  useEffect(() => {
    if (agenticMode && steps.length > 0 && !running) {
      runSteps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agenticMode]);

  return { currentStep, log, running, addLog };
}

