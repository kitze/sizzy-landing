"use client";
import {
  Terminal,
  Layers,
  Image,
  History,
  FolderKanban,
  Palette,
  Globe,
  Keyboard,
  Camera,
  Bookmark,
  QrCode,
  Layout,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useIntersectionAnimation";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";

const features = [
  {
    title: "Universal DevTools",
    description: "One DevTools panel controls all devices. Debug everything from a single place.",
    icon: Terminal,
  },
  {
    title: "Photo Studio Mode",
    description: "Move and resize devices on a free canvas. Create stunning mockups with custom backgrounds.",
    icon: Image,
  },
  {
    title: "Session Manager",
    description: "Log in with different user accounts on different devices simultaneously. Test all user roles at once.",
    icon: Layers,
  },
  {
    title: "Project Workspaces",
    description: "Save configurations per project: bookmarks, notes, presets, snippets. Switch contexts instantly.",
    icon: FolderKanban,
  },
  {
    title: "Theme Testing",
    description: "Test light and dark themes simultaneously. Switch color schemes across all devices at once.",
    icon: Palette,
  },
  {
    title: "i18n Support",
    description: "Quick switch devices to any locale. Test your internationalization without leaving Sizzy.",
    icon: Globe,
  },
  {
    title: "Butler Commands",
    description: "Power user command system. Convert colors, encode strings, search npm, caniuse, and more.",
    icon: Keyboard,
  },
  {
    title: "Screenshots & Recording",
    description: "Capture screenshots on any device or all at once. Record videos or GIFs of your interactions.",
    icon: Camera,
  },
  {
    title: "Project Bookmarks",
    description: "Bookmarks tied to projects, not browsers. Your development shortcuts stay where you need them.",
    icon: Bookmark,
  },
  {
    title: "QR Code Sharing",
    description: "Scan QR code to open current URL on your phone. Automatically converts localhost to local IP.",
    icon: QrCode,
  },
  {
    title: "Flexible Layouts",
    description: "Horizontal, vertical, or grid layouts. Individual zoom per device. Find your perfect setup.",
    icon: Layout,
  },
  {
    title: "Recording History",
    description: "Every session saved with timestamps. Search past recordings and re-test whenever needed.",
    icon: History,
  },
];

export const SizzyFeatures = () => {
  const { ref, containerClass } = useScrollAnimation();

  return (
    <section id="features" className="bg-black py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Everything you need.
            <br />
            <span className="text-zinc-500">Nothing you don't.</span>
          </h2>
          <p className="text-lg text-zinc-500 leading-relaxed">
            100+ features built specifically for web development workflows.
          </p>
        </div>

        {/* Feature Grid */}
        <div ref={ref} className={`grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${containerClass}`}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="scroll-animate-item rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 group-hover:text-white transition-colors">
                <feature.icon className="h-4 w-4" />
              </div>
              <h3 className="mb-2 text-base font-medium text-white">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-600 mb-4">...and 90+ more features</p>
          <a
            href={sizzyMarketingLinks.portal}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            Start your free trial
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
