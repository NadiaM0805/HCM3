"use client";

import { Button } from "@/components/design-system/Button";

interface KPICardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  onNavigate?: () => void;
}

export function KPICard({ icon, title, value, description, onNavigate }: KPICardProps) {
  return (
    <div className="bg-white border border-[#aeb5c2] rounded-lg p-6 h-[140px] flex items-center">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center text-[#4d3ee0]">
              {icon}
            </div>
            <p className="text-base font-semibold text-[#353b46]">{title}</p>
          </div>
          <button
            onClick={onNavigate}
            className="w-6 h-6 border border-[#8c95a8] rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label={`View ${title}`}
          >
            <svg className="w-4 h-4 text-[#464f5e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-semibold text-[#353b46] tracking-[0.18px]">{value}</p>
          <p className="text-sm font-normal text-[#637085] tracking-[0.25px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

