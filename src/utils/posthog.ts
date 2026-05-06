import Router from "next/router";
import posthog from "posthog-js";
import { useEffect } from "react";

const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_Dj2FziVdZkTyiZdb2usC29tsFF9MhWayWt2jqn66Fua4";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://posthog.server.kitze.io";
const isDev = process.env.NODE_ENV !== "production";

let initialized = false;

const portalAndDownloadHosts = new Set(["portal.sizzy.co", "releaseflow.net"]);

export const initPostHog = () => {
  if (typeof window === "undefined" || initialized || isDev) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false,
    capture_pageleave: true,
    capture_dead_clicks: true,
    cross_subdomain_cookie: true,
    disable_session_recording: false,
    enable_recording_console_log: true,
    person_profiles: "identified_only",
    loaded: (client) => {
      client.register({
        app_name: "sizzy-landing",
        product: "sizzy",
        source_domain: window.location.hostname,
      });
      persistInboundAttribution();
    },
  });

  initialized = true;
};

export const captureSizzyEvent = (event: string, properties: Record<string, any> = {}) => {
  initPostHog();
  if (typeof window === "undefined" || isDev) return;

  posthog.capture(event, {
    app_name: "sizzy-landing",
    product: "sizzy",
    ...properties,
  });
};

export const capturePageview = () => {
  captureSizzyEvent("$pageview", {
    $current_url: window.location.href,
    path: window.location.pathname,
  });
};

export const usePostHogPageviews = () => {
  useEffect(() => {
    initPostHog();
    capturePageview();

    const onRouteChange = () => capturePageview();
    Router.events.on("routeChangeComplete", onRouteChange);

    return () => Router.events.off("routeChangeComplete", onRouteChange);
  }, []);
};

export const decorateSizzyOutboundUrl = (href: string, placement?: string) => {
  if (typeof window === "undefined") return href;

  try {
    const url = new URL(href, window.location.href);
    if (!portalAndDownloadHosts.has(url.hostname)) return href;

    initPostHog();

    const distinctId = posthog.get_distinct_id();
    const sessionId = (posthog as any).get_session_id?.();
    const landingRef = getStoredAttribution();

    if (distinctId) url.searchParams.set("ph_sizzy_id", distinctId);
    if (sessionId) url.searchParams.set("ph_sizzy_sid", sessionId);
    url.searchParams.set("ph_sizzy_from", window.location.href);
    url.searchParams.set("ph_sizzy_placement", placement || "landing");
    url.searchParams.set("utm_source", url.searchParams.get("utm_source") || "sizzy.co");
    url.searchParams.set("utm_medium", url.searchParams.get("utm_medium") || "referral");
    url.searchParams.set("utm_campaign", url.searchParams.get("utm_campaign") || "sizzy_journey");

    Object.entries(landingRef).forEach(([key, value]) => {
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    });

    return url.toString();
  } catch {
    return href;
  }
};

export const trackOutboundClick = (href: string, label: string, placement?: string) => {
  const decoratedUrl = decorateSizzyOutboundUrl(href, placement);

  captureSizzyEvent("landing_outbound_clicked", {
    label,
    placement,
    destination_url: decoratedUrl,
    destination_host: safeUrlHost(decoratedUrl),
  });

  return decoratedUrl;
};

const persistInboundAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  const attribution: Record<string, string> = {};

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "ref",
    "source",
  ].forEach((key) => {
    const value = params.get(key);
    if (value) attribution[key] = value;
  });

  if (Object.keys(attribution).length) {
    window.localStorage.setItem("sizzy:landing-attribution", JSON.stringify(attribution));
  }
};

const getStoredAttribution = (): Record<string, string> => {
  try {
    return JSON.parse(window.localStorage.getItem("sizzy:landing-attribution") || "{}");
  } catch {
    return {};
  }
};

const safeUrlHost = (href: string) => {
  try {
    return new URL(href).hostname;
  } catch {
    return undefined;
  }
};
