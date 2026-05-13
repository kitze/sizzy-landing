"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  FormFieldWrapper,
  type FormFieldWrapperProps,
} from "@/components/FormFieldWrapper";
import { type FieldValues, type FieldPath } from "react-hook-form";

export interface FormFieldInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormFieldWrapperProps<TFieldValues, TName>, "children"> {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export function FormFieldInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  placeholder,
  type = "text",
  disabled,
  ...wrapperProps
}: FormFieldInputProps<TFieldValues, TName>) {
  return (
    <FormFieldWrapper<TFieldValues, TName> {...wrapperProps}>
      {(field) => (
        <Input
          type={type}
          placeholder={placeholder}
          {...field}
          disabled={disabled}
        />
      )}
    </FormFieldWrapper>
  );
}
