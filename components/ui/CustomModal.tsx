"use client";

import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "w-[480px]",
}: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`${width} max-w-[90vw] min-w-[480px] max-h-[90vh] relative bg-white rounded-[10px] flex flex-col shadow-xl`}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white rounded-tl-[10px] rounded-tr-[10px] flex flex-col justify-start items-start">
          <div className="self-stretch pl-6 pr-4 pt-4 pb-3.5 inline-flex justify-start items-center gap-6">
            <div className="flex-1 flex justify-start items-center gap-4">
              <div className="flex-1 flex justify-start items-center gap-3">
                <div className="flex-1 justify-center text-gray-900 text-xl font-semibold font-['Poppins'] leading-8 line-clamp-1">
                  {typeof title === "string" ? title : title}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 p-2.5 relative rounded-[10px] flex justify-center items-center gap-2 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <div className="h-4 min-w-3.5 py-[3px] flex justify-center items-center gap-2.5 overflow-hidden">
                <svg
                  className="w-3 h-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          </div>
          {/* Divider */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
            <div className="self-stretch h-px relative">
              <div className="w-full h-px left-0 top-0 absolute bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 min-h-0 bg-white flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 self-stretch px-6 py-4 bg-white rounded-bl-[10px] rounded-br-[10px] border-t border-gray-200 inline-flex justify-between items-center">
            <div className="flex justify-end items-center gap-2" />
            <div className="flex justify-end items-center gap-2">{footer}</div>
          </div>
        )}
      </div>
    </div>
  );
}

