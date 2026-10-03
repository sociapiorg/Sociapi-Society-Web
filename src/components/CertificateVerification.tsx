import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findCertificate, type Certificate } from "../data/certificates";
import { findWebinarCertificate } from "../data/webinarCertificates";
import { Container } from "./ui";

type VerificationCertificate = Certificate & { platform?: string };
type State = {
  status: "idle" | "loading" | "valid" | "invalid";
  certificate?: VerificationCertificate;
  id?: string;
};

export default function CertificateVerification() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(certificateId ?? "");
  const [state, setState] = useState<State>({ status: "idle" });

  function verify(raw: string) {
    const id = raw.trim().toUpperCase();
    if (!id) {
      setState({ status: "idle" });
      return;
    }

    setState({ status: "loading", id });
    window.setTimeout(() => {
      const certificate = findCertificate(id) ?? findWebinarCertificate(id);
      setState(certificate ? { status: "valid", certificate, id } : { status: "invalid", id });
    }, 250);
  }

  useEffect(() => {
    if (certificateId) {
      setValue(certificateId);
      verify(certificateId);
    } else {
      setValue("");
      setState({ status: "idle" });
    }
  }, [certificateId]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = value.trim().toUpperCase();
    if (id) navigate(`/verify/${encodeURIComponent(id)}`);
    else setState({ status: "idle" });
  }

  const certificate = state.certificate;

  return (
    <div className="verify-page">
      <section className="verify-hero">
        <Container>
          <p>OFFICIAL RECORDS / SOCIAPI SOCIETY</p>
          <h1>Verify certificate</h1>
          <span>Check whether a certificate was officially issued by Sociapi Society.</span>
        </Container>
      </section>
      <section className="verify-body">
        <Container>
          <div className="verify-card">
            <form onSubmit={submit}>
              <label htmlFor="certificate-id">Certificate ID</label>
              <div>
                <input
                  id="certificate-id"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="e.g. SA-011 or SACC-2601"
                  autoComplete="off"
                />
                <button type="submit">Verify Certificate</button>
              </div>
              <p>Enter the ID printed on the certificate. QR codes open this page with the ID already filled.</p>
            </form>
            {state.status === "loading" ? (
              <div className="verify-loading" role="status"><span />Checking official records…</div>
            ) : null}
            {state.status === "invalid" ? (
              <div className="verify-result invalid" role="alert">
                <b>Certificate not found</b>
                <p>No matching record was found for <code>{state.id}</code>. Check the ID and try again.</p>
              </div>
            ) : null}
            {state.status === "valid" && certificate ? (
              <div className="verify-result valid" role="status">
                <header>
                  <span aria-hidden="true">✓</span>
                  <div><b>Valid certificate</b><p>Official Sociapi Society record</p></div>
                </header>
                <dl>
                  <div><dt>Certificate holder</dt><dd>{certificate.name}</dd></div>
                  <div><dt>Course / event</dt><dd>{certificate.course}</dd></div>
                  <div><dt>Program</dt><dd>{certificate.program}</dd></div>
                  {certificate.platform ? <div><dt>Platform</dt><dd>{certificate.platform}</dd></div> : null}
                  <div><dt>Issue date</dt><dd>{certificate.issueDate}</dd></div>
                  <div><dt>Certificate ID</dt><dd>{certificate.certificateId}</dd></div>
                  <div><dt>Status</dt><dd>{certificate.status}</dd></div>
                </dl>
                {certificate.certificateFile ? (
                  <a href={certificate.certificateFile} target="_blank" rel="noreferrer">View issued certificate ↗</a>
                ) : null}
              </div>
            ) : null}
          </div>
          <aside className="verify-note">
            <b>About verification</b>
            <p>Bootcamp and webinar certificates are checked against Sociapi Society’s official certificate records.</p>
            <a href="mailto:sociapisociety@gmail.com?subject=Certificate%20support">Certificate support ↗</a>
          </aside>
        </Container>
      </section>
    </div>
  );
}
