function roundNice(n) {
  if (n < 100) return Math.max(10, Math.round(n / 10) * 10);
  if (n < 1000) return Math.round(n / 50) * 50;
  return Math.round(n / 100) * 100;
}

// Three round-number suggestions scaled to what's left to raise, so a
// guest gets a sense of what a meaningful contribution looks like.
export function suggestedAmountsForRemaining(remaining) {
  if (remaining <= 0) return [];
  const amounts = [0.15, 0.35, 0.7].map((fraction) => roundNice(remaining * fraction));
  return [...new Set(amounts)].filter((a) => a > 0 && a <= remaining);
}
