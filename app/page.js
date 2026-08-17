import { getSiteData } from "@/lib/store";
import { seedData } from "@/data/wedding";
import { formatCurrency } from "@/lib/formatCurrency";
import GiftList from "@/components/GiftList";
import GeneralGiftSection from "@/components/GeneralGiftSection";

export const dynamic = "force-dynamic";

export default async function WeddingPage() {
  const { registry, gifts } = (await getSiteData()) ?? seedData;

  const totalGoal = gifts.reduce((sum, g) => sum + g.price, 0);
  const totalRaised = gifts.reduce((sum, g) => sum + (g.raised ?? 0), 0);
  const totalPct = totalGoal > 0 ? Math.min(100, Math.round((totalRaised / totalGoal) * 100)) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Intro */}
      <div className="max-w-xl mx-auto text-center mb-16">
        <p className="text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-[#a9705f] mb-4">
          {new Date(registry.weddingDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-semibold text-[#2b2420] tracking-tight mb-6">
          {registry.coupleNames}
        </h1>
        <p className="font-jost text-base md:text-xl font-medium text-[#4a4038] leading-8">
          {registry.message}
        </p>
      </div>

      {/* Overall progress */}
      {gifts.length > 0 && (
        <div className="max-w-xl mx-auto mb-16 pb-16 border-b border-[#e6ddd3]">
          <div className="h-1 bg-[#e6ddd3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#a9705f] transition-all duration-500"
              style={{ width: `${totalPct}%` }}
            />
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <p className="text-xs md:text-sm font-light text-[#6b5f53]">
              {formatCurrency(totalRaised, registry.currency)} raised of{" "}
              {formatCurrency(totalGoal, registry.currency)}
            </p>
            <p className="text-xs md:text-sm font-light text-[#a99a89]">{totalPct}%</p>
          </div>
        </div>
      )}

      {/* Gift list */}
      {gifts.length === 0 ? (
        <p className="text-sm md:text-base font-light text-[#a99a89] py-24 text-center tracking-wide">
          The gift list is being put together — check back soon.
        </p>
      ) : (
        <GiftList gifts={gifts} bank={registry.bank} currency={registry.currency} />
      )}

      {/* General bank details */}
      <GeneralGiftSection bank={registry.bank} currency={registry.currency} />
    </div>
  );
}
