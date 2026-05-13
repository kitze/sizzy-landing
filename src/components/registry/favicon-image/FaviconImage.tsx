import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface FaviconImageProps {
  icon: ReactNode;
  gradient: string;
  size?: number;
  borderRadiusPercent?: number;
  iconSizePercent?: number;
  className?: string;
}

export function FaviconImage({
  icon,
  gradient,
  size = 512,
  borderRadiusPercent = 20,
  iconSizePercent = 60,
  className,
}: FaviconImageProps) {
  const borderRadius = (size * borderRadiusPercent) / 100;
  const iconSize = (size * iconSizePercent) / 100;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        gradient,
        className
      )}
      style={{
        width: size,
        height: size,
        clipPath: `inset(0 round ${borderRadius}px)`,
      }}
    >
      <div
        className="text-white"
        style={{
          width: iconSize,
          height: iconSize,
        }}
      >
        {icon}
      </div>
    </div>
  );
}
