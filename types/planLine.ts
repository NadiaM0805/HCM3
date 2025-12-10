export type PlanLine = {
  id: string;
  businessUnit: string;
  division: string;
  role: string;
  quarter: string;
  region: string;
  headcount: number;
  budget: string; // e.g. "$360K"
  status?: "suggested" | "confirmed";
};

export const MOCK_PLAN_LINES: PlanLine[] = [
  {
    id: "1",
    businessUnit: "Retail Banking",
    division: "Branch & Consumer Focus",
    role: "Branch Manager",
    quarter: "Q2 FY26",
    region: "Central",
    headcount: 2,
    budget: "$360K",
    status: "suggested",
  },
  {
    id: "2",
    businessUnit: "Retail Banking",
    division: "Branch & Consumer Focus",
    role: "Teller",
    quarter: "Q2 FY26",
    region: "Central",
    headcount: 1,
    budget: "$80K",
    status: "suggested",
  },
  {
    id: "3",
    businessUnit: "Digital Transformation",
    division: "Tech & Innovation",
    role: "Product Manager",
    quarter: "Q2 FY26",
    region: "West",
    headcount: 1,
    budget: "$200K",
    status: "suggested",
  },
  {
    id: "4",
    businessUnit: "Digital Transformation",
    division: "Tech & Innovation",
    role: "Software Engineer",
    quarter: "Q2 FY26",
    region: "West",
    headcount: 1,
    budget: "$200K",
    status: "suggested",
  },
  {
    id: "5",
    businessUnit: "Risk, Compliance & Fraud",
    division: "Risk, Compliance & Fraud",
    role: "AML Analyst",
    quarter: "Q2 FY26",
    region: "East",
    headcount: 1,
    budget: "$120K",
    status: "suggested",
  },
  {
    id: "6",
    businessUnit: "Risk, Compliance & Fraud",
    division: "Risk, Compliance & Fraud",
    role: "Compliance Officer",
    quarter: "Q2 FY26",
    region: "East",
    headcount: 1,
    budget: "$170K",
    status: "suggested",
  },
];

