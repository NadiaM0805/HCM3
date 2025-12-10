"use client";

import React from "react";

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

