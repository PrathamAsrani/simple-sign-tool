import { Link } from "react-router-dom";
import { PageHeader, Prose, SiteLayout } from "@/components/site/Layout";
import { mailtoUrl, site } from "@/lib/site";

/**
 * Google Play asks every app for a data deletion route. Ours is unusual only in
 * that there is no account to delete — so the page says exactly that, and then
 * explains how to remove the files that do exist, which are all on the device.
 */
export default function DataDeletion() {
  return (
    <SiteLayout>
      <PageHeader
        kicker="Legal"
        title="Data Deletion"
        intro="PDF Master has no accounts and no servers, so there is no account to delete and no data of yours held anywhere by us."
      />
      <Prose>
        <h2>There is no account</h2>
        <p>
          PDF Master does not ask you to register, does not create a profile, and has no server-side
          storage. We hold no copy of your documents, no email address, no device identifier and no
          usage history. There is therefore nothing for us to delete on your behalf.
        </p>

        <h2>Deleting the files on your device</h2>
        <p>Everything the app holds lives on your phone, and you can remove it at any time:</p>
        <ul>
          <li>
            <strong>Delete one PDF.</strong> On the home screen, press and hold the file, then
            choose <strong>Delete</strong> and confirm. It is removed immediately and permanently.
          </li>
          <li>
            <strong>Discard pages in progress.</strong> Leaving the Arrange screen with the back
            action discards the page images you had added; removing a single page with the ×
            deletes that image straight away.
          </li>
          <li>
            <strong>Remove everything at once.</strong> Open Android <strong>Settings → Apps → PDF
            Master → Storage</strong> and tap <strong>Clear storage</strong>. This deletes every PDF
            the app created, along with your settings.
          </li>
          <li>
            <strong>Uninstall.</strong> Removing the app deletes all of its data with it.
          </li>
        </ul>

        <h2>Photos in your gallery</h2>
        <p>
          When you pick images, the app copies them into its own storage and never modifies or
          deletes the originals in your gallery. Removing those originals is done in your gallery
          app, as usual.
        </p>

        <h2>Files you shared elsewhere</h2>
        <p>
          If you used Share to send a PDF to another app, email or cloud service, that copy is
          outside PDF Master's control. Delete it in whichever app or service now holds it.
        </p>

        <h2>Making a request anyway</h2>
        <p>
          If you would like written confirmation that we hold no data about you, or you have any
          other privacy question, email <a href={mailtoUrl}>{site.email}</a> and we will respond
          within two working days.
        </p>

        <h2>Related</h2>
        <p>
          See the <Link to="/privacy">privacy policy</Link> for the full picture of what the app
          does and does not handle.
        </p>
      </Prose>
    </SiteLayout>
  );
}
