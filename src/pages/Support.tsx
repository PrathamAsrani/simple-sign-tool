import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressLines, mailtoUrl, site, telUrl, whatsappUrl } from "@/lib/site";

const faqs = [
  {
    q: "Do the page numbers appear in my exported PDF?",
    a: "No. The numbers under each page in the Arrange screen are ordering guides for you. The exporter draws page images and nothing else, so no number is ever written into the file.",
  },
  {
    q: "How do I straighten a page photographed at an angle?",
    a: "Tap the page in the Arrange screen to open the corner editor, then drag each of the four handles onto a corner of the document. Apply, and the page is flattened into a rectangle when you export.",
  },
  {
    q: "How do I change the order of pages?",
    a: "Press a page in the Arrange grid and drag it onto the position you want. A tap without any movement opens the crop editor instead, so you can do both without them colliding.",
  },
  {
    q: "Where are my PDFs saved?",
    a: "In the app's own private folder on your device. Use Share on a file to send a copy anywhere you like, and Delete to remove it.",
  },
  {
    q: "Does the app need an internet connection?",
    a: "Never. It has no internet permission at all, so every feature works in airplane mode.",
  },
  {
    q: "Why does it ask for the camera?",
    a: "Only so you can photograph pages, and only when you open the camera screen. If you decline, you can still build PDFs from images already on your device.",
  },
  {
    q: "I deleted a file by accident. Can it be recovered?",
    a: "No. Files live only on your device and deletion is immediate and permanent, so please keep your own backups of anything important.",
  },
];

export default function Support() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Help"
        title="Support"
        intro="A real person answers these. Email is usually fastest, and WhatsApp is fine too."
      />

      <div className="mx-auto max-w-3xl px-5 pt-14 sm:px-8">
        <div className="grid gap-px border border-industry-line bg-industry-line sm:grid-cols-3">
          <a href={mailtoUrl} className="group bg-industry-bg p-6 transition-colors hover:bg-industry-a100">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
              Email
            </h2>
            <p className="mt-2 break-words text-sm text-industry-steel700 underline underline-offset-4">
              {site.email}
            </p>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group bg-industry-bg p-6 transition-colors hover:bg-industry-a100"
          >
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
              WhatsApp
            </h2>
            <p className="mt-2 text-sm text-industry-steel700 underline underline-offset-4">
              {site.phone}
            </p>
          </a>
          <a href={telUrl} className="group bg-industry-bg p-6 transition-colors hover:bg-industry-a100">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
              Phone
            </h2>
            <p className="mt-2 text-sm text-industry-steel700 underline underline-offset-4">
              {site.phone}
            </p>
          </a>
        </div>

        <div className="mt-6 border border-industry-line p-6">
          <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
            Postal address
          </h2>
          <address className="mt-2 not-italic text-sm leading-relaxed text-industry-n700">
            <div className="text-industry-ink">{site.legalName}</div>
            {addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </div>
      </div>

      <Prose>
        <h2>Response times</h2>
        <p>
          We aim to reply to email and WhatsApp within two working days. Phone calls are answered
          between 10:00 and 18:00 IST, Monday to Saturday.
        </p>

        <h2>Reporting a problem</h2>
        <p>To get to an answer in one round trip, please include:</p>
        <ul>
          <li>Your device model and Android version.</li>
          <li>The app version, shown at the bottom of the app's Settings screen.</li>
          <li>What you did, what you expected, and what happened instead.</li>
          <li>A screenshot, if the problem is something you can see.</li>
        </ul>
        <p>
          The app has no crash reporting — nothing is sent to us automatically — so a report from
          you is genuinely the only way we learn that something is broken.
        </p>

        <h2>Frequently asked</h2>
        {faqs.map((item) => (
          <div key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </Prose>
    </SiteLayout>
  );
}
