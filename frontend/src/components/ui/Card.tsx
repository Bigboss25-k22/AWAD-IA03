import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 shadow sm:rounded-lg ${className ?? ""}`}>
      {children}
    </div>
  );
}


