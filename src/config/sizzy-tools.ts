import { MonitorSmartphone, Ruler, ScanSearch } from "lucide-react";

export const sizzyToolLinks = [
  {
    href: "/tools/viewport-checker",
    title: "Viewport Checker",
    description:
      "Check responsive viewport ranges and plan real-device breakpoints before you ship.",
    Icon: MonitorSmartphone,
  },
] as const;

export const viewportChecklist = [
  "Start with the narrowest supported mobile width and expand until the layout breaks.",
  "Check common device-width clusters instead of testing only arbitrary breakpoints.",
  "Validate navigation, sticky elements, forms, dialogs, and horizontal overflow at each range.",
  "Repeat the pass with realistic content lengths, logged-in states, and browser chrome assumptions.",
] as const;

export const viewportRanges = [
  {
    label: "Small phones",
    range: "320-389px",
    note: "Stress-test dense controls, text wrapping, dialogs, and fixed-position UI.",
    Icon: Ruler,
  },
  {
    label: "Modern phones",
    range: "390-479px",
    note: "Check the default mobile experience and any card, nav, or form density changes.",
    Icon: MonitorSmartphone,
  },
  {
    label: "Large phones and small tablets",
    range: "480-767px",
    note: "Watch for awkward intermediate layouts before tablet styles take over.",
    Icon: ScanSearch,
  },
  {
    label: "Tablet and desktop handoff",
    range: "768-1199px",
    note: "Confirm columns, sidebars, and nav transformations happen cleanly.",
    Icon: Ruler,
  },
] as const;
