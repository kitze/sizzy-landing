"use client";
import { motion } from "framer-motion";
import { Smartphone, Tablet, Monitor, Maximize2, Grid3X3, Layers } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const devices = [
  { id: "iphone-15-pro", name: "iPhone 15 Pro", width: 393, height: 852, type: "phone" },
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667, type: "phone" },
  { id: "pixel-8", name: "Pixel 8", width: 412, height: 915, type: "phone" },
  { id: "ipad-pro", name: "iPad Pro 12.9\"", width: 1024, height: 1366, type: "tablet" },
  { id: "ipad-mini", name: "iPad Mini", width: 768, height: 1024, type: "tablet" },
  { id: "macbook-pro", name: "MacBook Pro 14\"", width: 1512, height: 982, type: "desktop" },
  { id: "imac-24", name: "iMac 24\"", width: 1920, height: 1080, type: "desktop" },
  { id: "surface-pro", name: "Surface Pro", width: 1368, height: 912, type: "tablet" },
];

const layoutModes = [
  { id: "responsive", name: "Responsive", icon: Grid3X3 },
  { id: "focus", name: "Focus", icon: Maximize2 },
  { id: "float", name: "Float", icon: Layers },
];

const DeviceIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "phone":
      return <Smartphone className="h-3 w-3" />;
    case "tablet":
      return <Tablet className="h-3 w-3" />;
    default:
      return <Monitor className="h-3 w-3" />;
  }
};

export const SizzyDevicePreview = () => {
  const [selectedLayout, setSelectedLayout] = useState("responsive");
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
            Every device.
            <br />
            <span className="text-zinc-500">Every screen size.</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Test your responsive designs on real device dimensions with accurate pixel ratios,
            user agents, and device frames.
          </p>
        </motion.div>

        {/* Layout mode selector */}
        <motion.div
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {layoutModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedLayout(mode.id)}
              className={cn(
                "group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                selectedLayout === mode.id
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-white/[0.08] text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
              )}
            >
              <mode.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{mode.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Device grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              className={cn(
                "relative p-4 rounded-xl border bg-white/[0.02] transition-all duration-300 cursor-pointer",
                hoveredDevice === device.id
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/[0.06] hover:border-white/10"
              )}
              onMouseEnter={() => setHoveredDevice(device.id)}
              onMouseLeave={() => setHoveredDevice(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.03 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md transition-colors",
                    hoveredDevice === device.id
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.06] text-zinc-500"
                  )}
                >
                  <DeviceIcon type={device.type} />
                </div>
                <span className="text-sm font-medium text-zinc-300">{device.name}</span>
              </div>
              <div className="text-xs text-zinc-600">
                {device.width} × {device.height}
              </div>

              {/* Mini device preview */}
              <div className="mt-3 flex justify-center">
                <div
                  className={cn(
                    "rounded border border-white/[0.08] bg-[#111] transition-colors",
                    hoveredDevice === device.id && "border-white/20"
                  )}
                  style={{
                    width: Math.min(device.width / 15, 80),
                    height: Math.min(device.height / 15, 60),
                    maxWidth: "100%",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            {
              title: "Real Device Heights",
              description:
                "Accounts for browser UI and OS UI - see exactly what users see on actual devices.",
            },
            {
              title: "Accurate Device Frames",
              description:
                "Beautiful device frames for most popular devices. Perfect for presentations and screenshots.",
            },
            {
              title: "Always Up-to-Date",
              description:
                "Device list updated with every release. New iPhones, Pixels, and more added within weeks.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <h3 className="text-base font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
