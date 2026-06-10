import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const formspreeId = process.env.FORMSPREE_ID;
    const isFormspree = !!formspreeId;
    const endpoint = isFormspree
      ? `https://formspree.io/f/${formspreeId}`
      : "https://formsubmit.co/ajax/vanshkumar.fds@gmail.com";

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

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // Ignore JSON parse errors from upstream
    }

    if (!res.ok) {
      const errorMsg = data?.error || data?.message || "Upstream service failed to send message";
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    // Handle FormSubmit silent failures where HTTP status is 200 but success is "false"
    if (!isFormspree && data && data.success === "false") {
      return NextResponse.json({ error: data.message || "FormSubmit rejected the submission" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
