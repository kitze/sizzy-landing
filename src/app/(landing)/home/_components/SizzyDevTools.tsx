"use client";
import { motion } from "framer-motion";
import { Terminal, Bug, Network, Wifi } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const debugTools = [
  {
    id: "console",
    name: "Unified Console",
    icon: Terminal,
    description: "Logs from all devices in one place with smart filtering",
    preview: (
      <div className="space-y-1 font-mono text-[10px]">
        <div className="flex gap-2">
          <span className="text-zinc-500">[iPhone]</span>
          <span className="text-zinc-400">Component mounted</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-500">[iPad]</span>
          <span className="text-zinc-400">Fetching data...</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-500">[Desktop]</span>
          <span className="text-zinc-300">Success: 200 OK</span>
        </div>
        <div className="flex gap-2">
          <span className="text-zinc-500">[Pixel]</span>
          <span className="text-zinc-400">Warning: Deprecated API</span>
        </div>
      </div>
    ),
  },
  {
    id: "styles",
    name: "Debug Styles",
    icon: Bug,
    description: "console.log for CSS - visualize elements with class names",
    preview: (
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/10 border border-white/20 flex items-center px-1">
          <span className="text-[8px] text-zinc-400">.container</span>
        </div>
        <div className="h-4 w-3/4 rounded bg-white/10 border border-white/20 flex items-center px-1">
          <span className="text-[8px] text-zinc-400">.header</span>
        </div>
        <div className="h-4 w-1/2 rounded bg-white/10 border border-white/20 flex items-center px-1">
          <span className="text-[8px] text-zinc-400">.content</span>
        </div>
      </div>
    ),
  },
  {
    id: "api",
    name: "API Inspector",
    icon: Network,
    description: "Monitor REST, GraphQL, and form requests in real-time",
    preview: (
      <div className="space-y-1.5">
        <div className="flex items-center gap-1 text-[9px]">
          <span className="px-1 py-0.5 rounded bg-white/10 text-zinc-400">GET</span>
          <span className="text-zinc-500 truncate">/api/users</span>
          <span className="text-zinc-300 ml-auto">200</span>
        </div>
        <div className="flex items-center gap-1 text-[9px]">
          <span className="px-1 py-0.5 rounded bg-white/10 text-zinc-400">POST</span>
          <span className="text-zinc-500 truncate">/api/auth</span>
          <span className="text-zinc-300 ml-auto">201</span>
        </div>
        <div className="flex items-center gap-1 text-[9px]">
          <span className="px-1 py-0.5 rounded bg-white/10 text-zinc-400">GQL</span>
          <span className="text-zinc-500 truncate">getUser</span>
          <span className="text-zinc-400 ml-auto">304</span>
        </div>
      </div>
    ),
  },
  {
    id: "network",
    name: "Network Simulation",
    icon: Wifi,
    description: "Test on slow 3G, flaky WiFi, or offline mode",
    preview: (
      <div className="space-y-2">
        {["4G Fast", "3G Slow", "Offline"].map((speed, i) => (
          <div key={speed} className="flex items-center gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                i === 0 && "bg-white",
                i === 1 && "bg-white/50",
                i === 2 && "bg-white/20"
              )}
            />
            <span className="text-[10px] text-zinc-500">{speed}</span>
            <div className="flex-1 h-1 rounded bg-white/10">
              <div
                className={cn(
                  "h-full rounded bg-white",
                  i === 0 && "w-full opacity-100",
                  i === 1 && "w-1/2 opacity-50",
                  i === 2 && "w-0"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export const SizzyDevTools = () => {
  const [activeTool, setActiveTool] = useState(0);

  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Preview */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#111] overflow-hidden">
              {/* Window chrome */}
              <div className="h-8 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center px-3 gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-zinc-600">Sizzy DevTools</span>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/[0.04]">
                {debugTools.map((tool, index) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(index)}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-xs transition-colors",
                      activeTool === index
                        ? "text-white border-b border-white"
                        : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    <tool.icon className="h-3 w-3" />
                    {tool.name}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 min-h-[200px]">
                <motion.div
                  key={activeTool}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {debugTools[activeTool]?.preview}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 text-white">
              Debug CSS
              <br />
              <span className="text-zinc-500">like never before.</span>
            </h2>
            <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
              Debugging responsive layouts is easier with tools built specifically
              for visual debugging. No more shipping debug code to production.
            </p>

            <div className="space-y-3">
              {debugTools.map((tool, index) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all duration-300",
                    activeTool === index
                      ? "bg-white/[0.06] border-white/20"
                      : "bg-transparent border-white/[0.06] hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                        activeTool === index
                          ? "bg-white/10 text-white"
                          : "bg-white/[0.04] text-zinc-500"
                      )}
                    >
                      <tool.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-medium transition-colors",
                          activeTool === index ? "text-white" : "text-zinc-400"
                        )}
                      >
                        {tool.name}
                      </h3>
                      <p className="text-sm text-zinc-600">{tool.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
