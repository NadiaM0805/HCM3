// Fallback components when @phenom/react-ds is not available
// These provide basic functionality to allow the app to build and run

"use client";

import React from "react";

// Fallback Button component
export interface ButtonProps {
  buttonType?: "primary" | "secondary" | "neutral";
  label: string;
  onClick?: () => void;
  onFocus?: () => void;
  onMouseEnter?: () => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({
  buttonType = "primary",
  label,
  onClick,
  onFocus,
  onMouseEnter,
  size = "medium",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const sizeClasses = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-4 py-2",
    large: "text-lg px-6 py-3",
  };
  const typeClasses = {
    primary: "bg-[#4d3ee0] text-white hover:bg-[#3a2ea8]",
    secondary: "bg-white text-[#4d3ee0] border border-[#4d3ee0] hover:bg-[#f0f0ff]",
    neutral: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[buttonType]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {label}
    </button>
  );
}

// Fallback Badge component
export interface BadgeProps {
  value: string;
  type?: "filled" | "success" | "grey" | "warning" | "error";
  size?: "small" | "medium" | "large";
}

export function Badge({ value, type = "filled", size = "medium" }: BadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full font-medium";
  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-1",
    large: "text-base px-3 py-1.5",
  };
  const typeClasses = {
    filled: "bg-[#4d3ee0] text-white",
    success: "bg-green-100 text-green-800",
    grey: "bg-gray-100 text-gray-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[type]}`}>
      {value}
    </span>
  );
}

// Fallback Card component
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="p-6 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </div>
  );
};

Card.Content = function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

// Fallback Snackbar/toast
export const toast = {
  success: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast success:", message);
      // You could integrate with a toast library like sonner here
    }
  },
  error: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast error:", message);
    }
  },
  info: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast info:", message);
    }
  },
  warning: (message: string) => {
    if (typeof window !== "undefined") {
      console.log("Toast warning:", message);
    }
  },
};

// Fallback Snackbar component
export function Snackbar() {
  return null; // Toast notifications handled via console in fallback mode
}

// Fallback Modal component (matches Phenom Modal API)
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

export function Modal({ visible, onHide, size = "medium", children }: ModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`${sizeMap[size]} max-w-[90vw] relative bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh]`}>
        {children}
      </div>
    </div>
  );
}

// Modal sub-components to match Phenom API
Modal.Header = function ModalHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>;
};

Modal.Header.Title = function ModalHeaderTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-xl font-semibold text-gray-900">{children}</div>;
};

Modal.Header.CloseButton = function ModalHeaderCloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
      aria-label="Close"
    >
      ×
    </button>
  );
};

Modal.Content = function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 p-6 overflow-y-auto">{children}</div>;
};

// Fallback ProgressBar component
export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-[#4d3ee0] h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-600 mt-1">{percentage.toFixed(1)}%</div>
      )}
    </div>
  );
}

