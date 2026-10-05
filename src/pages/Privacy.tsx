import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressOneLine, mailtoUrl, site } from "@/lib/site";

export default function Privacy() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        intro={`${site.appName} edits, scans, converts and protects documents on your phone. Your files are never uploaded. The only time the app uses the internet is when you choose to buy something through Google Play.`}
      />
      <Prose>
        <p>
          <em>Last updated: {site.lastUpdated}. Applies to the {site.appName} Android app (package{" "}
          <code>app.pdfmaster</code>).</em>
        </p>

        <h2>Who we are</h2>
        <p>
          {site.appName} is an Android application published by {site.legalName}, {addressOneLine}.
          You can reach us at <a href={mailtoUrl}>{site.email}</a>.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>
            <strong>Your documents never leave your phone.</strong> PDFs, Word, Excel and CSV files,
            photos, scans and ZIP files are opened, edited, converted, protected and created on your
            device. Nothing is uploaded — not to us, not to anyone.
          </li>
          <li>
            <strong>No ads, no account, no analytics, no tracking.</strong> The app contains no
            advertising, analytics or crash-reporting SDKs.
          </li>
          <li>
            <strong>One exception: purchases.</strong> Editing is free to try; saving an edited PDF
            is a small in-app purchase. That purchase is processed by Google Play, which is the only
            reason the app has internet access.
          </li>
          <li>
            <strong>We run no server and receive none of your data.</strong>
          </li>
        </ul>

        <h2>Information collected</h2>
        <p>
          <strong>Purchase history (through Google Play).</strong> When you buy the "Save edited
          PDF" item (₹9 in India, a local price elsewhere), the payment is handled entirely by Google
          Play under{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Google's Privacy Policy
          </a>
          . Google sends the app a purchase receipt; the app checks it on your device and keeps a
          record of which documents you have paid for, on your device only. No document, page, file
          name or content is ever sent with a purchase, and we never see your card, UPI or other
          payment details.
        </p>
        <p>
          Nothing else is collected: no name, email, phone number, location, contacts, device
          identifiers, usage statistics, diagnostics or crash logs.
        </p>

        <h2>Information the app handles only on your device</h2>
        <ul>
          <li>
            <strong>Files and photos you choose.</strong> Android's system pickers give the app
            access only to the specific files, photos or folders you select. The app never scans
            your photo library and never requests broad storage or media permissions.
          </li>
          <li>
            <strong>Photos you take.</strong> The camera runs only while the camera screen is open.
            Captures are kept in the app's private storage on your device. Page edges are detected on
            the device.
          </li>
          <li>
            <strong>Documents you create.</strong> Edited PDFs, scans, converted files and protected
            PDFs are saved in the app's own folder, or wherever you choose to save them. ZIP files
            are written directly to the location you pick.
          </li>
          <li>
            <strong>Passwords.</strong> A password you type to open or protect a PDF is used once,
            on your device, to decrypt or encrypt that file. It is never stored and never sent
            anywhere.
          </li>
          <li>
            <strong>Your settings</strong> (theme, default page size and quality) are stored locally.
          </li>
        </ul>

        <h2>Permissions, and why</h2>
        <ul>
          <li>
            <strong>Camera</strong> — requested only when you open the camera screen, to photograph
            pages. Decline it and everything else keeps working.
          </li>
          <li>
            <strong>Internet and Google Play Billing</strong> — used only to process purchases
            through Google Play.
          </li>
          <li>
            <strong>Detect screen capture</strong> — lets the editor know if an unpaid edited
            document is being captured. Nothing is recorded or sent.
          </li>
        </ul>

        <h2>Sharing and third parties</h2>
        <p>
          We do not sell or share your data. Google Play processes purchases as described above.
          If you choose to share or save a file using Android's share sheet or save dialog, it goes
          to the app or place you pick, and that app's own privacy policy applies.
        </p>

        <h2>Data retention and deletion</h2>
        <p>
          Everything the app holds is on your device. Delete files in the app at any time, or
          uninstall the app to remove everything it holds, including the purchase record. Your
          Google Play purchase history is kept by Google and can be viewed in your Google account.
          See <Link to="/data-deletion">Data Deletion</Link> for details.
        </p>

        <h2>Security</h2>
        <p>
          Purchases are sent to Google over an encrypted connection. The on-device purchase record
          is protected by a key held in Android's secure Keystore. PDFs you protect are encrypted
          with AES-256. Your documents live in the app's private storage, which Android isolates
          from other apps.
        </p>

        <h2>Children's privacy</h2>
        <p>
          The app is a general-purpose utility and is not directed at children. It does not
          knowingly collect data from anyone, including children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If a future version handles data differently — for example a feature that needs our own
          server — this page will be updated before that version is released, and the date at the
          top will change.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href={mailtoUrl}>{site.email}</a>, or see the{" "}
          <Link to="/support">support page</Link> for phone and WhatsApp.
        </p>
      </Prose>
    </SiteLayout>
  );
}
