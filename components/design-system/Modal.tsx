"use client";

import React from "react";

export interface ModalProps {
  visible: boolean;
  onHide: () => void;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const sizeMap = {
  small: "w-[400px]",
  medium: "w-[600px]",
  large: "w-[800px]",
};

// Create a context to pass onHide to child components
const ModalContext = React.createContext<{ onHide: () => void } | null>(null);

// Create Header component first
function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 relative flex items-center justify-between">
      {children}
    </div>
  );
}

// Create Header.Title component
ModalHeader.Title = function ModalHeaderTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-xl font-semibold text-gray-900">{children}</div>;
};

// Create Header.CloseButton component
ModalHeader.CloseButton = function ModalHeaderCloseButton({ onClick }: { onClick?: () => void }) {
  const context = React.useContext(ModalContext);
  const handleClick = onClick || (context?.onHide || (() => {}));
  
  return (
    <button
      onClick={handleClick}
      className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center"
      aria-label="Close"
    >
      ×
    </button>
  );
};

// Create Content component
function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p-6 overflow-y-auto">{children}</div>;
}

// Main Modal component
function Modal({ visible, onHide, size = "medium", children }: ModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onHide}>
      <div
        className={`${sizeMap[size]} max-w-[90vw] relative bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContext.Provider value={{ onHide }}>
          {children}
        </ModalContext.Provider>
      </div>
    </div>
  );
}

// Attach nested components
Modal.Header = ModalHeader;
Modal.Content = ModalContent;

export { Modal };
