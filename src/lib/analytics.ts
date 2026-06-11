import posthog from "posthog-js";
import { useEffect, useState } from "react";

const POSTHOG_KEY = "phc_Dj2FziVdZkTyiZdb2usC29tsFF9MhWayWt2jqn66Fua4";
const POSTHOG_HOST = "https://posthog.server.kitze.io";

export const HERO_TEST_FLAG = "sizzy-hero-test";

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: "history_change",
    autocapture: false,
    persistence: "localStorage+cookie",
  });
}

export function trackEvent(
  name: string,
  properties?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  posthog.capture(name, properties);
}

export function trackTrialCta(
  placement: string,
  extra?: Record<string, unknown>,
) {
  trackEvent("landing_trial_cta_clicked", { placement, ...extra });
}

/**
 * Returns the active hero A/B variant. Renders "control" during
 * prerender/hydration, then swaps once feature flags load.
 */
export function useHeroVariant(): string {
  const [variant, setVariant] = useState("control");

  useEffect(() => {
    return posthog.onFeatureFlags(() => {
      const value = posthog.getFeatureFlag(HERO_TEST_FLAG);
      if (typeof value === "string" && value !== "control") {
        setVariant(value);
      }
    });
  }, []);

  return variant;
}
