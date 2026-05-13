"use client";
import { type ReactNode, Suspense } from "react";
import { Spinner } from "./Spinner";

interface SuspensedProps {
  children: ReactNode;
  fallback?: ReactNode;
  force?: boolean;
}

export const Suspensed = ({
  children,
  fallback = <Spinner />,
  force = false,
}: SuspensedProps) => {
  if (force) {
    return fallback;
  }
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
