import { NextResponse } from "next/server";

const USERNAME = "vansh-kumar-007";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const langColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export async function GET() {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "vansh-kumar-portfolio",
    };

    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, cache: "no-store" }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`, {
        cache: "no-store",
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    let contributions: ContributionDay[] = [];
    let totalContributions = 0;

    if (contribRes.ok) {
      const contribData = await contribRes.json();
      contributions = contribData.contributions ?? [];
      totalContributions = contributions.reduce(
        (sum: number, d: ContributionDay) => sum + d.count,
        0,
      );
    }

    const langCounts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }

    const languages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        count,
        color: langColors[name] || "#8b5cf6",
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      avatar_url: user.avatar_url,
      total_contributions: totalContributions,
      contributions,
      repos: repos
        .filter((r: { fork: boolean }) => !r.fork)
        .sort(
          (a: { stargazers_count: number; updated_at: string }, b: { stargazers_count: number; updated_at: string }) =>
            b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at),
        )
        .slice(0, 10)
        .map(
          (r: {
            name: string;
            html_url: string;
            description: string | null;
            language: string | null;
            stargazers_count: number;
            forks_count: number;
            updated_at: string;
          }) => ({
            name: r.name,
            html_url: r.html_url,
            description: r.description,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            updated_at: r.updated_at,
          }),
        ),
      languages,
      fetched_at: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
