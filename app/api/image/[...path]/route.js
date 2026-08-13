import { get } from "@vercel/blob";

export async function GET(request, { params }) {
  const { path } = await params;
  const pathname = path.join("/");

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
