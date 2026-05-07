import { LinkType } from "types";
import { allJobs } from "contentlayer/generated";

let docs = {
  link: "https://docs.sizzy.co",
  label: "Docs",
  isExternal: true,
};

let roadmap = {
  link: "https://glink.so/sizzy/roadmap",
  label: "Roadmap",
  isExternal: true,
};

let blog = {
  link: "/blog",
  label: "Blog",
};

let viewportChecker = {
  link: "/tools/viewport-checker",
  label: "Viewport Checker",
};

let screenshotGenerator = {
  link: "/tools/responsive-screenshot-generator",
  label: "Screenshot Generator",
};

let screenshotComparisonChecklist = {
  link: "/tools/screenshot-comparison-checklist",
  label: "Screenshot Comparison Checklist",
};

let responsiveQaChecklist = {
  link: "/tools/responsive-qa-checklist",
  label: "QA Checklist",
};

let websiteBreakpointFinder = {
  link: "/tools/website-breakpoint-finder",
  label: "Breakpoint Finder",
};

let cssBreakpointChecker = {
  link: "/tools/css-breakpoint-checker",
  label: "CSS Breakpoint Checker",
};

let browserSizeCheatSheet = {
  link: "/tools/browser-size-cheat-sheet",
  label: "Browser Size Cheat Sheet",
};

let iphoneViewportSizes = {
  link: "/blog/iphone-viewport-sizes",
  label: "iPhone Viewport Sizes",
};

let visualRegressionGuide = {
  link: "/blog/responsive-visual-regression-checklist",
  label: "Visual Regression Guide",
};

const youtube = {
  link: "https://youtube.com/@sizzyapp",
  label: "YouTube",
};

let changelog = {
  link: "https://glink.so/sizzy",
  label: "Changelog",
  isExternal: true,
};

let jobs = { link: "/jobs", label: "Jobs", counter: allJobs.length };
let about = { link: "/about", label: "About" };

let login = {
  link: "https://portal.sizzy.co/login",
  label: "Login",
  isExternal: true,
};

export let headerLinks: LinkType[] = [
  /*{
    link: "/use-cases",
    label: "Use cases",
  },*/
  { link: "/features", label: "Features" },
  { link: "/customers", label: "Customers" },
  // { link: "/vs-other-browsers", label: "Comparison" },
  /*{
    link: "https://portal.sizzy.co/download",
    label: "Download",
    isExternal: true,
  },*/
  {
    link: "/pricing",
    label: "Pricing",
  },
  about,
];

export let learnPopupLinks = [
  viewportChecker,
  screenshotGenerator,
  screenshotComparisonChecklist,
  responsiveQaChecklist,
  websiteBreakpointFinder,
  cssBreakpointChecker,
  browserSizeCheatSheet,
  iphoneViewportSizes,
  visualRegressionGuide,
  docs,
  roadmap,
  changelog,
  youtube,
];
export let companyLinks = [about, jobs];
export const mobileLinks: LinkType[] = [...headerLinks, ...learnPopupLinks, login];

export let footerLinks: LinkType[] = [
  { link: "/privacy", label: "Privacy" },
  { link: "/terms", label: "Terms and Conditions" },
];
