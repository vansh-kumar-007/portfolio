"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/reactbits/TiltCard";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/data/projects";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const openProject = (p: Project) => {
    setSelected(p);
    setImgIndex(0);
  };

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Projects"
          title="Project Showcase"
          description="Production-grade AI systems — each built end-to-end with live demos and deployed infrastructure."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard>
                <SpotlightCard
                  className="cursor-pointer"
                  onClick={() => openProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.subtitle}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="rounded-lg bg-white/5 p-2 text-center">
                          <p className="text-lg font-bold text-emerald-300">{m.value}</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-card shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {selected.screenshots.length > 0 && (
                <div className="relative h-64 bg-black/20 sm:h-80">
                  <Image
                    src={selected.screenshots[imgIndex]}
                    alt={selected.title}
                    fill
                    className="object-contain"
                  />
                  {selected.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setImgIndex((i) => (i - 1 + selected.screenshots.length) % selected.screenshots.length)
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setImgIndex((i) => (i + 1) % selected.screenshots.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="p-8">
                <span className="text-sm text-emerald-400">{selected.category}</span>
                <h2 className="mt-2 text-3xl font-bold">{selected.title}</h2>
                <p className="mt-2 text-muted-foreground">{selected.subtitle}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {selected.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/5 p-3 text-center">
                      <p className="text-xl font-bold text-cyan-400">{m.value}</p>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <div>
                    <h4 className="font-semibold text-emerald-300">Problem</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{selected.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-300">Solution</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{selected.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-300">Architecture</h4>
                    <p className="mt-1 rounded-lg bg-white/5 p-3 font-mono text-xs text-muted-foreground">
                      {selected.architecture}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Results</h4>
                    <ul className="mt-2 space-y-1">
                      {selected.results.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-emerald-400">✓</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.techStack.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {selected.kaggle ? (
                    <a href={selected.kaggle} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary">Kaggle Dataset</Button>
                    </a>
                  ) : (
                    <a href={selected.github} target="_blank" rel="noopener noreferrer">
                      <Button variant="secondary">
                        <Code2 className="h-4 w-4" /> GitHub
                      </Button>
                    </a>
                  )}
                  {selected.liveDemo && (
                    <a href={selected.liveDemo} target="_blank" rel="noopener noreferrer">
                      <Button>
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </Button>
                    </a>
                  )}
                  {selected.apiDocs && (
                    <a href={selected.apiDocs} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">API Docs</Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
