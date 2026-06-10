"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { getChatResponse, getInitialMessages } from "@/lib/chatbot";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Tell me about Vansh",
  "What projects has he built?",
  "What technologies does he know?",
  "Why should I hire him?",
];

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    const assistantMsg: Message = { role: "assistant", content: getChatResponse(text) };
    setMessages((m) => [...m, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-105",
          open && "hidden",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-violet-500/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-violet-400" />
                <div>
                  <p className="text-sm font-semibold">Portfolio AI</p>
                  <p className="text-xs text-muted-foreground">Ask about Vansh</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.role === "user"
                      ? "ml-auto bg-violet-600 text-white"
                      : "bg-white/5 text-muted-foreground whitespace-pre-line",
                  )}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground hover:border-violet-500/30 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-xl bg-white/5 px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-500/50"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
