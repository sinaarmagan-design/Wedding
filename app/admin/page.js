"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatCurrency";
import AdminGiftForm from "@/components/AdminGiftForm";

const CURRENCIES = ["EUR", "USD", "GBP", "TRY"];

export default function AdminPage() {
  const [password, setPassword] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("wedding-admin-password") || "" : ""
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  function unlock(e) {
    e.preventDefault();
    setPassword(passwordInput);
    sessionStorage.setItem("wedding-admin-password", passwordInput);
  }

  function updateRegistry(field, value) {
    setData((d) => ({ ...d, registry: { ...d.registry, [field]: value } }));
  }

  function updateBank(field, value) {
    setData((d) => ({ ...d, registry: { ...d.registry, bank: { ...d.registry.bank, [field]: value } } }));
  }

  function saveGift(gift) {
    setData((d) => {
      const exists = d.gifts.some((g) => g.id === gift.id);
      const gifts = exists
        ? d.gifts.map((g) => (g.id === gift.id ? gift : g))
        : [...d.gifts, gift];
      return { ...d, gifts };
    });
    setEditingId(null);
    setAdding(false);
  }

  function deleteGift(id) {
    if (!confirm("Delete this gift?")) return;
    setData((d) => ({ ...d, gifts: d.gifts.filter((g) => g.id !== id) }));
  }

  async function handleSaveAll() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        sessionStorage.removeItem("wedding-admin-password");
        setPassword("");
        setStatus({ type: "error", message: "Incorrect password — please unlock again." });
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      setStatus({ type: "success", message: "Saved." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong saving. Try again." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="max-w-md mx-auto px-6 py-24 text-sm text-[#6b5f53]">Loading…</p>;
  }

  if (!password) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="font-cormorant text-2xl text-[#2b2420] mb-6">Admin</h1>
        <form onSubmit={unlock} className="flex flex-col gap-3">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Password"
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            autoFocus
          />
          <button
            type="submit"
            className="text-[10px] font-light tracking-[0.15em] uppercase bg-[#2b2420] text-[#faf6f1] rounded-full px-4 py-2.5"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  const { registry, gifts } = data;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-cormorant text-3xl text-[#2b2420]">Admin</h1>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="text-[10px] font-light tracking-[0.15em] uppercase bg-[#a9705f] text-white rounded-full px-5 py-2.5 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {status && (
        <p className={`text-xs mb-6 ${status.type === "error" ? "text-red-600" : "text-[#a9705f]"}`}>
          {status.message}
        </p>
      )}

      {/* Registry */}
      <section className="mb-14 space-y-4">
        <h2 className="text-xs font-light tracking-[0.2em] uppercase text-[#a9705f]">
          Registry details
        </h2>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Couple names
          <input
            value={registry.coupleNames}
            onChange={(e) => updateRegistry("coupleNames", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            Wedding date
            <input
              type="date"
              value={registry.weddingDate}
              onChange={(e) => updateRegistry("weddingDate", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            />
          </label>
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            Currency
            <select
              value={registry.currency}
              onChange={(e) => updateRegistry("currency", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Message
          <textarea
            value={registry.message}
            onChange={(e) => updateRegistry("message", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            rows={3}
          />
        </label>
      </section>

      {/* Bank */}
      <section className="mb-14 space-y-4">
        <h2 className="text-xs font-light tracking-[0.2em] uppercase text-[#a9705f]">
          Bank details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            Account name
            <input
              value={registry.bank.accountName}
              onChange={(e) => updateBank("accountName", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            />
          </label>
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            IBAN
            <input
              value={registry.bank.iban}
              onChange={(e) => updateBank("iban", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white font-mono"
            />
          </label>
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            BIC / SWIFT
            <input
              value={registry.bank.bic}
              onChange={(e) => updateBank("bic", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white font-mono"
            />
          </label>
          <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
            Bank name
            <input
              value={registry.bank.bankName}
              onChange={(e) => updateBank("bankName", e.target.value)}
              className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            />
          </label>
        </div>
        <label className="text-xs font-light text-[#6b5f53] flex flex-col gap-1.5">
          Note to guests
          <textarea
            value={registry.bank.note}
            onChange={(e) => updateBank("note", e.target.value)}
            className="border border-[#d9cbba] rounded-lg px-3 py-2 text-sm bg-white"
            rows={2}
          />
        </label>
      </section>

      {/* Gifts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-light tracking-[0.2em] uppercase text-[#a9705f]">
            Gifts
          </h2>
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="text-[10px] font-light tracking-[0.15em] uppercase text-[#2b2420] underline underline-offset-4"
            >
              + Add gift
            </button>
          )}
        </div>

        {adding && (
          <AdminGiftForm password={password} onSave={saveGift} onCancel={() => setAdding(false)} />
        )}

        {gifts.length === 0 && !adding && (
          <p className="text-sm font-light text-[#a99a89] py-8 text-center">No gifts yet.</p>
        )}

        {gifts.map((gift) =>
          editingId === gift.id ? (
            <AdminGiftForm
              key={gift.id}
              gift={gift}
              password={password}
              onSave={saveGift}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={gift.id}
              className="flex items-center gap-4 border border-[#e6ddd3] rounded-xl p-4 bg-white/60"
            >
              {gift.imagePath ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/image/${gift.imagePath}`}
                  alt={gift.title}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-[#f1e9df] shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#2b2420] truncate">{gift.title}</p>
                <p className="text-xs text-[#a99a89]">
                  {formatCurrency(gift.raised || 0, registry.currency)} of{" "}
                  {formatCurrency(gift.price || 0, registry.currency)}
                </p>
              </div>
              <button
                onClick={() => setEditingId(gift.id)}
                className="text-[10px] font-light tracking-[0.15em] uppercase text-[#2b2420] underline underline-offset-4"
              >
                Edit
              </button>
              <button
                onClick={() => deleteGift(gift.id)}
                className="text-[10px] font-light tracking-[0.15em] uppercase text-red-600 underline underline-offset-4"
              >
                Delete
              </button>
            </div>
          )
        )}
      </section>

      <div className="mt-14 pt-8 border-t border-[#e6ddd3]">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="text-[10px] font-light tracking-[0.15em] uppercase bg-[#a9705f] text-white rounded-full px-5 py-2.5 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
