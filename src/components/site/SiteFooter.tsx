import { Link } from "react-router-dom";
import { Lockup } from "./Mark";
import { addressLines, mailtoUrl, site, telUrl, whatsappUrl } from "@/lib/site";

/**
 * The footer carries the developer identity Google Play verification looks for:
 * a legal name, a postal address and a working contact route, on every page.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-industry-line bg-industry-navy text-industry-bg">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Lockup size={32} variant="fanned" textClassName="text-industry-bg" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-industry-a200">
              {site.description}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-industry-a300">
              Developer
            </h2>
            <address className="mt-3 not-italic text-sm leading-relaxed text-industry-a200">
              <div className="text-industry-bg">{site.legalName}</div>
              {addressLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
          </div>

          <div>
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-industry-a300">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-industry-a200">
              <li>
                <a className="hover:text-industry-bg" href={mailtoUrl}>
                  {site.email}
                </a>
              </li>
              <li>
                <a className="hover:text-industry-bg" href={telUrl}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-industry-bg"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-industry-a200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-industry-bg" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-industry-bg" to="/terms">
              Terms of Service
            </Link>
            <Link className="hover:text-industry-bg" to="/data-deletion">
              Data Deletion
            </Link>
            <Link className="hover:text-industry-bg" to="/support">
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
