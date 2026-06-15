// Cross-promotion: Kitze product portfolio.
// Footer + /apps links carry UTM params so cross-traffic is measurable in PostHog.

export interface KitzeApp {
  slug: string;
  name: string;
  tagline: string;
  url: string;
}

// utm_source for cross-promo links originating from this site.
export const CURRENT_APP_SLUG = "sizzy";

export const KITZE_APPS: KitzeApp[] = [
  { slug: "sizzy", name: "Sizzy", tagline: "The browser for developers", url: "https://sizzy.co" },
  { slug: "zerotoshipped", name: "Zero to Shipped", tagline: "SaaS boilerplate for shipping fast", url: "https://zerotoshipped.com" },
  { slug: "dmx", name: "DMX", tagline: "Mindful Twitter/X for Mac", url: "https://dmx.to" },
  { slug: "sotto", name: "Sotto", tagline: "Voice-to-text for macOS", url: "https://sotto.to" },
  { slug: "justwrite", name: "JustWrite", tagline: "Distraction-free writing for macOS", url: "https://justwrite.ink" },
  { slug: "tubely", name: "Tubely", tagline: "YouTube Studio for Mac", url: "https://tubely.cc" },
  { slug: "passlock", name: "Passlock", tagline: "Password manager with willpower", url: "https://passlock.to" },
  { slug: "tinkererclub", name: "Tinkerer Club", tagline: "Kitze community for makers and indie hackers", url: "https://tinkerer.club" },
];

export function kitzeAppUrl(
  app: { url: string },
  source: string,
  medium: "footer" | "apps_page",
  campaign = "crosspromo",
): string {
  const sep = app.url.includes("?") ? "&" : "?";
  return `${app.url}${sep}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
}
