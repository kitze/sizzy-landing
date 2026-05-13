"use client";
import { motion } from "framer-motion";
import { Move, Palette, Download, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MiniDevice = ({
  style,
}: {
  style?: React.CSSProperties;
}) => (
  <motion.div
    className="absolute rounded-lg border border-white/20 bg-[#111] overflow-hidden shadow-2xl cursor-grab"
    style={style}
    whileHover={{ scale: 1.02 }}
    drag
    dragMomentum={false}
  >
    <div className="h-2 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center px-1 gap-0.5">
      <div className="h-1 w-1 rounded-full bg-white/20" />
      <div className="h-1 w-1 rounded-full bg-white/20" />
      <div className="h-1 w-1 rounded-full bg-white/20" />
    </div>
    <div className="bg-[#0a0a0a] p-1.5 space-y-1">
      <div className="h-1.5 w-3/4 rounded bg-white/20" />
      <div className="h-1 w-1/2 rounded bg-white/10" />
      <div className="h-2 w-8 rounded bg-white/20 mt-0.5" />
      <div className="h-6 rounded bg-white/[0.04] border border-white/[0.06]" />
    </div>
  </motion.div>
);

export const SizzyPhotoStudio = () => {
  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
              Screenshots that
              <br />
              <span className="text-zinc-500">actually look good.</span>
            </h2>
            <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
              Create stunning mockups for presentations, social media, and documentation.
              Move devices freely, choose backgrounds, and export pixel-perfect images.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: Move,
                  title: "Free Canvas Positioning",
                  description: "Drag and resize devices anywhere on the canvas",
                },
                {
                  icon: Palette,
                  title: "Custom Backgrounds",
                  description: "Gradients, solid colors, or your own images",
                },
                {
                  icon: Wand2,
                  title: "Device Frames",
                  description: "Beautiful realistic frames for all devices",
                },
                {
                  icon: Download,
                  title: "Export Options",
                  description: "PNG, JPG, or record as video/GIF",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{feature.title}</h3>
                    <p className="text-sm text-zinc-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#111] overflow-hidden">
              {/* Window chrome */}
              <div className="h-8 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center justify-between px-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <span className="text-xs text-zinc-600">Photo Studio</span>
                <div className="w-16" />
              </div>

              {/* Canvas area */}
              <div className="relative h-[350px] bg-gradient-to-br from-zinc-900 to-zinc-800">
                {/* Devices on canvas */}
                <MiniDevice style={{ width: 100, height: 150, top: "15%", left: "10%" }} />
                <MiniDevice style={{ width: 140, height: 100, top: "40%", left: "35%" }} />
                <MiniDevice style={{ width: 70, height: 120, top: "20%", right: "15%" }} />

                {/* Drag hint */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                  <span className="text-xs text-zinc-500">Drag devices to reposition</span>
                </div>
              </div>

              {/* Bottom toolbar */}
              <div className="h-12 bg-[#0a0a0a] border-t border-white/[0.04] flex items-center justify-between px-4">
                <span className="text-xs text-zinc-600 uppercase tracking-wider">Background</span>
                <div className="flex gap-2">
                  {["white", "zinc-700", "zinc-900", "black"].map((color, i) => (
                    <button
                      key={color}
                      className={cn(
                        "h-6 w-6 rounded-full border transition-all",
                        i === 0 && "bg-white border-white/30",
                        i === 1 && "bg-zinc-700 border-zinc-600",
                        i === 2 && "bg-zinc-900 border-zinc-800",
                        i === 3 && "bg-black border-white/10 ring-2 ring-white/20"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
