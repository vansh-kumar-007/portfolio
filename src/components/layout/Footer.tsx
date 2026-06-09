import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Framer Motion & ReactBits.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href={profile.links.github} className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={profile.links.linkedin} className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
