"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MousePointer2, Type, Scroll, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";

const syncFeatures = [
  {
    id: "clicks",
    name: "Sync Clicks",
    icon: MousePointer2,
    description: "Click once, trigger everywhere. Test button interactions across all devices simultaneously.",
  },
  {
    id: "forms",
    name: "Sync Forms",
    icon: Type,
    description: "Form inputs auto-sync across all devices. Fill once, see it appear everywhere instantly.",
  },
  {
    id: "scroll",
    name: "Sync Scroll",
    icon: Scroll,
    description: "Scroll position synchronized across all devices. Compare layouts at any scroll depth.",
  },
  {
    id: "independent",
    name: "Independent Nav",
    icon: Link2Off,
    description: "Disable sync to have each device navigate independently. Test different pages side by side.",
  },
];

const MiniDevice = ({
  className,
  active,
  scrollY,
  formValue,
  showClick,
  size = "medium",
}: {
  className?: string;
  active?: boolean;
  scrollY: number;
  formValue: string;
  showClick: boolean;
  size?: "small" | "medium" | "large";
}) => {
  const dimensions = {
    small: { w: 60, h: 100 },
    medium: { w: 80, h: 140 },
    large: { w: 120, h: 180 },
  };
  const d = dimensions[size];

  return (
    <motion.div
      className={cn(
        "relative rounded-lg border bg-[#111] overflow-hidden transition-all duration-500",
        active ? "border-white/30" : "border-white/[0.08]",
        className
      )}
      style={{ width: d.w, height: d.h }}
    >
      {/* Header */}
      <div className="h-3 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center px-1 gap-0.5">
        <div className="h-1 w-1 rounded-full bg-white/20" />
        <div className="h-1 w-1 rounded-full bg-white/20" />
        <div className="h-1 w-1 rounded-full bg-white/20" />
      </div>

      {/* Content */}
      <div
        className="h-full bg-[#0a0a0a] transition-transform duration-300"
        style={{ transform: `translateY(-${scrollY}px)` }}
      >
        {/* Nav */}
        <div className="h-2 bg-[#111] flex items-center px-1">
          <div className="h-0.5 w-2 rounded-full bg-white/30" />
        </div>
        {/* Form input */}
        <div className="p-1.5">
          <div
            className={cn(
              "h-3 rounded bg-[#1a1a1a] border border-white/10 flex items-center px-1 transition-all",
              formValue && "border-white/30"
            )}
          >
            <span className="text-[5px] text-zinc-500 truncate">{formValue || "Type here..."}</span>
          </div>
        </div>
        {/* Button with click indicator */}
        <div className="px-1.5 relative">
          <div
            className={cn(
              "h-2.5 rounded bg-white/10 border border-white/20 flex items-center justify-center transition-all",
              showClick && "scale-95 bg-white/20"
            )}
          >
            <span className="text-[4px] text-zinc-300">Submit</span>
          </div>
          {showClick && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white/20"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </div>
        {/* Content blocks */}
        <div className="p-1.5 space-y-1">
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-4/5 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/[0.04] border border-white/[0.06]" />
          <div className="h-1.5 w-3/4 rounded bg-white/10" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-6 rounded bg-white/[0.04] border border-white/[0.06]" />
        </div>
      </div>
    </motion.div>
  );
};

export const SizzySyncDemo = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [formValue, setFormValue] = useState("");
  const [showClick, setShowClick] = useState(false);

  // Animate based on active feature
  useEffect(() => {
    const feature = syncFeatures[activeFeature];
    if (!feature) return;

    let interval: NodeJS.Timeout;

    switch (feature.id) {
      case "scroll":
        interval = setInterval(() => {
          setScrollY((prev) => (prev >= 20 ? 0 : prev + 1));
        }, 100);
        break;
      case "forms":
        const text = "hello@email.com";
        let i = 0;
        interval = setInterval(() => {
          if (i <= text.length) {
            setFormValue(text.slice(0, i));
            i++;
          } else {
            setFormValue("");
            i = 0;
          }
        }, 150);
        break;
      case "clicks":
        interval = setInterval(() => {
          setShowClick(true);
          setTimeout(() => setShowClick(false), 300);
        }, 2000);
        break;
    }

    return () => {
      clearInterval(interval);
      setScrollY(0);
      setFormValue("");
      setShowClick(false);
    };
  }, [activeFeature]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % syncFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentFeature = syncFeatures[activeFeature] ?? syncFeatures[0];
  if (!currentFeature) return null;

  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature buttons */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
                Do it once.
                <br />
                <span className="text-zinc-500">See it everywhere.</span>
              </h2>
              <p className="text-lg text-zinc-500 mb-10 leading-relaxed">
                Every interaction is synchronized across all devices in real-time.
                Test user flows without repetitive clicking.
              </p>
            </motion.div>

            <div className="space-y-2">
              {syncFeatures.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-300",
                    activeFeature === index
                      ? "bg-white/[0.06] border-white/20"
                      : "bg-transparent border-white/[0.06] hover:bg-white/[0.03] hover:border-white/10"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors shrink-0",
                        activeFeature === index
                          ? "bg-white/10 text-white"
                          : "bg-white/[0.04] text-zinc-500"
                      )}
                    >
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-medium mb-1 transition-colors",
                          activeFeature === index ? "text-white" : "text-zinc-400"
                        )}
                      >
                        {feature.name}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Device preview */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Devices */}
            <div className="relative flex items-end justify-center gap-4">
              <MiniDevice
                size="small"
                active={true}
                scrollY={scrollY}
                formValue={formValue}
                showClick={showClick}
                className="mb-8"
              />
              <MiniDevice
                size="large"
                active={true}
                scrollY={scrollY}
                formValue={formValue}
                showClick={showClick}
              />
              <MiniDevice
                size="medium"
                active={true}
                scrollY={scrollY}
                formValue={formValue}
                showClick={showClick}
                className="mb-4"
              />
              <MiniDevice
                size="small"
                active={true}
                scrollY={scrollY}
                formValue={formValue}
                showClick={showClick}
                className="mb-10"
              />
            </div>

            {/* Feature label */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/80 backdrop-blur-md">
                <currentFeature.icon className="h-4 w-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">{currentFeature.name}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
