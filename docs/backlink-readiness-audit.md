# Sociapi Society backlink readiness audit

Audit date: 31 October 2026 (Asia/Karachi). Scope: repository review plus public HTTP checks of `https://sociapis.vercel.app/`. No Google Search Console or third-party backlink-index account was provided.

## Verified findings

- The live homepage, `/about`, `/chapters`, `/events`, `/partner-with-us`, `/robots.txt`, and `/sitemap.xml` returned HTTP 200 during this check. An unknown path returned 404. `/verify/abc` returned 200 by design for the client-routed verification flow.
- `/about` returned prerendered HTML containing an H1, an index/follow robots directive, and the expected canonical. HTTP requests to the Vercel host redirected with 308 responses. `www.sociapis.vercel.app` resolved to Vercel IPs but its HTTPS certificate could not be validated from this environment, so no usable canonical redirect behavior was confirmed for that hostname.
- Live `robots.txt` allows crawling and points to the sitemap. The live sitemap currently contains the public index, chapter, and event routes, plus `/verify`.
- Repository routes are prerendered at build time, so route content and metadata are intended to be present in static HTML. The build output in `dist` is generated and is not evidence that the latest local changes have been deployed.
- The configured canonical origin is consistently `https://sociapis.vercel.app`. No custom-domain configuration was found in the reviewed Vercel config, metadata, sitemap, or source. Domain ownership beyond this repository is unknown.
- Chapter detail pages currently acknowledge that verified leaders, activities, and social links have not yet been collected. Those details should be added only after confirmation.
- Source included an indexable `/verify` page in the sitemap. Certificate verification is utility content; the updated source marks `/verify` and its result routes `noindex` and removes it from the sitemap.
- The live `/verify` HTML still has `index, follow` at audit time. The source change therefore requires deployment before this fix is effective publicly.
- Event pages were emitting duplicate Event JSON-LD: a sparse page-level script plus route metadata. Route schema labeled past 2026 events as scheduled. The duplicate is removed and event status is now derived from the event date.
- FAQ content is visible, but FAQPage markup is removed to avoid targeting FAQ search enhancements inappropriately.

## Zero-backlink report: what is and is not known

The report's provider, queried URL, query date, and index coverage are unknown. This repository cannot reveal what external sites link to Sociapi or what a commercial backlink checker has indexed. Therefore “0 backlinks” is unverified as a complete count and is not attributable to any specific technical cause from the available evidence.

The Vercel subdomain can be less memorable and less suitable for long-term organizational identity than a controlled custom domain, but its use alone does not prove why a tool reports zero links. The live site is reachable, crawl is allowed, and canonical URLs point to the same host. Search engine discovery, actual referring domains, external URL variants, and Search Console coverage remain unconfirmed without Search Console and backlink-tool data.

No custom domain was configured, so no domain migration or redirect is made. If Sociapi chooses a domain it controls, configure it in Vercel, verify DNS and HTTPS, then update the origin consistently and preserve old URLs with redirects.

## Outreach priorities

| Opportunity | Why a link could help their audience | Sociapi destination | Next action |
|---|---|---|---|
| Islamia College University Peshawar student affairs or society directory | Students can find the founding campus community and its participation details. | `/chapters/islamia-college-peshawar` | Confirm the chapter is active and find the appropriate public listing/contact route. |
| Other universities where Sociapi has a listed chapter | Students can discover a campus technology community; institutions can review what Sociapi actually offers there. | Matching `/chapters/...` page | Confirm current chapter leadership and activities before approaching the university. |
| Event hosts and collaborating societies | Attendees get an event record with the published summary and approved photos. | Matching `/events/...` page | Confirm each named partner's role and ask whether an event archive exists. |
| Speakers and mentors from completed events | Their audience can see session context and event materials. | Matching `/events/...` page | Confirm name, title, and permission for any media or quote included. |
| Educational publications and technology communities | Readers may benefit from an original, relevant student workshop report or guide. | Best matching event report or future original resource | Identify a specific publication and audience need; do not pitch generic SEO copy. |

1. Ask university student affairs/departments and campus society directories to list only confirmed chapter activity; destination: the matching `/chapters/...` page.
2. Ask actual event hosts and collaborating societies to include the relevant recap in event archives; destination: the matching `/events/...` page.
3. Share completed event recaps with named speakers for their portfolio or event history; destination: the relevant event page.
4. Pitch original workshop notes, learning materials, or event reports to educational and technology publications when a specific audience fit exists. Create original resources first; the current site does not establish a substantial library of standalone guides.
5. Invite organizations that have actually collaborated to link to a relevant project or event page. Being named on Sociapi's site is not an independent endorsement or guaranteed backlink.

Use `docs/backlink-outreach-tracker.csv` to record targets and outcomes. Drafts are in `docs/backlink-outreach-templates.md`. Do not send bulk or automated requests.

## Monitoring checklist

- In Google Search Console, verify the correct site property, submit the sitemap, inspect representative home/about/chapter/event URLs, and review indexing and crawl reports.
- Compare Search Console's Links report with at least one independent backlink checker monthly; record tool, date, and queried hostname. Different discovery systems and indexes will produce different totals.
- Track referring domains, new/lost domains, target pages, relevance, broken incoming links where detectable, and whether links are editorial, sponsored, or user-generated.
- Track organic impressions/clicks and index coverage for new event reports and original learning resources.
- Recheck the sitemap after deployment and confirm `/verify` remains noindex and absent from it.
- Review outreach status and follow-up dates monthly. A placement is confirmed only after the public destination loads and the link target and attributes are checked.

## External actions still needed

- Deploy the source changes before expecting live responses to change.
- Confirm the preferred long-term domain and Vercel/DNS control if a custom domain is desired.
- Review Search Console coverage and the backlink vendor's exact report/query to investigate its zero count.
- Confirm chapter leadership/activity, event venue and partner details, and maintain the displayed `sameAs` profiles.
- Conduct personalized outreach and verify any resulting placements.
