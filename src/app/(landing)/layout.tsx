"use client";

import { useEffect } from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Set body background to black for landing pages
    document.body.style.background = "black";
    document.documentElement.style.background = "black";

    return () => {
      // Reset when leaving landing pages
      document.body.style.background = "";
      document.documentElement.style.background = "";
    };
  }, []);

  return <>{children}</>;
}
