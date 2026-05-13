"use client";
import { createContext, useContext, useMemo } from "react";
import { useMedia } from "use-media";

const mqStrings = {
  maxWidth: (width: number) => `(max-width: ${width}px)`,
};

export type MediaQueries = {
  isSmall: boolean;
  isMobile: boolean;
  isTiny: boolean;
};

const MediaQueriesContext = createContext<MediaQueries>({
  isSmall: false,
  isMobile: false,
  isTiny: false,
});

export const useMediaQueries = () => useContext(MediaQueriesContext);

export function MediaQueriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSmall = useMedia(mqStrings.maxWidth(850));
  const isMobile = useMedia(mqStrings.maxWidth(480));
  const isTiny = useMedia(mqStrings.maxWidth(320));

  const mediaQueries = useMemo(
    () => ({
      isSmall,
      isMobile,
      isTiny,
    }),
    [isSmall, isMobile, isTiny],
  );

  return (
    <MediaQueriesContext.Provider value={mediaQueries}>
      {children}
    </MediaQueriesContext.Provider>
  );
}
