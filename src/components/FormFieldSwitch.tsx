import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  FormFieldWrapper,
  type FormFieldWrapperProps,
} from "@/components/FormFieldWrapper";
import { type FieldValues, type FieldPath } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormDescription } from "./ui/form"; // Import FormDescription

export interface FormFieldSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    FormFieldWrapperProps<TFieldValues, TName>,
    "children" | "label"
  > {
  label: React.ReactNode;
  switchClassName?: string;
  disabled?: boolean;
}

export function FormFieldSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  switchClassName,
  disabled,
  ...wrapperProps
}: FormFieldSwitchProps<TFieldValues, TName>) {
  return (
    // FormFieldWrapper likely provides the RHF context needed
    <FormFieldWrapper<TFieldValues, TName> {...wrapperProps} label={undefined}>
      {(field) => (
        // Mimic structure from Checkbox/shadcn Form examples for layout
        <div
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-4",
          )}
        >
          <div className="space-y-0.5">
            <Label htmlFor={field.name} className="text-base">
              {label}
              {wrapperProps.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <Switch
            id={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur} // Important for RHF validation triggers
            name={field.name}
            required={wrapperProps.required}
            aria-describedby={
              description ? `${field.name}-description` : undefined
            }
            className={cn(switchClassName)}
            // disabled prop can be added here if needed later
            disabled={disabled}
          />
        </div>
      )}
    </FormFieldWrapper>
  );
}
