"use client";

import { useState } from "react";
import { Card } from "@phenom/react-ds/card";
import { Button } from "@phenom/react-ds/button";
import { cn } from "@/lib/utils";

type SimulationResult = {
  insight: string;
  baseline: {
    totalCost: string;
    headcount: number;
    avgCostPerHire: string;
  };
  simulation: {
    totalCost: string;
    costDeltaLabel: string; // e.g. "+$160k"
    headcount: number;
    headcountDeltaLabel: string; // e.g. "+2 Roles"
    avgCostPerHire: string;
  };
  impactedRoles: {
    label: "ADDED" | "CUT" | "REDUNDANT";
    title: string;
    location: string;
    cost: string;
  }[];
  orgChartNodes: {
    id: string;
    name: string;
    title: string;
    status: "existing" | "added" | "cut" | "redundant";
    indentLevel: number;
  }[];
};

interface WhatIfAnalysisProps {
  onRunSimulation?: (params: {
    query: string;
    department: string;
    growthRate: number;
    locationStrategy: string;
  }) => void;
}

export function WhatIfAnalysis({ onRunSimulation }: WhatIfAnalysisProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [growthRate, setGrowthRate] = useState(0);
  const [locationStrategy, setLocationStrategy] = useState("Hybrid");
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsRunning(true);
    setSimulationResult(null);

    // Call parent callback if provided
    if (onRunSimulation) {
      onRunSimulation({
        query,
        department,
        growthRate,
        locationStrategy,
      });
    }

    // Simulate AI processing
    setTimeout(() => {
      setSimulationResult({
        insight:
          "Based on the current growth target, I recommend adding 2 key positions to support scaling. Focus on senior roles for immediate impact.",
        baseline: {
          totalCost: "$2.0M",
          headcount: 20,
          avgCostPerHire: "$100k",
        },
        simulation: {
          totalCost: "$2.2M",
          costDeltaLabel: "+$160k",
          headcount: 22,
          headcountDeltaLabel: "+2 Roles",
          avgCostPerHire: "$100k",
        },
        impactedRoles: [
          {
            label: "ADDED",
            title: "Senior Developer",
            location: "Hybrid",
            cost: "$120k",
          },
          {
            label: "ADDED",
            title: "Product Manager",
            location: "Onshore",
            cost: "$130k",
          },
        ],
        orgChartNodes: [
          { id: "1", name: "Sarah Chen", title: "CTO", status: "existing", indentLevel: 0 },
          { id: "2", name: "John Smith", title: "Engineering Lead", status: "existing", indentLevel: 1 },
          { id: "3", name: "Alice Wang", title: "Senior Dev", status: "existing", indentLevel: 2 },
          { id: "4", name: "Bob Martinez", title: "Senior Dev", status: "existing", indentLevel: 2 },
          { id: "5", name: "David Chen (Fintech)", title: "Director Eng", status: "existing", indentLevel: 2 },
          { id: "6", name: "Open Role", title: "Junior Dev", status: "added", indentLevel: 3 },
          { id: "7", name: "Open Role", title: "Junior Dev", status: "added", indentLevel: 3 },
        ],
      });
      setIsRunning(false);
    }, 900);
  };

  return (
    <Card>
      <Card.Header
        title="Custom What-If Analysis"
        description="Ask a natural language question and tune key parameters."
      />
      <Card.Content>
        <form onSubmit={handleRunSimulation} className="space-y-6">
          {/* Natural Language Query */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Natural Language Query
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What if we cut Engineering budget by 10%?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Controls Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All</option>
                <option value="Retail Banking">Retail Banking</option>
                <option value="Digital">Digital</option>
                <option value="Risk & Compliance">Risk & Compliance</option>
              </select>
            </div>

            {/* Growth Rate Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Growth Rate: {growthRate > 0 ? "+" : ""}{growthRate}%
              </label>
              <input
                type="range"
                min="-20"
                max="20"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>-20%</span>
                <span>0%</span>
                <span>+20%</span>
              </div>
            </div>

            {/* Location Strategy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Strategy
              </label>
              <select
                value={locationStrategy}
                onChange={(e) => setLocationStrategy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          {/* Run Button */}
          <div>
            <Button
              buttonType="primary"
              label={isRunning ? "Running simulation..." : "Run Custom Simulation"}
              onClick={handleRunSimulation}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
              fullWidth
              type="submit"
              disabled={isRunning}
            />
          </div>
        </form>
      </Card.Content>

      {/* Loading State */}
      {isRunning && !simulationResult && (
        <Card.Content>
          <div className="mt-4 rounded-lg border border-dashed border-purple-300 bg-purple-50 px-4 py-3 text-sm text-purple-800">
            Running simulation… the agent is analyzing your parameters and drafting a headcount plan.
          </div>
        </Card.Content>
      )}

      {/* Simulation Results */}
      {simulationResult && (
        <Card.Content>
          <section className="mt-8 space-y-6">
            {/* AI Insight banner */}
            <div className="rounded-xl bg-gradient-to-r from-purple-50 via-purple-50/50 to-purple-50 px-5 py-4 shadow-sm">
              <h3 className="mb-1 text-sm font-semibold text-gray-900">AI Insight</h3>
              <p className="text-sm text-gray-700">{simulationResult.insight}</p>
            </div>

            {/* Baseline vs Simulation */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-gray-900">Baseline (Current Strategy)</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Total Cost</dt>
                    <dd className="font-medium text-gray-900">{simulationResult.baseline.totalCost}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Headcount</dt>
                    <dd className="font-medium text-gray-900">{simulationResult.baseline.headcount}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Avg Cost per Hire</dt>
                    <dd className="font-medium text-gray-900">{simulationResult.baseline.avgCostPerHire}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-5 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-gray-900">Simulation Results</h4>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Total Cost</dt>
                    <dd className="flex items-center gap-2 font-medium text-gray-900">
                      {simulationResult.simulation.totalCost}
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                        {simulationResult.simulation.costDeltaLabel}
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Headcount</dt>
                    <dd className="flex items-center gap-2 font-medium text-gray-900">
                      {simulationResult.simulation.headcount}
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                        {simulationResult.simulation.headcountDeltaLabel}
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-500">Avg Cost per Hire</dt>
                    <dd className="font-medium text-gray-900">{simulationResult.simulation.avgCostPerHire}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Impacted Roles */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Impacted Roles</h4>
              <div className="space-y-3">
                {simulationResult.impactedRoles.map((role, idx) => (
                  <div
                    key={`${role.title}-${idx}`}
                    className="flex items-center justify-between rounded-lg bg-purple-50 px-4 py-3 text-sm"
                  >
                    <div className="flex flex-col">
                      <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
                        {role.label}
                      </span>
                      <span className="font-medium text-gray-900">{role.title}</span>
                      <span className="text-xs text-gray-500">{role.location}</span>
                    </div>
                    <span className="text-sm font-semibold text-purple-800">{role.cost}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Org Chart preview */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">Org Chart Preview</h4>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1 text-gray-500">
                    <span className="h-2 w-2 rounded-full border border-gray-400" /> Existing
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <span className="h-2 w-2 rounded-full border border-purple-500 bg-purple-100" /> Added
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <span className="h-2 w-2 rounded-full border border-red-400 bg-red-50" /> Cut / Paused
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {simulationResult.orgChartNodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center"
                    style={{ paddingLeft: `${node.indentLevel * 24}px` }}
                  >
                    <div
                      className={cn(
                        "inline-flex rounded-lg border px-3 py-1.5 text-xs font-medium",
                        node.status === "existing" && "border-gray-300 bg-gray-50 text-gray-800",
                        node.status === "added" && "border-purple-300 bg-purple-50 text-purple-800",
                        node.status === "cut" && "border-red-300 bg-red-50 text-red-700",
                        node.status === "redundant" && "border-orange-300 bg-orange-50 text-orange-700"
                      )}
                    >
                      <span className="mr-1 font-semibold">{node.name}</span>
                      <span className="text-gray-500">· {node.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col gap-3 pt-1 md:flex-row md:justify-end">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Save as Scenario A
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-200 hover:bg-purple-50"
              >
                Send to BU Leader for Review
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700"
              >
                Apply to Live Plan
              </button>
            </div>
          </section>
        </Card.Content>
      )}
    </Card>
  );
}

