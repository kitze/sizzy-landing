import { ThemeColorUpdater } from "@/components/ThemeColorUpdater";

// Simple theme wrapper without next-themes dependency
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ThemeColorUpdater />
    </>
  );
};
