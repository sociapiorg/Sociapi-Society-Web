import type { Certificate } from "./certificates";

export type WebinarCertificate = Certificate & {
  platform?: string;
};

/** Add exported webinar records here; keep Bootcamp records in certificates.ts. */
export const webinarCertificates: WebinarCertificate[] = [];

export function findWebinarCertificate(certificateId: string): WebinarCertificate | undefined {
  const normalizedId = certificateId.trim().toUpperCase();
  if (!normalizedId) return undefined;

  return webinarCertificates.find((certificate) => certificate.certificateId.trim().toUpperCase() === normalizedId);
}
