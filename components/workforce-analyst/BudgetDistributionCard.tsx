import { ProgressBar } from "@phenom/react-ds/progressbar";

interface BudgetItem {
  label: string;
  percentage: number;
}

const budgetData: BudgetItem[] = [
  { label: "Retail", percentage: 18.2 },
  { label: "Digital", percentage: 45.5 },
  { label: "Risk", percentage: 36.4 },
];

export function BudgetDistributionCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Budget Distribution</h3>
      </div>
      <div className="space-y-4">
        {budgetData.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.percentage}%
              </span>
            </div>
            <ProgressBar value={item.percentage} />
          </div>
        ))}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Total Allocated:</span> $11.0M
          </p>
        </div>
      </div>
    </div>
  );
}

