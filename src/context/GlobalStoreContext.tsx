"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useDialog } from "@/components/DialogManager";
import {
  EditEntityDialog,
  type EditEntityDialogProps,
} from "@/components/EditEntityDialog";

type EditEntityInDialogOptions = Omit<EditEntityDialogProps, "close"> & {
  title: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

type GlobalStore = {
  editEntityInDialog: (options: EditEntityInDialogOptions) => string;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
};

const GlobalStoreContext = createContext<GlobalStore>({} as any);

export const useGlobalStore = () => useContext(GlobalStoreContext);

export function GlobalStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openDialog } = useDialog();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const editEntityInDialog = useCallback(
    (options: EditEntityInDialogOptions) => {
      return openDialog({
        title: options.title,
        component: ({ close }: { close: () => void }) => (
          <EditEntityDialog
            Component={options.Component}
            props={options.props}
            onSubmit={options.onSubmit}
            close={close}
          />
        ),
        size: options.size || "lg",
      });
    },
    [openDialog],
  );

  const setCommandPaletteOpen = useCallback((open: boolean) => {
    setIsCommandPaletteOpen(open);
  }, []);

  const toggleCommandPalette = useCallback(() => {
    console.log("toggleCommandPalette");
    setIsCommandPaletteOpen((prev) => !prev);
  }, []);

  const store = useMemo(
    () => ({
      editEntityInDialog,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      toggleCommandPalette,
    }),
    [
      editEntityInDialog,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      toggleCommandPalette,
    ],
  );

  return (
    <GlobalStoreContext.Provider value={store}>
      {children}
    </GlobalStoreContext.Provider>
  );
}
