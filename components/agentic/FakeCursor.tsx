"use client";

import { useEffect, useState } from "react";

export default function FakeCursor({ x, y }: { x: number; y: number }) {
  // Hide cursor when offscreen (default position)
  const displayX = x ?? -999;
  const displayY = y ?? -999;
  const isVisible = displayX > -100 && displayY > -100;

  if (!isVisible) return null;

  return (
    <div
      style={{
        left: displayX,
        top: displayY,
      }}
      className="
        fixed z-[9999]
        w-4 h-4
        rounded-full
        bg-[#4d3ee0]
        shadow-lg shadow-purple-400/40
        transition-all duration-300
        pointer-events-none
      "
    />
  );
}

