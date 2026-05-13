"use client";

import { PagesProgressBar as NextProgressBar } from "next-nprogress-bar";

export function AppProgressBar() {
  return (
    <NextProgressBar
      height="4px"
      color="#29d"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
