"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { typeIntoElement } from "@/utils/agenticTyping";
import { highlight } from "@/utils/highlightElement";

interface CursorContextType {
  cursorPos: { x: number | null; y: number | null };
  setCursorPos: (pos: { x: number | null; y: number | null }) => void;
  moveCursorToElement: (el: HTMLElement, duration?: number) => Promise<void>;
  clickElement: (el: HTMLElement, delay?: number) => Promise<void>;
  act: (selector: string, action: "move" | "click") => Promise<void>;
  type: (selector: string, text: string) => Promise<void>;
  select: (selector: string, value: string) => Promise<void>;
  scrollToSelector: (selector: string, options?: ScrollIntoViewOptions) => Promise<void>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorPos, setCursorPos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });

  function moveCursorToElement(el: HTMLElement, duration = 600) {
    if (typeof window === "undefined" || !el) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const rect = el.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      setCursorPos({ x: targetX, y: targetY });
      setTimeout(resolve, duration);
    });
  }

  function clickElement(el: HTMLElement, delay = 300) {
    if (typeof window === "undefined" || !el) {
      return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      el.click();
      setTimeout(resolve, delay);
    });
  }

  async function act(selector: string, action: "move" | "click") {
    if (typeof window === "undefined") return;
    
    // Try data-testid first, then regular selector
    let el = document.querySelector(`[data-testid="${selector}"]`) as HTMLElement;
    if (!el) {
      el = document.querySelector(selector) as HTMLElement;
    }
    
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

  async function type(selector: string, text: string) {
    if (typeof window === "undefined") return;
    
    // Try data-testid first, then ID, then regular selector
    let el = document.querySelector(`[data-testid="${selector}"]`) as HTMLInputElement | HTMLTextAreaElement;
    if (!el) {
      el = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement;
    }
    
    if (!el) {
      console.warn(`Element not found: ${selector}`);
      return;
    }
    await moveCursorToElement(el);
    await highlight(el);
    await typeIntoElement(el, text);
  }

  async function select(selector: string, value: string) {
    if (typeof window === "undefined") return;
    const el = document.querySelector(selector) as HTMLSelectElement;
    if (!el) {
      console.warn(`Element not found: ${selector}`);
      return;
    }
    await moveCursorToElement(el);
    await highlight(el);
    el.value = value;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    await new Promise((res) => setTimeout(res, 300));
  }

  async function scrollToSelector(selector: string, options?: ScrollIntoViewOptions) {
    if (typeof window === "undefined") return;
    const el = document.querySelector(`[data-testid="${selector}"]`) || document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", ...options });
      await new Promise((res) => setTimeout(res, 600)); // Wait for scroll to complete
    } else {
      console.warn(`Element not found for scrolling: ${selector}`);
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
        type,
        select,
        scrollToSelector,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useAgenticCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    // Return safe defaults when provider is not available (e.g., during SSR or non-agentic pages)
    return {
      cursorPos: { x: null, y: null },
      setCursorPos: () => {},
      moveCursorToElement: async () => {},
      clickElement: async () => {},
      act: async () => {},
      type: async () => {},
      select: async () => {},
      scrollToSelector: async () => {},
    };
  }
  return context;
}

