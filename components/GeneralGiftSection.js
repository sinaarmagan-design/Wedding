"use client";

import { useState } from "react";
import AmountPicker from "./AmountPicker";

const SUGGESTED_AMOUNTS = [200, 300, 400];

export default function GeneralGiftSection({ bank, currency }) {
  const [amount, setAmount] = useState("");

  return (
    <section className="mt-24 pb-8 pt-12 border-t border-[#e6ddd3] max-w-xl mx-auto">
      <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase text-[#a9705f] mb-4">
        Prefer to send a general gift?
      </p>
      <p className="font-jost text-sm md:text-base font-light text-[#6b5f53] leading-7 mb-4">
        You&apos;re welcome to send any amount directly, without tying it to a
        specific item on the list.
      </p>

      <AmountPicker
        amounts={SUGGESTED_AMOUNTS}
        value={amount}
        onChange={setAmount}
        currency={currency}
      />

      <dl className="text-xs md:text-sm font-light text-[#6b5f53] space-y-1.5">
        <div className="flex justify-between gap-3">
          <dt className="text-[#a99a89] uppercase tracking-[0.1em] text-[9px] md:text-[10px] mt-0.5">
            Account
          </dt>
          <dd className="text-right">{bank.accountName}</dd>
        </div>
        <div className="flex justify-between gap-3 items-center">
          <dt className="text-[#a99a89] uppercase tracking-[0.1em] text-[9px] md:text-[10px]">
            IBAN
          </dt>
          <dd className="text-right font-mono tracking-wide">{bank.iban}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[#a99a89] uppercase tracking-[0.1em] text-[9px] md:text-[10px] mt-0.5">
            BIC
          </dt>
          <dd className="text-right font-mono">{bank.bic}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[#a99a89] uppercase tracking-[0.1em] text-[9px] md:text-[10px] mt-0.5">
            Bank
          </dt>
          <dd className="text-right">{bank.bankName}</dd>
        </div>
      </dl>
      {bank.note && (
        <p className="text-[11px] md:text-xs font-light text-[#a99a89] leading-5 mt-4">
          {bank.note}
        </p>
      )}
    </section>
  );
}
