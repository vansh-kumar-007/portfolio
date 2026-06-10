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
  CheckCircle2
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/utils";
import { useRecruiterMode } from "@/components/context/RecruiterModeContext";

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

const topSkillsMap: Record<string, string[]> = {
  "AI Engineer": ["PyTorch", "Machine Learning", "Next.js", "FastAPI", "RAG", "Reinforcement Learning"],
  "Data Scientist": ["Python", "Pandas", "Scikit-learn", "SQL", "Data Visualization", "EDA"],
  "Full Stack": ["React", "Next.js", "Node.js", "PostgreSQL", "TailwindCSS", "AWS"],
  "Software Engineer": ["Python", "C++", "Data Structures", "System Design", "Git", "Docker"],
};

export function Skills() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];
  const Icon = iconMap[category.icon] || Brain;
  const { isRecruiterMode, targetRole } = useRecruiterMode();

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label={isRecruiterMode ? "Top Skills" : "Skills"}
          title={isRecruiterMode ? "Core Competencies" : "Skills Galaxy"}
          description={isRecruiterMode 
            ? "High-impact technologies I use to drive immediate business value." 
            : "An interactive ecosystem of technologies I use to build intelligent systems."}
        />

        {isRecruiterMode ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {(topSkillsMap[targetRole] || topSkillsMap["AI Engineer"]).map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-violet-500/20 bg-white/[0.02] p-6 shadow-[0_0_15px_rgba(139,92,246,0.05)] transition-colors hover:border-violet-500/40 hover:bg-violet-500/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20">
                  <CheckCircle2 className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{skill}</h3>
              </motion.div>
            ))}
          </div>
        ) : (
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
                        <div key={skill.name} className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-violet-500/30 hover:bg-violet-500/10">
                          <span className="font-medium transition-colors group-hover:text-violet-300">
                            {skill.name}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground group-hover:text-violet-400">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
