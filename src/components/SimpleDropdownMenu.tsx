import React from "react";
import { type ReactFC } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuProvider } from "@/components/MenuContext";
import { useControlledOpen } from "@/hooks/useControlledOpen";
import { useKitzeUI } from "@/components/KitzeUIContext";
import { BottomDrawerMenu } from "@/components/BottomDrawerMenu";

export type DropdownMobileViewType = "keep" | "bottom-drawer";

export interface SimpleDropdownMenuClassNames {
  content?: string;
  drawerContent?: string;
}

export interface SimpleDropdownMenuProps {
  children: React.ReactNode; // This is the trigger
  content: React.ReactNode; // This is the menu content
  classNames?: SimpleDropdownMenuClassNames;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  closeOnClick?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mobileView?: DropdownMobileViewType;
  drawerTitle?: string;
}

export const SimpleDropdownMenu: ReactFC<SimpleDropdownMenuProps> = ({
  children,
  content,
  classNames = {},
  align = "center",
  side = "bottom",
  closeOnClick = true,
  open,
  onOpenChange,
  mobileView = "keep",
  drawerTitle,
}) => {
  const { isMobile } = useKitzeUI();
  const { isOpen, setIsOpen, close } = useControlledOpen({
    open,
    onOpenChange,
  });

  const closeMenu = () => {
    if (closeOnClick) {
      close();
    }
  };

  if (isMobile && mobileView === "bottom-drawer") {
    return (
      <BottomDrawerMenu
        title={drawerTitle}
        open={isOpen}
        onOpenChange={setIsOpen}
        content={content}
        closeOnClick={closeOnClick}
      >
        {children}
      </BottomDrawerMenu>
    );
  }

  return (
    <MenuProvider menuType="dropdown" closeMenu={closeMenu}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className={classNames.content} // Class for desktop dropdown
          align={align}
          side={side}
        >
          {content}
        </DropdownMenuContent>
      </DropdownMenu>
    </MenuProvider>
  );
};
