"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Server, RefreshCw } from "lucide-react";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

type ServiceStatus = {
  id: string;
  name: string;
  status: "online" | "offline" | "awakening" | "loading";
  latency: number | null;
};

export function LiveHealth() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { id: "cyber-arena", name: "CyberArena RL", status: "loading", latency: null },
    { id: "face-detection", name: "Face Detection", status: "loading", latency: null },
    { id: "spam-classifier", name: "Spam Classifier", status: "loading", latency: null },
  ]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHealth = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
        setLastUpdated(new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (error) {
      console.error("Failed to fetch health status", error);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]";
      case "awakening": return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.6)]";
      case "offline": return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "awakening": return "Awakening (Render Free)";
      case "offline": return "Offline";
      default: return "Checking...";
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10">
      <SpotlightCard className="p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Live API Status</h3>
              <p className="text-sm text-muted-foreground">Real-time health of deployed machine learning models</p>
            </div>
          </div>
          <button
            onClick={fetchHealth}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-violet-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{lastUpdated ? `Updated ${lastUpdated}` : "Ping APIs"}</span>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-violet-500/30 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {getStatusText(service.status)}
                    </span>
                    <span className="relative flex h-3 w-3">
                      {(service.status === "online" || service.status === "awakening") && (
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${service.status === "online" ? "bg-green-400" : "bg-yellow-400"}`}></span>
                      )}
                      <span className={`relative inline-flex h-3 w-3 rounded-full ${getStatusColor(service.status)}`}></span>
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold">{service.name}</h4>
                <div className="mt-2 text-xs text-muted-foreground min-h-[1rem]">
                  {service.status === "loading" && "Pinging server..."}
                  {service.status === "online" && service.latency && `${service.latency}ms response time`}
                  {service.status === "awakening" && "Spinning up instance (up to 50s)..."}
                  {service.status === "offline" && "Service unavailable"}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </section>
  );
}
