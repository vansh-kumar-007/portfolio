"use client";

import { useState } from "react";
import { Mail, Link2, Code2, AtSign, Send, Download, FileText } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { Button } from "@/components/ui/Button";

const socialLinks = [
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  { icon: Link2, href: profile.links.linkedin, label: "LinkedIn" },
  { icon: Code2, href: profile.links.github, label: "GitHub" },
  { icon: AtSign, href: profile.links.twitter, label: "Twitter" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const res = await fetch("https://formsubmit.co/ajax/vanshkumar.fds@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
        _subject: `Portfolio contact from ${form.name}`,
        _captcha: "false",
      }),
    });

    const data = await res.json();

    if (res.ok && data.success === "true") {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Contact"
          title="Let's Build Something"
          description="Interested in collaborating or hiring? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <SpotlightCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-violet-500/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-violet-500/50"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-colors focus:border-violet-500/50"
                  placeholder="Tell me about the opportunity..."
                />
              </div>
              <Button type="submit" disabled={status === "loading"} className="w-full">
                <Send className="h-4 w-4" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
              {status === "success" && (
                <p className="text-center text-sm text-violet-400">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm text-red-400">
                  Something went wrong. Please email me directly at {profile.email}
                </p>
              )}
            </form>
          </SpotlightCard>

          <div className="space-y-6">
            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold">Connect</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/5 p-4 transition-colors hover:border-violet-500/30 hover:bg-white/[0.02]"
                  >
                    <link.icon className="h-5 w-5 text-violet-400" />
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">{profile.email}</p>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold">Resume</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Download my full resume or view it in browser.
              </p>
              <div className="mt-6 flex gap-3">
                <a href={profile.resumePath} download>
                  <Button variant="secondary">
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                </a>
                <a href={profile.resumePath} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <FileText className="h-4 w-4" /> View Resume
                  </Button>
                </a>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-8">
              <h3 className="text-xl font-bold">Also Find Me On</h3>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                  LeetCode
                </a>
                <span className="text-muted-foreground">·</span>
                <a href={profile.links.kaggle} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                  Kaggle
                </a>
                <span className="text-muted-foreground">·</span>
                <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                  Medium
                </a>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
