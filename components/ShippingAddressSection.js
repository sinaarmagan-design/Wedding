"use client";

import { useState } from "react";

export default function ShippingAddressSection({ address }) {
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — guest can still select the address text manually
    }
  }

  return (
    <section className="mt-24 pb-8 pt-12 border-t border-[#e6ddd3] max-w-xl mx-auto">
      <p className="text-xs md:text-sm font-light tracking-[0.2em] uppercase text-[#a9705f] mb-4">
        Buying a gift directly?
      </p>
      <p className="font-jost text-sm md:text-base font-light text-[#6b5f53] leading-7 mb-4">
        If you&apos;d rather purchase a gift yourselves and have it shipped, here&apos;s
        the address to use at checkout:
      </p>
      <p className="text-sm md:text-base text-[#2b2420] leading-7 mb-3">{address}</p>
      <button
        onClick={copyAddress}
        className="text-[10px] md:text-xs font-light tracking-[0.15em] uppercase text-[#2b2420] underline underline-offset-4 decoration-[#d9cbba] hover:decoration-[#2b2420] transition-colors duration-200"
      >
        {copied ? "Copied" : "Copy address"}
      </button>
    </section>
  );
}
