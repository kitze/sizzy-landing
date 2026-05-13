"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReactFC, type Size } from "@/lib/utils";
import { ConditionalTooltip } from "@/components/ConditionalTooltip";

export interface HoverableIconClassNames {
  root?: string;
  icon?: string;
  tooltip?: string;
}

export const iconSizes: Record<Size, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export interface HoverableIconProps {
  Icon: LucideIcon;
  href?: string;
  external?: boolean;
  size?: Size | number;
  defaultColor?: string;
  tooltip?: string;
  classNames?: HoverableIconClassNames;
}

export const HoverableIcon: ReactFC<HoverableIconProps> = ({
  Icon,
  href,
  external = true,
  size = "md",
  defaultColor,
  tooltip,
  classNames = {},
}) => {
  // Determine icon size - either from predefined sizes or custom number
  const iconSize = typeof size === "string" ? iconSizes[size] : size;

  // Setup base className for the element
  const elementClassName = cn(
    defaultColor,
    "opacity-80 hover:opacity-100 transition-opacity cursor-pointer",
    classNames.root,
  );

  // Build element attributes
  const elementAttributes: Record<string, any> = {
    className: elementClassName,
  };

  if (external) {
    elementAttributes.target = "_blank";
    elementAttributes.rel = "noopener noreferrer";
  }

  // Render as anchor tag if href exists, otherwise as a div
  const Component = href ? "a" : "div";
  if (href) {
    elementAttributes.href = href;
  }

  const iconElement = (
    <Component {...elementAttributes}>
      <Icon size={iconSize} className={cn(classNames.icon)} />
    </Component>
  );

  return (
    <ConditionalTooltip
      condition={!!tooltip}
      content={tooltip}
      classNames={{ tooltip: classNames.tooltip }}
    >
      {iconElement}
    </ConditionalTooltip>
  );
};
