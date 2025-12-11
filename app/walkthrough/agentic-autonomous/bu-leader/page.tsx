"use client";

import { useEffect, useState } from "react";
import Home from "@/app/page";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";
import { useRole } from "@/contexts/RoleContext";
import { getBULeaderFlow, autoOKRFlow } from "@/agenticFlows/buLeaderFlow";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";

export default function AgenticBULeader() {
  const { agenticMode } = useAgentic();
  const { sendMessage, resetChat } = useAgentChat();
  const { setCurrentRole } = useRole();
  const [startAuto, setStartAuto] = useState<boolean | null>(null);

  // Set role to BU Leader and reset chat when agentic mode is active
  useEffect(() => {
    if (agenticMode) {
      setCurrentRole("BU Leader");
      resetChat();
      setStartAuto(null); // Reset choice when entering agentic mode
    }
  }, [agenticMode, resetChat, setCurrentRole]);

  // Offer interactive choice first
  const offerFlow = getBULeaderFlow(sendMessage, setStartAuto);
  useAgenticOrchestrator(
    agenticMode && startAuto === null ? offerFlow : [],
    {
      agentChat: sendMessage,
    }
  );

  // If user clicked YES - run full automation
  useAgenticOrchestrator(
    agenticMode && startAuto === true ? autoOKRFlow : [],
    {
      agentChat: sendMessage,
    }
  );

  // If user clicked NO - send graceful fallback
  useEffect(() => {
    if (startAuto === false && agenticMode) {
      sendMessage("No problem, Priya. You can continue editing your OKRs manually anytime.");
    }
  }, [startAuto, agenticMode, sendMessage]);

  return (
    <div data-agentic-page="true" data-persona="bu-leader">
      <Home />
    </div>
  );
}

