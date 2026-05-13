"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { type ElementType, type InputHTMLAttributes, type ReactNode } from "react";
import { Spinner } from "@/components/Spinner";

export interface InputClassNames {
  container?: string;
  input?: string;
  leftIcon?: string;
  rightIcon?: string;
  leftItem?: string;
  rightItem?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ElementType;
  rightIcon?: ElementType;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  iconClassName?: string;
  classNames?: InputClassNames;
  /**
   * Whether the input is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * The size of the loading spinner
   * @default "sm"
   */
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Input({
  className,
  type,
  leftIcon,
  rightIcon,
  leftItem,
  rightItem,
  classNames = {},
  isLoading = false,
  spinnerSize = "sm",
  disabled,
  iconClassName,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  // If loading, override left icon with spinner
  const effectiveLeftIcon = isLoading ? undefined : leftIcon;
  const effectiveLeftItem = isLoading ? (
    <Spinner size={spinnerSize} />
  ) : (
    leftItem
  );

  // Handle both explicit disabled prop and loading state
  const isDisabled = disabled || isLoading;

  const hasLeft = isLoading || effectiveLeftIcon || effectiveLeftItem;
  const hasRight = rightIcon || rightItem;

  const inputElement = (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base",
        "transition-all duration-200 ease-in-out",
        "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        hasLeft && "pl-1",
        hasRight && "pr-1",
        !hasLeft &&
          !hasRight &&
          "border-input focus-visible:border-primary border focus-visible:border-2 focus-visible:outline-none",
        !hasLeft && !hasRight && className,
        classNames.input,
      )}
      ref={ref}
      disabled={isDisabled}
      {...props}
    />
  );

  if (!hasLeft && !hasRight) {
    return inputElement;
  }

  return (
    <div
      className={cn(
        "border-input bg-background relative flex items-center rounded-md border",
        "transition-all duration-200 ease-in-out",
        "focus-within:border-primary focus-within:border-2",
        isDisabled && "cursor-not-allowed opacity-50",
        classNames.container,
        className,
      )}
    >
      {hasLeft && (
        <div className="flex items-center pl-3">
          {effectiveLeftIcon && (
            <div
              className={cn(
                "text-foreground/70 flex size-5 items-center justify-center transition-colors duration-200",
                classNames.leftIcon,
                iconClassName,
              )}
            >
              {React.createElement(effectiveLeftIcon)}
            </div>
          )}
          {effectiveLeftItem && (
            <div className={cn("text-foreground", classNames.leftItem)}>
              {effectiveLeftItem}
            </div>
          )}
        </div>
      )}
      {inputElement}
      {hasRight && (
        <div className="flex items-center pr-3">
          {rightIcon && (
            <div
              className={cn(
                "text-foreground/70 flex size-5 items-center justify-center transition-colors duration-200",
                classNames.rightIcon,
                iconClassName,
              )}
            >
              {React.createElement(rightIcon)}
            </div>
          )}
          {rightItem && (
            <div className={cn("text-foreground", classNames.rightItem)}>
              {rightItem}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
