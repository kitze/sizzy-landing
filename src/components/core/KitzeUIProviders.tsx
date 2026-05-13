"use client";

import { useMediaQueries } from "@/context/MediaQueriesContext";
import { KitzeUIProvider } from "@/components/KitzeUIContext";
import { DialogManager } from "@/components/DialogManager";
import { GlobalStoreProvider } from "@/context/GlobalStoreContext";
import { AlertProvider } from "@/components/AlertContext";

export const KitzeUIProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mediaQueries = useMediaQueries();

  return (
    <KitzeUIProvider isMobile={mediaQueries.isMobile}>
      <DialogManager mobileView="bottom-drawer">
        <AlertProvider>
          <GlobalStoreProvider>{children}</GlobalStoreProvider>
        </AlertProvider>
      </DialogManager>
    </KitzeUIProvider>
  );
};
