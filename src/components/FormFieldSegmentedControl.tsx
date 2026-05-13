import React from "react";
import { type FieldValues, type FieldPath } from "react-hook-form";
import {
  FormFieldWrapper,
  type FormFieldWrapperProps,
} from "@/components/FormFieldWrapper";
import {
  SegmentedControl,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from "@/components/SegmentedControl";

// Re-export SegmentedControlOption
export type { SegmentedControlOption };

export interface FormFieldSegmentedControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<FormFieldWrapperProps<TFieldValues, TName>, "children"> {
  options: SegmentedControlOption[];
  size?: SegmentedControlProps["size"];
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  mobileView?: SegmentedControlProps["mobileView"];
  drawerTitle?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function FormFieldSegmentedControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  size,
  className,
  tabClassName,
  activeTabClassName,
  mobileView,
  drawerTitle,
  placeholder,
  disabled,
  ...wrapperProps
}: FormFieldSegmentedControlProps<TFieldValues, TName>) {
  return (
    <FormFieldWrapper<TFieldValues, TName> {...wrapperProps}>
      {(field) => (
        <SegmentedControl
          options={options}
          value={field.value}
          onChange={field.onChange}
          size={size}
          className={className}
          tabClassName={tabClassName}
          activeTabClassName={activeTabClassName}
          mobileView={mobileView}
          drawerTitle={drawerTitle}
          placeholder={placeholder}
        />
      )}
    </FormFieldWrapper>
  );
}
