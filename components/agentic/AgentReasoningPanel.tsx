"use client";

import { useAgentic } from "@/contexts/AgenticContext";
import { useState } from "react";

export default function AgentReasoningPanel({ log }: { log: string[] }) {
  const { agenticMode } = useAgentic();
  const [open, setOpen] = useState(true);

  if (!agenticMode) return null;

  return (
    <aside className="fixed right-0 top-[73px] h-[calc(100vh-73px)] w-[320px] bg-white border-l border-neutral-200 shadow-xl p-4 z-30 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Agent Reasoning</h2>
        <button 
          onClick={() => setOpen(!open)} 
          className="text-sm text-neutral-500 hover:text-neutral-700"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open && (
        <div className="flex-1 overflow-y-auto space-y-2 text-sm">
          {log.length === 0 ? (
            <div className="p-2 text-neutral-500 text-center">
              Waiting for agent to start...
            </div>
          ) : (
            log.map((entry, idx) => (
              <div key={idx} className="p-2 bg-neutral-50 rounded-md border border-neutral-200">
                {entry}
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  );
}

