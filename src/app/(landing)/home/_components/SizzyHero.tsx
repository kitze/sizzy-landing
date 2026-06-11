"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { sizzyMarketingLinks } from "@/config/sizzy-marketing-links";
import { trackTrialCta, useHeroVariant } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type HeroCopy = {
  line1: string;
  line2: string;
  subtext: string;
};

const heroControl: HeroCopy = {
  line1: "Test every breakpoint",
  line2: "at once. Without 5 windows.",
  subtext:
    "One window, every device side-by-side. Synchronized scrolling, clicking, and forms. Debug responsive CSS in a fraction of the time.",
};

const heroCopy: Record<string, HeroCopy> = {
  control: heroControl,
  "stop-resizing": {
    line1: "Stop resizing your browser",
    line2: "to test responsive design.",
    subtext:
      "See your site on every device at once - phones, tablets, desktops - with synchronized scrolling, clicking, and forms. Built on Chromium.",
  },
  "ship-faster": {
    line1: "Ship responsive UIs",
    line2: "in half the time.",
    subtext:
      "Sizzy is the browser made for web development. Every breakpoint visible at once, every interaction synchronized, every project remembered.",
  },
};

const DeviceFrame = ({
  type,
  className,
  children,
  active = false,
}: {
  type: "phone" | "tablet" | "desktop";
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
}) => {
  const dimensions = {
    phone: { width: 80, height: 160, radius: 12 },
    tablet: { width: 140, height: 200, radius: 10 },
    desktop: { width: 240, height: 160, radius: 8 },
  };

  const d = dimensions[type];

  return (
    <motion.div
      className={cn(
        "relative rounded-lg border bg-[#111] overflow-hidden transition-all duration-500",
        active ? "border-white/30" : "border-white/[0.08]",
        className
      )}
      style={{ width: d.width, height: d.height, borderRadius: d.radius }}
    >
      {/* Browser chrome dots */}
      <div className="h-3 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center px-1.5 gap-1">
        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      {children}
    </motion.div>
  );
};

const MockWebsite = ({ scrollY = 0 }: { scrollY?: number }) => (
  <div className="h-full w-full bg-[#0a0a0a] overflow-hidden relative">
    <div style={{ transform: `translateY(-${scrollY}px)` }}>
      {/* Promo banner row */}
      <div className="h-2.5 bg-white/[0.08] flex items-center justify-center">
        <div className="h-1 w-1/3 rounded-full bg-white/40" />
      </div>

      {/* Site nav */}
      <div className="px-2 py-1.5 flex items-center justify-between border-b border-white/[0.04]">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-sm bg-white/50" />
          <div className="h-1 w-6 rounded-full bg-white/25" />
        </div>
        <div className="hidden sm:flex gap-1">
          <div className="h-1 w-3 rounded-full bg-white/15" />
          <div className="h-1 w-3 rounded-full bg-white/15" />
          <div className="h-1 w-3 rounded-full bg-white/15" />
        </div>
        <div className="h-2 w-6 rounded bg-white/30" />
      </div>

      {/* Hero: 2-column block (text + image) */}
      <div className="p-2 grid grid-cols-2 gap-1.5">
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded-sm bg-white/35" />
          <div className="h-1.5 w-3/4 rounded-sm bg-white/35" />
          <div className="h-1 w-full rounded-sm bg-white/12 mt-1" />
          <div className="h-1 w-2/3 rounded-sm bg-white/12" />
          <div className="h-2 w-8 rounded bg-white/45 mt-1.5" />
        </div>
        <div className="rounded bg-gradient-to-br from-white/[0.10] to-white/[0.03] border border-white/[0.06]" />
      </div>

      {/* Typographic headline strip */}
      <div className="px-2 py-2 border-y border-white/[0.04] bg-white/[0.015]">
        <div className="h-2 w-5/6 rounded-sm bg-white/40 mb-1" />
        <div className="h-2 w-2/3 rounded-sm bg-white/40" />
      </div>

      {/* Card grid */}
      <div className="p-2 grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded bg-white/[0.05] border border-white/[0.06] p-1 space-y-0.5"
          >
            <div className="h-1.5 w-full rounded-sm bg-white/25" />
            <div className="h-1 w-2/3 rounded-sm bg-white/12" />
            <div className="h-1 w-1/2 rounded-sm bg-white/12" />
          </div>
        ))}
      </div>

      {/* Body copy rows */}
      <div className="p-2 space-y-1">
        <div className="h-1 w-full rounded-sm bg-white/12" />
        <div className="h-1 w-5/6 rounded-sm bg-white/12" />
        <div className="h-1 w-3/4 rounded-sm bg-white/12" />
      </div>

      {/* Footer row */}
      <div className="px-2 py-1.5 border-t border-white/[0.04] flex items-center justify-between">
        <div className="h-1 w-8 rounded-full bg-white/12" />
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  </div>
);

export const SizzyHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeDevice, setActiveDevice] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const heroVariant = useHeroVariant();
  const copy = heroCopy[heroVariant] ?? heroControl;

  // Synchronized scroll animation
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setScrollY((prev) => {
        if (prev >= 30) return 0;
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Device highlight animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDevice((prev) => {
        if (prev === null || prev >= 4) return 0;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-black px-4 pt-20 pb-12 text-white sm:px-6 md:px-12 md:pb-16 lg:px-20">
      {/* Subtle grid pattern only */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Single subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Column: Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400">
              <span>The Browser for Web Developers</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[52px] xl:text-6xl text-white pb-2 leading-[1.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {copy.line1}
            <br />
            <span className="text-zinc-500">{copy.line2}</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg text-zinc-500 sm:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {copy.subtext}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center lg:items-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href={sizzyMarketingLinks.portal}
                onClick={() =>
                  trackTrialCta("hero", { hero_variant: heroVariant })
                }
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 font-medium text-black transition-all hover:bg-zinc-200"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 px-8 font-medium text-zinc-400 transition-all hover:text-white hover:border-white/20"
              >
                See Features
              </a>
            </div>
            <p className="text-sm text-zinc-500">
              14-day free trial. No credit card required. From $12/mo on the
              annual plan.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-14 grid grid-cols-3 gap-6 w-full max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <div className="text-2xl font-semibold text-white">10,000+</div>
              <div className="mt-1 text-xs text-zinc-500 leading-snug">
                Developers shipping responsive UIs
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">738</div>
              <div className="mt-1 text-xs text-zinc-500 leading-snug">
                Releases since 2018 — actively maintained
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">#1</div>
              <div className="mt-1 text-xs text-zinc-500 leading-snug">
                Product of the Day on Product Hunt
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Device Preview */}
        <motion.div
          className="relative h-[500px] w-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onMouseEnter={() => setIsAnimating(false)}
          onMouseLeave={() => setIsAnimating(true)}
        >
          {/* Devices arranged in a pleasing layout */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Desktop - center back */}
            <motion.div
              className="absolute"
              style={{ top: "15%", left: "50%", x: "-50%", zIndex: 10 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <DeviceFrame type="desktop" active={activeDevice === 0}>
                <MockWebsite scrollY={scrollY} />
              </DeviceFrame>
            </motion.div>

            {/* Tablet - left */}
            <motion.div
              className="absolute"
              style={{ top: "35%", left: "5%", zIndex: 20 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <DeviceFrame type="tablet" active={activeDevice === 1}>
                <MockWebsite scrollY={scrollY} />
              </DeviceFrame>
            </motion.div>

            {/* Phone 1 - right */}
            <motion.div
              className="absolute"
              style={{ top: "30%", right: "8%", zIndex: 30 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <DeviceFrame type="phone" active={activeDevice === 2}>
                <MockWebsite scrollY={scrollY} />
              </DeviceFrame>
            </motion.div>

            {/* Phone 2 - front right */}
            <motion.div
              className="absolute"
              style={{ bottom: "10%", right: "25%", zIndex: 40 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <DeviceFrame type="phone" active={activeDevice === 3}>
                <MockWebsite scrollY={scrollY} />
              </DeviceFrame>
            </motion.div>

            {/* Phone 3 - front left */}
            <motion.div
              className="absolute"
              style={{ bottom: "15%", left: "20%", zIndex: 35 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <DeviceFrame type="phone" active={activeDevice === 4}>
                <MockWebsite scrollY={scrollY} />
              </DeviceFrame>
            </motion.div>
          </div>

          {/* Sync indicator */}
          <AnimatePresence>
            {isAnimating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-md"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs text-zinc-500">Synchronized scrolling</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
