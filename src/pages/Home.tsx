import { Link } from "react-router-dom";
import { Blueprint, SiteLayout } from "@/components/site/Layout";
import { Lockup, Mark } from "@/components/site/Mark";
import { addressLines, mailtoUrl, site, telUrl, whatsappUrl } from "@/lib/site";

const shots = [
  { src: "/screens/camera.png", alt: "Camera screen capturing a document page", caption: "Shoot pages" },
  { src: "/screens/crop.png", alt: "Crop editor with four draggable corner handles", caption: "Crop the corners" },
  { src: "/screens/arrange.png", alt: "Arrange pages grid with page numbers", caption: "Drag the order" },
  { src: "/screens/reader.png", alt: "PDF reader showing a page", caption: "Read any PDF" },
];

const makeFeatures = [
  {
    title: "Camera or gallery",
    body: "Photograph pages one after another, or pick images already on your device. The app only ever sees the pictures you hand it.",
  },
  {
    title: "Corners by hand",
    body: "Drag four handles onto the edges of the page. A photo taken at an angle comes out square, without guesswork.",
  },
  {
    title: "Any order you want",
    body: "Drag pages to reorder, remove one, or add more at any point. A page can never be lost by a drag.",
  },
  {
    title: "Numbers never print",
    body: "The page numbers in the app are arranging guides. They are drawn on screen and never written into the exported file.",
  },
];

const readFeatures = [
  { title: "Opens instantly", body: "No splash screen, no popups. The document is on screen and ready to swipe." },
  { title: "Clean page view", body: "Tap once and every control fades away, leaving the page on its own." },
  { title: "Jump anywhere", body: "A grid of pages to move through a long document quickly." },
  { title: "Remembers your place", body: "Reopen a file and it returns to the page you were reading." },
];

const promises = [
  { title: "No uploads", body: "The app ships with no internet permission at all. It cannot send your documents anywhere, even by mistake." },
  { title: "No account", body: "Nothing to sign up for, nothing to log in to. Install it and it works." },
  { title: "No ads", body: "Nothing blinks, nothing interrupts, nothing is sold." },
  { title: "No tracking", body: "No analytics, no crash reporting, no identifiers of any kind." },
];

export default function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-industry-line bg-industry-navy text-industry-bg">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <Lockup size={44} variant="fanned" textClassName="text-industry-bg" />
            <h1 className="mt-10 text-6xl font-bold uppercase leading-[0.94] tracking-tight sm:text-7xl">
              Photos in.
              <br />
              PDF out.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-industry-a200">
              Camera or gallery. Crop the corners, drag the order, export. Free, and nothing
              leaves your phone.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Free", "No ads", "No uploads", "Works offline"].map((tag, i) => (
                <span
                  key={tag}
                  className={[
                    "px-4 py-2 font-heading text-[13px] font-semibold uppercase tracking-[0.1em]",
                    i === 0
                      ? "bg-industry-steel text-industry-bg"
                      : "border border-industry-a400 text-industry-a200",
                  ].join(" ")}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {site.playStoreUrl ? (
                <a
                  href={site.playStoreUrl}
                  className="bg-industry-steel px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-industry-bg transition-colors hover:bg-industry-steel600"
                >
                  Get it on Google Play
                </a>
              ) : (
                <span className="border border-industry-a400 px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-industry-a200">
                  Coming soon to Google Play
                </span>
              )}
              <Link
                to="/support"
                className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-industry-a300 underline underline-offset-4 hover:text-industry-bg"
              >
                Contact support
              </Link>
            </div>
          </div>

          {/* Two device shots, framed the way the store art frames them. */}
          <div className="flex justify-center gap-5 lg:justify-end">
            {shots.slice(1, 3).map((shot) => (
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                className="w-[46%] max-w-[240px] border-4 border-industry-steel bg-industry-bg object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section className="border-b border-industry-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
            Every screen
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {shots.map((shot) => (
              <figure key={shot.src}>
                <Blueprint className="bg-industry-surface">
                  <img src={shot.src} alt={shot.alt} className="w-full object-cover" />
                </Blueprint>
                <figcaption className="mt-4 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-industry-steel700">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="border-b border-industry-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight">Make a PDF from photos</h2>
              <div className="mt-8 divide-y divide-industry-line border-y border-industry-line">
                {makeFeatures.map((f, i) => (
                  <div key={f.title} className="flex gap-5 py-5">
                    <span className="font-heading text-sm font-semibold text-industry-steel700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold uppercase tracking-[0.06em]">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-industry-n700">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold uppercase tracking-tight">Read any PDF</h2>
              <div className="mt-8 divide-y divide-industry-line border-y border-industry-line">
                {readFeatures.map((f, i) => (
                  <div key={f.title} className="flex gap-5 py-5">
                    <span className="font-heading text-sm font-semibold text-industry-steel700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-semibold uppercase tracking-[0.06em]">
                        {f.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-industry-n700">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-b border-industry-line bg-industry-navy text-industry-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl">
            Your files stay yours
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-industry-a200">
            This is not a promise about how we behave. It is a property of the app: PDF Master is
            built without a network stack, so there is nothing to switch off and nothing to trust.
          </p>
          <div className="mt-12 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="bg-industry-navy p-6">
                <h3 className="font-heading text-base font-semibold uppercase tracking-[0.08em] text-industry-a300">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-industry-a200">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-industry-a200">
            The full detail is in the{" "}
            <Link className="underline underline-offset-4 hover:text-industry-bg" to="/privacy">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Developer — the identity block Play verification looks for */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[auto,1fr,1fr] md:items-start">
            <Mark size={72} />
            <div>
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
                Published by
              </h2>
              <p className="mt-3 text-xl font-semibold">{site.legalName}</p>
              <address className="mt-2 not-italic text-sm leading-relaxed text-industry-n700">
                {addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
            </div>
            <div>
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
                Get in touch
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="text-industry-steel700 underline underline-offset-4" href={mailtoUrl}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a className="text-industry-steel700 underline underline-offset-4" href={telUrl}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    className="text-industry-steel700 underline underline-offset-4"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message on WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
