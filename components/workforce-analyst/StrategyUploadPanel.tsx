"use client";

import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";

interface StrategyUploadPanelProps {
  status?: "awaiting" | "uploaded";
}

export function StrategyUploadPanel({ status = "awaiting" }: StrategyUploadPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 relative">
      {status === "awaiting" && (
        <div className="absolute top-4 right-4">
          <Badge value="Awaiting Upload" type="filled" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Strategy Document</h3>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
          Upload an Excel file containing FY26 strategy, budgets, and business unit initiatives
        </p>
        <Button buttonType="primary" label="Upload Mock Excel" />
        <p className="text-xs text-gray-500 mt-4">Supported formats: .xlsx, .xls</p>
      </div>
    </div>
  );
}

