import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressOneLine, mailtoUrl, site, telUrl } from "@/lib/site";

export default function Terms() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Legal"
        title="Terms of Service"
        intro="The terms you agree to when you install and use IntelliPDF."
      />
      <Prose>
        <h2>1. Agreement</h2>
        <p>
          These terms are between you and {site.legalName}, an individual trader, of {addressOneLine}{" "}
          ("we", "us"). By
          installing or using the IntelliPDF Android application ("the app"), you agree to them. If
          you do not agree, please do not use the app.
        </p>

        <h2>2. Licence</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable licence to install and
          use the app on devices you own or control, for personal or business purposes. The app is
          free to install, with no subscription, no ads and no watermark. Reading, scanning,
          converting and the other tools are free; the only charge is the optional purchase described
          in section 4a.
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

        <h2>4a. Purchases</h2>
        <p>
          The app is free to install. Editing a PDF is free to try; saving an edited PDF is a one-time
          in-app purchase per document (₹9 in India, a local price elsewhere), processed by Google
          Play under Google Play's terms. Re-saving a document you have already paid for is free.
          Refunds are handled by Google Play according to its refund policy.
        </p>
        <p>
          The saved document is digital content supplied immediately after payment. Where the law of
          your country gives you a right to withdraw from the purchase, you agree at checkout that
          supply begins straight away, and you acknowledge that this ends that right once the document
          is saved. This does not affect your rights if the saved document is faulty or not as
          described.
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
          arising from your use of or inability to use the app. Our total aggregate liability to you is
          limited to the amount you paid us for in-app purchases in the twelve months before the claim,
          save for liability which cannot lawfully be excluded.
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
          These terms are governed by the laws of India. The courts at {site.address.city},{" "}
          {site.address.state} have jurisdiction over any dispute arising from them.
        </p>
        <p>
          <strong>Your rights as a consumer.</strong> If you are a consumer, nothing in these terms
          takes away the rights you have under the mandatory consumer-protection laws of the country
          you live in, including in the European Economic Area and the United Kingdom, and you may
          also bring a claim in the courts of that country. Sections 7 and 8 apply only as far as
          those laws allow.
        </p>

        <h2>11. Changes to these terms</h2>
        <p>
          We may revise these terms when the app changes. The revised version will be posted here
          with a new date at the top, and continuing to use the app after that means you accept it.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these terms: <a href={mailtoUrl}>{site.email}</a> or{" "}
          <a href={telUrl}>{site.phone}</a>. Post: {addressOneLine}. See also our{" "}
          <Link to="/privacy">privacy policy</Link> and <Link to="/support">support page</Link>.
        </p>
      </Prose>
    </SiteLayout>
  );
}
