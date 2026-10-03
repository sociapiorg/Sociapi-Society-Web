import type { Certificate } from "./certificates";
import { sacc_2601Certificates } from "./webinarEvents/sacc_2601-webinar-certificates";

export type WebinarCertificate = Certificate & {
  platform?: string;
};

export const webinarCertificates: WebinarCertificate[] = [...sacc_2601Certificates];

export function findWebinarCertificate(certificateId: string): WebinarCertificate | undefined {
  const normalizedId = certificateId.trim().toUpperCase();
  if (!normalizedId) return undefined;

  return webinarCertificates.find((certificate) => certificate.certificateId.trim().toUpperCase() === normalizedId);
}
