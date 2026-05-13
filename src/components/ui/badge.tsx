"use client";
import * as React from "react";
import { tv } from "tailwind-variants";
import { type ReactFC, type Size, cn } from "@/lib/utils";

const badge = tv({
  base: "v center rounded-md font-semibold transition-colors",
  variants: {
    variant: {
      default:
        "bg-(--badge-color)/20 text-(--badge-color) dark:bg-(--badge-dark-color)/20 dark:text-(--badge-dark-color)",
      outline:
        "bg-(--badge-color)/10 border-1 border-(--badge-color)/30 text-(--badge-color) dark:bg-(--badge-dark-color)/10 dark:border-(--badge-dark-color)/30 dark:text-(--badge-dark-color)",
      ghost:
        "text-(--badge-color) hover:bg-(--badge-color)/10 dark:text-(--badge-dark-color) dark:hover:bg-(--badge-dark-color)/10",
    },
    size: {
      xs: "px-1 py-0.5 text-xs",
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-1 text-xs",
      lg: "px-2.5 py-1 text-sm",
      xl: "px-3 py-1.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export interface BadgeClassNames {
  root?: string;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: BadgeClassNames;
  color: string;
  darkColor?: string;
  variant?: "default" | "outline" | "ghost";
  size?: Size;
}

export const Badge: ReactFC<BadgeProps> = ({
  className,
  variant,
  size,
  color,
  darkColor = color,
  classNames = {},
  ...props
}) => {
  return (
    <div
      style={
        {
          "--badge-color": `var(--color-${color})`,
          "--badge-dark-color": darkColor
            ? `var(--color-${darkColor})`
            : `var(--color-${color})`,
        } as React.CSSProperties
      }
      className={cn(badge({ variant, size }), className, classNames.root)}
      {...props}
    />
  );
};
