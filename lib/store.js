import { head, put } from "@vercel/blob";

const DATA_PATH = "wedding-data.json";

export async function getSiteData() {
  try {
    const info = await head(DATA_PATH);
    const res = await fetch(info.url, { cache: "no-store" });
    return await res.json();
  } catch {
    return null;
  }
}

export async function saveSiteData(data) {
  await put(DATA_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
