import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardIcon, type GradientType } from "./CardIcon";

interface CardWithIconProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: GradientType;
  className?: string;
  descriptionClassName?: string;
  iconSize?: "normal" | "large" | "small";
  compact?: boolean;
}

export const CardWithIcon = ({
  title,
  description,
  icon,
  gradient,
  className = "",
  descriptionClassName = "text-sm",
  iconSize = "normal",
  compact = false,
}: CardWithIconProps) => {
  const borderGlowClass = {
    blue: "dark:before:from-blue-500/0 dark:before:via-blue-500/30 dark:before:to-blue-500/0",
    purple:
      "dark:before:from-purple-500/0 dark:before:via-purple-500/30 dark:before:to-purple-500/0",
    teal: "dark:before:from-teal-500/0 dark:before:via-teal-500/30 dark:before:to-teal-500/0",
    orange:
      "dark:before:from-orange-500/0 dark:before:via-orange-500/30 dark:before:to-orange-500/0",
    green:
      "dark:before:from-green-500/0 dark:before:via-green-500/30 dark:before:to-green-500/0",
    pink: "dark:before:from-pink-500/0 dark:before:via-pink-500/30 dark:before:to-pink-500/0",
    red: "dark:before:from-red-500/0 dark:before:via-red-500/30 dark:before:to-red-500/0",
    amber:
      "dark:before:from-amber-500/0 dark:before:via-amber-500/30 dark:before:to-amber-500/0",
    indigo:
      "dark:before:from-indigo-500/0 dark:before:via-indigo-500/30 dark:before:to-indigo-500/0",
    cyan: "dark:before:from-cyan-500/0 dark:before:via-cyan-500/30 dark:before:to-cyan-500/0",
    emerald:
      "dark:before:from-emerald-500/0 dark:before:via-emerald-500/30 dark:before:to-emerald-500/0",
  };

  const hoverGlowClass = {
    blue: "dark:md:hover:before:from-blue-500/0 dark:md:hover:before:via-blue-500/60 dark:md:hover:before:to-blue-500/0",
    purple:
      "dark:md:hover:before:from-purple-500/0 dark:md:hover:before:via-purple-500/60 dark:md:hover:before:to-purple-500/0",
    teal: "dark:md:hover:before:from-teal-500/0 dark:md:hover:before:via-teal-500/60 dark:md:hover:before:to-teal-500/0",
    orange:
      "dark:md:hover:before:from-orange-500/0 dark:md:hover:before:via-orange-500/60 dark:md:hover:before:to-orange-500/0",
    green:
      "dark:md:hover:before:from-green-500/0 dark:md:hover:before:via-green-500/60 dark:md:hover:before:to-green-500/0",
    pink: "dark:md:hover:before:from-pink-500/0 dark:md:hover:before:via-pink-500/60 dark:md:hover:before:to-pink-500/0",
    red: "dark:md:hover:before:from-red-500/0 dark:md:hover:before:via-red-500/60 dark:md:hover:before:to-red-500/0",
    amber:
      "dark:md:hover:before:from-amber-500/0 dark:md:hover:before:via-amber-500/60 dark:md:hover:before:to-amber-500/0",
    indigo:
      "dark:md:hover:before:from-indigo-500/0 dark:md:hover:before:via-indigo-500/60 dark:md:hover:before:to-indigo-500/0",
    cyan: "dark:md:hover:before:from-cyan-500/0 dark:md:hover:before:via-cyan-500/60 dark:md:hover:before:to-cyan-500/0",
    emerald:
      "dark:md:hover:before:from-emerald-500/0 dark:md:hover:before:via-emerald-500/60 dark:md:hover:before:to-emerald-500/0",
  };

  return (
    <div
      className={cn(
        `vertical center relative cursor-default select-none ${
          compact ? "p-3" : "p-6"
        } h-full transform rounded-xl border border-gray-200 bg-white transition-all duration-500 md:hover:-translate-y-1 md:hover:bg-white dark:border-slate-700/50 dark:bg-slate-900/50 dark:before:absolute dark:before:inset-0 dark:before:-z-10 dark:before:rounded-xl dark:before:bg-gradient-to-r dark:md:hover:bg-slate-800/70 ${
          borderGlowClass[gradient]
        } ${hoverGlowClass[gradient]} dark:before:opacity-60 dark:before:blur-xl dark:before:transition-all dark:before:duration-500 dark:md:hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:md:hover:before:opacity-90 dark:md:hover:before:blur-lg`,
        className,
      )}
    >
      <CardIcon
        icon={icon}
        gradient={gradient}
        className={cn(
          "mb-4",
          iconSize === "large"
            ? "h-16 w-16"
            : iconSize === "small"
              ? "h-10 w-10"
              : "h-14 w-14",
          iconSize === "large"
            ? "rounded-2xl"
            : iconSize === "small"
              ? "rounded-lg"
              : "rounded-xl",
        )}
      />
      <h3
        className={cn(
          "mb-2 text-center font-bold text-gray-700 dark:text-white",
          compact ? "text-base" : "text-lg",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-center text-gray-500 dark:text-slate-300",
          compact ? "text-xs" : descriptionClassName,
        )}
      >
        {description}
      </p>
    </div>
  );
};
