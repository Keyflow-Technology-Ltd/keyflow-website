import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // In production, proxy to API Gateway (set WAITLIST_API_URL env var)
  const apiUrl = process.env.WAITLIST_API_URL;
  if (apiUrl) {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  // Dev mode: log and return success
  console.log("[waitlist-stub]", body);
  return NextResponse.json({ success: true });
}
