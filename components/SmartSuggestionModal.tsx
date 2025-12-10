"use client";

import Image from "next/image";
import { CustomModal } from "@/components/ui/CustomModal";
import { Button } from "@/components/design-system/Button";

interface SmartSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFreezeBudget: () => void;
  onCreateRequisition: () => void;
  employeeName: string;
  roleName: string;
  positionCode: string;
  approvedBudget: string;
}

export function SmartSuggestionModal({
  isOpen,
  onClose,
  onFreezeBudget,
  onCreateRequisition,
  employeeName,
  roleName,
  positionCode,
  approvedBudget,
}: SmartSuggestionModalProps) {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Image src="/sparkle.svg" alt="" width={20} height={20} className="w-5 h-5" />
          <span>Smart Suggestion</span>
        </div>
      }
      footer={
        <>
          <Button
            buttonType="secondary"
            label="No, Freeze Budget"
            onClick={onFreezeBudget}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
          <Button
            buttonType="primary"
            label="Yes, Create Requisition"
            onClick={onCreateRequisition}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        </>
      }
    >
      <div className="space-y-4 w-full">
        {/* Status row */}
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2 text-green-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Resignation Accepted</span>
          </span>
        </div>

        {/* Agent suggestion card */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-xs font-medium text-gray-700 mb-2">
            Agent Suggestion:
          </div>
          <p className="text-sm text-gray-900 mb-2">
            This leaves the <strong>{roleName}</strong> position ({positionCode}) vacant.
            The approved budget for this position is <strong>{approvedBudget}</strong>.
          </p>
          <p className="text-sm text-gray-900">
            Would you like me to instantly create a replacement requisition?
          </p>
        </div>
      </div>
    </CustomModal>
  );
}

