"use client";

import { useEffect, useState, useRef } from "react";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgenticCursor } from "@/contexts/CursorContext";
import type { AgenticStep } from "@/types/agentic";

interface OrchestratorOptions {
  agentChat?: (message: string) => void;
}

export function useAgenticOrchestrator(
  steps: AgenticStep[] = [],
  options: OrchestratorOptions = {}
) {
  const { agenticMode } = useAgentic();
  const { act, type, select } = useAgenticCursor();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const hasRunRef = useRef(false);
  const stepsRef = useRef<string>(""); // Track steps to detect changes

  const { agentChat } = options;

  async function runSteps() {
    if (!agenticMode || running || hasRunRef.current) return;

    hasRunRef.current = true;
    setRunning(true);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const step = steps[i];

      // Execute step with all available actions, including agentChat
      await step.action({
        agentChat,
        act,
        type,
        select,
      });
      
      // Wait 500ms between steps for better readability
      await new Promise((res) => setTimeout(res, 500));
    }

    setRunning(false);
  }

  // Reset when steps change (persona switch)
  useEffect(() => {
    const stepsKey = steps.map(s => s.id).join(",");
    if (stepsRef.current !== stepsKey && stepsKey !== "") {
      hasRunRef.current = false;
      setRunning(false);
      setCurrentStep(0);
      stepsRef.current = stepsKey;
    }
  }, [steps]);

  useEffect(() => {
    if (agenticMode && steps.length > 0 && !running && !hasRunRef.current) {
      // Small delay to ensure chat is reset first and component is fully mounted
      const timer = setTimeout(() => {
        runSteps();
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agenticMode, steps.length, stepsRef.current]);

  // Reset when agenticMode changes
  useEffect(() => {
    if (!agenticMode) {
      hasRunRef.current = false;
      setRunning(false);
      setCurrentStep(0);
    }
  }, [agenticMode]);

  return { currentStep, running };
}
