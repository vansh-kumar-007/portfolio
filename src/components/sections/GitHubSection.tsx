"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Star, GitFork, ExternalLink, RefreshCw } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { cn } from "@/lib/utils";

type ContributionDay = { date: string; count: number; level: number };

type GitHubData = {
  public_repos: number;
  followers: number;
  following: number;
  total_contributions: number;
  contributions: ContributionDay[];
  avatar_url: string;
  fetched_at: string;
  repos: {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
  }[];
  languages: { name: string; count: number; color: string }[];
};

const levelColors = [
  "rgba(255,255,255,0.05)",
  "rgba(139,92,246,0.25)",
  "rgba(139,92,246,0.45)",
  "rgba(139,92,246,0.7)",
  "rgba(139,92,246,1)",
];

export function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGitHub = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/github", { cache: "no-store" });
      const json = await res.json();
      if (res.ok) setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHub();
    const interval = setInterval(() => fetchGitHub(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchGitHub]);

  return (
    <section id="github" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="GitHub"
          title="GitHub Intelligence"
          description="Live data from my open-source work and contributions — refreshes automatically."
        />

        {loading ? (
          <div className="grid gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : data ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(data.fetched_at).toLocaleString()}
              </p>
              <button
                onClick={() => fetchGitHub(true)}
                disabled={refreshing}
                className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-emerald-500/30 hover:text-foreground disabled:opacity-50"
              >
                <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
                Refresh
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Public Repos", value: data.public_repos },
                { label: "Contributions (1yr)", value: data.total_contributions },
                { label: "Followers", value: data.followers },
                { label: "Following", value: data.following },
              ].map((s) => (
                <SpotlightCard key={s.label} className="p-6 text-center">
                  <p className="text-3xl font-bold text-emerald-300">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </SpotlightCard>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <SpotlightCard className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <Code2 className="h-5 w-5" /> Repository Highlights
                </h3>
                <div className="space-y-3">
                  {data.repos.slice(0, 6).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between rounded-lg border border-white/5 p-4 transition-colors hover:border-emerald-500/30 hover:bg-white/[0.02]"
                    >
                      <div>
                        <p className="font-medium group-hover:text-emerald-300 transition-colors">
                          {repo.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          {repo.description || "No description"}
                        </p>
                        {repo.language && (
                          <span className="mt-2 inline-block text-xs text-muted-foreground">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" /> {repo.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <h3 className="mb-4 font-semibold">Language Breakdown</h3>
                <div className="space-y-3">
                  {data.languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">{lang.count} repos</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(lang.count / data.public_repos) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
                >
                  View full profile <ExternalLink className="h-4 w-4" />
                </a>
              </SpotlightCard>
            </div>

            {data.contributions.length > 0 && (
              <SpotlightCard className="p-6">
                <h3 className="mb-4 font-semibold">Contribution Activity (Last Year)</h3>
                <div className="overflow-x-auto">
                  <div
                    className="inline-grid gap-1"
                    style={{
                      gridTemplateRows: "repeat(7, 12px)",
                      gridAutoFlow: "column",
                    }}
                  >
                    {data.contributions.map((day) => (
                      <div
                        key={day.date}
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: levelColors[day.level] ?? levelColors[0] }}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {data.total_contributions} contributions in the last year — sourced live from GitHub.
                </p>
              </SpotlightCard>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Unable to load GitHub data.</p>
        )}
      </div>
    </section>
  );
}
