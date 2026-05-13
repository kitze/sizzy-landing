"use client";

import React from "react";
import { CommandItem } from "@/components/ui/command";
import { type LucideIcon } from "lucide-react";

export interface CommandPaletteItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandItem> {
  icon?: LucideIcon;
  emoji?: string;
  loading?: boolean;
  href?: string;
  external?: boolean;
}

export const CommandPaletteItem: React.FC<CommandPaletteItemProps> = ({
  icon: Icon,
  emoji,
  loading,
  href,
  external,
  children,
  onSelect,
  ...props
}) => {
  const handleSelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
      return;
    }

    if (href) {
      if (external) {
        window.open(href, "_blank");
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <CommandItem onSelect={handleSelect} {...props}>
      {loading ? (
        <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
      ) : Icon ? (
        <Icon className="mr-2 h-4 w-4" />
      ) : emoji ? (
        <span className="mr-2">{emoji}</span>
      ) : null}
      {children}
    </CommandItem>
  );
};
