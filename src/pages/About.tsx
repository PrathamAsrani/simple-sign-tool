import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressLines, mailtoUrl, site, telUrl, whatsappUrl } from "@/lib/site";

/**
 * The page a Google Play verification reviewer is sent to: legal name, entity
 * type, postal address and contact details, stated plainly and matching the
 * details on the developer account.
 */
export default function About() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="About"
        title="About us"
        intro="PDF Master is built and published by one developer in Gurgaon, India."
      />

      <div className="mx-auto max-w-3xl px-5 pt-14 sm:px-8">
        <div className="border border-industry-line">
          <h2 className="border-b border-industry-line bg-industry-surface px-6 py-4 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-n700">
            Developer details
          </h2>
          <dl className="divide-y divide-industry-line text-sm">
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Legal name
              </dt>
              <dd className="text-industry-ink">{site.legalName}</dd>
            </div>
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Entity type
              </dt>
              <dd className="text-industry-ink">{site.entityType}</dd>
            </div>
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Registered address
              </dt>
              <dd className="text-industry-ink">
                <address className="not-italic leading-relaxed">
                  {addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </address>
              </dd>
            </div>
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Email
              </dt>
              <dd>
                <a className="text-industry-steel700 underline underline-offset-4" href={mailtoUrl}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Phone / WhatsApp
              </dt>
              <dd className="flex flex-wrap gap-3">
                <a className="text-industry-steel700 underline underline-offset-4" href={telUrl}>
                  {site.phone}
                </a>
                <a
                  className="text-industry-steel700 underline underline-offset-4"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </dd>
            </div>
            <div className="grid gap-1 px-6 py-4 sm:grid-cols-[200px,1fr]">
              <dt className="font-heading font-semibold uppercase tracking-[0.06em] text-industry-n700">
                Products
              </dt>
              <dd className="text-industry-ink">PDF Master for Android</dd>
            </div>
          </dl>
        </div>
      </div>

      <Prose>
        <h2>What we build</h2>
        <p>
          PDF Master does two things: it turns photographs into a PDF, and it reads PDFs. It was
          built because the obvious way to scan a document on a phone had become a maze of
          watermarks, subscriptions, sign-in walls and adverts — for a job that takes ten seconds
          and needs no server at all.
        </p>

        <h2>How we build it</h2>
        <p>
          The app is written natively for Android and uses the platform's own PDF engine, so it
          needs no third-party document library. It ships without the internet permission, which
          means it cannot transmit anything anywhere. That is not a policy we promise to follow; it
          is a property of the software, and you can verify it yourself in the permission list on
          the Play listing.
        </p>

        <h2>How it is paid for</h2>
        <p>
          It isn't. There is no paid tier, no subscription, no advertising and no data being sold —
          because none is collected. If that ever changes, it will be said plainly here and in the{" "}
          <Link to="/privacy">privacy policy</Link> before the change ships.
        </p>

        <h2>Contact</h2>
        <p>
          For support, see the <Link to="/support">support page</Link>. For anything else, email{" "}
          <a href={mailtoUrl}>{site.email}</a>.
        </p>
      </Prose>
    </SiteLayout>
  );
}
