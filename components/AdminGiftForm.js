"use client";

import { useState } from "react";

const emptyGift = {
  title: "",
  description: "",
  category: "",
  price: "",
  raised: "",
  imageUrl: "",
  purchaseLink: "",
};

export default function AdminGiftForm({ gift, password, onSave, onCancel }) {
  const [form, setForm] = useState(gift ? { ...gift } : { ...emptyGift, id: crypto.randomUUID() });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImagePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      update("imageUrl", data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    onSave({
      ...form,
      price: Number(form.price) || 0,
      raised: Number(form.raised) || 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#e6ddd3] rounded-xl p-5 bg-white/60 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Title
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            required
          />
        </label>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Category
          <input
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            placeholder="e.g. Home, Honeymoon"
          />
        </label>
      </div>

      <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
        Description
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
          rows={2}
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Price (goal)
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
          />
        </label>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Already raised
          <input
            type="number"
            min="0"
            value={form.raised}
            onChange={(e) => update("raised", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
          />
        </label>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Purchase link
          <input
            value={form.purchaseLink}
            onChange={(e) => update("purchaseLink", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            placeholder="https://..."
          />
        </label>
      </div>

      <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
        Picture
        <input type="file" accept="image/*" onChange={handleImagePick} className="text-xs" />
      </label>
      {uploading && <p className="text-xs text-[#a9705f]">Uploading…</p>}
      {form.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={form.imageUrl}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-lg border border-[#e6ddd3]"
        />
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="text-[10px] font-light tracking-[0.15em] uppercase bg-[#2b2420] text-[#faf6f1] rounded-full px-4 py-2.5"
        >
          Save gift
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[10px] font-light tracking-[0.15em] uppercase text-[#6b5f53]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
