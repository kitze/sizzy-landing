"use client";
import React from "react";
import { Alert, type AlertProps } from "./Alert";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export interface ConfirmAlertProps extends Omit<AlertProps, "children"> {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export const ConfirmAlert = React.memo(
  ({
    open,
    onOpenChange,
    title = "Confirm",
    description,
    variant = "default",
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
  }: ConfirmAlertProps) => {
    const handleConfirm = () => {
      onConfirm();
      onOpenChange(false);
    };

    return (
      <Alert
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
        variant={variant}
      >
        <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleConfirm}
          className={
            variant === "destructive"
              ? "bg-red-600 hover:bg-red-700"
              : undefined
          }
        >
          {confirmLabel}
        </AlertDialogAction>
      </Alert>
    );
  },
);

ConfirmAlert.displayName = "ConfirmAlert";
