import posthog from "posthog-js";
import { useEffect, useState } from "react";

const POSTHOG_KEY = "phc_Dj2FziVdZkTyiZdb2usC29tsFF9MhWayWt2jqn66Fua4";
const POSTHOG_HOST = "https://posthog.server.kitze.io";

export const HERO_TEST_FLAG = "sizzy-hero-test";

let initialized = false;
let portalLinkDecorationInitialized = false;

const productProperties = {
  app_name: "sizzy-landing",
  product: "sizzy",
  product_slug: "sizzy",
  product_domain: "sizzy.co",
  surface: "landing",
} as const;

const rawAttributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "source",
] as const;

type RawAttributionKey = (typeof rawAttributionKeys)[number];
type AttributionValue = string | boolean;
type AttributionProperties = Record<string, AttributionValue>;

const storagePrefix = "sizzy_landing_attribution_";
const referrerStorageKey = `${storagePrefix}referrer`;
const portalHost = "portal.sizzy.co";

const getPostHog = () =>
  posthog as typeof posthog & {
    register_for_session?: (properties: Record<string, unknown>) => void;
    get_session_id?: () => string;
  };

function getStorageValue(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable in private browsing; analytics should still run.
  }
}

function markSessionOnce(key: string) {
  try {
    if (window.sessionStorage.getItem(key)) return false;
    window.sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

function addIfPresent(
  properties: AttributionProperties,
  key: string,
  value: AttributionValue | null | undefined,
) {
  if (value === undefined || value === null || value === "") return;
  properties[key] = value;
}

function getRawAttribution() {
  const params = new URLSearchParams(window.location.search);

  return rawAttributionKeys.reduce<Record<RawAttributionKey, string | null>>(
    (properties, key) => {
      const currentValue = params.get(key);
      if (currentValue) {
        setStorageValue(`${storagePrefix}${key}`, currentValue);
        properties[key] = currentValue;
        return properties;
      }

      properties[key] = getStorageValue(`${storagePrefix}${key}`);
      return properties;
    },
    {} as Record<RawAttributionKey, string | null>,
  );
}

function getAttributionProperties() {
  const rawAttribution = getRawAttribution();
  const properties: AttributionProperties = {};

  rawAttributionKeys.forEach((key) => {
    addIfPresent(properties, key, rawAttribution[key]);
  });

  const referrer = document.referrer || getStorageValue(referrerStorageKey);
  if (referrer) {
    addIfPresent(properties, "referrer", referrer);
    if (document.referrer) setStorageValue(referrerStorageKey, referrer);
  }

  addIfPresent(properties, "attribution_source", rawAttribution.utm_source);
  addIfPresent(properties, "attribution_medium", rawAttribution.utm_medium);
  addIfPresent(properties, "attribution_campaign", rawAttribution.utm_campaign);
  addIfPresent(properties, "attribution_content", rawAttribution.utm_content);
  addIfPresent(properties, "attribution_term", rawAttribution.utm_term);
  addIfPresent(properties, "ugc_platform", rawAttribution.utm_source);
  addIfPresent(properties, "ugc_campaign", rawAttribution.utm_campaign);

  if (rawAttribution.utm_medium) {
    addIfPresent(
      properties,
      "ugc_paid",
      rawAttribution.utm_medium === "ugc_paid",
    );
  }

  if (rawAttribution.utm_campaign) {
    const campaignWeek = /(?:^|-)w\d+$/.exec(rawAttribution.utm_campaign);
    addIfPresent(
      properties,
      "campaign_week",
      campaignWeek?.[0].replace(/^-/, ""),
    );
  }

  if (rawAttribution.utm_content) {
    const [creator, angle, format, variant] =
      rawAttribution.utm_content.split("--");
    addIfPresent(properties, "ugc_creator", creator);
    addIfPresent(properties, "ugc_angle", angle);
    addIfPresent(properties, "ugc_format", format);
    addIfPresent(properties, "ugc_variant", variant);
  }

  return properties;
}

function hasUrlAttribution() {
  const params = new URLSearchParams(window.location.search);
  return rawAttributionKeys.some((key) => params.has(key));
}

function registerLandingAttribution() {
  if (typeof window === "undefined") return;

  const attribution = getAttributionProperties();
  const posthogClient = getPostHog();

  posthog.register({
    ...productProperties,
    ...attribution,
  });
  posthogClient.register_for_session?.({
    ...productProperties,
    ...attribution,
  });

  if (!hasUrlAttribution()) return;

  const referralSessionKey = `sizzy_referral_landed:${window.location.href}`;
  if (!markSessionOnce(referralSessionKey)) return;

  const distinctId = posthog.get_distinct_id?.();
  const sessionId = posthogClient.get_session_id?.();

  posthog.capture("product_referral_landed", {
    ...productProperties,
    ...attribution,
    landing_path: window.location.pathname,
    landing_url: window.location.href,
    ...(distinctId && { ph_product_id: distinctId, ph_sizzy_id: distinctId }),
    ...(sessionId && { ph_product_sid: sessionId, ph_sizzy_sid: sessionId }),
  });
}

function getPortalPlacement(anchor: HTMLAnchorElement) {
  const explicitPlacement =
    anchor.getAttribute("data-sizzy-placement") ??
    anchor.getAttribute("data-cta-location");
  if (explicitPlacement) return explicitPlacement;

  const section = anchor.closest("section[id]");
  if (section?.id) return section.id;

  const pathPlacement = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .replace(/\//g, "_");
  return pathPlacement || "landing";
}

function decoratePortalUrl(href: string, placement: string) {
  const targetUrl = new URL(href, window.location.href);
  if (targetUrl.hostname !== portalHost) return href;

  const attribution = getAttributionProperties();
  const posthogClient = getPostHog();
  const distinctId = posthog.get_distinct_id?.();
  const sessionId = posthogClient.get_session_id?.();

  if (distinctId) targetUrl.searchParams.set("ph_sizzy_id", distinctId);
  if (sessionId) targetUrl.searchParams.set("ph_sizzy_sid", sessionId);
  targetUrl.searchParams.set("ph_sizzy_from", "landing");
  targetUrl.searchParams.set("ph_sizzy_placement", placement);

  rawAttributionKeys.forEach((key) => {
    const value = attribution[key];
    if (typeof value === "string" && value)
      targetUrl.searchParams.set(key, value);
  });

  return targetUrl.toString();
}

function initPortalLinkDecoration() {
  if (portalLinkDecorationInitialized || typeof document === "undefined")
    return;
  portalLinkDecorationInitialized = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      try {
        anchor.href = decoratePortalUrl(
          anchor.href,
          getPortalPlacement(anchor),
        );
      } catch {
        // Leave the original href untouched if URL parsing fails.
      }
    },
    true,
  );
}

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: "history_change",
    autocapture: false,
    persistence: "localStorage+cookie",
    loaded: (instance) => {
      // Self-hosted remote config can lag behind newly created flags and
      // report hasFeatureFlags=false, which skips the /flags call entirely.
      instance.reloadFeatureFlags();
      registerLandingAttribution();
    },
  });
  initPortalLinkDecoration();
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  posthog.capture(name, {
    ...productProperties,
    ...getAttributionProperties(),
    ...properties,
  });
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
