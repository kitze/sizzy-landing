import "@/styles/globals.css";

import { ThemeWrapper } from "@/context/ThemeWrapper";
import { MediaQueriesProvider } from "@/context/MediaQueriesContext";
import { ErrorBoundary } from "react-error-boundary";
import { RootErrorFallback } from "@/components/RootErrorFallback";
import { KitzeUIProviders } from "@/components/core/KitzeUIProviders";
import { RegisterHotkeys } from "@/components/RegisterHotkeys";
import { hotkeys } from "@/config/hotkeys";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeWrapper>
      <MediaQueriesProvider>
        <KitzeUIProviders>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            {children}
            <RegisterHotkeys hotkeys={hotkeys} />
          </ErrorBoundary>
        </KitzeUIProviders>
      </MediaQueriesProvider>
    </ThemeWrapper>
  );
}
