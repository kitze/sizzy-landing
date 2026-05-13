import React from "react";
import { ReactFC, cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { HelpInfoCircle } from "@/components/HelpInfoCircle";
import { useMenuContext } from "../menu-context/MenuContext";

export interface BottomDrawerMenuItemProps {
  children: React.ReactNode;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  emoji?: string;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  isLast?: boolean;
  shortcut?: string;
  hint?: string;
  closeOnClick?: boolean;
}

export const BottomDrawerMenuItem: ReactFC<BottomDrawerMenuItemProps> = ({
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  emoji,
  className,
  disabled,
  destructive,
  onClick,
  href,
  external,
  isLast,
  shortcut,
  hint,
  closeOnClick = true,
}) => {
  const { closeMenu } = useMenuContext();
  const Component = href ? (external ? "a" : "a") : "button";
  const linkProps = href
    ? {
        href,
        ...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        }),
      }
    : {};

  const iconClasses = cn(
    "h-5 w-5",
    "text-muted-foreground",
    destructive && "text-destructive"
  );

  const itemClasses = cn(
    "flex items-center w-full px-4 py-3 text-base",
    "transition-colors active:bg-zinc-50 dark:active:bg-zinc-800/50",
    "text-left justify-start",
    disabled && "opacity-50 pointer-events-none",
    destructive && "text-destructive",
    className
  );

  return (
    <Component
      className={itemClasses}
      onClick={() => {
        onClick?.();
        if (closeOnClick) {
          closeMenu?.();
        }
      }}
      disabled={disabled && Component === "button"}
      {...linkProps}
    >
      {emoji ? (
        <span className="mr-3 flex-shrink-0 text-base">{emoji}</span>
      ) : LeftIcon ? (
        <LeftIcon className={cn("mr-3 flex-shrink-0", iconClasses)} />
      ) : null}
      <span className="flex-1">{children}</span>
      {hint && (
        <div className="ml-2 flex-shrink-0">
          <HelpInfoCircle
            content={hint}
            drawerTitle="Help"
            iconClassName={destructive ? "text-destructive" : ""}
          />
        </div>
      )}
      {RightIcon && (
        <RightIcon className={cn("ml-auto flex-shrink-0", iconClasses)} />
      )}
    </Component>
  );
};
