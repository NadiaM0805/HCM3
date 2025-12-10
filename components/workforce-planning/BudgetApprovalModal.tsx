"use client";

import { CustomModal } from "@/components/ui/CustomModal";
import { Button } from "@phenom/react-ds/button";

interface BudgetApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  overBudgetAmount: number;
  onSubmitForApproval: () => void;
}

export function BudgetApprovalModal({
  isOpen,
  onClose,
  overBudgetAmount,
  onSubmitForApproval,
}: BudgetApprovalModalProps) {
  if (!isOpen) return null;

  const formattedOverBudget = `$${(overBudgetAmount / 1000).toFixed(1)}K`;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Budget Approval Required"
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
            label="Submit for Approval"
            onClick={onSubmitForApproval}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        </>
      }
    >
      <p className="text-sm text-gray-700 w-full">
        This position exceeds the allocated budget by {formattedOverBudget}. To proceed with
        this request, an approval email will be sent to the reporting manager for review. Would
        you like to submit this for approval?
      </p>
    </CustomModal>
  );
}

