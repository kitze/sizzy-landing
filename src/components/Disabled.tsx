import React from "react";
import { Spinner } from "@/components/Spinner";

interface DisabledProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const Disabled: React.FC<DisabledProps> = ({ children, loading }) => {
  return (
    <div className="pointer-events-none relative cursor-not-allowed opacity-60">
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};
