"use client";

import { useEffect, useState } from "react";

export default function FakeCursor({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        left: x,
        top: y,
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

