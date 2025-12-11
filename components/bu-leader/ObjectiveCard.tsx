"use client";

import { Button } from "@/components/design-system/Button";
import type { Objective, KeyResult } from "@/types/objectives";

interface ObjectiveCardProps {
  objective: Objective;
  activeObjectiveIdForNewKR: string | null;
  newKrDescription: string;
  showKrNotification: string | null;
  onAddKR: (objectiveId: string) => void;
  onSaveKR: (objectiveId: string) => void;
  onCancelKR: () => void;
  onNewKrDescriptionChange: (description: string) => void;
  onDeleteObjective?: (objectiveId: string) => void;
}

export function ObjectiveCard({
  objective,
  activeObjectiveIdForNewKR,
  newKrDescription,
  showKrNotification,
  onAddKR,
  onSaveKR,
  onCancelKR,
  onNewKrDescriptionChange,
  onDeleteObjective,
}: ObjectiveCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
      {/* Delete Button */}
      {onDeleteObjective && (
        <button
          onClick={() => onDeleteObjective(objective.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Delete objective"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      <h3 className="text-base font-semibold text-gray-900 mb-4 pr-8">
        Objective: {objective.title}
      </h3>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Results</h4>
        {objective.keyResults.length > 0 ? (
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            {objective.keyResults.map((kr) => (
              <li key={kr.id} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{kr.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No key results yet. Add one below.</p>
        )}

        {/* New KR Form */}
        {activeObjectiveIdForNewKR === objective.id ? (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Result Description
            </label>
            <input
              id={`okr-kr-${objective.keyResults.length + 1}-input`}
              data-testid="okr-kr-input"
              type="text"
              value={newKrDescription}
              onChange={(e) => onNewKrDescriptionChange(e.target.value)}
              placeholder="e.g., Reduce average customer wait time from 12 mins to <5 mins"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            />
            <div className="flex gap-3">
              <Button
                buttonType="primary"
                label="Save KR"
                onClick={() => onSaveKR(objective.id)}
                onFocus={() => {}}
                onMouseEnter={() => {}}
                size="small"
              />
              <Button
                buttonType="secondary"
                label="Cancel"
                onClick={onCancelKR}
                onFocus={() => {}}
                onMouseEnter={() => {}}
                size="small"
              />
            </div>
          </div>
        ) : (
          <Button
            buttonType="secondary"
            label="+ Add KR"
            onClick={() => onAddKR(objective.id)}
            onFocus={() => {}}
            onMouseEnter={() => {}}
            size="small"
          />
        )}

        {/* HRBP Notification */}
        {showKrNotification === objective.id && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              HRBP for Retail Banking has been notified about this new Key Result.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

