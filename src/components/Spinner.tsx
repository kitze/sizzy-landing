"use client";

import {
  LucideLoader,
  LucideLoaderCircle,
  LucideLoaderPinwheel,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactFC } from "@/lib/utils";

const variants = {
  default: LucideLoader,
  circle: LucideLoaderCircle,
  pinwheel: LucideLoaderPinwheel,
} as const;

const sizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
} as const;

export interface SpinnerProps {
  /**
   * The variant of the spinner
   * @default "default"
   */
  variant?: keyof typeof variants;

  /**
   * The size of the spinner
   * @default "md"
   */
  size?: keyof typeof sizes;

  /**
   * Optional className for the spinner
   */
  className?: string;
}

export const Spinner: ReactFC<SpinnerProps> = ({
  variant = "default",
  size = "md",
  className = "",
}) => {
  const SpinnerIcon = variants[variant] || variants.default;
  const foundSize = sizes[size] || sizes.md;

  return (
    <SpinnerIcon
      className={cn("animate-spin text-foreground/50", foundSize, className)}
    />
  );
};
