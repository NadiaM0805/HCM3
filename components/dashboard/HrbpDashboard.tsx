"use client";

import { useRouter } from "next/navigation";
import { Button } from "@phenom/react-ds/button";
import { Badge } from "@phenom/react-ds/badge";
import { useRole } from "@/contexts/RoleContext";

interface KPITileProps {
  value: string;
  label: string;
  subtext?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

function KPITile({ value, label, subtext, trend }: KPITileProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.direction === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}

interface InsightMetricProps {
  title: string;
  value: string;
  subtext: string;
}

function InsightMetric({ title, value, subtext }: InsightMetricProps) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-base font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-600">{subtext}</p>
    </div>
  );
}

export function HrbpDashboard() {
  const router = useRouter();
  const { roleInfo } = useRole();

  const handleOpenPlaybook = () => {
    router.push("/workforce-planning");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative h-[288px] w-full mb-6">
        <div className="absolute h-[288px] left-0 rounded-[32px] top-0 w-full bg-gradient-to-br from-white via-white to-purple-50">
          <div className="absolute flex flex-col items-start left-0 top-[81px] w-full max-w-[888px] px-6">
            <h1 className="font-semibold leading-[90px] relative shrink-0 text-[60px] text-black tracking-[-0.5px] w-full mb-0">
              Good morning, {roleInfo.name}
            </h1>
            <div className="flex items-center relative shrink-0 w-full mt-0">
              <p className="font-normal leading-[36px] relative shrink-0 text-[#464f5e] text-[20px] tracking-[0.18px]">
                {roleInfo.role} · {roleInfo.org}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Playbooks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Playbooks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Workforce Plan – FY26 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Workforce Plan – FY26</h3>
              <Badge value="Status: Ready to start" type="filled" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Turn FY26 strategy and budgets into time-phased headcount Plan Lines and Position Actions.
            </p>
            <Button
              buttonType="primary"
              label="Open playbook"
              onClick={handleOpenPlaybook}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
              fullWidth
            />
          </div>

          {/* Attrition Risk – Customer Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Attrition Risk – Customer Support</h3>
              <Badge value="Status: Monitoring" type="grey" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Track high-risk employees and mitigation actions for customer support team.
            </p>
            <Button
              buttonType="neutral"
              label="Coming soon"
              onClick={() => {}}
              onFocus={() => {}}
              onMouseEnter={() => {}}
              size="small"
              fullWidth
              disabled
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: KPIs and Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* People & Hiring KPIs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">People & Hiring KPIs</h2>
          <div className="grid grid-cols-2 gap-4">
            <KPITile
              value="128"
              label="Open positions"
              subtext="vs last quarter"
              trend={{ value: "12", direction: "up" }}
            />
            <KPITile value="37" label="Internal moves YTD" />
            <KPITile value="42" label="Avg time-to-fill" subtext="Target: 35 days" />
            <KPITile
              value="9.2%"
              label="Attrition rate"
              subtext="Your scope"
              trend={{ value: "0.3%", direction: "down" }}
            />
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights</h2>
          
          {/* Top Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <InsightMetric
                title="Plan vs Actual Headcount"
                value="1,247 / 1,200"
                subtext="↑ +3.9% over plan"
              />
            </div>
            <div>
              <InsightMetric
                title="Critical Vacancies"
                value="7 positions"
                subtext="Vacant >60 days"
              />
            </div>
            <div>
              <InsightMetric
                title="Plan vs Actual Cost"
                value="$94.2M / $92M"
                subtext="↑ +2.4% over budget"
              />
            </div>
            <div>
              <InsightMetric
                title="Internal vs External Fill"
                value="35% internal"
                subtext="65% external"
              />
            </div>
          </div>

          {/* Top Agent Insights */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Agent Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can fill 35% of planned roles via internal mobility.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Digital Banking BU will exceed HC envelope by 8% if all current positions are filled.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Sales West has span &gt; 1:12 – consider adding a layer of leads.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

