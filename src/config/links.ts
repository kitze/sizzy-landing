import { LinkType } from "types";

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

let changelog = {
  link: "https://glink.so/sizzy",
  label: "Changelog",
  isExternal: true,
};

let jobs = { link: "/jobs", label: "Jobs" };
let about = { link: "/about", label: "About" };

let login = {
  link: "https://portal.sizzy.co/login",
  label: "Login",
  isExternal: true,
};

export let headerLinks: LinkType[] = [
  {
    link: "/use-cases",
    label: "Use cases",
  },
  { link: "/features", label: "Features" },
  { link: "/customers", label: "Customers" },
  { link: "/vs-other-browsers", label: "Comparison" },
  {
    link: "https://portal.sizzy.co/download",
    label: "Download",
    isExternal: true,
  },
  {
    link: "https://portal.sizzy.co/pricing",
    label: "Pricing",
    isExternal: true,
  },
];

export let learnPopupLinks = [docs, roadmap, changelog];
export let companyLinks = [about, jobs];
export const mobileLinks = [
  ...headerLinks,
  ...learnPopupLinks,
  ...companyLinks,
  login,
];

export let footerLinks: LinkType[] = [
  { link: "/privacy", label: "Privacy" },
  { link: "/terms", label: "Terms and Conditions" },
];
