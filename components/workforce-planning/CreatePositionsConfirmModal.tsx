"use client";

import { CustomModal } from "@/components/ui/CustomModal";
import { Button } from "@phenom/react-ds/button";

interface CreatePositionsConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onYes: () => void;
  onLater: () => void;
}

export function CreatePositionsConfirmModal({
  isOpen,
  onClose,
  onYes,
  onLater,
}: CreatePositionsConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Positions"
      footer={
        <div className="flex flex-col gap-2 w-full">
          <Button
            buttonType="primary"
            label="Yes"
            onClick={onYes}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
            fullWidth
          />
          <Button
            buttonType="secondary"
            label="Later"
            onClick={onLater}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
            fullWidth
          />
          <Button
            buttonType="neutral"
            label="Cancel"
            onClick={onClose}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
            fullWidth
          />
        </div>
      }
    >
      <p className="text-sm text-gray-700 w-full">
        Do you want to create positions for all the headcounts?
      </p>
    </CustomModal>
  );
}

