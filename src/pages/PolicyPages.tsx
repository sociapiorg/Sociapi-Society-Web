import { Link } from "react-router-dom";
import { Container, PageHero } from "../components/ui";

const reviewed = "1 November 2026";

export function PrivacyPage() {
  return <>
    <PageHero eyebrow="Privacy" title="How this website handles information." text="A plain-language summary of information submitted through Sociapi's forms and shop, and the services used to operate this website." />
    <section><Container className="policy-content">
      <p><strong>Last reviewed:</strong> {reviewed}</p>
      <h2>What information may be submitted?</h2>
      <ul>
        <li>Contact, partnership, and chapter application forms ask for details such as your name, contact information, organization or university, and message.</li>
        <li>Shop checkout asks for delivery contact and address details and the items ordered.</li>
        <li>To reduce repeated submissions, your browser stores a timestamp and a duplicate-check signature derived from information entered in some forms.</li>
      </ul>
      <h2>Which services receive information?</h2>
      <ul>
        <li>Website inquiry forms submit to FormSubmit and are delivered to Sociapi Society's published email address.</li>
        <li>Shop order details are sent to Supabase when the shop is configured for checkout.</li>
        <li>Vercel Analytics and Speed Insights are included to measure site visits and performance.</li>
        <li>Some links, including social networks and participation forms, open services operated by other organizations under their own terms and privacy notices.</li>
      </ul>
      <h2>Questions or requests</h2>
      <p>The website code does not define a retention schedule. For questions about information you submitted, contact <a href="mailto:sociapisociety@gmail.com">sociapisociety@gmail.com</a> and identify the form or order concerned.</p>
      <p>This page describes the website's current implementation. It does not make claims about the policies or security practices of third-party services.</p>
      <p>See also the <Link to="/terms">website terms</Link>.</p>
    </Container></section>
  </>;
}

export function TermsPage() {
  return <>
    <PageHero eyebrow="Website terms" title="Using the Sociapi Society website." text="These notes cover use of this public website and its links. Event, chapter, and shop arrangements may have additional terms shared with participants or customers." />
    <section><Container className="policy-content">
      <p><strong>Last reviewed:</strong> {reviewed}</p>
      <h2>Website information</h2>
      <p>Sociapi Society publishes information about its student community, chapters, events, opportunities, services, and merchandise. Details can change; contact Sociapi to confirm current event, chapter, or shop information before relying on it.</p>
      <h2>Forms and external services</h2>
      <p>When you submit a form, provide information you are authorized to share. Forms and links may be handled by third-party services whose terms apply to their platforms. Sociapi does not control external websites.</p>
      <h2>Content and contact</h2>
      <p>Website text, photographs, and branding are provided for information about Sociapi Society. Ask permission before reusing material where ownership or permission is unclear. Report a concern or request clarification at <a href="mailto:sociapisociety@gmail.com">sociapisociety@gmail.com</a>.</p>
      <p>These website notes do not replace specific terms provided for an event, partnership, chapter, or shop order. See the <Link to="/privacy">privacy information</Link>.</p>
    </Container></section>
  </>;
}
