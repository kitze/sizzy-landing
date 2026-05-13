import React from "react";
import { type ReactFC } from "@/lib/utils";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ContextMenuSeparator } from "@/components/ui/context-menu";
import { useMenuContext } from "@/components/MenuContext";
import { cn } from "@/lib/utils";
import { BottomDrawerMenuSeparator } from "@/components/BottomDrawerMenuComponents";

export interface CommonMenuSeparatorProps {
  className?: string;
}

export const CommonMenuSeparator: ReactFC<CommonMenuSeparatorProps> = ({
  className,
}) => {
  const { menuType } = useMenuContext();

  // If bottom drawer, use BottomDrawerMenuSeparator
  if (menuType === "bottom-drawer") {
    return <BottomDrawerMenuSeparator className={className} />;
  }

  // Otherwise use dropdown or context menu separator
  const MenuSeparator =
    menuType === "dropdown" ? DropdownMenuSeparator : ContextMenuSeparator;

  return <MenuSeparator className={cn(className)} />;
};
