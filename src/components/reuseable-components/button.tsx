// components/ui/Button.tsx
"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  OnclickFuntion?: () => void; // your custom name
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  OnclickFuntion,
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const handleClick = () => {
    if (disabled) return;
    OnclickFuntion?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}