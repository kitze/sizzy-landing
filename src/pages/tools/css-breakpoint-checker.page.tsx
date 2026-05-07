import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  Title,
  createStyles,
} from "@mantine/core";
import MetaTags from "components/MetaTags";
import Shell from "components/Shell";
import Head from "next/head";
import React, { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaCode,
  FaCopy,
  FaDownload,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaMobileAlt,
  FaRulerCombined,
  FaSyncAlt,
  FaTable,
} from "react-icons/fa";
import { getMetaImage, sizzyLogoUrl } from "utils/get-meta-image";
import { captureSizzyEvent, trackOutboundClick } from "utils/posthog";

type ParsedBreakpoint = {
  label: string;
  min: number | null;
  max: number | null;
  source: string;
  raw: string;
};

type Finding = {
  severity: "good" | "info" | "warning";
  title: string;
  detail: string;
  fix: string;
};

type DeviceTarget = {
  label: string;
  width: number;
  category: string;
  note: string;
};

type DeviceCoverage = DeviceTarget & {
  active: string;
  nearest: string;
};

type BreakpointReport = {
  breakpoints: ParsedBreakpoint[];
  findings: Finding[];
  deviceCoverage: DeviceCoverage[];
  qaWidths: number[];
  suggestedFixes: string;
  markdown: string;
  warningCount: number;
};

const defaultInput = `// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
};`;

const cssRangeExample = `@media (max-width: 639px) {
  /* phone */
}

@media (min-width: 640px) and (max-width: 767px) {
  /* large phone */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* tablet */
}

@media (min-width: 1024px) {
  /* desktop */
}`;

const deviceTargets: DeviceTarget[] = [
  { label: "Small phone", width: 320, category: "Mobile", note: "Old or narrow phones" },
  { label: "iPhone SE", width: 375, category: "Mobile", note: "Small iPhone portrait" },
  { label: "Modern iPhone", width: 393, category: "Mobile", note: "Common iPhone portrait" },
  { label: "Pixel / Android", width: 412, category: "Mobile", note: "Common Android portrait" },
  { label: "Large phone", width: 430, category: "Mobile", note: "Large phone portrait" },
  { label: "Tailwind sm edge", width: 640, category: "Breakpoint", note: "Small tablet edge" },
  { label: "Tablet portrait", width: 768, category: "Tablet", note: "Common tablet breakpoint" },
  { label: "iPad portrait", width: 820, category: "Tablet", note: "iPad portrait viewport" },
  {
    label: "Tablet landscape",
    width: 1024,
    category: "Tablet",
    note: "iPad landscape/small laptop",
  },
  { label: "Desktop", width: 1280, category: "Desktop", note: "Desktop layout starts" },
  { label: "Laptop", width: 1366, category: "Desktop", note: "Common laptop viewport" },
  { label: "Design desktop", width: 1440, category: "Desktop", note: "Design review width" },
  { label: "Wide breakpoint", width: 1536, category: "Desktop", note: "Tailwind 2xl edge" },
  { label: "Wide monitor", width: 1920, category: "Desktop", note: "Wide-screen sanity pass" },
];

const faq = [
  {
    question: "What does this CSS breakpoint checker parse?",
    answer:
      "It reads Tailwind-style screens, plain breakpoint lists, min-width media queries, max-width media queries, and min/max range queries pasted into the browser.",
  },
  {
    question: "How are gaps and overlaps detected?",
    answer:
      "For explicit min/max ranges, the checker compares each covered interval and flags missing pixels, inclusive overlaps, and uncovered device widths.",
  },
  {
    question: "Should every warning become a new breakpoint?",
    answer:
      "No. Use the warnings to find risky viewport edges, then keep only breakpoints that fix a real layout problem in the product.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "CSS Breakpoint Checker",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: "https://sizzy.co/tools/css-breakpoint-checker",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: "Sizzy",
        url: "https://sizzy.co",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const useStyles = createStyles((theme) => ({
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f4fbff 0%, #ffffff 42%, #fff8ed 100%)",
    color: theme.colors.gray[8],
  },
  inner: {
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",
    padding: "92px 24px 80px",
    [theme.fn.smallerThan("sm")]: {
      padding: "62px 16px 56px",
    },
  },
  eyebrow: {
    alignSelf: "flex-start",
    border: "1px solid rgba(22, 163, 184, 0.24)",
    background: "rgba(22, 163, 184, 0.09)",
    color: theme.colors.cyan[8],
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 360px",
    gap: 28,
    alignItems: "end",
    [theme.fn.smallerThan("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  heroTitle: {
    maxWidth: 860,
    fontSize: 62,
    lineHeight: 1,
    color: "#171126",
    [theme.fn.smallerThan("md")]: {
      fontSize: 44,
    },
    [theme.fn.smallerThan("xs")]: {
      fontSize: 34,
    },
  },
  heroCopy: {
    maxWidth: 780,
    fontSize: 20,
    lineHeight: 1.65,
    color: theme.colors.gray[7],
    [theme.fn.smallerThan("sm")]: {
      fontSize: 16,
    },
  },
  miniPanel: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.84)",
    boxShadow: "0 20px 60px rgba(23, 17, 38, 0.08)",
    padding: 20,
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "390px minmax(0, 1fr)",
    gap: 24,
    marginTop: 34,
    [theme.fn.smallerThan("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  panel: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.92)",
    boxShadow: "0 22px 70px rgba(23, 17, 38, 0.08)",
  },
  metric: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
    padding: 18,
    minHeight: 112,
  },
  tableWrap: {
    overflowX: "auto",
  },
  code: {
    minHeight: 270,
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#171126",
    color: "#f8f5ff",
    padding: 18,
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
    fontSize: 13,
    lineHeight: 1.7,
    overflowX: "auto",
    whiteSpace: "pre",
  },
  textarea: {
    textarea: {
      minHeight: 330,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace",
      fontSize: 13,
      lineHeight: 1.55,
    },
  },
  findingCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "#ffffff",
  },
  warningCard: {
    borderColor: "rgba(250, 82, 82, 0.26)",
    background: "rgba(255, 245, 245, 0.86)",
  },
  goodCard: {
    borderColor: "rgba(9, 146, 104, 0.22)",
    background: "rgba(232, 249, 241, 0.72)",
  },
  linkBand: {
    borderRadius: 8,
    border: "1px solid rgba(22, 163, 184, 0.18)",
    background:
      "linear-gradient(135deg, rgba(22, 163, 184, 0.12), rgba(9, 146, 104, 0.10), rgba(245, 159, 0, 0.10))",
    padding: 24,
  },
  faqCard: {
    borderRadius: 8,
    border: "1px solid rgba(23, 17, 38, 0.08)",
    background: "rgba(255, 255, 255, 0.72)",
  },
  widthCell: {
    fontWeight: 800,
    color: "#171126",
    whiteSpace: "nowrap",
  },
}));

const blockedLabels = new Set([
  "min",
  "max",
  "raw",
  "width",
  "height",
  "screens",
  "theme",
  "extend",
  "container",
]);

const roundWidth = (value: number) => Math.round(value * 100) / 100;

const formatWidth = (value: number | null) => {
  if (value === null) return "-";
  if (!Number.isFinite(value)) return "unbounded";
  return `${Number.isInteger(value) ? value : value.toFixed(2)}px`;
};

const formatRange = (breakpoint: ParsedBreakpoint) => {
  if (breakpoint.min !== null && breakpoint.max !== null) {
    return `${formatWidth(breakpoint.min)} to ${formatWidth(breakpoint.max)}`;
  }

  if (breakpoint.min !== null) return `${formatWidth(breakpoint.min)} and up`;
  if (breakpoint.max !== null) return `up to ${formatWidth(breakpoint.max)}`;
  return "-";
};

const parseWidthValue = (value: string, rootFontSize: number) => {
  const match = value.trim().match(/(-?\d*\.?\d+)\s*(px|rem|em)?/i);

  if (!match) return null;

  const numeric = Number(match[1]);
  const unit = (match[2] || "px").toLowerCase();

  if (!Number.isFinite(numeric) || numeric <= 0) return null;

  if (unit === "rem" || unit === "em") return roundWidth(numeric * rootFontSize);
  return roundWidth(numeric);
};

const parseWidthParts = (amount: string, unit: string | undefined, rootFontSize: number) =>
  parseWidthValue(`${amount}${unit || "px"}`, rootFontSize);

const parseMediaExpression = (expression: string, rootFontSize: number) => {
  let min: number | null = null;
  let max: number | null = null;

  const minWidth = expression.match(/min-width\s*:\s*([0-9.]+)\s*(px|rem|em)?/i);
  const maxWidth = expression.match(/max-width\s*:\s*([0-9.]+)\s*(px|rem|em)?/i);
  const widthGte = expression.match(/width\s*>=\s*([0-9.]+)\s*(px|rem|em)?/i);
  const widthGt = expression.match(/width\s*>\s*([0-9.]+)\s*(px|rem|em)?/i);
  const valueLteWidth = expression.match(/([0-9.]+)\s*(px|rem|em)?\s*<=\s*width/i);
  const valueLtWidth = expression.match(/([0-9.]+)\s*(px|rem|em)?\s*<\s*width/i);
  const widthLte = expression.match(/width\s*<=\s*([0-9.]+)\s*(px|rem|em)?/i);
  const widthLt = expression.match(/width\s*<\s*([0-9.]+)\s*(px|rem|em)?/i);
  const valueGteWidth = expression.match(/([0-9.]+)\s*(px|rem|em)?\s*>=\s*width/i);
  const valueGtWidth = expression.match(/([0-9.]+)\s*(px|rem|em)?\s*>\s*width/i);

  if (minWidth) min = parseWidthParts(minWidth[1], minWidth[2], rootFontSize);
  if (maxWidth) max = parseWidthParts(maxWidth[1], maxWidth[2], rootFontSize);
  if (widthGte) min = parseWidthParts(widthGte[1], widthGte[2], rootFontSize);
  if (widthGt) {
    const parsed = parseWidthParts(widthGt[1], widthGt[2], rootFontSize);
    min = parsed === null ? null : roundWidth(parsed + 0.01);
  }
  if (valueLteWidth) min = parseWidthParts(valueLteWidth[1], valueLteWidth[2], rootFontSize);
  if (valueLtWidth) {
    const parsed = parseWidthParts(valueLtWidth[1], valueLtWidth[2], rootFontSize);
    min = parsed === null ? null : roundWidth(parsed + 0.01);
  }
  if (widthLte) max = parseWidthParts(widthLte[1], widthLte[2], rootFontSize);
  if (widthLt) {
    const parsed = parseWidthParts(widthLt[1], widthLt[2], rootFontSize);
    max = parsed === null ? null : roundWidth(parsed - 0.01);
  }
  if (valueGteWidth) max = parseWidthParts(valueGteWidth[1], valueGteWidth[2], rootFontSize);
  if (valueGtWidth) {
    const parsed = parseWidthParts(valueGtWidth[1], valueGtWidth[2], rootFontSize);
    max = parsed === null ? null : roundWidth(parsed - 0.01);
  }

  return { min, max };
};

const addBreakpoint = (
  entries: ParsedBreakpoint[],
  label: string,
  min: number | null,
  max: number | null,
  source: string,
  raw: string
) => {
  if (min === null && max === null) return;

  entries.push({
    label: label.trim() || `breakpoint-${entries.length + 1}`,
    min,
    max,
    source,
    raw: raw.trim(),
  });
};

const parseBreakpoints = (input: string, rootFontSize: number) => {
  const entries: ParsedBreakpoint[] = [];

  const objectPattern = /["']?([A-Za-z0-9_-]+)["']?\s*:\s*\{([^{}]*)\}/g;
  let objectMatch = objectPattern.exec(input);

  while (objectMatch) {
    const label = objectMatch[1];
    const body = objectMatch[2];
    const rawMatch = body.match(/\braw\b\s*:\s*["']([^"']+)["']/i);
    const minMatch = body.match(/\bmin\b\s*:\s*["']?([0-9.]+\s*(?:px|rem|em)?)/i);
    const maxMatch = body.match(/\bmax\b\s*:\s*["']?([0-9.]+\s*(?:px|rem|em)?)/i);

    if (rawMatch) {
      const parsed = parseMediaExpression(rawMatch[1], rootFontSize);
      addBreakpoint(entries, label, parsed.min, parsed.max, "Tailwind raw screen", rawMatch[1]);
    } else {
      const min = minMatch ? parseWidthValue(minMatch[1], rootFontSize) : null;
      const max = maxMatch ? parseWidthValue(maxMatch[1], rootFontSize) : null;
      addBreakpoint(entries, label, min, max, "Tailwind range screen", objectMatch[0]);
    }

    objectMatch = objectPattern.exec(input);
  }

  const mediaPattern = /@media[^{;\n]*\([^)]*width[^)]*\)[^{;\n]*/gi;
  let mediaMatch = mediaPattern.exec(input);

  while (mediaMatch) {
    const parsed = parseMediaExpression(mediaMatch[0], rootFontSize);
    addBreakpoint(
      entries,
      `media-${entries.length + 1}`,
      parsed.min,
      parsed.max,
      "CSS media query",
      mediaMatch[0]
    );
    mediaMatch = mediaPattern.exec(input);
  }

  const namedPattern = /["']?([A-Za-z0-9_-]+)["']?\s*:\s*["']?([0-9.]+)\s*(px|rem|em)?["']?/g;
  let namedMatch = namedPattern.exec(input);

  while (namedMatch) {
    const label = namedMatch[1];

    if (!blockedLabels.has(label.toLowerCase())) {
      const min = parseWidthParts(namedMatch[2], namedMatch[3], rootFontSize);
      addBreakpoint(entries, label, min, null, "Named value", namedMatch[0]);
    }

    namedMatch = namedPattern.exec(input);
  }

  input.split("\n").forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("/*")) return;
    if (trimmed.includes("@media") || trimmed.includes("{") || trimmed.includes("}")) return;

    const pair = trimmed.match(
      /^["']?([A-Za-z0-9_-]+)["']?\s*[:=\s]\s*["']?([0-9.]+)\s*(px|rem|em)?/i
    );

    if (pair && !blockedLabels.has(pair[1].toLowerCase())) {
      addBreakpoint(
        entries,
        pair[1],
        parseWidthParts(pair[2], pair[3], rootFontSize),
        null,
        "Plain value",
        trimmed
      );
      return;
    }

    if (/^[0-9.,\spxremem]+$/i.test(trimmed)) {
      const values = trimmed.match(/[0-9.]+\s*(?:px|rem|em)?/gi) || [];
      values.forEach((value) => {
        addBreakpoint(
          entries,
          `bp-${entries.length + 1}`,
          parseWidthValue(value, rootFontSize),
          null,
          "Plain list",
          value
        );
      });
    }
  });

  const unique = new Map<string, ParsedBreakpoint>();

  entries.forEach((entry) => {
    const key = `${entry.label.toLowerCase()}|${entry.min ?? ""}|${entry.max ?? ""}`;
    if (!unique.has(key)) unique.set(key, entry);
  });

  return Array.from(unique.values()).sort((a, b) => {
    const left = a.min ?? 0;
    const right = b.min ?? 0;

    if (left !== right) return left - right;
    return (a.max ?? Number.MAX_SAFE_INTEGER) - (b.max ?? Number.MAX_SAFE_INTEGER);
  });
};

const isActiveAtWidth = (breakpoint: ParsedBreakpoint, width: number) => {
  const minOk = breakpoint.min === null || width >= breakpoint.min;
  const maxOk = breakpoint.max === null || width <= breakpoint.max;
  return minOk && maxOk;
};

const getBreakpointType = (breakpoint: ParsedBreakpoint) => {
  if (breakpoint.min !== null && breakpoint.max !== null) return "range";
  if (breakpoint.min !== null) return "min-width";
  return "max-width";
};

const getSeverityColor = (severity: Finding["severity"]) => {
  if (severity === "warning") return "red";
  if (severity === "good") return "teal";
  return "cyan";
};

const getFindingIcon = (severity: Finding["severity"]) => {
  if (severity === "warning") return <FaExclamationTriangle />;
  if (severity === "good") return <FaCheckCircle />;
  return <FaRulerCombined />;
};

const buildDeviceCoverage = (breakpoints: ParsedBreakpoint[]) =>
  deviceTargets.map((target) => {
    const activeBreakpoints = breakpoints.filter((breakpoint) =>
      isActiveAtWidth(breakpoint, target.width)
    );
    const lower = breakpoints
      .filter((breakpoint) => breakpoint.min !== null && breakpoint.min <= target.width)
      .slice(-1)[0];
    const upper = breakpoints.find(
      (breakpoint) => breakpoint.min !== null && breakpoint.min > target.width
    );

    return {
      ...target,
      active: activeBreakpoints.length
        ? activeBreakpoints.map((breakpoint) => breakpoint.label).join(", ")
        : "Base styles",
      nearest: [
        lower ? `last ${lower.label} at ${formatWidth(lower.min)}` : "below first breakpoint",
        upper ? `next ${upper.label} at ${formatWidth(upper.min)}` : "no larger breakpoint",
      ].join("; "),
    };
  });

const buildQaWidths = (breakpoints: ParsedBreakpoint[]) => {
  const boundaries = breakpoints.flatMap((breakpoint) => [breakpoint.min, breakpoint.max]);
  const widths = boundaries.flatMap((boundary) =>
    boundary === null
      ? []
      : [Math.floor(boundary - 1), Math.round(boundary), Math.ceil(boundary + 1)]
  );

  return Array.from(
    new Set(
      [...widths, ...deviceTargets.map((target) => target.width)].filter(
        (width) => width >= 280 && width <= 2200
      )
    )
  ).sort((a, b) => a - b);
};

const buildFindings = (
  breakpoints: ParsedBreakpoint[],
  deviceCoverage: DeviceCoverage[]
): Finding[] => {
  const findings: Finding[] = [];

  if (!breakpoints.length) {
    return [
      {
        severity: "warning",
        title: "No breakpoints found",
        detail: "The checker did not find px, rem, em, min-width, max-width, or Tailwind screens.",
        fix: "Paste a screens object, media queries, or a plain list like 640, 768, 1024.",
      },
    ];
  }

  const hasMaxRules = breakpoints.some((breakpoint) => breakpoint.max !== null);
  const explicitRanges = (hasMaxRules ? breakpoints : [])
    .map((breakpoint) => ({
      breakpoint,
      from: breakpoint.min ?? 0,
      to: breakpoint.max ?? Number.POSITIVE_INFINITY,
    }))
    .sort((a, b) => a.from - b.from);

  if (explicitRanges.length > 1) {
    if (explicitRanges[0].from > 0) {
      findings.push({
        severity: "warning",
        title: "Small widths are uncovered",
        detail: `Your first explicit range starts at ${formatWidth(explicitRanges[0].from)}.`,
        fix: `Add a max-width range below ${formatWidth(
          explicitRanges[0].from
        )} or rely on base CSS for mobile.`,
      });
    }

    explicitRanges.forEach((range, index) => {
      const next = explicitRanges[index + 1];
      if (!next) return;

      if (next.from <= range.to) {
        findings.push({
          severity: "warning",
          title: "Overlapping breakpoint ranges",
          detail: `${range.breakpoint.label} and ${next.breakpoint.label} both match ${formatWidth(
            next.from
          )} to ${formatWidth(Math.min(range.to, next.to))}.`,
          fix: `Set ${range.breakpoint.label} max-width below ${formatWidth(
            next.from
          )}, for example ${formatWidth(roundWidth(next.from - 0.02))}.`,
        });
      } else if (next.from > range.to + 1) {
        findings.push({
          severity: "warning",
          title: "Gap between breakpoint ranges",
          detail: `No explicit range covers ${formatWidth(
            roundWidth(range.to + 0.01)
          )} to ${formatWidth(roundWidth(next.from - 0.01))}.`,
          fix: `Move ${next.breakpoint.label} down to ${formatWidth(
            roundWidth(range.to + 0.01)
          )} or extend ${range.breakpoint.label}.`,
        });
      }
    });

    const last = explicitRanges[explicitRanges.length - 1];
    if (Number.isFinite(last.to) && last.to < 1920) {
      findings.push({
        severity: "warning",
        title: "Wide desktop is uncovered",
        detail: `The last explicit max-width stops at ${formatWidth(last.to)}.`,
        fix: "Add a final min-width desktop rule or confirm wide screens are handled by base CSS.",
      });
    }
  }

  const duplicateLabels = new Map<string, ParsedBreakpoint[]>();
  const duplicateValues = new Map<string, ParsedBreakpoint[]>();

  breakpoints.forEach((breakpoint) => {
    const labelKey = breakpoint.label.toLowerCase();
    const valueKey = `${breakpoint.min ?? ""}-${breakpoint.max ?? ""}`;
    duplicateLabels.set(labelKey, [...(duplicateLabels.get(labelKey) || []), breakpoint]);
    duplicateValues.set(valueKey, [...(duplicateValues.get(valueKey) || []), breakpoint]);
  });

  Array.from(duplicateLabels.entries()).forEach(([label, items]) => {
    const values = new Set(items.map((item) => `${item.min ?? ""}-${item.max ?? ""}`));
    if (values.size > 1) {
      findings.push({
        severity: "warning",
        title: "Duplicate breakpoint name",
        detail: `${label} is used for ${items.map(formatRange).join(", ")}.`,
        fix: "Keep one value per breakpoint name so utility classes and media queries stay predictable.",
      });
    }
  });

  Array.from(duplicateValues.entries()).forEach(([, items]) => {
    const labels = Array.from(new Set(items.map((item) => item.label)));
    if (labels.length > 1) {
      findings.push({
        severity: "info",
        title: "Multiple labels share one boundary",
        detail: `${labels.join(", ")} use ${formatRange(items[0])}.`,
        fix: "Merge labels if they represent the same layout step, or document why both names exist.",
      });
    }
  });

  const minValues = breakpoints
    .filter((breakpoint) => breakpoint.min !== null)
    .map((breakpoint) => breakpoint.min as number)
    .sort((a, b) => a - b);

  minValues.forEach((value, index) => {
    const next = minValues[index + 1];
    if (!next) return;

    const gap = next - value;
    if (gap > 520) {
      findings.push({
        severity: "info",
        title: "Large breakpoint step",
        detail: `${formatWidth(value)} to ${formatWidth(next)} leaves a broad layout stretch.`,
        fix: "Add QA widths inside the stretch before adding another CSS breakpoint.",
      });
    }

    if (gap > 0 && gap < 48) {
      findings.push({
        severity: "info",
        title: "Very tight breakpoint step",
        detail: `${formatWidth(value)} and ${formatWidth(next)} are close together.`,
        fix: "Check whether one breakpoint can become a component-level rule instead.",
      });
    }
  });

  const uncoveredDevices = deviceCoverage.filter((target) => target.active === "Base styles");
  if (hasMaxRules && uncoveredDevices.length) {
    findings.push({
      severity: "warning",
      title: "Some device widths hit only base styles",
      detail: uncoveredDevices
        .slice(0, 5)
        .map((target) => `${target.label} (${target.width}px)`)
        .join(", "),
      fix: "Confirm base styles are intentional there, or add a matching range for those widths.",
    });
  }

  if (!minValues.some((value) => value >= 1024)) {
    findings.push({
      severity: "info",
      title: "No desktop min-width breakpoint",
      detail: "Nothing starts at or above 1024px.",
      fix: "If the layout changes on desktop, add a desktop breakpoint or verify the base layout scales cleanly.",
    });
  }

  if (!findings.some((finding) => finding.severity === "warning")) {
    findings.unshift({
      severity: "good",
      title: "No hard breakpoint conflicts found",
      detail: "The parsed values are sorted and do not show explicit range gaps or overlaps.",
      fix: "Still test just below, at, and above every boundary in a real browser.",
    });
  }

  return findings;
};

const quoteKey = (label: string) =>
  /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(label) ? label : `"${label}"`;

const variableName = (label: string, index: number) => {
  const normalized = label
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || `bp-${index + 1}`;
};

const buildSuggestedFixes = (breakpoints: ParsedBreakpoint[], qaWidths: number[]) => {
  if (!breakpoints.length) {
    return "Paste breakpoints to generate sorted Tailwind screens, CSS variables, and QA widths.";
  }

  const minBreakpoints = breakpoints.filter((breakpoint) => breakpoint.min !== null);
  const rangeBreakpoints = breakpoints.filter(
    (breakpoint) => breakpoint.min !== null && breakpoint.max !== null
  );

  const screens = [
    "// Suggested Tailwind-ish screens, sorted from small to wide.",
    "screens: {",
    ...minBreakpoints.map(
      (breakpoint, index) =>
        `  ${quoteKey(variableName(breakpoint.label, index))}: "${formatWidth(breakpoint.min)}",`
    ),
    "}",
  ];

  const cssVars = [
    "/* CSS custom properties */",
    ":root {",
    ...minBreakpoints.map(
      (breakpoint, index) =>
        `  --bp-${variableName(breakpoint.label, index)}: ${formatWidth(breakpoint.min)};`
    ),
    "}",
    "",
    "/* Mobile-first media-query notes */",
    ...minBreakpoints.map(
      (breakpoint) =>
        `@media (min-width: ${formatWidth(breakpoint.min)}) {\n  /* ${
          breakpoint.label
        }: add only layout changes that are needed here. */\n}`
    ),
  ];

  const rangeNotes = rangeBreakpoints.length
    ? [
        "",
        "/* Explicit range sanity check. Max-width is inclusive in CSS. */",
        ...rangeBreakpoints.map(
          (breakpoint) =>
            `@media (min-width: ${formatWidth(breakpoint.min)}) and (max-width: ${formatWidth(
              breakpoint.max
            )}) {\n  /* ${breakpoint.label} */\n}`
        ),
      ]
    : [];

  return [
    ...screens,
    "",
    ...cssVars,
    ...rangeNotes,
    "",
    `/* QA widths: ${qaWidths.join(", ")} */`,
  ].join("\n");
};

const buildMarkdown = (
  breakpoints: ParsedBreakpoint[],
  findings: Finding[],
  deviceCoverage: DeviceCoverage[],
  qaWidths: number[],
  suggestedFixes: string
) =>
  [
    "# CSS Breakpoint Checker Report",
    "",
    `- Parsed breakpoints: ${breakpoints.length}`,
    `- Warnings: ${findings.filter((finding) => finding.severity === "warning").length}`,
    `- QA widths: ${qaWidths.length}`,
    "",
    "## Sorted Breakpoints",
    "| Label | Min | Max | Type | Source |",
    "| --- | ---: | ---: | --- | --- |",
    ...breakpoints.map(
      (breakpoint) =>
        `| ${breakpoint.label} | ${formatWidth(breakpoint.min)} | ${formatWidth(
          breakpoint.max
        )} | ${getBreakpointType(breakpoint)} | ${breakpoint.source} |`
    ),
    "",
    "## Warnings And Fixes",
    ...findings.map(
      (finding) =>
        `- ${finding.severity.toUpperCase()}: ${finding.title} - ${finding.detail} Fix: ${
          finding.fix
        }`
    ),
    "",
    "## Device Coverage",
    "| Width | Device | Active breakpoints | Note |",
    "| ---: | --- | --- | --- |",
    ...deviceCoverage.map(
      (target) => `| ${target.width}px | ${target.label} | ${target.active} | ${target.nearest} |`
    ),
    "",
    "## QA Widths",
    qaWidths.map((width) => `${width}px`).join(", "),
    "",
    "## Suggested Fixes",
    "```css",
    suggestedFixes,
    "```",
  ].join("\n");

const buildReport = (input: string, rootFontSize: number): BreakpointReport => {
  const breakpoints = parseBreakpoints(input, rootFontSize);
  const deviceCoverage = buildDeviceCoverage(breakpoints);
  const qaWidths = buildQaWidths(breakpoints);
  const findings = buildFindings(breakpoints, deviceCoverage);
  const suggestedFixes = buildSuggestedFixes(breakpoints, qaWidths);
  const markdown = buildMarkdown(breakpoints, findings, deviceCoverage, qaWidths, suggestedFixes);

  return {
    breakpoints,
    findings,
    deviceCoverage,
    qaWidths,
    suggestedFixes,
    markdown,
    warningCount: findings.filter((finding) => finding.severity === "warning").length,
  };
};

const downloadText = (filename: string, value: string) => {
  const blob = new Blob([value], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const CssBreakpointCheckerPage = () => {
  const { classes, cx } = useStyles();
  const [input, setInput] = useState(defaultInput);
  const [rootFontSize, setRootFontSize] = useState(16);
  const [started, setStarted] = useState(false);
  const [copied, setCopied] = useState<"report" | "fixes" | null>(null);

  const report = useMemo(() => buildReport(input, rootFontSize), [input, rootFontSize]);
  const metaImage = getMetaImage({
    preset: "netlify",
    logo: sizzyLogoUrl,
    title: "CSS Breakpoint Checker",
    gradientColors: ["#16a3b8", "#099268", "#f59f00"],
    ctaColor: "black",
    ctaBg: "#ffffff",
  });

  const markStarted = (field: string) => {
    if (!started) {
      captureSizzyEvent("tool_started", {
        tool_slug: "css-breakpoint-checker",
        field,
      });
      setStarted(true);
    }
  };

  const checkBreakpoints = () => {
    setCopied(null);
    captureSizzyEvent("tool_completed", {
      tool_slug: "css-breakpoint-checker",
      breakpoint_count: report.breakpoints.length,
      warning_count: report.warningCount,
    });
  };

  const copyReport = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.markdown);
    }
    setCopied("report");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "css-breakpoint-checker",
      copy_type: "markdown_report",
      breakpoint_count: report.breakpoints.length,
    });
  };

  const copyFixes = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(report.suggestedFixes);
    }
    setCopied("fixes");
    captureSizzyEvent("copy_clicked", {
      tool_slug: "css-breakpoint-checker",
      copy_type: "suggested_fixes",
      breakpoint_count: report.breakpoints.length,
    });
  };

  const exportReport = () => {
    downloadText("css-breakpoint-checker-report.md", report.markdown);
    captureSizzyEvent("export_clicked", {
      tool_slug: "css-breakpoint-checker",
      breakpoint_count: report.breakpoints.length,
      warning_count: report.warningCount,
    });
  };

  return (
    <Shell wrapper={false} padding={0}>
      <MetaTags
        title="CSS Breakpoint Checker - Sizzy"
        description="Paste CSS media queries, breakpoint values, or Tailwind screens to find gaps, overlaps, device coverage, QA widths, and suggested responsive fixes."
        url="https://sizzy.co/tools/css-breakpoint-checker"
        image={metaImage}
      />
      <Head>
        <link rel="canonical" href="https://sizzy.co/tools/css-breakpoint-checker" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main className={classes.page}>
        <Box className={classes.inner}>
          <Box className={classes.heroGrid}>
            <Stack spacing="lg">
              <Badge size="lg" radius="xl" className={classes.eyebrow} leftSection={<FaCode />}>
                Free responsive design tool
              </Badge>
              <Title order={1} className={classes.heroTitle}>
                CSS Breakpoint Checker
              </Title>
              <Text className={classes.heroCopy}>
                Paste breakpoint values, CSS media queries, or a Tailwind-ish screens config and get
                sorted breakpoints, gap and overlap warnings, device coverage, QA widths, and
                suggested fixes.
              </Text>
              <Group spacing="sm">
                <Anchor href="/tools/browser-size-cheat-sheet">Browser size cheat sheet</Anchor>
                <Anchor href="/tools/viewport-checker">Viewport checker</Anchor>
                <Anchor href="/tools/website-breakpoint-finder">Breakpoint finder</Anchor>
                <Anchor href="/tools/responsive-screenshot-generator">Screenshot generator</Anchor>
                <Anchor href="/tools/responsive-qa-checklist">QA checklist</Anchor>
                <Anchor href="/blog/responsive-viewport-sizes">Viewport sizes guide</Anchor>
                <Anchor href="/blog/iphone-viewport-sizes">iPhone viewport sizes</Anchor>
              </Group>
            </Stack>

            <Box className={classes.miniPanel}>
              <Text size="sm" color="dimmed" transform="uppercase" weight={700}>
                Current breakpoint check
              </Text>
              <Title order={3} mt={8}>
                {report.warningCount} warnings
              </Title>
              <Text color="dimmed" mt={6}>
                {report.breakpoints.length} breakpoints - {report.qaWidths.length} QA widths
              </Text>
            </Box>
          </Box>

          <Box className={classes.toolGrid}>
            <Card className={classes.panel} p="lg">
              <Stack spacing="md">
                <Title order={2}>Check breakpoints</Title>
                <Textarea
                  classNames={{ root: classes.textarea }}
                  label="CSS, Tailwind screens, or plain values"
                  value={input}
                  onChange={(event) => {
                    setInput(event.currentTarget.value);
                    setCopied(null);
                    markStarted("breakpoint_input");
                  }}
                />
                <NumberInput
                  label="Root font size for rem/em"
                  min={8}
                  max={24}
                  value={rootFontSize}
                  onChange={(value) => {
                    setRootFontSize(Number(value) || 16);
                    setCopied(null);
                    markStarted("root_font_size");
                  }}
                />
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                  <Button
                    variant="light"
                    radius={8}
                    onClick={() => {
                      setInput(defaultInput);
                      setCopied(null);
                      markStarted("tailwind_example");
                    }}
                  >
                    Tailwind example
                  </Button>
                  <Button
                    variant="subtle"
                    radius={8}
                    onClick={() => {
                      setInput(cssRangeExample);
                      setCopied(null);
                      markStarted("css_range_example");
                    }}
                  >
                    CSS ranges
                  </Button>
                </SimpleGrid>
                <Button
                  leftIcon={<FaSyncAlt />}
                  radius={8}
                  size="md"
                  variant="gradient"
                  gradient={{ from: "cyan", to: "orange" }}
                  onClick={checkBreakpoints}
                >
                  Check breakpoints
                </Button>
              </Stack>
            </Card>

            <Stack spacing="md">
              <SimpleGrid
                cols={4}
                breakpoints={[
                  { maxWidth: "md", cols: 2 },
                  { maxWidth: "xs", cols: 1 },
                ]}
              >
                {[
                  ["Breakpoints", String(report.breakpoints.length)],
                  ["Warnings", String(report.warningCount)],
                  ["Devices", String(report.deviceCoverage.length)],
                  ["QA widths", String(report.qaWidths.length)],
                ].map(([label, value]) => (
                  <Box key={label} className={classes.metric}>
                    <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
                      {label}
                    </Text>
                    <Text mt={10} size="lg" weight={800}>
                      {value}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>Warnings and suggested fixes</Title>
                    <Text color="dimmed">
                      Range issues are calculated in the browser from the pasted breakpoint rules.
                    </Text>
                  </Box>
                  <Group spacing="xs">
                    <Button variant="light" radius={8} leftIcon={<FaCopy />} onClick={copyReport}>
                      {copied === "report" ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="subtle" radius={8} leftIcon={<FaCopy />} onClick={copyFixes}>
                      {copied === "fixes" ? "Copied fixes" : "Copy fixes"}
                    </Button>
                    <Button
                      variant="outline"
                      radius={8}
                      leftIcon={<FaDownload />}
                      onClick={exportReport}
                    >
                      Export
                    </Button>
                  </Group>
                </Group>

                <Stack spacing="sm">
                  {report.findings.map((finding) => (
                    <Card
                      key={`${finding.title}-${finding.detail}`}
                      className={cx(classes.findingCard, {
                        [classes.warningCard]: finding.severity === "warning",
                        [classes.goodCard]: finding.severity === "good",
                      })}
                      p="md"
                    >
                      <Group spacing="sm" align="flex-start" noWrap>
                        <Box mt={3} c={`${getSeverityColor(finding.severity)}.6`}>
                          {getFindingIcon(finding.severity)}
                        </Box>
                        <Box>
                          <Group spacing="xs">
                            <Title order={3}>{finding.title}</Title>
                            <Badge
                              radius={8}
                              color={getSeverityColor(finding.severity)}
                              variant="light"
                            >
                              {finding.severity}
                            </Badge>
                          </Group>
                          <Text mt={6} color="gray.7">
                            {finding.detail}
                          </Text>
                          <Text mt={6} weight={700} color="gray.8">
                            {finding.fix}
                          </Text>
                        </Box>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </Card>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>Sorted breakpoint table</Title>
                    <Text color="dimmed">
                      Parsed widths are normalized to CSS pixels and sorted from small to wide.
                    </Text>
                  </Box>
                  <Badge radius={8} color="cyan" variant="light" leftSection={<FaTable />}>
                    {report.breakpoints.length} rows
                  </Badge>
                </Group>
                <Box className={classes.tableWrap}>
                  <Table verticalSpacing="md" striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Label</th>
                        <th>Min</th>
                        <th>Max</th>
                        <th>Range</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.breakpoints.map((breakpoint) => (
                        <tr key={`${breakpoint.label}-${breakpoint.min}-${breakpoint.max}`}>
                          <td className={classes.widthCell}>{breakpoint.label}</td>
                          <td>{formatWidth(breakpoint.min)}</td>
                          <td>{formatWidth(breakpoint.max)}</td>
                          <td>{formatRange(breakpoint)}</td>
                          <td>{breakpoint.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>Device coverage</Title>
                <Text color="dimmed" mb="md">
                  Common viewport widths mapped against the active breakpoint rules.
                </Text>
                <Box className={classes.tableWrap}>
                  <Table verticalSpacing="md" striped highlightOnHover>
                    <thead>
                      <tr>
                        <th>Width</th>
                        <th>Viewport</th>
                        <th>Active rules</th>
                        <th>Nearest boundary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.deviceCoverage.map((target) => (
                        <tr key={target.width}>
                          <td className={classes.widthCell}>{target.width}px</td>
                          <td>
                            <Text weight={700}>{target.label}</Text>
                            <Text size="xs" color="dimmed">
                              {target.category} - {target.note}
                            </Text>
                          </td>
                          <td>{target.active}</td>
                          <td>{target.nearest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              </Card>

              <Card className={classes.panel} p="lg">
                <Title order={2}>QA widths</Title>
                <Text color="dimmed" mb="md">
                  Test device targets plus just below, at, and above each breakpoint edge.
                </Text>
                <Group spacing="xs">
                  {report.qaWidths.map((width) => (
                    <Badge key={width} radius={8} color="orange" variant="light">
                      {width}px
                    </Badge>
                  ))}
                </Group>
              </Card>

              <Card className={classes.panel} p="lg">
                <Group position="apart" align="start" mb="md">
                  <Box>
                    <Title order={2}>Suggested fixes</Title>
                    <Text color="dimmed">
                      Sorted screens, CSS variables, media-query notes, and the QA width pack.
                    </Text>
                  </Box>
                  <Button variant="subtle" radius={8} leftIcon={<FaCopy />} onClick={copyFixes}>
                    {copied === "fixes" ? "Copied fixes" : "Copy fixes"}
                  </Button>
                </Group>
                <Box component="pre" className={classes.code}>
                  {report.suggestedFixes}
                </Box>
              </Card>
            </Stack>
          </Box>

          <Box mt={28} className={classes.linkBand}>
            <Group position="apart" align="center">
              <Box>
                <Title order={2}>Turn breakpoint cleanup into a real responsive QA pass</Title>
                <Text mt={8} color="gray.7">
                  Use this checker to clean up the CSS edges, then move through the related Sizzy
                  tools for viewport references, finder planning, screenshots, and release QA.
                </Text>
                <Anchor mt={10} href="/tools/browser-size-cheat-sheet">
                  Browser size cheat sheet
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/viewport-checker">
                  Viewport checker
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/website-breakpoint-finder">
                  Breakpoint finder
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-screenshot-generator">
                  Screenshot generator
                </Anchor>
                <Anchor ml="md" mt={10} href="/tools/responsive-qa-checklist">
                  QA checklist
                </Anchor>
              </Box>
              <Button
                component="a"
                href="https://portal.sizzy.co/pricing"
                target="_blank"
                rel="noopener noreferrer"
                radius={8}
                size="lg"
                rightIcon={<FaExternalLinkAlt />}
                onClick={(event) => {
                  captureSizzyEvent("cta_clicked", {
                    tool_slug: "css-breakpoint-checker",
                    cta: "try_sizzy",
                    location: "css_breakpoint_checker",
                    target_url: "https://portal.sizzy.co/pricing",
                  });
                  event.currentTarget.href = trackOutboundClick(
                    "https://portal.sizzy.co/pricing",
                    "CSS breakpoint checker CTA",
                    "css_breakpoint_checker"
                  );
                }}
              >
                Try Sizzy
              </Button>
            </Group>
          </Box>

          <SimpleGrid mt={28} cols={3} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
            {faq.map((item) => (
              <Card key={item.question} className={classes.faqCard} p="lg">
                <Group spacing="xs">
                  <FaMobileAlt color="#16a3b8" />
                  <Title order={3}>{item.question}</Title>
                </Group>
                <Divider my="sm" />
                <Text color="gray.7">{item.answer}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </main>
    </Shell>
  );
};

export default CssBreakpointCheckerPage;
