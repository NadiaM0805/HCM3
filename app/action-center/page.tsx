"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@phenom/react-ds/button";
import { toast } from "@phenom/react-ds/snackbar";

interface ApprovalCardProps {
  title: string;
  description: string;
  onApprove: () => void;
  onReject?: () => void;
  onSendBack?: () => void;
  primaryActionLabel: string;
  secondaryActionLabel: string;
}

function ApprovalCard({
  title,
  description,
  onApprove,
  onReject,
  onSendBack,
  primaryActionLabel,
  secondaryActionLabel,
}: ApprovalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex gap-3">
        <Button
          buttonType="primary"
          label={primaryActionLabel}
          onClick={onApprove}
          onFocus={() => {}}
          onMouseEnter={() => {}}
          size="small"
        />
        {onReject && (
          <Button
            buttonType="secondary"
            label={secondaryActionLabel}
            onClick={onReject}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        )}
        {onSendBack && (
          <Button
            buttonType="secondary"
            label={secondaryActionLabel}
            onClick={onSendBack}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        )}
      </div>
    </div>
  );
}

export default function ActionCenterPage() {
  const handleBudgetApproval = () => {
    console.log("Budget approval action");
    toast.success("Budget approval processed successfully.");
  };

  const handleBudgetReject = () => {
    console.log("Budget rejection action");
    toast.info("Budget request has been rejected.");
  };

  const handleHeadcountApprove = () => {
    console.log("Headcount plan approval action");
    toast.success("Headcount plan approved.");
  };

  const handleHeadcountSendBack = () => {
    console.log("Headcount plan send back action");
    toast.info("Headcount plan sent back for revision.");
  };

  return (
    <AppLayout pageTitle="Action Center">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Action Center</h1>
          <p className="text-sm text-gray-600 mt-1">
            Approve budgets, headcount, and key decisions across the HCM demo.
          </p>
        </div>

        <div className="space-y-4">
          <ApprovalCard
            title="Budget Approval – Retail Banking"
            description="Headcount plan for FY26 exceeds the original budget by 5%."
            onApprove={handleBudgetApproval}
            onReject={handleBudgetReject}
            primaryActionLabel="Approve"
            secondaryActionLabel="Reject"
          />

          <ApprovalCard
            title="Headcount Plan – Digital Transformation"
            description="New headcount plan submitted by Dana (HRBP) for review."
            onApprove={handleHeadcountApprove}
            onSendBack={handleHeadcountSendBack}
            primaryActionLabel="Approve"
            secondaryActionLabel="Send back"
          />
        </div>
      </div>
    </AppLayout>
  );
}
