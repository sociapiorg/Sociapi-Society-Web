# Official website webinar certificate verification

This folder contains the source files for the Sociapi Society Vite/React website.
Merge the included `src` folder into the official website repository; do not
replace the whole `src` directory.

## Included files

- `src/components/CertificateVerification.tsx` checks webinar records first,
  then preserves the existing Bootcamp lookup.
- `src/components/CertificateVerification.css` styles the verification result
  and the webinar platform field.
- `src/data/webinarCertificates.ts` keeps the webinar registry separate and
  exposes the lookup used by the verification page.
- `src/data/webinarEvents/sacc_2601-webinar-certificates.ts` contains the 152
  public AWS & Cloud Computing webinar records, IDs `SACC-2601` through
  `SACC-2752`. No email addresses or other contact details are included.

## Add to the website

1. Copy/merge this folder's `src` files into the website source, preserving
   their paths. If prompted, replace the existing
   `src/components/CertificateVerification.tsx` and
   `src/components/CertificateVerification.css`.
2. Keep the existing `/verify` and `/verify/:certificateId` routes pointing to
   `CertificateVerification`. No new route is required.
3. Build and deploy the official website. Then test
   `https://sociapis.vercel.app/verify/SACC-2601`.

The TypeScript source was built successfully against the official site's
feature branch. This bundle alone does not deploy changes to the live website.
