"use client";
import { motion } from "framer-motion";
import { Trophy, GitCommit, Package, Rocket, Shield, Zap, RefreshCw } from "lucide-react";

const stats = [
  { label: "Commits", value: "11,519", icon: GitCommit },
  { label: "Releases", value: "738", icon: Package },
  { label: "Features", value: "100+", icon: Rocket },
];

const badges = [
  {
    icon: Trophy,
    title: "#1 Product of the Day",
    subtitle: "Product Hunt",
  },
  {
    icon: Trophy,
    title: "#1 Product of the Week",
    subtitle: "Product Hunt",
  },
  {
    icon: Trophy,
    title: "#3 Product of the Month",
    subtitle: "Product Hunt",
  },
];

const promises = [
  {
    icon: Shield,
    title: "Secure & Up to Date",
    description: "Always running the latest Electron and Chromium versions",
  },
  {
    icon: Zap,
    title: "Privacy First",
    description: "No localhost URLs stored, no history storage (even locally)",
  },
  {
    icon: RefreshCw,
    title: "Actively Maintained",
    description: "Bugs squashed and new features released almost every week",
  },
];

export const SizzySocialProof = () => {
  return (
    <section className="bg-black py-24 md:py-32 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Product Hunt badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/15 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                <badge.icon className="h-4 w-4 text-zinc-400" />
              </div>
              <div>
                <div className="font-medium text-white text-sm">{badge.title}</div>
                <div className="text-xs text-zinc-600">{badge.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex justify-center gap-12 md:gap-20 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className="h-5 w-5 text-zinc-500" />
                <span className="text-4xl md:text-5xl font-bold text-white">{stat.value}</span>
              </div>
              <div className="text-sm text-zinc-600 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Promises */}
        <motion.div
          className="grid md:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {promises.map((promise, index) => (
            <motion.div
              key={promise.title}
              className="text-center p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 mx-auto mb-4">
                <promise.icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-white mb-2">{promise.title}</h3>
              <p className="text-sm text-zinc-500">{promise.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
