"use client";

import React from "react";

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

