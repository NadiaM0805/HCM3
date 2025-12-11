"use client";

import { useEffect, useState } from "react";
import Home from "@/app/page";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";
import { useRole } from "@/contexts/RoleContext";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import { analystFlow } from "@/agenticFlows/analystFlow";
import { buLeaderFlowSimple } from "@/agenticFlows/buLeaderFlowSimple";

export default function AgenticDashboard() {
  const { agenticMode } = useAgentic();
  const { sendMessage, resetChat } = useAgentChat();
  const { currentRole } = useRole();

  // Reset chat when agentic mode is active
  useEffect(() => {
    if (agenticMode) {
      resetChat();
    }
  }, [agenticMode, resetChat]);

  // Choose the correct flow based on current persona
  let activeFlow: typeof analystFlow = [];
  if (agenticMode) {
    if (currentRole === "Workforce Analyst") {
      activeFlow = analystFlow;
    } else if (currentRole === "BU Leader") {
      activeFlow = buLeaderFlowSimple;
    } else {
      activeFlow = [];
    }
  }

  // Run the orchestrator with the selected flow
  useAgenticOrchestrator(activeFlow, {
    agentChat: sendMessage,
  });

  return (
    <div data-agentic-page="true" data-persona={currentRole.toLowerCase().replace(" ", "-")}>
      <Home />
    </div>
  );
}
