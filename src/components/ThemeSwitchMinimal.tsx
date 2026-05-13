"use client";
import { type ReactFC } from "@/lib/utils";
import { CustomButton, type CustomButtonProps } from "@/components/CustomButton";
import { motion, AnimatePresence } from "framer-motion";
import { LucideSun, LucideMoon, LucideComputer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeSwitchMinimalClassNames {
  button?: string;
  icon?: string;
}

export interface ThemeSwitchMinimalProps
  extends Omit<CustomButtonProps, "classNames"> {
  classNames?: ThemeSwitchMinimalClassNames;
  buttonProps?: Partial<CustomButtonProps>;
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeSwitchMinimal: ReactFC<ThemeSwitchMinimalProps> = ({
  className,
  classNames = {},
  buttonProps,
  theme,
  setTheme,
  ...rest
}) => {
  const isDark = theme === "dark";
  const isSystem = theme === "system";

  const getIcon = () => {
    if (isDark) return "dark";
    if (isSystem) return "system";
    return "light";
  };

  return (
    <CustomButton
      variant="ghost"
      color="bg-zinc-400"
      className={cn("relative size-10 p-0", className, classNames.button)}
      onClick={() => {
        setTheme(isDark ? "light" : isSystem ? "dark" : "system");
      }}
      {...buttonProps}
      {...rest}
    >
      <AnimatePresence mode="wait">
        {(() => {
          switch (getIcon()) {
            case "dark":
              return (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, y: 10, rotate: -30 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -10, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                >
                  <LucideMoon className={cn("size-4", classNames.icon)} />
                </motion.div>
              );
            case "system":
              return (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <LucideComputer className={cn("size-4", classNames.icon)} />
                </motion.div>
              );
            default:
              return (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, y: -10, rotate: -30 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 10, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                >
                  <LucideSun className={cn("size-4", classNames.icon)} />
                </motion.div>
              );
          }
        })()}
      </AnimatePresence>
    </CustomButton>
  );
};
