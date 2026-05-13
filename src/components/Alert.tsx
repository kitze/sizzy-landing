"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export interface AlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  children?: React.ReactNode;
}

export const Alert = React.memo(
  ({
    open,
    onOpenChange,
    title = "Alert",
    description,
    variant = "default",
    children,
  }: AlertProps) => {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>{children}</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

Alert.displayName = "Alert";
