"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface AgentChatContextType {
  messages: string[];
  sendMessage: (message: string) => void;
  resetChat: () => void;
}

const AgentChatContext = createContext<AgentChatContextType | undefined>(undefined);

export function AgentChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = useCallback((message: string) => {
    setMessages((prev) => {
      // Prevent duplicate messages
      if (prev.length > 0 && prev[prev.length - 1] === message) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  const resetChat = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <AgentChatContext.Provider value={{ messages, sendMessage, resetChat }}>
      {children}
    </AgentChatContext.Provider>
  );
}

export function useAgentChat() {
  const context = useContext(AgentChatContext);
  if (context === undefined) {
    // Return a safe default during SSR or when provider is not available
    return {
      messages: [],
      sendMessage: () => {},
      resetChat: () => {},
    };
  }
  return context;
}

