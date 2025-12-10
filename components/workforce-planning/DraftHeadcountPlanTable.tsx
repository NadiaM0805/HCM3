"use client";

import React from "react";
import { Button } from "@phenom/react-ds/button";
import { Badge } from "@phenom/react-ds/badge";
import type { PlanLine } from "@/types/planLine";

type DraftHeadcountPlanTableProps = {
  lines: PlanLine[];
  onFreezePlan: () => void;
  onAcceptAllSuggested: () => void;
  onOpenFreezePlanModal: () => void;
};

export function DraftHeadcountPlanTable({
  lines,
  onFreezePlan,
  onAcceptAllSuggested,
  onOpenFreezePlanModal,
}: DraftHeadcountPlanTableProps) {
  if (!lines.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500 mb-2">No draft headcount plan yet.</p>
        <p className="text-sm text-gray-400">
          Run "Agent recommended headcount" to generate a draft plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Draft headcount plan</h3>
        <div className="flex gap-3">
          <Button
            buttonType="secondary"
            label="Accept all suggested"
            onClick={onOpenFreezePlanModal}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
          <Button
            buttonType="primary"
            label="Freeze the plan"
            onClick={onFreezePlan}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Business Unit
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Quarter
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Region
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Headcount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Budget
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr
                  key={line.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">{line.businessUnit}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{line.role}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{line.quarter}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{line.region}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {line.headcount}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {line.budget}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      value={line.status === "suggested" ? "Suggested" : "Confirmed"}
                      type={line.status === "suggested" ? "grey" : "filled"}
                      size="small"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

