"use client";
import { motion } from "framer-motion";
import { Smartphone, Link2, MonitorSmartphone, Users, Split } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    id: "responsive",
    title: "Testing Responsive Design",
    description:
      "View all devices at once instead of constantly switching. Compare responsive behavior across different screen sizes simultaneously.",
    icon: MonitorSmartphone,
    highlight: "See every breakpoint at a glance",
  },
  {
    id: "multi-url",
    title: "Testing Multiple URLs",
    description:
      "Test different pages of your website at once. Verify layout and shared component changes across pages with navigation sync disabled.",
    icon: Split,
    highlight: "Compare pages side by side",
  },
  {
    id: "device-sim",
    title: "Accurate Device Simulation",
    description:
      "Real device height simulation accounting for browser and OS UI. Up-to-date device list with accurate pixel ratios and user agents.",
    icon: Smartphone,
    highlight: "The closest to real simulators",
  },
  {
    id: "multi-user",
    title: "Multi-Account Testing",
    description:
      "Test pages with different user roles simultaneously. See admin, creator, user, and guest views side by side. Save session configurations as presets.",
    icon: Users,
    highlight: "No more logging in and out",
  },
  {
    id: "multi-session",
    title: "URLs + Sessions Combined",
    description:
      "Compare different URLs while logged in as different users. Test admin pages vs user pages vs guest views all at once.",
    icon: Link2,
    highlight: "The ultimate testing setup",
  },
];

export const SizzyUseCases = () => {
  const [activeCase, setActiveCase] = useState(0);

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
            Built for how you actually work
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Every feature in Sizzy was designed to solve a real problem developers face every day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-3">
          {useCases.map((useCase, index) => (
            <motion.button
              key={useCase.id}
              onClick={() => setActiveCase(index)}
              className={cn(
                "relative p-5 rounded-xl border text-left transition-all duration-300 group",
                activeCase === index
                  ? "bg-white/[0.04] border-white/20"
                  : "bg-[#111] border-white/[0.06] hover:border-white/10"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg mb-4 transition-colors",
                  activeCase === index
                    ? "bg-white/10 text-white"
                    : "bg-white/[0.06] text-zinc-500 group-hover:text-zinc-300"
                )}
              >
                <useCase.icon className="h-5 w-5" />
              </div>

              <h3
                className={cn(
                  "font-medium mb-2 transition-colors text-sm",
                  activeCase === index ? "text-white" : "text-zinc-300"
                )}
              >
                {useCase.title}
              </h3>

              <p className="text-xs text-zinc-600 leading-relaxed mb-3">{useCase.description}</p>

              <div
                className={cn(
                  "text-xs px-2 py-1 rounded-full inline-flex items-center transition-colors",
                  activeCase === index
                    ? "bg-white/10 text-zinc-300"
                    : "bg-white/[0.04] text-zinc-600"
                )}
              >
                <span>{useCase.highlight}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
