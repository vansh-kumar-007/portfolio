import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APIs = [
  { id: "cyber-arena", name: "CyberArena RL", url: "https://cyberarena-api.onrender.com/" },
  { id: "face-detection", name: "Face Detection", url: "https://face-detection-app-wgm4.onrender.com/" },
  { id: "spam-classifier", name: "Spam Classifier", url: "https://spam-classifier-ps0y.onrender.com/" },
];

async function checkHealth(api: { id: string, name: string, url: string }) {
  const controller = new AbortController();
  // 4 second timeout
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  
  const startTime = Date.now();
  try {
    const res = await fetch(api.url, { 
      signal: controller.signal,
      method: "GET",
      headers: { "User-Agent": "PortfolioHealthChecker/1.0" }
    });
    
    clearTimeout(timeoutId);
    
    // As long as the server responds (even 404), it's online
    // If it's a 5xx error, it might be offline/broken, but we'll consider it online if it responds at all, 
    // or we can be strict and require 200-404.
    if (res.status >= 200 && res.status < 500) {
      return { id: api.id, name: api.name, status: "online", latency: Date.now() - startTime };
    } else {
      return { id: api.id, name: api.name, status: "offline", latency: null };
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      return { id: api.id, name: api.name, status: "awakening", latency: null };
    }
    return { id: api.id, name: api.name, status: "offline", latency: null };
  }
}

export async function GET() {
  const results = await Promise.all(APIs.map(checkHealth));
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    services: results
  }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    }
  });
}
