"use client";

import { useState, useEffect } from "react";
import { CustomModal } from "@/components/ui/CustomModal";
import { Button } from "@/components/design-system/Button";

interface CreatePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBudgetExceeded: (budget: number, available: number) => void;
  onSuccess: () => void;
}

const BUSINESS_UNIT_BUDGETS: Record<string, number> = {
  "Retail Banking (Branch & Consumer Focus) Optimize branch network efficiency while improving customer retention.": 2000000,
  "Digital Transformation (Tech & Innovation) Shift from legacy systems to a mobile-first digital ecosystem.": 5000000,
  "Risk, Compliance & Fraud Maintain a robust risk posture without stifling customer friction.": 4000000,
};

const BUSINESS_UNIT_OPTIONS = [
  "Retail Banking (Branch & Consumer Focus) Optimize branch network efficiency while improving customer retention.",
  "Digital Transformation (Tech & Innovation) Shift from legacy systems to a mobile-first digital ecosystem.",
  "Risk, Compliance & Fraud Maintain a robust risk posture without stifling customer friction.",
];

export function CreatePositionModal({
  isOpen,
  onClose,
  onBudgetExceeded,
  onSuccess,
}: CreatePositionModalProps) {
  const [positionName, setPositionName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [businessUnit, setBusinessUnit] = useState(BUSINESS_UNIT_OPTIONS[0]);
  const [costCentre, setCostCentre] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [budget, setBudget] = useState("");

  const availableBudget = BUSINESS_UNIT_BUDGETS[businessUnit] || 0;

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setPositionName("");
      setEmployeeId("");
      setReason("");
      setLocation("");
      setBusinessUnit(BUSINESS_UNIT_OPTIONS[0]);
      setCostCentre("");
      setReportsTo("");
      setBudget("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    // Parse budget input - handle formats like "$100K", "100000", "$100,000", etc.
    const budgetStr = budget.replace(/[^0-9.KM]/g, "");
    let budgetNum = parseFloat(budgetStr) || 0;
    
    // Handle K and M suffixes
    if (budgetStr.toUpperCase().includes("K")) {
      budgetNum = budgetNum * 1000;
    } else if (budgetStr.toUpperCase().includes("M")) {
      budgetNum = budgetNum * 1000000;
    }

    if (budgetNum > availableBudget) {
      onBudgetExceeded(budgetNum, availableBudget);
    } else {
      onSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Position"
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
          <Button
            buttonType="primary"
            label="Create Position"
            onClick={handleSubmit}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        </>
      }
    >
      <div className="space-y-4 w-full">
          {/* Position Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position Name
            </label>
            <input
              type="text"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter position name"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee ID"
            />
          </div>

          {/* Reason for Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Position
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for position"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>

          {/* Business Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Unit
            </label>
            <select
              value={businessUnit}
              onChange={(e) => setBusinessUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {BUSINESS_UNIT_OPTIONS.map((bu) => (
                <option key={bu} value={bu}>
                  {bu}
                </option>
              ))}
            </select>
          </div>

          {/* Cost Centre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Centre
            </label>
            <input
              type="text"
              value={costCentre}
              onChange={(e) => setCostCentre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter cost centre"
            />
          </div>

          {/* Reports To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reports To
            </label>
            <input
              type="text"
              value={reportsTo}
              onChange={(e) => setReportsTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reports to"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter budget amount"
            />
            <p className="mt-1 text-xs text-gray-500">
              Available budget: ${(availableBudget / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
    </CustomModal>
  );
}

