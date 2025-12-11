"use client";

import { useEffect } from "react";
import Home from "@/app/page";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";
import { analystFlow } from "@/agenticFlows/analystFlow";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";

export default function AgenticDashboard() {
  const { agenticMode } = useAgentic();
  const { sendMessage, resetChat } = useAgentChat();

  // Force reset chat and ensure orchestrator runs on mount
  useEffect(() => {
    if (agenticMode) {
      resetChat();
    }
  }, [agenticMode, resetChat]);

  // Force orchestrator to run for Analyst flow
  useAgenticOrchestrator(
    agenticMode ? analystFlow : [],
    { agentChat: sendMessage }
  );

  return (
    <div data-agentic-page="true" data-persona="analyst">
      <Home />
    </div>
  );
}
