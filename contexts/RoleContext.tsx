"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Role, ROLE_MAPPINGS, RoleInfo } from "@/types/roles";

interface RoleContextType {
  currentRole: Role;
  roleInfo: RoleInfo;
  setCurrentRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>("Workforce Analyst");
  const roleInfo = ROLE_MAPPINGS[currentRole];

  return (
    <RoleContext.Provider value={{ currentRole, roleInfo, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

