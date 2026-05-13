"use client";
import React, { Suspense } from "react";
import { Spinner } from "@/components/Spinner";

export interface EditEntityDialogProps {
  Component: React.ComponentType<any>;
  onSubmit?: (data: any) => void;
  props?: Record<string, any>;
  close: () => void;
}

export const EditEntityDialog: React.FC<EditEntityDialogProps> = ({
  Component,
  onSubmit,
  props = {},
  close,
}) => {
  const handleSubmit = async (data: any) => {
    if (onSubmit) {
      await onSubmit(data);
    }
    close();
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-8">
          <Spinner size="lg" />
        </div>
      }
    >
      <Component {...props} onSubmit={handleSubmit} close={close} />
    </Suspense>
  );
};
