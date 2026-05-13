import "@/styles/globals.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeWrapper } from "@/context/ThemeWrapper";
import { MediaQueriesProvider } from "@/context/MediaQueriesContext";
import { ErrorBoundary } from "react-error-boundary";
import { RootErrorFallback } from "@/components/RootErrorFallback";
import { KitzeUIProviders } from "@/components/core/KitzeUIProviders";
import { RegisterHotkeys } from "@/components/RegisterHotkeys";
import { hotkeys } from "@/config/hotkeys";
import { SizzyLandingPage } from "@/app/(landing)/home/_components/SizzyLandingPage";

const App: React.FC = () => {
  return (
    <ThemeWrapper>
      <MediaQueriesProvider>
        <KitzeUIProviders>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <SizzyLandingPage />
            <RegisterHotkeys hotkeys={hotkeys} />
          </ErrorBoundary>
        </KitzeUIProviders>
      </MediaQueriesProvider>
    </ThemeWrapper>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
