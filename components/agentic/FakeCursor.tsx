"use client";

export default function FakeCursor({ x, y }: { x?: number; y?: number }) {
  // Hide cursor when x or y is null/undefined
  if (x == null || y == null) return null;

  // Also hide if offscreen (default position)
  if (x < -100 || y < -100) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: 10,
        height: 10,
        borderRadius: "999px",
        background: "#7F56D9",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "all 0.3s ease",
      }}
    />
  );
}

