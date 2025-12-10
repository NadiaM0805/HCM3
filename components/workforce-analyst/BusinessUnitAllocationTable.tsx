import { Badge } from "@/components/design-system/Badge";
import { Card } from "@/components/design-system/Card";

interface AllocationRow {
  businessUnit: string;
  strategicPillar: string;
  allocatedBudget: string;
  status: string;
  initiativeCount: string;
}

const allocationData: AllocationRow[] = [
  {
    businessUnit: "Retail Banking",
    strategicPillar: "Product Innovation",
    allocatedBudget: "$2.0M",
    status: "Released",
    initiativeCount: "1 initiative",
  },
  {
    businessUnit: "Digital Transformation",
    strategicPillar: "Digital Expansion",
    allocatedBudget: "$5.0M",
    status: "Released",
    initiativeCount: "1 initiative",
  },
  {
    businessUnit: "Risk, Compliance",
    strategicPillar: "Risk Management",
    allocatedBudget: "$4.0M",
    status: "Released",
    initiativeCount: "1 initiative",
  },
];

export function BusinessUnitAllocationTable() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
      <div className="absolute top-4 right-4">
        <Badge value="Published" type="filled" size="small" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Business Unit Allocation</h3>
        <p className="text-sm text-gray-600 mt-1">Review and manage budget distribution</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Business Unit
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Strategic Pillar
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Allocated Budget
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {allocationData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {row.businessUnit}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {row.initiativeCount}
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {row.strategicPillar}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {row.allocatedBudget}
                </td>
                <td className="py-3 px-4">
                  <Badge value={row.status} type="filled" size="small" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

