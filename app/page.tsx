"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import { Role } from "@/types/roles";
import { Button } from "@/components/design-system/Button";
import { Modal } from "@/components/design-system/Modal";
import { Badge } from "@/components/design-system/Badge";
import { WelcomeHeader } from "@/components/workforce-analyst/WelcomeHeader";
import { StatCard } from "@/components/workforce-analyst/StatCard";
import { SourceDocumentStrip } from "@/components/workforce-analyst/SourceDocumentStrip";
import { BusinessUnitAllocationTable } from "@/components/workforce-analyst/BusinessUnitAllocationTable";
import { BudgetDistributionCard } from "@/components/workforce-analyst/BudgetDistributionCard";
import { SuccessBanner } from "@/components/workforce-analyst/SuccessBanner";
import { StrategyUploadPanel } from "@/components/workforce-analyst/StrategyUploadPanel";
import { ObjectiveCard } from "@/components/bu-leader/ObjectiveCard";
import type { Objective, KeyResult } from "@/types/objectives";
import { HrbpDashboard } from "@/components/dashboard/HrbpDashboard";
import { ReportingManagerDashboard } from "@/components/dashboard/ReportingManagerDashboard";

// Workforce Analyst View
function WorkforceAnalystView() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Success Banner */}
        <SuccessBanner />

        {/* Source Document Strip */}
        <SourceDocumentStrip
          fileName="FY26_Strategy_Budget.xlsx"
          onUploadNew={() => setShowUploadModal(true)}
        />

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Global Budget" value="$11.0M" tag="Total" />
          <StatCard label="Fiscal Year" value="FY 2026" tag="Period" />
          <StatCard label="Business Units" value="3" tag="Active" />
          <StatCard label="vs Last Year" value="+15%" tag="Growth" />
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Business Unit Allocation */}
          <BusinessUnitAllocationTable />

          {/* Budget Distribution */}
          <BudgetDistributionCard />
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        size="medium"
      >
        <Modal.Header>
          <Modal.Header.Title>Upload Strategy Document</Modal.Header.Title>
          <Modal.Header.CloseButton />
        </Modal.Header>
        <Modal.Content>
          <StrategyUploadPanel status="awaiting" />
        </Modal.Content>
      </Modal>
    </>
  );
}

// BU Leader View
function BULeaderView() {
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: "obj-1",
      title: "Transform the in-branch experience to be faster and advisory-focused.",
      keyResults: [
        { id: "kr-1", description: "Reduce average customer wait time by 30% by Q2 2026" },
        { id: "kr-2", description: "Train 80% of branch staff on advisory services by Q1 2026" },
        { id: "kr-3", description: "Increase customer satisfaction score to 4.5/5 by Q3 2026" },
      ],
    },
  ]);

  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [newObjectiveTitle, setNewObjectiveTitle] = useState("");
  const [activeObjectiveIdForNewKR, setActiveObjectiveIdForNewKR] = useState<string | null>(null);
  const [newKrDescription, setNewKrDescription] = useState("");
  const [showKrNotification, setShowKrNotification] = useState<string | null>(null);

  const handleAddObjective = () => {
    setIsAddingObjective(true);
  };

  const handleSaveObjective = () => {
    if (newObjectiveTitle.trim()) {
      const newObjective: Objective = {
        id: `obj-${Date.now()}`,
        title: newObjectiveTitle.trim(),
        keyResults: [],
      };
      setObjectives((prev) => [...prev, newObjective]);
      setNewObjectiveTitle("");
      setIsAddingObjective(false);
    }
  };

  const handleCancelObjective = () => {
    setNewObjectiveTitle("");
    setIsAddingObjective(false);
  };

  const handleDeleteObjective = (objectiveId: string) => {
    setObjectives((prev) => prev.filter((o) => o.id !== objectiveId));
  };

  const handleAddKR = (objectiveId: string) => {
    setActiveObjectiveIdForNewKR(objectiveId);
    setNewKrDescription("");
  };

  const handleSaveKR = (objectiveId: string) => {
    if (newKrDescription.trim()) {
      setObjectives((prev) =>
        prev.map((obj) =>
          obj.id === objectiveId
            ? {
                ...obj,
                keyResults: [
                  ...obj.keyResults,
                  {
                    id: `kr-${Date.now()}`,
                    description: newKrDescription.trim(),
                  },
                ],
              }
            : obj
        )
      );
      setNewKrDescription("");
      setActiveObjectiveIdForNewKR(null);
      setShowKrNotification(objectiveId);
      // Hide notification after 5 seconds
      setTimeout(() => setShowKrNotification(null), 5000);
    }
  };

  const handleCancelKR = () => {
    setNewKrDescription("");
    setActiveObjectiveIdForNewKR(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Goal Definition Canvas</h1>
        <p className="text-sm text-gray-600 mt-1">Define objectives and key results for your business unit</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Business Unit
        </label>
        <select className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option>Retail Banking</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        <div className="absolute top-4 right-4">
          <Badge value="Locked" type="grey" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pr-20">
          Retail Banking (Branch & Consumer Focus) Optimize branch network efficiency while improving customer retention.
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium">Budget:</span> $2,000,000</p>
          <p><span className="font-medium">Initiatives:</span> Open 15 new branches – Central region</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Objectives & Key Results</h2>
        <Button
          buttonType="primary"
          label="+ Add Objective"
          onClick={handleAddObjective}
          onFocus={() => {}}
          onMouseEnter={() => {}}
          size="small"
        />
      </div>

      {/* New Objective Form */}
      {isAddingObjective && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">New Objective</h3>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objective Title
          </label>
          <input
            type="text"
            value={newObjectiveTitle}
            onChange={(e) => setNewObjectiveTitle(e.target.value)}
            placeholder="e.g., Transform the in-branch experience..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          />
          <div className="flex gap-3">
            <Button
              buttonType="primary"
              label="Save Objective"
              onClick={handleSaveObjective}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
            />
            <Button
              buttonType="secondary"
              label="Cancel"
              onClick={handleCancelObjective}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
            />
          </div>
        </div>
      )}

      {/* Objectives List */}
      {objectives.map((objective) => (
        <ObjectiveCard
          key={objective.id}
          objective={objective}
          activeObjectiveIdForNewKR={activeObjectiveIdForNewKR}
          newKrDescription={newKrDescription}
          showKrNotification={showKrNotification}
          onAddKR={handleAddKR}
          onSaveKR={handleSaveKR}
          onCancelKR={handleCancelKR}
          onNewKrDescriptionChange={setNewKrDescription}
          onDeleteObjective={handleDeleteObjective}
        />
      ))}
    </div>
  );
}

// HRBP View
function HRBPView() {
  return <HrbpDashboard />;
}

// Reporting Manager View
function ReportingManagerView() {
  return <ReportingManagerDashboard />;
}

// Main Dashboard Component
export default function Home() {
  const { currentRole, roleInfo } = useRole();

  // Determine page title based on role
  const getPageTitle = (role: Role): string => {
    switch (role) {
      case "Workforce Analyst":
        return "Strategy Ingestion Console";
      case "BU Leader":
        return "Goal Definition Canvas";
      case "HRBP":
      case "Reporting Manager":
        return "Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Render role-specific view
  const renderRoleView = () => {
    switch (currentRole) {
      case "Workforce Analyst":
        return <WorkforceAnalystView />;
      case "BU Leader":
        return <BULeaderView />;
      case "HRBP":
        return <HRBPView />;
      case "Reporting Manager":
        return <ReportingManagerView />;
      default:
        return null;
    }
  };

  return (
    <AppLayout pageTitle={getPageTitle(currentRole)}>
      {renderRoleView()}
    </AppLayout>
  );
}
