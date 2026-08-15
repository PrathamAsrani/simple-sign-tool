/**
 * One place for everything Google Play's developer verification asks to see on
 * the website: a legal name, a real postal address, and a way to reach a human.
 *
 * Change it here and it changes on every page — the verification reviewer and
 * the support page must never disagree.
 */
export const site = {
  appName: "PDF Master",
  tagline: "Photos in. PDF out.",
  description:
    "PDF Master turns photos into a PDF and reads PDFs on Android. Free, no ads, no account, and nothing ever leaves your phone.",

  /** Individual developer account. Swap for the company name if you register one. */
  legalName: "Pratham Asrani",
  entityType: "Individual developer",

  email: "prathamasrani.cs@gmail.com",
  phone: "+91 9145495032",
  /** Digits only, for wa.me and tel: links. */
  phoneDigits: "919145495032",

  address: {
    line1: "102, B63, Palam Vihar",
    line2: "Dharam Colony, Sector 12",
    city: "Gurgaon",
    state: "Haryana",
    postalCode: "122017",
    country: "India",
  },

  /** Play listing goes live after review; the button says so until then. */
  playStoreUrl: "",

  lastUpdated: "16 August 2026",
} as const;

export const addressLines = [
  site.address.line1,
  site.address.line2,
  `${site.address.city}, ${site.address.state} ${site.address.postalCode}`,
  site.address.country,
];

export const addressOneLine = addressLines.join(", ");

export const whatsappUrl = `https://wa.me/${site.phoneDigits}`;
export const telUrl = `tel:${site.phone.replace(/\s/g, "")}`;
export const mailtoUrl = `mailto:${site.email}`;
