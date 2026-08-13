// Edit this file to manage the gift list.
// `raised` is not automated (there's no payment backend here): whenever a bank
// transfer comes in, bump that gift's `raised` value by hand.

export const registry = {
  coupleNames: "Bride & Groom",
  weddingDate: "2027-06-12",
  message:
    "Your presence at our wedding is the only gift we need. If you'd like to help us start our life together, we've put a few things on this list — buy one outright, or contribute any amount towards it.",
  currency: "EUR",
  bank: {
    accountName: "TODO — account holder name",
    iban: "TODO — IBAN",
    bic: "TODO — BIC / SWIFT",
    bankName: "TODO — bank name",
    note: "Please add the gift name (or \"Wedding Gift\") as the transfer description so we know what it's for.",
  },
};

export const gifts = [
  {
    id: 1,
    slug: "honeymoon-flights",
    title: "Honeymoon Flights",
    description: "Getting us to the honeymoon — return flights for two.",
    category: "Honeymoon",
    price: 1800,
    raised: 450,
    imageUrl: null,
    purchaseLink: null,
  },
  {
    id: 2,
    slug: "espresso-machine",
    title: "Espresso Machine",
    description: "For slow mornings in the new kitchen.",
    category: "Home",
    price: 650,
    raised: 650,
    imageUrl: null,
    purchaseLink: "https://example.com/espresso-machine",
  },
  {
    id: 3,
    slug: "dinnerware-set",
    title: "Dinnerware Set",
    description: "A full set for hosting friends and family.",
    category: "Home",
    price: 320,
    raised: 90,
    imageUrl: null,
    purchaseLink: "https://example.com/dinnerware-set",
  },
];
