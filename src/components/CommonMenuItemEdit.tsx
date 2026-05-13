import React from "react";
import { type ReactFC } from "@/lib/utils";
import { CommonMenuItem, type CommonMenuItemProps } from "./CommonMenuItem";
import { Edit } from "lucide-react";

export interface CommonMenuItemEditProps
  extends Omit<CommonMenuItemProps, "children" | "leftIcon"> {
  label?: string;
}

export const CommonMenuItemEdit: ReactFC<CommonMenuItemEditProps> = ({
  label = "Edit",
  ...props
}) => {
  return (
    <CommonMenuItem leftIcon={Edit} {...props}>
      {label}
    </CommonMenuItem>
  );
};
