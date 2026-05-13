import React from "react";
import { ReactFC } from "@/lib/utils";
import { BottomDrawer } from "./BottomDrawer";
import { MenuProvider } from "@/components/MenuContext";
import { useControlledOpen } from "@/hooks/useControlledOpen";
import {
  BottomDrawerMenuItem,
  BottomDrawerMenuItemProps,
} from "./BottomDrawerMenuItem";
import { BottomDrawerMenuItems } from "./BottomDrawerMenuComponents";

export interface BottomDrawerMenuProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  items?: (Omit<BottomDrawerMenuItemProps, "children"> & { label: string })[];
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnClick?: boolean;
}

export const BottomDrawerMenu: ReactFC<BottomDrawerMenuProps> = ({
  children,
  content,
  items,
  title,
  open,
  onOpenChange,
  closeOnClick = true,
}) => {
  const { isOpen, setIsOpen, close } = useControlledOpen({
    open,
    onOpenChange,
  });

  // Function to close the menu when clicking on menu items
  const closeMenu = () => {
    if (closeOnClick) {
      close();
    }
  };

  // Determine what to render inside the drawer
  let drawerContent = content;

  // If items array is provided, render them as BottomDrawerMenuItems
  if (items && items.length > 0) {
    drawerContent = (
      <BottomDrawerMenuItems>
        {items.map((item, index) => {
          const { label, ...itemProps } = item;
          return (
            <BottomDrawerMenuItem key={index} {...itemProps}>
              {label}
            </BottomDrawerMenuItem>
          );
        })}
      </BottomDrawerMenuItems>
    );
  }

  return (
    <BottomDrawer
      title={title}
      trigger={children}
      open={isOpen}
      onOpenChange={setIsOpen}
      classNames={{
        childrenWrapper: "px-0",
      }}
    >
      <MenuProvider menuType="bottom-drawer" closeMenu={closeMenu}>
        {drawerContent}
      </MenuProvider>
    </BottomDrawer>
  );
};
