"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error("Failed to fetch spotify data", err);
      }
    };

    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  if (!data || !data.title) {
    return null; // Don't render if there's an error or no data
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 rounded-full border border-white/10 bg-black/40 p-2 pr-6 backdrop-blur-md transition-all hover:bg-white/5 hover:border-violet-500/50"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
        {data.albumImageUrl ? (
          <motion.img
            src={data.albumImageUrl}
            alt={data.album}
            className="h-full w-full object-cover"
            animate={{ rotate: data.isPlaying ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-violet-900">
            <Music2 className="h-4 w-4 text-violet-300" />
          </div>
        )}
        <div className="absolute inset-0 rounded-full border-2 border-black/50 pointer-events-none" />
        {/* Vinyl center hole */}
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border border-white/10 pointer-events-none" />
      </div>

      <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
        <div className="flex items-center gap-2">
          {data.isPlaying && (
            <span className="flex h-3 items-end gap-0.5">
              <motion.span className="w-0.5 bg-violet-400" animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0 }} />
              <motion.span className="w-0.5 bg-violet-400" animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }} />
              <motion.span className="w-0.5 bg-violet-400" animate={{ height: ["4px", "12px", "4px"] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }} />
            </span>
          )}
          <span className="text-xs font-semibold text-violet-300">
            {data.isPlaying ? "Now Playing" : "Recently Played"}
          </span>
        </div>
        <span className="truncate text-sm font-bold text-white">{data.title}</span>
        <span className="truncate text-xs text-muted-foreground">{data.artist}</span>
      </div>
    </a>
  );
}
