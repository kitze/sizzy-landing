import React from "react";
import { type ReactFC } from "@/lib/utils";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { ContextMenuLabel } from "@/components/ui/context-menu";
import { useMenuContext } from "@/components/MenuContext";
import { cn } from "@/lib/utils";
import { BottomDrawerMenuLabel } from "@/components/BottomDrawerMenuComponents";

export interface CommonMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const CommonMenuLabel: ReactFC<CommonMenuLabelProps> = ({
  children,
  className,
}) => {
  const { menuType } = useMenuContext();

  // If bottom drawer, use BottomDrawerMenuLabel
  if (menuType === "bottom-drawer") {
    return (
      <BottomDrawerMenuLabel className={className}>
        {children}
      </BottomDrawerMenuLabel>
    );
  }

  // Otherwise use dropdown or context menu label
  const MenuLabel =
    menuType === "dropdown" ? DropdownMenuLabel : ContextMenuLabel;

  return <MenuLabel className={cn(className)}>{children}</MenuLabel>;
};
