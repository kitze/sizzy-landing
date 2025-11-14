import { useEffect, useState } from "react";

export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

export const useOnPageLoad = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.onload = () => setLoaded(true);
  }, []);
  return loaded;
};

export const useDatafast = ({
  websiteId,
  domain,
  startLoading,
  delay = 0,
}: {
  websiteId: string;
  domain: string;
  startLoading: boolean;
  delay: number;
}) => {
  useEffect(() => {
    if (startLoading) {
      if (isDev) {
        return;
      }
      if (!websiteId || !domain) {
        throw new Error("Must provide websiteId and domain");
      }
      setTimeout(() => {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.defer = true;
        script.src = "https://datafa.st/js/script.js";
        script.setAttribute("data-website-id", websiteId);
        script.setAttribute("data-domain", domain);
        document.body.appendChild(script);
      }, delay);
    }
  }, [startLoading, websiteId, domain, delay]);
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label: string;
  value?: number;
}) => {
  // @ts-ignore
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackButtonClick = (label: string) => {
  event({
    action: "buton_click",
    label,
  });
};
