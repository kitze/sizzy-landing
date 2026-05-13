import React from "react";
import { type ReactFC } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { ContextMenuShortcut } from "@/components/ui/context-menu";
import type { LinkableProps } from "@/hooks/useLinkableComponent";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { useMenuContext } from "@/components/MenuContext";
import { BottomDrawerMenuItem } from "@/components/BottomDrawerMenuItem";
import { HelpInfoCircle } from "@/components/HelpInfoCircle";

export interface CommonMenuItemProps extends LinkableProps {
  children: React.ReactNode;
  shortcut?: string;
  hint?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
  rootClassName?: string;
  textClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  shortcutClassName?: string;
  hintClassName?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  isLast?: boolean;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export const CommonMenuItem: ReactFC<CommonMenuItemProps> = ({
  children,
  shortcut,
  hint,
  leftIcon,
  rightIcon,
  className,
  rootClassName,
  textClassName,
  leftIconClassName,
  rightIconClassName,
  shortcutClassName,
  hintClassName,
  disabled,
  destructive,
  onSelect,
  isLast,
  onClick,
  external,
  ...rest
}) => {
  const { menuType, closeMenu } = useMenuContext();

  // Handle click with menu closing
  const handleClick = () => {
    onSelect?.();
    onClick?.();
    closeMenu?.();
  };

  // If we're in a bottom drawer, render the BottomDrawerMenuItem
  if (menuType === "bottom-drawer") {
    return (
      <BottomDrawerMenuItem
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={cn(className, rootClassName)}
        disabled={disabled}
        destructive={destructive}
        onClick={handleClick}
        href={rest.href}
        external={external}
        isLast={isLast}
        hint={hint}
      >
        {children}
      </BottomDrawerMenuItem>
    );
  }

  // For dropdown and context menus, use the existing implementation
  const href = rest.href;

  const MenuItem = menuType === "dropdown" ? DropdownMenuItem : ContextMenuItem;
  const MenuShortcut =
    menuType === "dropdown" ? DropdownMenuShortcut : ContextMenuShortcut;

  const iconClasses = cn(
    "h-4 w-4",
    "text-muted-foreground group-hover:text-current",
    destructive && "text-destructive group-hover:text-destructive",
  );

  const itemClasses = cn(
    className,
    rootClassName,
    destructive && "text-destructive",
  );

  const content = (
    <>
      {leftIcon &&
        React.createElement(leftIcon, {
          className: cn("mr-2", iconClasses, leftIconClassName),
        })}
      <span className={textClassName}>{children}</span>
      {hint && (
        <span className={cn("ml-2", hintClassName)}>
          <HelpInfoCircle
            content={hint}
            iconClassName={cn("h-3.5 w-3.5", destructive && "text-destructive")}
          />
        </span>
      )}
      {rightIcon &&
        React.createElement(rightIcon, {
          className: cn("ml-auto", iconClasses, rightIconClassName),
        })}
      {shortcut && (
        <MenuShortcut className={shortcutClassName}>{shortcut}</MenuShortcut>
      )}
    </>
  );

  // With link
  if (href) {
    const linkAttrs: Record<string, any> = {
      href,
    };
    if (external) {
      linkAttrs.target = "_blank";
      linkAttrs.rel = "noopener noreferrer";
    }

    return (
      <MenuItem
        className={cn(itemClasses, "group")}
        disabled={disabled}
        onClick={handleClick}
        asChild
      >
        <a {...linkAttrs}>
          {content}
        </a>
      </MenuItem>
    );
  }

  // Without link
  return (
    <MenuItem
      className={cn(itemClasses, "group")}
      disabled={disabled}
      onClick={handleClick}
    >
      {content}
    </MenuItem>
  );
};
