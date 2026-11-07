/**
 * One place for everything Google Play's developer verification asks to see on
 * the website: a legal name, a real postal address, and a way to reach a human.
 *
 * Change it here and it changes on every page — the verification reviewer and
 * the support page must never disagree.
 */
export const site = {
  appName: "IntelliPDF",
  tagline: "Every PDF tool. On your phone.",
  description:
    "IntelliPDF edits, signs, scans, converts and protects PDFs on Android. No ads, no account, and your documents never leave your phone.",

  /** Individual developer account. Swap for the company name if you register one. */
  legalName: "Pratham Ashok Asrani",
  entityType: "Individual developer",

  email: "prathamasrani.cs@gmail.com",
  phone: "+91 9145495032",
  /** Digits only, for wa.me and tel: links. */
  phoneDigits: "919145495032",

  address: {
    line1: "Plot No. 839, Gali No. 13",
    line2: "Ahuja Nagar",
    city: "Nagpur",
    state: "Maharashtra",
    postalCode: "440014",
    country: "India",
  },

  /** Play listing goes live after review; the button says so until then. */
  playStoreUrl: "https://play.google.com/store/apps/details?id=app.pdfmaster",

  lastUpdated: "8 November 2026",
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
