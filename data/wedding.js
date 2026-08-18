// Fallback content used only until the first save from /admin creates the
// real data blob in Vercel Blob storage. After that, everything is edited
// through /admin — this file is no longer read.

export const seedData = {
  registry: {
    coupleNames: "Eylül & Armağan",
    weddingDate: "2027-06-12",
    message:
      "Your presence at our wedding is the only gift we need. If you'd like to help us start our life together, we've put a few things on this list — buy one outright, or contribute any amount towards it.",
    currency: "EUR",
    shippingAddress: "İstanbul Beşiktaş Akat Mah. Akay Sokak Özlem Sitesi Blok: 1D Daire: 9 Kat:4",
    bank: {
      accountName: "TODO — account holder name",
      iban: "TODO — IBAN",
      bic: "TODO — BIC / SWIFT",
      bankName: "TODO — bank name",
      note: "Please add the gift name (or \"Wedding Gift\") as the transfer description so we know what it's for.",
    },
  },
  gifts: [],
};
