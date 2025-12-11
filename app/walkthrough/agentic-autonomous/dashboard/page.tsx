"use client";

import { useEffect, useState } from "react";
import Dashboard from "@/app/dashboard/page";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";
import { useRole } from "@/contexts/RoleContext";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import { analystFlow } from "@/agenticFlows/analystFlow";
import { createBULeaderOfferFlow, buLeaderAutoOKRFlow } from "@/agenticFlows/buLeaderFlow";

export default function AgenticDashboard() {
  const { agenticMode } = useAgentic();
  const { sendMessage, resetChat } = useAgentChat();
  const { currentRole } = useRole();
  const [startAuto, setStartAuto] = useState<boolean | null>(null);

  // Reset chat and state when agentic mode is active or role changes
  useEffect(() => {
    if (agenticMode) {
      resetChat();
      setStartAuto(null); // Reset choice when role changes
    }
  }, [agenticMode, currentRole, resetChat]);

  // Choose the correct flow based on current persona
  let activeFlow: typeof analystFlow = [];
  if (agenticMode) {
    if (currentRole === "Workforce Analyst") {
      activeFlow = analystFlow;
    } else if (currentRole === "BU Leader") {
      // For BU Leader, show offer flow first, then auto flow if YES is clicked
      if (startAuto === null) {
        activeFlow = createBULeaderOfferFlow(sendMessage, setStartAuto);
      } else if (startAuto === true) {
        activeFlow = buLeaderAutoOKRFlow;
      } else {
        activeFlow = []; // NO clicked, no flow
      }
    } else {
      activeFlow = [];
    }
  }

  // Run the orchestrator with the selected flow
  useAgenticOrchestrator(activeFlow, {
    agentChat: sendMessage,
  });

  // If NO is clicked, send one follow-up message
  useEffect(() => {
    if (startAuto === false && agenticMode && currentRole === "BU Leader") {
      sendMessage("No problem, Priya. You can continue editing your OKRs manually anytime.");
    }
  }, [startAuto, agenticMode, currentRole, sendMessage]);

  return (
    <div data-agentic-page="true" data-persona={currentRole.toLowerCase().replace(" ", "-")}>
      <Dashboard />
    </div>
  );
}
