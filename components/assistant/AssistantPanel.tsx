"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAgentic } from "@/contexts/AgenticContext";
import { useAgentChat } from "@/contexts/AgentChatContext";

interface AssistantPanelProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
}

export function AssistantPanel({ isMinimized, onMinimize, onMaximize }: AssistantPanelProps) {
  const { agenticMode } = useAgentic();
  const { messages } = useAgentChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-open assistant when agentic mode is active
  useEffect(() => {
    if (agenticMode && isMinimized) {
      onMaximize();
    }
  }, [agenticMode, isMinimized, onMaximize]);

  // Auto-scroll to last message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Minimized view - floating icon
  if (isMinimized) {
    return (
      <div
        onClick={onMaximize}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#4d3ee0] rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#3a2ea8] transition-colors z-50"
        title="Open Assistant"
      >
        <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
      </div>
    );
  }

  // Full view
  return (
    <div 
      className="w-full h-full bg-white rounded-l-lg shadow-[0px_2px_6px_0px_rgba(53,59,70,0.15)] flex flex-col rounded-r-none" 
      style={{ height: 'calc(100vh - 73px)' }}
    >
      {/* Chat Header */}
      <div className="flex flex-col">
        {/* Top divider */}
        <div className="h-1 bg-gradient-to-r from-orange-200 via-pink-200 via-purple-200 to-green-200 w-full" />
        
        {/* Header */}
        <div className="bg-white flex h-14 items-center justify-between px-4 border-b border-gray-200">
          <div className="flex gap-2.5 items-center">
            <div className="relative w-6 h-6">
              <Image src="/x+.svg" alt="X+" width={24} height={24} className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[#353b46]">Assistant</p>
          </div>
          <div className="inline-flex justify-end items-center gap-2">
            {/* Minimize button */}
            <div
              onClick={onMinimize}
              data-chat-view="Expand"
              className="w-20 h-20 p-2 relative rounded-[50px] flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors"
              title="Minimize"
            >
              <Image src="/Chatmode.svg" alt="Chat mode" width={80} height={80} className="w-20 h-20" />
            </div>
            
            {/* Close button */}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMinimize();
              }}
              data-size="Big"
              data-state="Default"
              data-type="Tertiary (Ghost)"
              className="w-8 h-8 p-2.5 rounded-[10px] flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
              title="Close Assistant"
            >
              <div data-size="18" className="inline-flex flex-col justify-center items-center">
                <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">×</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div ref={messagesContainerRef} className="flex-1 flex flex-col gap-6 px-6 py-4 overflow-y-auto">
        {/* Agent Messages */}
        {messages.length > 0 ? (
          <>
            {messages.map((message, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="relative w-8 h-8 shrink-0">
                  <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#353b46] leading-6">
                    <p>{message}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Close Assistant Button - shown after all messages */}
            <div className="pt-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onMinimize();
                }}
                type="button"
                className="w-full px-4 py-2.5 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-300 inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              >
                Close Assistant
              </button>
            </div>
          </>
        ) : (
          <div className="flex gap-3 items-start">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/x+.svg" alt="X+" width={32} height={32} className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#353b46] leading-6">
                <p>Hi! I'm here to help you with your strategy validation and analysis.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input Area */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div data-state="Regular" className="w-full h-20 px-4 py-3 bg-white rounded-md shadow-[0px_2px_3px_0px_rgba(53,59,70,0.15)] outline outline-1 outline-offset-[-1px] outline-gray-400 flex flex-col justify-end items-end gap-2 overflow-hidden">
          <div data-content="Placeholder" className="self-stretch h-5 inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 justify-center text-slate-500 text-sm font-normal font-['Poppins'] leading-5 line-clamp-1">Ask anything...</div>
          </div>
          
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="flex justify-start items-center">
              {/* @ Mention button */}
              <div data-size="Medium" data-state="Default" data-type="Tertiary (Ghost)" className="w-8 h-8 p-1.5 relative rounded-lg flex justify-center items-center gap-2">
                <div data-size="16" className="inline-flex flex-col justify-center items-center">
                  <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">@</div>
                </div>
              </div>
              
              {/* Attach button */}
              <div data-size="Medium" data-state="Default" data-type="Tertiary (Ghost)" className="w-8 h-8 p-1.5 relative rounded-lg flex justify-center items-center gap-2">
                <div data-size="16" className="inline-flex flex-col justify-center items-center">
                  <div className="text-center justify-center text-gray-600 text-lg font-normal font-['Font_Awesome_6_Pro']">📎</div>
                </div>
              </div>
            </div>
            
            {/* Send Button */}
            <div data-size="Medium" data-state="Disabled" data-type="Primary" className="w-8 h-8 p-1.5 bg-gray-200 rounded-lg flex justify-center items-center gap-2">
              <div data-size="16" className="inline-flex flex-col justify-center items-center">
                <div className="text-center justify-center text-gray-400 text-base font-normal font-['Font_Awesome_6_Pro']">↑</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

