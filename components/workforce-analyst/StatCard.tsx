import { Badge } from "@/components/design-system/Badge";

interface StatCardProps {
  label: string;
  value: string;
  tag: string;
}

export function StatCard({ label, value, tag }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#aeb5c2] p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-normal text-[#637085] tracking-[0.25px]">{label}</p>
        <Badge value={tag} type="grey" size="small" />
      </div>
      <p className="text-2xl font-semibold text-[#353b46] tracking-[0.18px]">{value}</p>
    </div>
  );
}

