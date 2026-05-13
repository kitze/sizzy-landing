"use client";
import React from "react";
import {
  useFormContext,
  type FieldValues,
  type FieldPath,
  type ControllerRenderProps,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export interface FormFieldWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: React.ReactNode;
  renderLabel?: () => React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  required?: boolean;
  defaultValue?: any; // Consider making this more specific if needed
  children: (
    field: ControllerRenderProps<TFieldValues, TName>,
  ) => React.ReactNode;
}

export function FormFieldWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  renderLabel,
  description,
  className,
  required,
  defaultValue,
  children,
}: FormFieldWrapperProps<TFieldValues, TName>) {
  const form = useFormContext<TFieldValues>();

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          {renderLabel ? (
            renderLabel()
          ) : label ? (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          ) : null}
          <FormControl>{children(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
