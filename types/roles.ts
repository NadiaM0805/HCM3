export type Role = 
  | "Workforce Analyst"
  | "BU Leader"
  | "HRBP"
  | "Reporting Manager";

export interface RoleInfo {
  name: string;
  role: Role;
  org: string;
}

export const ROLE_MAPPINGS: Record<Role, RoleInfo> = {
  "Workforce Analyst": {
    name: "Alex",
    role: "Workforce Analyst",
    org: "Corporate",
  },
  "BU Leader": {
    name: "Priya",
    role: "BU Leader",
    org: "Retail Banking",
  },
  HRBP: {
    name: "Dana",
    role: "HRBP",
    org: "Retail Bank",
  },
  "Reporting Manager": {
    name: "Sarah",
    role: "Reporting Manager",
    org: "Product Design Team",
  },
};

export const ROLES: Role[] = [
  "Workforce Analyst",
  "BU Leader",
  "HRBP",
  "Reporting Manager",
];

