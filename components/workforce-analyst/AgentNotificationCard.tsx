"use client";

import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";

interface AgentNotificationCardProps {
  title: string;
  description: string;
  jobTag: string;
  actionLabel: string;
  onAction: () => void;
  variant?: "warning" | "default";
}

export function AgentNotificationCard({
  title,
  description,
  jobTag,
  actionLabel,
  onAction,
  variant = "default",
}: AgentNotificationCardProps) {
  const bgColor = variant === "warning" ? "bg-[#fffae6] border-[#956727]" : "bg-white border-[#aeb5c2]";

  return (
    <div className={`${bgColor} border rounded-[10px] p-6 flex items-center justify-between`}>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-[#353b46] tracking-[0.25px]">{title}</p>
          <p className="text-sm font-normal text-[#637085] tracking-[0.25px]">{description}</p>
        </div>
        <Badge value={jobTag} type="filled" />
      </div>
      <div className="ml-4">
        <Button
          buttonType="primary"
          label={actionLabel}
          onClick={onAction}
        />
      </div>
    </div>
  );
}

