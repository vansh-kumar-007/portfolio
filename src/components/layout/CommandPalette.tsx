"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Search,
  FolderKanban,
  User,
  Mail,
  Code2,
  FileText,
  Moon,
  Sun,
  Brain,
  FlaskConical,
} from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [toggle]);

  const navigate = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full border border-white/10 bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-violet-500/30 hover:text-foreground md:flex"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
        <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[150]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-[20%] w-full max-w-lg -translate-x-1/2 px-4">
            <Command className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Command.Input
                  placeholder="Search sections, projects, actions..."
                  className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs text-muted-foreground">
                  <Command.Item
                    onSelect={() => navigate("#about")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <User className="h-4 w-4" /> About
                  </Command.Item>
                  <Command.Item
                    onSelect={() => navigate("#skills")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <Brain className="h-4 w-4" /> Skills
                  </Command.Item>
                  <Command.Item
                    onSelect={() => navigate("#projects")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <FolderKanban className="h-4 w-4" /> Projects
                  </Command.Item>
                  <Command.Item
                    onSelect={() => navigate("#ai-lab")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <FlaskConical className="h-4 w-4" /> AI Lab
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Projects" className="px-2 py-1.5 text-xs text-muted-foreground">
                  {projects.slice(0, 6).map((p) => (
                    <Command.Item
                      key={p.id}
                      onSelect={() => {
                        setOpen(false);
                        window.open(p.github, "_blank");
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                    >
                      <Code2 className="h-4 w-4" /> {p.title}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="px-2 py-1.5 text-xs text-muted-foreground">
                  <Command.Item
                    onSelect={() => {
                      setOpen(false);
                      window.open(profile.resumePath, "_blank");
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <FileText className="h-4 w-4" /> Download Resume
                  </Command.Item>
                  <Command.Item
                    onSelect={() => navigate("#contact")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    <Mail className="h-4 w-4" /> Contact
                  </Command.Item>
                  <Command.Item
                    onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm aria-selected:bg-violet-500/20"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    Toggle Theme
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
