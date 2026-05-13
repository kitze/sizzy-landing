"use client";
import { useState, useEffect } from "react";
import { type ReactFC } from "@/lib/utils";
import { useMounted } from "@/hooks/useMounted";
import {
  ThemeSwitchMinimal,
  type ThemeSwitchMinimalClassNames,
} from "@/components/ThemeSwitchMinimal";
import { type CustomButtonProps } from "@/components/CustomButton";
import { motion } from "framer-motion";

export interface ThemeSwitchMinimalNextThemesProps {
  className?: string;
  classNames?: ThemeSwitchMinimalClassNames;
  buttonProps?: Partial<CustomButtonProps>;
}

export const ThemeSwitchMinimalNextThemes: ReactFC<
  ThemeSwitchMinimalNextThemesProps
> = ({ className, classNames, buttonProps }) => {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const mounted = useMounted();

  useEffect(() => {
    // Detect initial theme from DOM
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const setTheme = (newTheme: string) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      setThemeState("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setThemeState("light");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <ThemeSwitchMinimal
        theme={theme}
        setTheme={setTheme}
        className={className}
        classNames={classNames}
        buttonProps={buttonProps}
      />
    </motion.div>
  );
};
