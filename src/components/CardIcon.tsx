import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GradientType =
  | "blue"
  | "purple"
  | "teal"
  | "orange"
  | "green"
  | "pink"
  | "red"
  | "amber"
  | "indigo"
  | "cyan"
  | "emerald";

interface CardIconProps {
  icon: LucideIcon;
  className?: string;
  gradient: GradientType;
}

const gradients = {
  blue: "bg-gradient-to-br from-blue-500 to-blue-600 group-md:hover:from-blue-400 group-md:hover:to-blue-700",
  purple:
    "bg-gradient-to-br from-purple-500 to-purple-600 group-md:hover:from-purple-400 group-md:hover:to-purple-700",
  teal: "bg-gradient-to-br from-teal-500 to-teal-600 group-md:hover:from-teal-400 group-md:hover:to-teal-700",
  orange:
    "bg-gradient-to-br from-orange-500 to-orange-600 group-md:hover:from-orange-400 group-md:hover:to-orange-700",
  green:
    "bg-gradient-to-br from-green-500 to-green-600 group-md:hover:from-green-400 group-md:hover:to-green-700",
  pink: "bg-gradient-to-br from-pink-500 to-pink-600 group-md:hover:from-pink-400 group-md:hover:to-pink-700",
  red: "bg-gradient-to-br from-red-500 to-red-600 group-md:hover:from-red-400 group-md:hover:to-red-700",
  amber:
    "bg-gradient-to-br from-amber-500 to-amber-600 group-md:hover:from-amber-400 group-md:hover:to-amber-700",
  indigo:
    "bg-gradient-to-br from-indigo-500 to-indigo-600 group-md:hover:from-indigo-400 group-md:hover:to-indigo-700",
  cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600 group-md:hover:from-cyan-400 group-md:hover:to-cyan-700",
  emerald:
    "bg-gradient-to-br from-emerald-500 to-emerald-600 group-md:hover:from-emerald-400 group-md:hover:to-emerald-700",
};

export const CardIcon = ({
  icon: Icon,
  className,
  gradient,
}: CardIconProps) => {
  return (
    <div
      className={cn(
        "group-md:hover:rotate-6 group-md:hover:scale-110 flex h-14 w-14 transform items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-500",
        "border border-white/20 backdrop-blur-sm",
        gradients[gradient],
        className,
      )}
    >
      <Icon className="h-7 w-7" />
    </div>
  );
};
