import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).email !== "string" ||
    !EMAIL_RE.test((body as Record<string, unknown>).email as string)
  ) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const safeBody = { email: (body as Record<string, unknown>).email as string };

  // In production, proxy to API Gateway (set WAITLIST_API_URL env var)
  const apiUrl = process.env.WAITLIST_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeBody),
      });
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ error: "Service unavailable" }, { status: 502 });
    }
  }

  // Dev mode: log and return success
  console.log("[waitlist-stub]", safeBody);
  return NextResponse.json({ success: true });
}
