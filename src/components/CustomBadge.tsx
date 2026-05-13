import * as React from "react";
import { tv } from "tailwind-variants";
import { cn, processColor, type ReactFC } from "@/lib/utils";

const badge = tv({
  base: "flex items-center justify-center gap-1.5 rounded-md font-semibold transition-colors",
  variants: {
    variant: {
      default:
        "bg-(--badge-color)/20 text-(--badge-color) dark:bg-(--badge-dark-color)/20 dark:text-(--badge-dark-color)",
      outline:
        "bg-(--badge-color)/10 border-1 border-(--badge-color)/30 text-(--badge-color) dark:bg-(--badge-dark-color)/10 dark:border-(--badge-dark-color)/30 dark:text-(--badge-dark-color)",
      ghost:
        "text-(--badge-color) hover:bg-(--badge-color)/10 dark:text-(--badge-dark-color) dark:hover:bg-(--badge-dark-color)/10",
    },
    size: {
      xs: "px-1.5 py-[2px] text-[9px]",
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
      lg: "px-3 py-1 text-sm",
      xl: "px-3.5 py-1.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BadgeClassNames {
  root?: string;
  icon?: string;
}

const iconSizeMap: Record<BadgeSize, number> = {
  xs: 10,
  sm: 12,
  md: 12,
  lg: 14,
  xl: 14,
};

export interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: BadgeClassNames;
  color: string;
  darkColor?: string;
  variant?: "default" | "outline" | "ghost";
  size?: BadgeSize;
  icon?: React.ElementType;
  iconSize?: number;
  leftIcon?: React.ElementType;
  rightIcon?: React.ElementType;
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
}

export const CustomBadge: ReactFC<CustomBadgeProps> = ({
  className,
  variant,
  size = "sm",
  color,
  darkColor = color,
  classNames = {},
  icon: Icon,
  iconSize,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftSide,
  rightSide,
  children,
  ...props
}) => {
  const finalColor = processColor(color);
  const finalDarkColor = processColor(darkColor);
  const defaultIconSize = iconSizeMap[size];
  const finalIconSize = iconSize ?? defaultIconSize;

  const style = {
    "--badge-color": `var(--color-${finalColor})`,
    "--badge-dark-color": `var(--color-${finalDarkColor ?? finalColor})`,
  } as React.CSSProperties;

  const renderIcon = (
    IconComponent: React.ElementType | undefined,
    className?: string,
  ) =>
    IconComponent && (
      <IconComponent
        size={finalIconSize}
        className={cn(classNames.icon, "shrink-0", className)}
      />
    );

  return (
    <div
      style={style}
      className={cn(badge({ variant, size }), className, classNames.root)}
      {...props}
    >
      {leftSide || renderIcon(LeftIcon)}
      {Icon ? renderIcon(Icon) : children}
      {rightSide || renderIcon(RightIcon)}
    </div>
  );
};
