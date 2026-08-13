import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthorized } from "@/lib/auth";

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, "-");
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type?.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  try {
    const pathname = `gift-images/${Date.now()}-${sanitizeFilename(file.name)}`;
    await put(pathname, file, { access: "private" });
    return NextResponse.json({ path: pathname });
  } catch (err) {
    console.error("upload failed:", err);
    return NextResponse.json(
      { error: `Couldn't upload — ${err?.message || "unknown error"}` },
      { status: 500 }
    );
  }
}
