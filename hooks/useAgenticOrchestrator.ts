"use client";

import { useEffect, useState, useRef } from "react";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgenticCursor } from "@/contexts/CursorContext";
import type { AgenticStep } from "@/types/agentic";

import type { ChatMessage, MessageAction } from "@/contexts/AgentChatContext";

interface OrchestratorOptions {
  agentChat?: (message: string | ChatMessage, actions?: MessageAction[]) => void;
}

export function useAgenticOrchestrator(
  steps: AgenticStep[] = [],
  options: OrchestratorOptions = {}
) {
  const { agenticMode } = useAgentic();
  const { act, type, select } = useAgenticCursor();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
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
      if (step.action) {
        await step.action({
          agentChat,
          act,
          type,
          select,
        });
      }
      
      // Wait 700ms between steps for better readability
      await new Promise((res) => setTimeout(res, 700));
    }

    setRunning(false);
    setIsComplete(true);
  }

  // Reset when steps change (persona switch)
  useEffect(() => {
    const stepsKey = steps.map(s => s.id).join(",");
    if (stepsRef.current !== stepsKey && stepsKey !== "") {
      hasRunRef.current = false;
      setRunning(false);
      setCurrentStep(0);
      setHasRun(false);
      setIsComplete(false);
      stepsRef.current = stepsKey;
    }
  }, [steps]);

  // Guard to ensure flow runs only once per mount
  useEffect(() => {
    if (!agenticMode) {
      setHasRun(false);
      hasRunRef.current = false;
      return;
    }
    if (hasRun) return;
    if (steps.length === 0) return;
    if (running) return;
    
    setHasRun(true);
    // Small delay to ensure chat is reset first and component is fully mounted
    const timer = setTimeout(() => {
      runSteps();
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agenticMode, steps.length]);

  // Reset when agenticMode changes
  useEffect(() => {
    if (!agenticMode) {
      hasRunRef.current = false;
      setRunning(false);
      setCurrentStep(0);
      setHasRun(false);
      setIsComplete(false);
    }
  }, [agenticMode]);

  return { currentStep, running, isComplete };
}
