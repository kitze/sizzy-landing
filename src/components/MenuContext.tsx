import React, { createContext, useContext } from "react";

type MenuType = "dropdown" | "context" | "bottom-drawer";

interface MenuContextValue {
  menuType: MenuType;
  closeMenu?: () => void;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider = ({
  children,
  menuType,
  closeMenu,
}: {
  children: React.ReactNode;
  menuType: MenuType;
  closeMenu?: () => void;
}) => {
  return (
    <MenuContext.Provider value={{ menuType, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu components must be used within a MenuProvider");
  }
  return context;
};
