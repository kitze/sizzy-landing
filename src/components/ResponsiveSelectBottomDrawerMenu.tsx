"use client";

import * as React from "react";
import { type SelectOption } from "@/lib/utils";
import { BottomDrawerMenu } from "@/components/BottomDrawerMenu";
import { BottomDrawerMenuItem } from "@/components/BottomDrawerMenuItem";
import { SearchBar } from "@/components/SearchBar";

export interface ResponsiveSelectBottomDrawerMenuProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  drawerTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchPlaceholder?: string;
  triggerClassName?: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function ResponsiveSelectBottomDrawerMenu({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  drawerTitle = "Select an option",
  open,
  onOpenChange,
  searchPlaceholder = "Search options...",
  triggerClassName,
  className,
  disabled,
  children,
}: ResponsiveSelectBottomDrawerMenuProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;

    const lowercaseQuery = searchQuery.toLowerCase();
    return options.filter((option) => {
      const label = (option.label || option.value).toLowerCase();
      return label.includes(lowercaseQuery);
    });
  }, [options, searchQuery]);

  return (
    <BottomDrawerMenu
      title={drawerTitle}
      open={open}
      onOpenChange={onOpenChange}
      content={
        <div className="flex flex-col">
          <div className="p-3">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
              autoFocus
            />
          </div>
          {filteredOptions.length === 0 ? (
            <div className="text-muted-foreground px-3 py-4 text-center">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <BottomDrawerMenuItem
                key={option.value}
                leftIcon={option.icon}
                emoji={option.emoji}
                closeOnClick={option.closeOnClick}
                onClick={() => {
                  onValueChange?.(option.value);
                  onOpenChange(false);
                }}
                className={value === option.value ? "bg-muted" : ""}
              >
                {option.label || option.value}
              </BottomDrawerMenuItem>
            ))
          )}
        </div>
      }
    >
      {children}
    </BottomDrawerMenu>
  );
}
