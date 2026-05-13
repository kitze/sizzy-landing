"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Twitter, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KitzeApp {
  name: string;
  tagline: string;
  description: string;
  url: string;
  featured?: boolean;
}

interface ProjectApiResponse {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  status: string;
  statusLabel: string;
  externalUrl?: string;
  category: string;
}

const PROJECTS_API_URL = "https://kitze.io/api/projects?apps=true";

const defaultApps: KitzeApp[] = [
  {
    name: "Sizzy",
    tagline: "The browser for developers",
    description: "Build responsive apps 5x faster with synchronized viewports.",
    url: "https://sizzy.co",
    featured: true,
  },
  {
    name: "Zero to Shipped",
    tagline: "Ship products, not side projects",
    description: "The ultimate Next.js boilerplate for building and launching real products.",
    url: "https://zerotoshipped.com",
    featured: true,
  },
  {
    name: "Benji",
    tagline: "Your life OS",
    description: "The companion app that keeps every area of your world in sync.",
    url: "https://benji.so",
    featured: true,
  },
  {
    name: "Tubely",
    tagline: "YouTube Studio for Mac",
    description: "Manage multiple YouTube channels in one native app.",
    url: "https://tubely.cc",
    featured: false,
  },
  {
    name: "JustWrite",
    tagline: "Distraction-free writing",
    description: "A minimal writing app that helps you focus on what matters.",
    url: "https://justwrite.ink",
    featured: false,
  },
  {
    name: "DMX",
    tagline: "Mindful Twitter/X",
    description: "The intentional X client for macOS. Reclaim your attention span.",
    url: "https://dmx.to",
    featured: false,
  },
  {
    name: "Passlock",
    tagline: "Password manager with willpower",
    description: "Lock passwords with time delays, word challenges, or hand the keys to someone you trust.",
    url: "https://passlock.to",
    featured: false,
  },
  {
    name: "Sotto",
    tagline: "Voice-to-text for macOS",
    description: "Speak naturally. Type instantly. 100% local & private.",
    url: "https://sotto.so",
    featured: false,
  },
  {
    name: "Glink",
    tagline: "Changelogs that slap",
    description: "Beautiful changelogs and roadmaps for your product.",
    url: "https://glink.so",
    featured: false,
  },
  {
    name: "JoinRepo",
    tagline: "GitHub access control",
    description: "Monetize your GitHub repositories with ease.",
    url: "https://joinrepo.com",
    featured: false,
  },
  {
    name: "ReleaseFlow",
    tagline: "Sparkle auto-updates made easy",
    description: "Manage Sparkle appcast feeds and update hosting for macOS apps.",
    url: "https://releaseflow.net",
    featured: false,
  },
];

const socials = [
  { name: "Twitter", url: "https://x.com/thekitze", icon: Twitter },
  { name: "GitHub", url: "https://github.com/kitze", icon: Github },
  { name: "YouTube", url: "https://youtube.com/@thekitze", icon: Youtube },
];

export interface MadeByKitzeProps {
  /** App name to exclude from the list (typically the current app) */
  excludeApp?: string;
  /** Custom apps list (overrides default) */
  apps?: KitzeApp[];
  /** Additional className */
  className?: string;
  /** Profile image URL */
  profileImage?: string;
  /** Show "View all projects" link */
  showViewAll?: boolean;
}

export const MadeByKitze = ({
  excludeApp,
  apps,
  className,
  profileImage = "https://www.kitze.io/avatar.jpg",
  showViewAll = true,
}: MadeByKitzeProps) => {
  const [fetchedApps, setFetchedApps] = useState<KitzeApp[]>(defaultApps);

  useEffect(() => {
    // If custom apps provided, don't fetch
    if (apps) return;

    fetch(PROJECTS_API_URL)
      .then((res) => res.json())
      .then((data: ProjectApiResponse[]) => {
        const mapped = data.map((p) => ({
          name: p.title,
          tagline: p.subtitle,
          description: p.summary,
          url: p.externalUrl || `https://kitze.io/projects/${p.slug}`,
          featured: true,
        }));
        if (mapped.length > 0) {
          setFetchedApps(mapped);
        }
      })
      .catch(() => {
        // Keep default apps on error
      });
  }, [apps]);

  const appsToUse = apps || fetchedApps;
  const filteredApps = excludeApp
    ? appsToUse.filter((app) => app.name.toLowerCase() !== excludeApp.toLowerCase())
    : appsToUse;

  return (
    <section className={cn("bg-black py-24 md:py-32 border-t border-white/5", className)}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex items-center gap-6 mb-16">
          <img
            src={profileImage}
            alt="Kitze"
            className="w-20 h-20 rounded-full border border-white/10"
          />
          <div>
            <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
              From the maker
            </div>
            <a
              href="https://kitze.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
                More by Kitze
              </h2>
            </a>

            <div className="flex items-center gap-1">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app, index) => (
            <motion.a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col p-6 rounded-xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-white/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {app.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
              </div>

              <p className="text-sm font-medium text-zinc-400 mb-2 group-hover:text-zinc-300 transition-colors">
                {app.tagline}
              </p>

              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                {app.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Footer Link */}
        {showViewAll && (
          <div className="mt-16 text-center">
            <a
              href="https://kitze.io/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              View all projects <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
