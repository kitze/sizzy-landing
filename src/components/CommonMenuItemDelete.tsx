import React from "react";
import { type ReactFC } from "@/lib/utils";
import { CommonMenuItem, type CommonMenuItemProps } from "./CommonMenuItem";
import { Trash } from "lucide-react";
import { useConfirmAlertDelete } from "@/components/AlertContext";

export interface CommonMenuItemDeleteProps
  extends Omit<
    CommonMenuItemProps,
    "children" | "leftIcon" | "destructive" | "onSelect"
  > {
  label?: string;
  itemName?: string;
  onDelete?: () => void;
}

export const CommonMenuItemDelete: ReactFC<CommonMenuItemDeleteProps> = ({
  label = "Delete",
  itemName = "item",
  onDelete,
  ...props
}) => {
  const confirmDelete = useConfirmAlertDelete();

  const handleDelete = () => {
    confirmDelete({
      title: `Delete ${itemName}`,
      description: `Are you sure you want to delete this ${itemName}? This action cannot be undone.`,
      onConfirm: () => {
        onDelete?.();
      },
    });
  };

  return (
    <CommonMenuItem
      leftIcon={Trash}
      destructive
      onSelect={handleDelete}
      {...props}
    >
      {label}
    </CommonMenuItem>
  );
};
