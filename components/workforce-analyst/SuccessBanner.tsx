export function SuccessBanner() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-green-900 mb-1">
            Strategy Successfully Published
          </h3>
          <p className="text-sm text-green-800">
            All BU Leaders have been notified and can now view their strategy, budgets, and begin workforce planning.
          </p>
        </div>
      </div>
    </div>
  );
}

