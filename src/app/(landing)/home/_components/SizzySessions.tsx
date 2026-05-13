"use client";
import { motion } from "framer-motion";
import { Users, UserCircle, ShieldCheck, Eye, Settings } from "lucide-react";

const userSessions = [
  { id: "admin", name: "Admin User", role: "admin", avatar: "A" },
  { id: "creator", name: "Content Creator", role: "creator", avatar: "C" },
  { id: "user", name: "Regular User", role: "user", avatar: "U" },
  { id: "guest", name: "Guest", role: "guest", avatar: "G" },
];

const SessionCard = ({
  session,
  device,
}: {
  session: (typeof userSessions)[0];
  device: string;
}) => (
  <motion.div
    className="rounded-xl border border-white/[0.08] bg-[#111] overflow-hidden transition-all hover:border-white/20"
    whileHover={{ scale: 1.02 }}
  >
    {/* Device header */}
    <div className="h-6 bg-[#0a0a0a] border-b border-white/[0.04] flex items-center px-2 gap-1.5">
      <div className="h-2 w-2 rounded-full bg-white/20" />
      <div className="h-2 w-2 rounded-full bg-white/20" />
      <div className="h-2 w-2 rounded-full bg-white/20" />
      <span className="ml-2 text-[10px] text-zinc-600">{device}</span>
    </div>

    {/* Content */}
    <div className="p-3">
      {/* Mock app header with user */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.04]">
        <div className="h-2 w-16 rounded bg-white/10" />
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold bg-white/10 text-zinc-400">
            {session.avatar}
          </div>
          <span className="text-[9px] text-zinc-500">{session.name}</span>
        </div>
      </div>

      {/* Role-specific content */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 text-[9px] text-zinc-500">
          {session.role === "admin" && <Settings className="h-3 w-3" />}
          {session.role === "creator" && <Eye className="h-3 w-3" />}
          {session.role === "user" && <UserCircle className="h-3 w-3" />}
          {session.role === "guest" && <Eye className="h-3 w-3" />}
          <span>
            {session.role === "admin" && "Admin Panel"}
            {session.role === "creator" && "Content Editor"}
            {session.role === "user" && "Dashboard"}
            {session.role === "guest" && "Public View"}
          </span>
        </div>
        <div className="h-12 rounded bg-white/[0.04] border border-white/[0.06] p-1.5">
          <div className="h-1.5 w-12 rounded bg-white/20 mb-1" />
          <div className="h-1 w-16 rounded bg-white/10" />
        </div>
      </div>
    </div>
  </motion.div>
);

export const SizzySessions = () => {
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
            Test all user roles.
            <br />
            <span className="text-zinc-500">At the same time.</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            No more logging in and out repeatedly. Assign different user sessions to different devices
            and test your entire permission system in one view.
          </p>
        </motion.div>

        {/* Session cards grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {userSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <SessionCard
                session={session}
                device={
                  index === 0
                    ? "Desktop"
                    : index === 1
                      ? "iPad Pro"
                      : index === 2
                        ? "iPhone 15"
                        : "iPhone SE"
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid md:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            {
              icon: Users,
              title: "Multiple Accounts",
              description:
                "Log in with different user accounts on different devices. Admin on desktop, user on mobile.",
            },
            {
              icon: ShieldCheck,
              title: "Permission Testing",
              description:
                "Verify that role-based permissions work correctly. See what each user type can access.",
            },
            {
              icon: Eye,
              title: "Save as Presets",
              description:
                "Save session configurations as presets. One click to restore your entire testing environment.",
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-400 mb-4">
                <benefit.icon className="h-4 w-4" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
