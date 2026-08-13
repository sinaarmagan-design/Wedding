import { get, put } from "@vercel/blob";

const DATA_PATH = "wedding-data.json";

export async function getSiteData() {
  try {
    const result = await get(DATA_PATH, { access: "private" });
    if (!result || result.statusCode !== 200) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function saveSiteData(data) {
  await put(DATA_PATH, JSON.stringify(data, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
