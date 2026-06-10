import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    
    const { error } = await supabase
      .from("visitors")
      .insert([{ country_code: country }]);

    if (error) {
      console.error("Supabase insert error:", error);
    }

    return NextResponse.json({ success: true, country }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error, count } = await supabase
      .from("visitors")
      .select("country_code", { count: "exact" });

    if (error) throw error;

    const counts: Record<string, number> = {};
    let total = count || 0;

    data?.forEach((row) => {
      const code = row.country_code;
      counts[code] = (counts[code] || 0) + 1;
    });

    const topCountries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([code]) => code);

    return NextResponse.json({ total, counts, topCountries }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return NextResponse.json({ total: 0, counts: {}, topCountries: [] }, { status: 500 });
  }
}
