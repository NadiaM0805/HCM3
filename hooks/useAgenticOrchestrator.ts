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

    // Add welcome message
    if (agentChat) {
      agentChat("👋 Welcome to Agentic Autonomous Workflow. I'll perform this workflow for you. You can pause or override at any time.");
    }

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const step = steps[i];
      
      // Send message to XPlus Assistant
      if (agentChat) {
        agentChat(`🤖 ${step.label}`);
      }

      // Execute step with actions
      await step.action({ act, type, select });
      
      // Wait 400ms between steps
      await new Promise((res) => setTimeout(res, 400));
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
      // Small delay to ensure chat is reset first
      const timer = setTimeout(() => {
        runSteps();
      }, 100);
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
