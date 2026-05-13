"use client";

import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
  /**
   * The content to display with gradient effect
   */
  children: ReactNode;
  /**
   * The size of the text
   * @default "text-2xl"
   */
  size?: string;
  /**
   * The font weight of the text
   * @default "font-bold"
   */
  weight?: string;
  /**
   * The duration of the animation in seconds
   * @default 6
   */
  duration?: number;
  /**
   * Additional class names to apply to the component, including gradient colors
   * Example: "from-red-600 via-blue-500 to-green-400"
   */
  className?: string;
}

export function GradientText({
  children,
  size = "text-2xl",
  weight = "font-bold",
  duration = 6,
  className,
}: GradientTextProps) {
  // Only apply custom duration if it's different from the default
  const hasCustomDuration = duration !== 6;

  return (
    <span
      className={cn(
        size,
        weight,
        "bg-clip-text text-transparent",
        "bg-300%",
        !hasCustomDuration && "animate-gradient",
        className,
      )}
      style={
        hasCustomDuration
          ? {
              animation: `animatedgradient ${duration}s ease infinite alternate`,
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
