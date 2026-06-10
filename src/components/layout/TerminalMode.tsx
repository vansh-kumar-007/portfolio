"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, achievements } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

type TerminalLine = {
  id: string;
  text: string;
  isCommand: boolean;
  isError?: boolean;
};

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 15); // Slightly slower typing speed for readability
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span className="whitespace-pre-wrap">{displayed}</span>;
};

export function TerminalMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Global event listener for the backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when opened or when typing finishes
  useEffect(() => {
    if (isOpen && !isTyping) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, isTyping]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping, input]);

  // If closed, reset history
  useEffect(() => {
    if (!isOpen) {
      setHistory([]);
      setInput("");
      setIsTyping(false);
    } else {
      // Welcome message
      setHistory([
        {
          id: Date.now().toString(),
          text: `Welcome to VanshOS v1.0.0\nType 'help' to see available commands.`,
          isCommand: false,
        },
      ]);
      setIsTyping(true);
    }
  }, [isOpen]);

  const processCommand = (cmd: string) => {
    const args = cmd.trim().toLowerCase().split(/\s+/);
    const command = args[0];
    let output = "";
    let isError = false;

    switch (command) {
      case "help":
        output = `Available commands:
  whoami           - Display brief biography
  ls projects      - List all portfolio projects
  cat resume       - Show key highlights and achievements
  skills           - List all technical skills
  skills --filter= - Filter skills by keyword (e.g. skills --filter=python)
  open <id>        - Open a project's live demo link in a new tab
  clear            - Clear terminal output
  exit             - Close terminal mode`;
        break;

      case "whoami":
        output = `Name: ${profile.name}
Role: ${profile.degree} Student @ ${profile.university}
Tagline: ${profile.tagline}
Contact: ${profile.email}`;
        break;

      case "ls":
        if (args[1] === "projects") {
          output = projects
            .map((p) => `[${p.id}] ${p.title}\n    ↳ ${p.subtitle}`)
            .join("\n\n");
        } else {
          output = `ls: cannot access '${args[1] || ""}': No such file or directory. Try 'ls projects'.`;
          isError = true;
        }
        break;

      case "cat":
        if (args[1] === "resume") {
          output = `=== Vansh Kumar ===\n\nAchievements:\n` +
            achievements.map((a) => `- ${a.title}: ${a.description}`).join("\n") +
            `\n\nLinks:\n- GitHub: ${profile.links.github}\n- LinkedIn: ${profile.links.linkedin}`;
        } else {
          output = `cat: ${args[1] || ""}: No such file or directory. Try 'cat resume'.`;
          isError = true;
        }
        break;

      case "skills":
        let filter = "";
        if (args[1] && args[1].startsWith("--filter=")) {
          filter = args[1].split("=")[1];
        }
        
        let foundSkills: string[] = [];
        skillCategories.forEach(cat => {
          cat.skills.forEach(skill => {
            if (!filter || skill.name.toLowerCase().includes(filter)) {
              foundSkills.push(`- ${skill.name} (${cat.name})`);
            }
          });
        });

        if (foundSkills.length > 0) {
          output = filter ? `Skills matching '${filter}':\n` + foundSkills.join("\n") 
                          : `All Skills:\n` + foundSkills.join("\n");
        } else {
          output = `No skills found matching '${filter}'.`;
          isError = true;
        }
        break;

      case "open":
        if (!args[1]) {
          output = `open: missing operand. Try 'open cyber-arena' or 'open face-recognition'.`;
          isError = true;
        } else {
          const project = projects.find((p) => p.id === args[1]);
          if (project) {
            if (project.liveDemo || project.github) {
              const link = project.liveDemo || project.github;
              output = `Opening ${project.title} in a new tab...\nURL: ${link}`;
              setTimeout(() => window.open(link, "_blank"), 800);
            } else {
              output = `Error: No public link available for ${project.title}.`;
              isError = true;
            }
          } else {
            output = `Error: Project ID '${args[1]}' not found. Run 'ls projects' to see available IDs.`;
            isError = true;
          }
        }
        break;

      case "clear":
        // Special case handled in onSubmit
        break;

      case "exit":
        setIsOpen(false);
        break;

      case "":
        break;

      default:
        output = `command not found: ${command}\nType 'help' for a list of commands.`;
        isError = true;
    }

    return { output, isError };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTyping || !input.trim()) return;

    const cmd = input.trim();
    
    // Add command to history
    const newHistory = [...history, { id: Date.now().toString(), text: `vansh@portfolio:~$ ${cmd}`, isCommand: true }];
    setInput("");

    if (cmd.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }

    const { output, isError } = processCommand(cmd);

    if (output) {
      setIsTyping(true);
      newHistory.push({
        id: (Date.now() + 1).toString(),
        text: output,
        isCommand: false,
        isError,
      });
    }
    
    setHistory(newHistory);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-[#1e1e1e]/95 backdrop-blur-xl font-mono text-sm sm:text-base text-gray-300"
          initial={{ opacity: 0, y: "-10%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-10%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
            <div className="flex items-center gap-3">
              <TerminalIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">vansh-portfolio-terminal — bash</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 hover:bg-white/10 transition-colors"
              aria-label="Close terminal"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 pb-20 scrollbar-thin scrollbar-thumb-white/10"
          >
            {history.map((line, index) => {
              const isLastItem = index === history.length - 1;
              return (
                <div 
                  key={line.id} 
                  className={cn(
                    "mb-2", 
                    line.isCommand && "text-white",
                    line.isError && "text-red-400"
                  )}
                >
                  {/* Only typewrite the very last non-command output */}
                  {!line.isCommand && isLastItem && isTyping ? (
                    <TypewriterText text={line.text} onComplete={() => setIsTyping(false)} />
                  ) : (
                    <span className="whitespace-pre-wrap">{line.text}</span>
                  )}
                </div>
              );
            })}

            {/* Input Line */}
            {!isTyping && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-green-400 font-semibold shrink-0">vansh@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-white"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
