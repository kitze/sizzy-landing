"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { ConfirmAlert, type ConfirmAlertProps } from "./ConfirmAlert";

export interface ConfirmAlertDeleteProps
  extends Omit<ConfirmAlertProps, "variant"> {
  title?: string;
  itemName?: string;
}

export const ConfirmAlertDelete = React.memo(
  ({
    open,
    onOpenChange,
    title = "Confirm Delete",
    description,
    itemName,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    onConfirm,
  }: ConfirmAlertDeleteProps) => {
    const finalDescription =
      description ||
      `Are you sure you want to delete ${
        itemName ? `"${itemName}"` : "this item"
      }? This action cannot be undone.`;

    return (
      <ConfirmAlert
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={finalDescription}
        variant="destructive"
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={onConfirm}
      />
    );
  },
);

ConfirmAlertDelete.displayName = "ConfirmAlertDelete";
