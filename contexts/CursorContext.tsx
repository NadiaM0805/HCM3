"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CursorContextType {
  cursorPos: { x: number; y: number };
  setCursorPos: (pos: { x: number; y: number }) => void;
  moveCursorToElement: (el: HTMLElement, duration?: number) => Promise<void>;
  clickElement: (el: HTMLElement, delay?: number) => Promise<void>;
  act: (selector: string, action: "move" | "click") => Promise<void>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  function moveCursorToElement(el: HTMLElement, duration = 600) {
    return new Promise<void>((resolve) => {
      const rect = el.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      setCursorPos({ x: targetX, y: targetY });
      setTimeout(resolve, duration);
    });
  }

  function clickElement(el: HTMLElement, delay = 300) {
    return new Promise<void>((resolve) => {
      el.click();
      setTimeout(resolve, delay);
    });
  }

  async function act(selector: string, action: "move" | "click") {
    const el = document.querySelector(selector) as HTMLElement;
    if (!el) {
      console.warn(`Element not found: ${selector}`);
      return;
    }

    if (action === "move") {
      await moveCursorToElement(el);
    } else if (action === "click") {
      await moveCursorToElement(el);
      await clickElement(el);
    }
  }

  return (
    <CursorContext.Provider
      value={{
        cursorPos,
        setCursorPos,
        moveCursorToElement,
        clickElement,
        act,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useAgenticCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useAgenticCursor must be used within a CursorProvider");
  }
  return context;
}

