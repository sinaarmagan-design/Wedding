import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/store";
import { isAuthorized } from "@/lib/auth";
import { seedData } from "@/data/wedding";

export async function GET() {
  const data = (await getSiteData()) ?? seedData;
  return NextResponse.json(data);
}

export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  if (!data || !data.registry || !Array.isArray(data.gifts)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await saveSiteData(data);
  } catch (err) {
    console.error("saveSiteData failed:", err);
    return NextResponse.json(
      { error: `Couldn't save — ${err?.message || "unknown error"}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
