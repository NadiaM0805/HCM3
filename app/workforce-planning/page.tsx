"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";
import { Card } from "@/components/design-system/Card";
import { ScenarioCard } from "@/components/workforce-planning/ScenarioCard";
import { WhatIfAnalysis } from "@/components/workforce-planning/WhatIfAnalysis";
import { DraftHeadcountPlanTable } from "@/components/workforce-planning/DraftHeadcountPlanTable";
import { FreezePlanModal } from "@/components/workforce-planning/FreezePlanModal";
import { CreatePositionsConfirmModal } from "@/components/workforce-planning/CreatePositionsConfirmModal";
import { CreatePositionModal } from "@/components/workforce-planning/CreatePositionModal";
import { BudgetApprovalModal } from "@/components/workforce-planning/BudgetApprovalModal";
import { useRole } from "@/contexts/RoleContext";
import { useAgentic } from "@/contexts/AgenticContext";
import { AgenticProvider } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";
import { useAgenticOrchestrator } from "@/hooks/useAgenticOrchestrator";
import { createHRBPOfferFlow, hrbpAutoPlanFlow } from "@/agenticFlows/hrbpFlow";
import { toast } from "@/components/design-system/Snackbar";
import type { PlanLine } from "@/types/planLine";
import { MOCK_PLAN_LINES } from "@/types/planLine";

// Planning Workspace Component (Right Column)
interface PlanningWorkspaceProps {
  onRunAgentHeadcount: () => void;
  isAgentRunning: boolean;
  hasAgentDraft: boolean;
  onViewDraftPlan?: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onViewDraftPlanAndMinimize?: () => void;
  agenticMode?: boolean;
  agentMessages?: Array<string | { text: string; actions?: Array<{ label: string; onClick: () => void }> }>;
  currentRole?: string;
}

function PlanningWorkspace({
  onRunAgentHeadcount,
  isAgentRunning,
  hasAgentDraft,
  onViewDraftPlan,
  isMinimized,
  onMinimize,
  onMaximize,
  onViewDraftPlanAndMinimize,
  agenticMode = false,
  agentMessages = [],
  currentRole,
}: PlanningWorkspaceProps) {
  const { agenticMode: contextAgenticMode } = useAgentic();

  // Auto-open assistant when agentic mode is active
  useEffect(() => {
    if (contextAgenticMode && isMinimized) {
      onMaximize();
    }
  }, [contextAgenticMode, isMinimized, onMaximize]);

  // Minimized view - floating icon
  if (isMinimized) {
    return (
      <div
        onClick={onMaximize}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#4d3ee0] rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#3a2ea8] transition-colors z-50"
        title="Open Assistant"
      >
        <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
      </div>
    );
  }

  // Full view
  return (
    <div className="w-full h-full bg-white rounded-l-lg shadow-[0px_2px_6px_0px_rgba(53,59,70,0.15)] flex flex-col rounded-r-none" style={{ height: 'calc(100vh - 73px)' }}>
      {/* Chat Header */}
      <div className="flex flex-col">
        {/* Top divider */}
        <div className="h-1 bg-gradient-to-r from-orange-200 via-pink-200 via-purple-200 to-green-200 w-full" />
        
        {/* Header */}
        <div className="bg-white flex h-14 items-center justify-between px-4 border-b border-gray-200">
          <div className="flex gap-2.5 items-center">
            <div className="relative w-6 h-6">
              <Image src="/x+.svg" alt="X+" width={24} height={24} className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#353b46]">Assistant</p>
          </div>
          <div className="inline-flex justify-end items-center gap-2">
            {/* Minimize button */}
            <div
              onClick={onMinimize}
              data-chat-view="Expand"
              className="w-20 h-20 p-2 relative rounded-[50px] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
              title="Minimize"
            >
              <Image src="/Chatmode.svg" alt="Chat mode" width={80} height={80} className="w-20 h-20" />
            </div>
            
            {/* Close button */}
            <div data-size="Big" data-state="Default" data-type="Tertiary (Ghost)" className="w-8 h-8 p-2.5 rounded-[10px] flex justify-center items-center gap-2">
              <div data-size="18" className="inline-flex flex-col justify-center items-center">
                <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">×</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 flex flex-col gap-6 px-6 py-4 overflow-y-auto">
        {/* Agent Messages - Always show if there are messages */}
        {agentMessages.length > 0 ? (
          <>
            {agentMessages.map((message, idx) => {
              const messageText = typeof message === "string" ? message : message.text;
              const messageActions = typeof message === "string" ? undefined : message.actions;
              return (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#353b46] leading-6">
                      <p>{messageText}</p>
                    </div>
                    {/* Action Buttons */}
                    {messageActions && messageActions.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {messageActions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              action.onClick();
                            }}
                            className="px-4 py-2 rounded-md bg-[#4d3ee0] text-white hover:bg-[#3a2ea8] text-sm font-medium transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : null}

        {/* Default Assistant Message (only if no agent messages AND not in agentic mode for HRBP) */}
        {agentMessages.length === 0 && !(agenticMode && currentRole === "HRBP") ? (
          <div className="flex gap-3 items-start">
            {/* Avatar */}
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
            </div>
            
            {/* Message Content */}
            <div className="flex-1 flex flex-col gap-4">
              {isAgentRunning ? (
                <>
                  <div className="text-sm text-[#353b46] leading-6">
                    <p>Drafting headcount plan based on your strategy and budgets…</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-4 h-4 border-2 border-[#4d3ee0] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-[#637085]">Processing...</span>
                  </div>
                </>
              ) : hasAgentDraft ? (
                <>
                  <div className="text-sm text-[#353b46] leading-6">
                    <p>
                      I have loaded the high level strategy along with objectives, Key Results and budgets allocated.
                    </p>
                    <p className="mt-2">
                      I've generated a draft headcount plan based on your strategy and budgets.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Badge value="Draft plan generated" type="filled" size="small" />
                  </div>
                  {onViewDraftPlanAndMinimize && (
                    <div className="pt-2">
                      <div
                        onClick={onViewDraftPlanAndMinimize}
                        className="w-full px-4 py-2.5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#4d3ee0] inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="justify-center text-[#4d3ee0] text-sm font-medium font-['Poppins'] leading-5 tracking-tight">
                          View draft plan
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {agenticMode ? (
                    <>
                      <div className="text-sm text-[#353b46] leading-6">
                        <p className="font-semibold mb-2">Welcome to the Agentic Autonomous Workflow.</p>
                        <p>
                          I can execute the entire workflow on your behalf — analyzing strategy, generating headcount plans, and orchestrating tasks automatically.
                        </p>
                        <p className="mt-2">
                          Would you like me to run this workflow for you?
                        </p>
                      </div>
                      
                      {/* Agentic Mode Button */}
                      <div className="pt-2">
                      <div
                        data-testid="generate-headcount"
                        onClick={onRunAgentHeadcount}
                        className="w-full px-4 py-2.5 bg-amber-500 rounded-[10px] inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-amber-600 transition-colors"
                      >
                          <div data-size="18" data-style="Regular" className="h-4 min-w-4 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <Image src="/sparkle.svg" alt="Sparkle" width={16} height={16} className="w-4 h-4" />
                          </div>
                          <div className="justify-center text-white text-sm font-medium font-['Poppins'] leading-5 tracking-tight">Yes, run the workflow</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-[#353b46] leading-6">
                        <p>
                          I have loaded the high level strategy along with objectives, Key Results and budgets allocated.
                        </p>
                        <p className="mt-2">
                          I can draft a headcount plan based on your strategy and budgets. I'll suggest roles, quantities, timing, and budget allocations.
                        </p>
                      </div>
                      
                      {/* Agent Recommended Button */}
                      <div className="pt-2">
                      <div
                        data-testid="generate-headcount"
                        onClick={onRunAgentHeadcount}
                        className="w-full px-4 py-2.5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#4d3ee0] inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                          <div data-size="18" data-style="Regular" className="h-4 min-w-4 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <Image src="/sparkle.svg" alt="Sparkle" width={16} height={16} className="w-4 h-4" />
                          </div>
                          <div className="justify-center text-[#4d3ee0] text-sm font-medium font-['Poppins'] leading-5 tracking-tight">
                            Agent recommended headcount
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Chat Input Area */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div data-state="Regular" className="w-full h-20 px-4 py-3 bg-white rounded-md shadow-[0px_2px_3px_0px_rgba(53,59,70,0.15)] outline outline-1 outline-offset-[-1px] outline-gray-400 flex flex-col justify-end items-end gap-2 overflow-hidden">
          <div data-content="Placeholder" className="self-stretch h-5 inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 justify-center text-slate-500 text-sm font-normal font-['Poppins'] leading-5 line-clamp-1">Ask anything...</div>
          </div>
          
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center">
              {/* @ Mention button */}
              <div data-size="Medium" data-state="Default" data-type="Tertiary (Ghost)" className="w-8 h-8 p-1.5 relative rounded-lg flex justify-center items-center gap-2">
                <div data-size="16" className="inline-flex flex-col justify-center items-center">
                  <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">@</div>
                </div>
                <div className="left-[-13px] top-[-28px] absolute inline-flex flex-col justify-center items-end gap-2.5" />
                <div className="left-[-13px] top-[36px] absolute inline-flex flex-col justify-center items-center gap-2.5" />
              </div>
              
              {/* Attach button */}
              <div data-size="Medium" data-state="Default" data-type="Tertiary (Ghost)" className="w-8 h-8 p-1.5 relative rounded-lg flex justify-center items-center gap-2">
                <div data-size="16" className="inline-flex flex-col justify-center items-center">
                  <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">📎</div>
                </div>
                <div className="left-[-13px] top-[-28px] absolute inline-flex flex-col justify-center items-end gap-2.5" />
                <div className="left-[-13px] top-[36px] absolute inline-flex flex-col justify-center items-center gap-2.5" />
              </div>
            </div>
            
            {/* Send Button */}
            <div data-size="Medium" data-state="Disabled" data-type="Primary" className="w-8 h-8 p-1.5 bg-gray-200 rounded-lg flex justify-center items-center gap-2">
              <div data-size="16" className="inline-flex flex-col justify-center items-center">
                <div className="text-center justify-center text-gray-400 text-base font-normal font-['Font_Awesome_6_Pro']">↑</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Type definitions for Key Results
interface KeyResult {
  id: string;
  label: string;
  skills: string[];
}

interface StrategyData {
  objective: string;
  keyResults: KeyResult[];
}

// Agent Analysis Component
interface AgentAnalysisProps {
  skills: string[];
}

function AgentAnalysis({ skills }: AgentAnalysisProps) {
  const skillsText = skills.map((s) => `"${s}"`).join(", ");
  
  return (
    <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-md p-3">
      <svg
        className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      <p className="text-xs text-gray-700 flex-1">
        The system analyzes the KR and calculates the skills needed: {skillsText}.
      </p>
    </div>
  );
}

// Key Result Row Component
interface KeyResultRowProps {
  kr: KeyResult;
  onAddHeadcount: (krId: string) => void;
}

function KeyResultRow({ kr, onAddHeadcount }: KeyResultRowProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-2">{kr.label}</p>
          <AgentAnalysis skills={kr.skills} />
        </div>
        <Button
          buttonType="primary"
          label="+ Add Headcount"
          onClick={() => onAddHeadcount(kr.id)}
          onFocus={() => {}}
          onMouseEnter={() => {}}
          size="small"
        />
      </div>
    </div>
  );
}

// Enhanced Strategy Card with Objective and KRs
interface EnhancedStrategyCardProps {
  title: string;
  budget: string;
  status?: string;
  strategyData?: StrategyData;
}

function EnhancedStrategyCard({
  title,
  budget,
  status = "Not defined",
  strategyData,
}: EnhancedStrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddHeadcount = (krId: string) => {
    // TODO: Wire real flow for adding headcount
    console.log("Add headcount for KR:", krId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative" data-testid="wp-retail-card">
      <div className="pr-24">
        <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-sm text-gray-700 mb-4">
          <span className="font-medium">Total Budget:</span> {budget}
        </p>

        {/* Collapsible Section */}
        {strategyData && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid="wp-retail-show-details"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isExpanded ? "Hide details" : "Show details"}
            </button>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {/* Objective */}
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  {strategyData.objective}
                </h4>

                {/* Key Results */}
                <div className="space-y-3" data-testid="wp-retail-krs">
                  {strategyData.keyResults.map((kr) => (
                    <KeyResultRow
                      key={kr.id}
                      kr={kr}
                      onAddHeadcount={handleAddHeadcount}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="absolute top-4 right-4">
        <Badge value={status} type="grey" />
      </div>
    </div>
  );
}

// Strategy Card Component (for non-enhanced cards)
interface StrategyCardProps {
  title: string;
  budget: string;
  status?: string;
}

function StrategyCard({ title, budget, status = "Not defined" }: StrategyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
      <div className="pr-24">
        <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Total Budget:</span> {budget}
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <Badge value={status} type="grey" />
      </div>
    </div>
  );
}

// Playground / Simulator Component
function PlaygroundSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: "ma-integration",
      title: "M&A Integration",
      description: "Employees with a higher or lower package compared to market standards.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      ),
    },
    {
      id: "retention-defense",
      title: "Retention Defense",
      description: "Calculate cost to save high-risk talent.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      id: "dei-pathway",
      title: "DEI Pathway",
      description: "Roadmap to 40% Leadership Diversity.",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    console.log("Selected scenario:", scenarioId);
  };

  const handleRunSimulation = (params: {
    query: string;
    department: string;
    growthRate: number;
    locationStrategy: string;
  }) => {
    console.log("Simulation parameters:", params);
  };

  return (
    <div className="space-y-6">
      {/* Section 1: One-Click Strategic Scenarios */}
      <Card>
        <Card.Header
          title="One-Click Strategic Scenarios"
          description="Select a pre-configured scenario to run instant simulations"
        />
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                title={scenario.title}
                description={scenario.description}
                icon={scenario.icon}
                isSelected={selectedScenario === scenario.id}
                onClick={() => handleScenarioClick(scenario.id)}
              />
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Section 2: Custom What-If Analysis */}
      <WhatIfAnalysis onRunSimulation={handleRunSimulation} />
    </div>
  );
}

// Artifacts Component (Right Column)
interface ArtifactsProps {
  activeTab: "strategy" | "draft" | "playground";
  setActiveTab: (tab: "strategy" | "draft" | "playground") => void;
  draftPlanLines: PlanLine[];
  onAcceptAllSuggested: () => void;
  onFreezePlan: () => void;
  onOpenFreezePlanModal: () => void;
  agentReasoning: string | null;
}

function Artifacts({
  activeTab,
  setActiveTab,
  draftPlanLines,
  onAcceptAllSuggested,
  onFreezePlan,
  onOpenFreezePlanModal,
  agentReasoning,
}: ArtifactsProps) {
  const tabs = [
    { id: "strategy" as const, label: "Strategy & Budget", count: null },
    {
      id: "draft" as const,
      label: "Draft Headcount Plan",
      count: draftPlanLines.length > 0 ? draftPlanLines.length : null,
    },
    { id: "playground" as const, label: "Playground / Simulator", count: null },
  ];

  // Retail Banking Strategy Data
  const retailBankingStrategy: StrategyData = {
    objective: "Objective: Transform the in-branch experience to be faster and advisory-focused.",
    keyResults: [
      {
        id: "kr-1",
        label: "KR 1: Reduce average customer wait time in the lobby from 12 mins to <5 mins.",
        skills: ["DevOps", "Cloud Architecture", "Java"],
      },
      {
        id: "kr-2",
        label: "KR 2: Migrate 40% of simple cash transactions (withdrawals/deposits) to self-service kiosks.",
        skills: ["DevOps", "Cloud Architecture", "Java"],
      },
      {
        id: "kr-3",
        label: "KR 3: Increase \"Advisory Appointment\" bookings by 25% for high-value customers.",
        skills: ["DevOps", "Cloud Architecture", "Java"],
      },
    ],
  };

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Workforce Planning</h1>

      {/* Tabs */}
      <div className="relative mb-6">
        {/* Divider line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E7EB]" />
        
        <nav className="flex space-x-8 items-start" aria-label="Tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={tab.id === "draft" ? "wp-tab-draft-plan" : undefined}
              className={`
                py-2.5 flex justify-center items-start gap-2 cursor-pointer
                ${
                  activeTab === tab.id
                    ? "border-b-2 border-[#4d3ee0]"
                    : ""
                }
              `}
            >
              <div className={`
                justify-center text-sm leading-5 tracking-tight font-['Poppins']
                ${
                  activeTab === tab.id
                    ? "text-[#353b46] font-medium"
                    : "text-[#637085] font-normal"
                }
              `}>
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2">{tab.count}</span>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          <EnhancedStrategyCard
            title="Retail Banking (Branch & Consumer Focus) Optimize branch network efficiency while improving customer retention."
            budget="$2.0M"
            strategyData={retailBankingStrategy}
          />
          <StrategyCard
            title="Digital Transformation (Tech & Innovation) Shift from legacy systems to a mobile-first digital ecosystem."
            budget="$5.0M"
          />
          <StrategyCard
            title="Risk, Compliance & Fraud Maintain a robust risk posture without stifling customer friction."
            budget="$4.0M"
          />
        </div>
      )}

      {activeTab === "draft" && (
        <div className="space-y-6">
          <div
            data-testid="wp-draft-plan-status"
            className="mb-3 inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium wp-status-hidden"
          >
            Draft plan generated · Ready for review
          </div>
          <div data-testid="wp-draft-plan-table">
            <DraftHeadcountPlanTable
              lines={draftPlanLines}
              onAcceptAllSuggested={onAcceptAllSuggested}
              onFreezePlan={onFreezePlan}
              onOpenFreezePlanModal={onOpenFreezePlanModal}
            />
          </div>
          
          {/* Agent Reasoning Panel */}
          {agentReasoning && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Image src="/sparkle.svg" alt="" width={20} height={20} className="w-5 h-5" />
                Agent assumptions & logic
              </h4>
              <p className="text-sm text-gray-700 leading-6">{agentReasoning}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "playground" && (
        <PlaygroundSimulator />
      )}
    </div>
  );
}

// Main Workforce Planning Page
function WorkforcePlanningPageContent() {
  const { currentRole } = useRole();
  const { agenticMode } = useAgentic();
  const { messages: agentMessages, sendMessage, resetChat } = useAgentChat();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"strategy" | "draft" | "playground">("strategy");
  const [draftPlanLines, setDraftPlanLines] = useState<PlanLine[]>([]);
  const [hasAgentDraft, setHasAgentDraft] = useState(false);
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentReasoning, setAgentReasoning] = useState<string | null>(null);
  
  // Detect if we're coming from agentic route
  // Check pathname, referrer, or sessionStorage
  const [detectedAgenticMode, setDetectedAgenticMode] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const checkAgenticMode = () => {
      const fromPathname = pathname?.includes("agentic-autonomous");
      const fromReferrer = typeof document !== "undefined" && document.referrer.includes("agentic-autonomous");
      const fromStorage = sessionStorage.getItem("agenticMode") === "true";
      
      const shouldBeAgentic = fromPathname || fromReferrer || fromStorage;
      setDetectedAgenticMode(shouldBeAgentic);
      
      if (shouldBeAgentic) {
        sessionStorage.setItem("agenticMode", "true");
      }
    };
    
    checkAgenticMode();
    
    // Also check on pathname change
    const interval = setInterval(checkAgenticMode, 100);
    return () => clearInterval(interval);
  }, [pathname]);
  
  // Use agentic mode from context, or detect from route
  const effectiveAgenticMode = agenticMode || detectedAgenticMode;
  
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(!effectiveAgenticMode);
  const [startAuto, setStartAuto] = useState<boolean | null>(null);

  const isHRBPAgentic = effectiveAgenticMode && currentRole === "HRBP";
  
  // Store agentic mode in sessionStorage when detected
  useEffect(() => {
    if (isFromAgenticRoute && typeof window !== "undefined") {
      sessionStorage.setItem("agenticMode", "true");
    }
  }, [isFromAgenticRoute]);

  // When HRBP + agentic, open/reset assistant
  useEffect(() => {
    if (!isHRBPAgentic) {
      setIsAssistantMinimized(true);
      return;
    }
    
    resetChat();
    setIsAssistantMinimized(false);
    setStartAuto(null);
  }, [isHRBPAgentic, resetChat]);

  // Offer flow: ask Dana if she wants an auto plan
  const hrbpOfferFlow =
    isHRBPAgentic && startAuto === null
      ? createHRBPOfferFlow(sendMessage, setStartAuto)
      : [];

  // Run offer flow
  useAgenticOrchestrator(hrbpOfferFlow, {
    agentChat: sendMessage,
  });

  // If Dana clicked "Yes, generate plan"
  useAgenticOrchestrator(
    isHRBPAgentic && startAuto === true ? hrbpAutoPlanFlow : [],
    { agentChat: sendMessage }
  );

  // If Dana clicked "No, I'll review manually"
  useEffect(() => {
    if (isHRBPAgentic && startAuto === false) {
      sendMessage(
        "No problem, Dana. You can review the OKRs and add headcount manually whenever you're ready."
      );
    }
  }, [isHRBPAgentic, startAuto, sendMessage]);

  // Modal states for the draft plan flow
  const [isFreezePlanOpen, setIsFreezePlanOpen] = useState(false);
  const [isCreatePositionsConfirmOpen, setIsCreatePositionsConfirmOpen] = useState(false);
  const [isCreatePositionFormOpen, setIsCreatePositionFormOpen] = useState(false);
  const [isBudgetApprovalOpen, setIsBudgetApprovalOpen] = useState(false);
  const [positionBudget, setPositionBudget] = useState<number | null>(null);
  const [availableBudget, setAvailableBudget] = useState<number | null>(null);

  const handleRunAgentHeadcount = () => {
    if (isAgentRunning) return;

    setIsAgentRunning(true);
    setAgentReasoning(null);

    // Simulate the agent "reading" strategy & budgets and drafting a plan
    setTimeout(() => {
      setDraftPlanLines(MOCK_PLAN_LINES);
      setHasAgentDraft(true);
      setActiveTab("draft");
      setAgentReasoning(
        [
          "I used the FY26 strategy, BU budgets, and standard staffing ratios to propose a draft headcount plan.",
          "I prioritized branch coverage and digital transformation roles, while keeping total spend within the global envelope.",
          "You can inspect my assumptions for each line and edit or reject any of the suggested positions before freezing the plan.",
        ].join(" ")
      );
      setIsAgentRunning(false);
    }, 800);
  };

  const handleAcceptAllSuggested = () => {
    // This now opens the Freeze Plan modal instead
    setIsFreezePlanOpen(true);
  };

  const handleOpenFreezePlanModal = () => {
    setIsFreezePlanOpen(true);
  };

  const handleFreezePlan = () => {
    // Mark all as confirmed
    setDraftPlanLines((prev) =>
      prev.map((line) => ({ ...line, status: "confirmed" as const }))
    );
    // Close freeze modal and open create positions confirm
    setIsFreezePlanOpen(false);
    setIsCreatePositionsConfirmOpen(true);
  };

  const handleCreatePositionsYes = () => {
    setIsCreatePositionsConfirmOpen(false);
    setIsCreatePositionFormOpen(true);
  };

  const handleCreatePositionsLater = () => {
    setIsCreatePositionsConfirmOpen(false);
    toast.info("You can create positions later.");
  };

  const handleCreatePositionSuccess = () => {
    setIsCreatePositionFormOpen(false);
    toast.success("Position created and sent to ATS (demo).");
  };

  const handleBudgetExceeded = (budget: number, available: number) => {
    setPositionBudget(budget);
    setAvailableBudget(available);
    setIsBudgetApprovalOpen(true);
  };

  const handleSubmitForApproval = () => {
    setIsBudgetApprovalOpen(false);
    setIsCreatePositionFormOpen(false);
    setPositionBudget(null);
    setAvailableBudget(null);
    toast.success("Approval request submitted to the reporting manager (demo).");
  };

  const handleViewDraftPlan = () => {
    setActiveTab("draft");
  };

  const handleViewDraftPlanAndMinimize = () => {
    setActiveTab("draft");
    setIsAssistantMinimized(true);
  };

  return (
    <AppLayout pageTitle="Workforce Planning">
      <div className="flex gap-6">
        {/* Left Column: Artifacts */}
        <Artifacts
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          draftPlanLines={draftPlanLines}
          onAcceptAllSuggested={handleAcceptAllSuggested}
          onFreezePlan={handleFreezePlan}
          onOpenFreezePlanModal={handleOpenFreezePlanModal}
          agentReasoning={agentReasoning}
        />

        {/* Right Column: Planning Workspace - Narrower width, full height */}
        {!isAssistantMinimized ? (
          <div className="w-96 min-w-0 -mr-6 pr-0 fixed right-[14px] top-[73px] bottom-0 z-40">
          <PlanningWorkspace
            onRunAgentHeadcount={handleRunAgentHeadcount}
            isAgentRunning={isAgentRunning}
            hasAgentDraft={hasAgentDraft}
            onViewDraftPlan={handleViewDraftPlan}
            onViewDraftPlanAndMinimize={handleViewDraftPlanAndMinimize}
            isMinimized={isAssistantMinimized}
            onMinimize={() => setIsAssistantMinimized(true)}
            onMaximize={() => setIsAssistantMinimized(false)}
            agenticMode={agenticMode}
            agentMessages={agentMessages}
            currentRole={currentRole}
          />
          </div>
        ) : (
          <PlanningWorkspace
            onRunAgentHeadcount={handleRunAgentHeadcount}
            isAgentRunning={isAgentRunning}
            hasAgentDraft={hasAgentDraft}
            onViewDraftPlan={handleViewDraftPlan}
            onViewDraftPlanAndMinimize={handleViewDraftPlanAndMinimize}
            isMinimized={isAssistantMinimized}
            onMinimize={() => setIsAssistantMinimized(true)}
            onMaximize={() => setIsAssistantMinimized(false)}
            agenticMode={effectiveAgenticMode}
            agentMessages={agentMessages}
            currentRole={currentRole}
          />
        )}
      </div>

      {/* Modals for Draft Plan Flow */}
      <FreezePlanModal
        isOpen={isFreezePlanOpen}
        onClose={() => setIsFreezePlanOpen(false)}
        planLines={draftPlanLines}
        onFreezePlan={handleFreezePlan}
      />

      <CreatePositionsConfirmModal
        isOpen={isCreatePositionsConfirmOpen}
        onClose={() => setIsCreatePositionsConfirmOpen(false)}
        onYes={handleCreatePositionsYes}
        onLater={handleCreatePositionsLater}
      />

      <CreatePositionModal
        isOpen={isCreatePositionFormOpen}
        onClose={() => setIsCreatePositionFormOpen(false)}
        onBudgetExceeded={handleBudgetExceeded}
        onSuccess={handleCreatePositionSuccess}
      />

      {isBudgetApprovalOpen && positionBudget !== null && availableBudget !== null && (
        <BudgetApprovalModal
          isOpen={isBudgetApprovalOpen}
          onClose={() => {
            setIsBudgetApprovalOpen(false);
            setPositionBudget(null);
            setAvailableBudget(null);
          }}
          overBudgetAmount={positionBudget - availableBudget}
          onSubmitForApproval={handleSubmitForApproval}
        />
      )}
    </AppLayout>
  );
}

// Main Workforce Planning Page - Wrap with AgenticProvider if needed
export default function WorkforcePlanningPage() {
  const pathname = usePathname();
  
  // Check if we're in an agentic route
  const isAgenticRoute = pathname?.includes("agentic-autonomous");
  
  // If we're in an agentic route, wrap with AgenticProvider
  if (isAgenticRoute) {
    return (
      <AgenticProvider agenticMode={true}>
        <WorkforcePlanningPageContent />
      </AgenticProvider>
    );
  }
  
  return <WorkforcePlanningPageContent />;
}
