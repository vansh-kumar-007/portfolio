import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const formspreeId = process.env.FORMSPREE_ID;
    const endpoint = formspreeId
      ? `https://formspree.io/f/${formspreeId}`
      : "https://formsubmit.co/vanshkumar.fds@gmail.com";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": request.headers.get("user-agent") || "Next.js API",
        Referer: request.headers.get("referer") || "https://portfolio.local",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio contact from ${name}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
