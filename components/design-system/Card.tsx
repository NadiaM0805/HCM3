"use client";

import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Define the Card component type with nested components
interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<{ title: string; description?: string }>;
  Content: React.FC<{ children: React.ReactNode; className?: string }>;
}

function CardComponentImpl({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

CardComponentImpl.Header = function CardHeader({
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

CardComponentImpl.Content = function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

// Export with proper typing
export const Card = CardComponentImpl as CardComponent;
