"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioStats } from "@/data/stats";
import { CountUp } from "@/components/reactbits/CountUp";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

export function Stats() {
  const [liveRepos, setLiveRepos] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.public_repos) setLiveRepos(d.public_repos);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="stats" className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioStats.map((stat, i) => {
            const value =
              stat.label === "GitHub Repositories" && liveRepos !== null
                ? liveRepos
                : stat.value;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <SpotlightCard className="p-8 text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    <CountUp end={value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                    {stat.label === "GitHub Repositories" && liveRepos !== null && (
                      <span className="ml-1 text-emerald-400">· live</span>
                    )}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
