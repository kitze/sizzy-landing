import React from "react";
import { type ReactFC } from "@/lib/utils";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { ContextMenuGroup } from "@/components/ui/context-menu";
import { useMenuContext } from "@/components/MenuContext";
import { BottomDrawerMenuGroup } from "@/components/BottomDrawerMenuComponents";

export interface CommonMenuGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const CommonMenuGroup: ReactFC<CommonMenuGroupProps> = ({
  children,
  className,
}) => {
  const { menuType } = useMenuContext();

  // If bottom drawer, use BottomDrawerMenuGroup
  if (menuType === "bottom-drawer") {
    return (
      <BottomDrawerMenuGroup className={className}>
        {children}
      </BottomDrawerMenuGroup>
    );
  }

  // Otherwise use dropdown or context menu group
  const MenuGroup =
    menuType === "dropdown" ? DropdownMenuGroup : ContextMenuGroup;

  return <MenuGroup className={className}>{children}</MenuGroup>;
};
