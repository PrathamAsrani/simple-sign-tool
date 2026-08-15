import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { addressOneLine, mailtoUrl, site } from "@/lib/site";

export default function Privacy() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        intro="PDF Master does not collect, transmit, store or share any personal data. This page explains what that means in practice."
      />
      <Prose>
        <h2>Who we are</h2>
        <p>
          PDF Master is an Android application published by {site.legalName}, {addressOneLine}. You
          can reach us at <a href={mailtoUrl}>{site.email}</a>.
        </p>

        <h2>The short version</h2>
        <p>
          <strong>We collect nothing.</strong> The app has no user accounts, no analytics, no
          advertising and no crash reporting. It is built without the Android{" "}
          <strong>INTERNET</strong> permission, which means the operating system will not allow it
          to open a network connection at all. It cannot send your documents, photos or any other
          information anywhere, even by mistake.
        </p>

        <h2>Information we collect</h2>
        <p>
          None. We do not collect personal information, device identifiers, usage statistics,
          diagnostics, location, contacts or any other data. We do not use cookies or similar
          technologies in the app, because there is no server for them to talk to.
        </p>

        <h2>Information the app handles on your device</h2>
        <ul>
          <li>
            <strong>Photos you choose.</strong> When you pick images, Android's system photo picker
            gives the app access to the specific images you selected and nothing else. The app
            never scans your photo library and never requests broad storage permissions.
          </li>
          <li>
            <strong>Photos you take.</strong> The camera runs only while the camera screen is open,
            and captures are written straight into the app's private storage on your device.
          </li>
          <li>
            <strong>PDFs you create or open.</strong> Files you export are saved in the app's own
            folder on your device. If you open a PDF from elsewhere on the device, the app keeps a
            pointer to it and your last-read page, so it can reopen where you left off.
          </li>
          <li>
            <strong>Your settings.</strong> Default page size, quality and theme are stored locally.
          </li>
        </ul>
        <p>
          All of this stays on your device. None of it is transmitted to us or to anyone else.
        </p>

        <h2>Permissions we request, and why</h2>
        <ul>
          <li>
            <strong>Camera</strong> — requested only when you open the camera screen, so you can
            photograph pages. Decline it and the rest of the app keeps working; you can still add
            images from your device.
          </li>
        </ul>
        <p>
          The app requests no other permission. In particular it does not request storage or media
          access, and it deliberately does not declare the internet permission.
        </p>

        <h2>Sharing and third parties</h2>
        <p>
          We do not share data with anyone, because we do not have any of your data. The app
          contains no third-party SDKs, no advertising networks and no analytics providers. If you
          choose to share a PDF using Android's share sheet, that file goes to the app you pick, and
          that app's own privacy policy governs what happens next.
        </p>

        <h2>Data retention and deletion</h2>
        <p>
          Since nothing is collected, there is nothing for us to retain or delete. Files on your
          device are yours to remove at any time — delete them in the app, or uninstall the app to
          remove everything it holds. See{" "}
          <Link to="/data-deletion">Data Deletion</Link> for details.
        </p>

        <h2>Children's privacy</h2>
        <p>
          The app is a general-purpose utility and is not directed at children. Because we collect
          no data from anyone, we collect no data from children either.
        </p>

        <h2>Security</h2>
        <p>
          Your documents live in the app's private storage area, which Android isolates from other
          apps. Because nothing is transmitted, there is no transmission to intercept and no server
          that can be breached.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If a future version of the app changes what it handles, this page will be updated before
          that version is released, and the date at the top will change. If we ever introduce a
          feature that requires a network connection, it will be described here plainly.
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
