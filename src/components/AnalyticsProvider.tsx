"use client";
import { initAnalytics } from "@/lib/analytics";
import { useEffect } from "react";

export function AnalyticsProvider() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
