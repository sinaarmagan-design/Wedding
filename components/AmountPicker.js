"use client";

import { formatCurrency } from "@/lib/formatCurrency";

export default function AmountPicker({ amounts, value, onChange, currency }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] md:text-xs font-light text-[#a99a89] uppercase tracking-[0.1em] mb-2">
        How much would you like to give?
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {amounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => onChange(value === String(amt) ? "" : String(amt))}
            className={`text-xs md:text-sm px-3 py-1.5 rounded-full border transition-colors duration-200 ${
              value === String(amt)
                ? "border-[#a9705f] bg-[#a9705f] text-white"
                : "border-[#d9cbba] text-[#6b5f53] hover:border-[#a9705f] hover:text-[#a9705f]"
            }`}
          >
            {formatCurrency(amt, currency)}
          </button>
        ))}
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Other amount"
          className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-[#d9cbba] text-[#2b2420] w-28 bg-white focus:border-[#a9705f]"
        />
      </div>
    </div>
  );
}
