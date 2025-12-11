"use client";

import { createContext, useContext, ReactNode } from "react";

interface AgenticContextType {
  agenticMode: boolean;
}

const AgenticContext = createContext<AgenticContextType>({ agenticMode: false });

export function AgenticProvider({
  children,
  agenticMode = false,
}: {
  children: ReactNode;
  agenticMode?: boolean;
}) {
  return (
    <AgenticContext.Provider value={{ agenticMode }}>
      {children}
    </AgenticContext.Provider>
  );
}

export function useAgentic() {
  return useContext(AgenticContext);
}

