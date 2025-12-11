"use client";

import { CustomModal } from "@/components/ui/CustomModal";
import { Button } from "@/components/design-system/Button";
import type { PlanLine } from "@/types/planLine";

interface FreezePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planLines: PlanLine[];
  onFreezePlan: () => void;
}

export function FreezePlanModal({
  isOpen,
  onClose,
  planLines,
  onFreezePlan,
}: FreezePlanModalProps) {
  if (!isOpen) return null;

  // Group plan lines by Business Unit
  const groupedByBU = planLines.reduce((acc, line) => {
    if (!acc[line.businessUnit]) {
      acc[line.businessUnit] = [];
    }
    acc[line.businessUnit].push(line);
    return acc;
  }, {} as Record<string, PlanLine[]>);

  // Calculate totals for each BU
  const buSummaries = Object.entries(groupedByBU).map(([bu, lines]) => {
    const totalHeadcount = lines.reduce((sum, line) => sum + line.headcount, 0);
    const totalBudget = lines.reduce((sum, line) => {
      // Parse budget string like "$360K" or "$2.0M"
      const budgetStr = line.budget.replace(/[^0-9.KM]/g, "");
      let budgetNum = parseFloat(budgetStr);
      if (budgetStr.includes("K")) {
        budgetNum = budgetNum * 1000;
      } else if (budgetStr.includes("M")) {
        budgetNum = budgetNum * 1000000;
      }
      return sum + budgetNum;
    }, 0);
    return {
      businessUnit: bu,
      lines,
      totalHeadcount,
      totalBudget,
    };
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Freeze the Plan"
      width="w-[640px]"
      footer={
        <>
          <Button
            buttonType="secondary"
            label="Cancel"
            onClick={onClose}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
          <div data-testid="freeze-plan-button">
            <Button
              buttonType="primary"
              label="Freeze plan"
              onClick={onFreezePlan}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
            />
          </div>
        </>
      }
    >
      <div className="space-y-6 w-full">
        <p className="text-sm text-gray-700">
          Review the plan summary before freezing. All positions will be marked as confirmed.
        </p>

        {/* Grouped by Business Unit */}
        <div className="space-y-4">
          {buSummaries.map((summary) => (
            <div
              key={summary.businessUnit}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-gray-900">
                  {summary.businessUnit}
                </h4>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{summary.totalHeadcount} positions</span>
                  {" • "}
                  <span className="font-medium">
                    {summary.totalBudget >= 1000000
                      ? `$${(summary.totalBudget / 1000000).toFixed(1)}M`
                      : `$${(summary.totalBudget / 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>

              {/* Roles table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                        Role
                      </th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                        Quarter
                      </th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                        Region
                      </th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                        Headcount
                      </th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                        Budget
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.lines.map((line) => (
                      <tr key={line.id} className="border-b border-gray-100">
                        <td className="py-2 px-2 text-gray-900">{line.role}</td>
                        <td className="py-2 px-2 text-gray-700">{line.quarter}</td>
                        <td className="py-2 px-2 text-gray-700">{line.region}</td>
                        <td className="py-2 px-2 text-gray-900">{line.headcount}</td>
                        <td className="py-2 px-2 text-gray-900">{line.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomModal>
  );
}

