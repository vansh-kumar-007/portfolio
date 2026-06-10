"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { Globe2, Users } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

// Map of ISO country codes to coordinates [latitude, longitude]
const COUNTRY_COORDS: Record<string, [number, number]> = {
  US: [37.0902, -95.7129],
  IN: [20.5937, 78.9629],
  GB: [55.3781, -3.4360],
  CA: [56.1304, -106.3468],
  AU: [-25.2744, 133.7751],
  DE: [51.1657, 10.4515],
  FR: [46.2276, 2.2137],
  JP: [36.2048, 138.2529],
  BR: [-14.2350, -51.9253],
  CN: [35.8617, 104.1954],
  RU: [61.5240, 105.3188],
  ZA: [-30.5595, 22.9375],
};

export function VisitorMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  const [stats, setStats] = useState<{ total: number, topCountries: string[], counts: Record<string, number> }>({
    total: 0,
    topCountries: [],
    counts: {}
  });

  useEffect(() => {
    // Register visit
    fetch("/api/visitors", { method: "POST" })
      .then(() => fetch("/api/visitors"))
      .then(res => res.json())
      .then(data => {
        if (data.total !== undefined) {
          setStats(data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    // Build markers from active countries
    const markers = Object.entries(stats.counts)
      .filter(([code]) => COUNTRY_COORDS[code] && code !== "Unknown")
      .map(([code, count]) => {
        const size = Math.min(0.1 + (count / Math.max(stats.total, 1)) * 0.1, 0.2); // max size 0.2
        return { location: COUNTRY_COORDS[code], size };
      });

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.1], // Dark gray matching dark mode
      markerColor: [0.54, 0.36, 0.96], // violet-500 equivalent
      glowColor: [0.1, 0.05, 0.2], // Subtle violet glow
      markers: markers,
    });

    let reqId: number;
    const render = () => {
      if (!pointerInteracting.current) {
        phi += 0.005;
      }
      globe.update({ phi: phi + pointerInteractionMovement.current });
      reqId = requestAnimationFrame(render);
    };
    reqId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(reqId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [stats]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Global Reach</h2>
        <p className="mt-4 text-muted-foreground">Live visitor map powered by Vercel Edge networking and Supabase.</p>
      </div>

      <SpotlightCard className="overflow-hidden p-0 sm:p-0">
        <div className="grid lg:grid-cols-2">
          {/* Stats Panel */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:border-r lg:border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 mb-6">
              <Users className="h-6 w-6" />
            </div>
            
            <h3 className="text-4xl font-bold mb-2">
              {stats.total > 0 ? stats.total.toLocaleString() : "..."}
            </h3>
            <p className="text-muted-foreground mb-8">Unique global visitors tracked.</p>

            {stats.topCountries.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-violet-300 mb-4">Top Regions</h4>
                <div className="flex flex-wrap gap-3">
                  {stats.topCountries.filter(c => c !== "Unknown").map(country => (
                    <div key={country} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                      <Globe2 className="h-4 w-4 text-violet-400" />
                      <span className="font-medium text-sm">{country}</span>
                      <span className="text-xs text-muted-foreground">({stats.counts[country]})</span>
                    </div>
                  ))}
                  {stats.topCountries.length === 0 || (stats.topCountries.length === 1 && stats.topCountries[0] === "Unknown") && (
                    <span className="text-sm text-muted-foreground">Waiting for traffic...</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Globe Canvas */}
          <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-black/20 lg:aspect-auto lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent pointer-events-none" />
            <canvas
              ref={canvasRef}
              className="h-full w-full max-w-[500px] max-h-[500px] cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                pointerInteracting.current = e.clientX;
                canvasRef.current!.style.cursor = 'grabbing';
              }}
              onPointerUp={() => {
                pointerInteracting.current = null;
                canvasRef.current!.style.cursor = 'grab';
              }}
              onPointerOut={() => {
                pointerInteracting.current = null;
                canvasRef.current!.style.cursor = 'grab';
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta / 200;
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta = e.touches[0].clientX - pointerInteracting.current;
                  pointerInteractionMovement.current = delta / 100;
                }
              }}
            />
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
