"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface AgenticContextType {
  agenticMode: boolean;
  setAgenticMode: (value: boolean) => void;
}

export const AgenticContext = createContext<AgenticContextType>({
  agenticMode: false,
  setAgenticMode: () => {},
});

export function AgenticProvider({
  children,
  agenticMode = false,
}: {
  children: ReactNode;
  agenticMode?: boolean;
}) {
  const [mode, setMode] = useState(agenticMode);
  
  return (
    <AgenticContext.Provider value={{ agenticMode: mode, setAgenticMode: setMode }}>
      {children}
    </AgenticContext.Provider>
  );
}

export function useAgentic() {
  return useContext(AgenticContext);
}
