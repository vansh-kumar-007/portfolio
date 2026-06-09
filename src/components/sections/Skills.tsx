"use client";

import { useState, type ElementType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Network,
  Gamepad2,
  BarChart3,
  Server,
  Layout,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, ElementType> = {
  brain: Brain,
  network: Network,
  gamepad: Gamepad2,
  chart: BarChart3,
  server: Server,
  layout: Layout,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
};

export function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];
  const Icon = iconMap[category.icon] || Brain;

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Skills"
          title="Skills Galaxy"
          description="An interactive ecosystem of technologies I use to build intelligent systems."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col">
            {skillCategories.map((cat, i) => {
              const CatIcon = iconMap[cat.icon] || Brain;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                    active === i
                      ? "border-violet-500/50 bg-violet-500/10 text-foreground"
                      : "border-white/5 bg-white/[0.02] text-muted-foreground hover:border-white/10",
                  )}
                >
                  <CatIcon className="h-4 w-4 shrink-0" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard className="p-8">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30">
                      <Icon className="h-7 w-7 text-violet-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.skills.length} technologies
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-medium group-hover:text-violet-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
