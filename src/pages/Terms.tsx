import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressOneLine, mailtoUrl, site } from "@/lib/site";

export default function Terms() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Legal"
        title="Terms of Service"
        intro="The terms you agree to when you install and use PDF Master."
      />
      <Prose>
        <h2>1. Agreement</h2>
        <p>
          These terms are between you and {site.legalName}, {addressOneLine} ("we", "us"). By
          installing or using the PDF Master Android application ("the app"), you agree to them. If
          you do not agree, please do not use the app.
        </p>

        <h2>2. Licence</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable licence to install and
          use the app on devices you own or control, for personal or business purposes. The app is
          provided free of charge, with no paid tier, no subscription and no watermark.
        </p>

        <h2>3. What you may not do</h2>
        <ul>
          <li>Reverse engineer, decompile or disassemble the app, except where that right cannot be excluded by law.</li>
          <li>Redistribute, resell or sublicense the app, or publish it under another name.</li>
          <li>Use the app to create, process or distribute material that is unlawful, or documents you have no right to reproduce.</li>
          <li>Remove or obscure any notice of ownership contained in the app.</li>
        </ul>

        <h2>4. Your content</h2>
        <p>
          The photos you capture or select and the PDFs you create remain entirely yours. They are
          stored on your device and are never transmitted to us — we have no access to them, no copy
          of them and no ability to retrieve them. You are solely responsible for the content you
          process and for keeping your own backups.
        </p>

        <h2>5. Availability and updates</h2>
        <p>
          We may update the app to fix defects, improve it or keep it compatible with new versions of
          Android. We may change or discontinue any feature. We are not obliged to provide updates or
          to keep the app available indefinitely.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The app, its name, its logo and its design are owned by {site.legalName}. These terms grant
          you a licence to use the app; they do not transfer any ownership.
        </p>

        <h2>7. No warranty</h2>
        <p>
          The app is provided "as is" and "as available", without warranty of any kind, whether
          express or implied, including any implied warranty of merchantability, fitness for a
          particular purpose or non-infringement. We do not warrant that the app will be
          uninterrupted, error-free, or that any exported file will meet a particular requirement.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we are not liable for any indirect, incidental,
          special or consequential damages, or for any loss of data, documents, profits or business,
          arising from your use of or inability to use the app. Because the app is supplied free of
          charge, our total aggregate liability to you is limited to zero rupees, save for liability
          which cannot lawfully be excluded.
        </p>
        <p>
          <strong>Keep your own copies.</strong> The app stores files on your device only. Losing,
          resetting or damaging your device, or uninstalling the app, will remove them.
        </p>

        <h2>9. Termination</h2>
        <p>
          You may end this agreement at any time by uninstalling the app. We may suspend the licence
          if you breach these terms. Sections 4, 6, 7, 8 and 10 survive termination.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of India. The courts at Gurugram, Haryana have
          exclusive jurisdiction over any dispute arising from them.
        </p>

        <h2>11. Changes to these terms</h2>
        <p>
          We may revise these terms when the app changes. The revised version will be posted here
          with a new date at the top, and continuing to use the app after that means you accept it.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these terms: <a href={mailtoUrl}>{site.email}</a>. See also our{" "}
          <Link to="/privacy">privacy policy</Link> and <Link to="/support">support page</Link>.
        </p>
      </Prose>
    </SiteLayout>
  );
}
