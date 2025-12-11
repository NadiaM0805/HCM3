"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface MessageAction {
  label: string;
  onClick: () => void;
}

export interface ChatMessage {
  text: string;
  actions?: MessageAction[];
}

interface AgentChatContextType {
  messages: ChatMessage[];
  sendMessage: (message: string | ChatMessage, actions?: MessageAction[]) => void;
  resetChat: () => void;
}

const AgentChatContext = createContext<AgentChatContextType | undefined>(undefined);

export function AgentChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback((message: string | ChatMessage, actions?: MessageAction[]) => {
    setMessages((prev) => {
      // Handle both string and ChatMessage formats
      const newMessage: ChatMessage = typeof message === "string" 
        ? { text: message, actions }
        : message;
      
      // Prevent duplicate messages
      if (prev.length > 0 && prev[prev.length - 1].text === newMessage.text) {
        return prev;
      }
      return [...prev, newMessage];
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

