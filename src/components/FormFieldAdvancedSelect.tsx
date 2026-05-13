"use client";
import React from "react";
import { type FieldValues, type FieldPath } from "react-hook-form";
import {
  FormFieldWrapper,
  type FormFieldWrapperProps,
} from "@/components/FormFieldWrapper";
import { AdvancedSelect } from "@/components/AdvancedSelect";
import { type SelectOption } from "@/lib/utils";

export interface FormFieldAdvancedSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormFieldWrapperProps<TFieldValues, TName>, "children"> {
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
  maxCount?: number;
  variant?: "default" | "secondary" | "destructive" | "inverted";
  disabled?: boolean;
}

export function FormFieldAdvancedSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  placeholder,
  searchable = false,
  maxCount,
  variant,
  disabled,
  ...wrapperProps
}: FormFieldAdvancedSelectProps<TFieldValues, TName>) {
  return (
    <FormFieldWrapper<TFieldValues, TName> {...wrapperProps}>
      {(field) => (
        <AdvancedSelect
          options={options}
          value={field.value || []}
          onValueChange={field.onChange}
          placeholder={placeholder}
          searchable={searchable}
          maxCount={maxCount}
          variant={variant}
          disabled={disabled}
        />
      )}
    </FormFieldWrapper>
  );
}
