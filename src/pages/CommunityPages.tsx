import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { PageHero, Container, Button } from "../components/ui";
import { faqs, facebookReviews, galleryGroups, pastMembers, reviews, services, teamMembers } from "../data/secondary";
import { links } from "../data/site";

export function TeamPage() {
  const leaders = teamMembers.filter(person => person.tier === "Leadership");
  const advisor = teamMembers.find(person => person.tier === "Advisor")!;
  const departmentLeads = teamMembers.filter(person => person.tier === "Department Lead");
  const coreMembers = teamMembers.filter(person => person.tier === "Core Member");
  return <>
    <PageHero eyebrow="Sociapi Society / National Team" title="The people behind the network." text="A student-led national team working across leadership, operations, events, outreach, media, and design." />
    <section className="team-editorial">
      <Container>
        <div className="team-context">
          <p>SOCIAPI SOCIETY / NATIONAL TEAM</p>
          <strong>11</strong>
          <span>core team members across people, events, media, outreach, design, and operations.</span>
        </div>
        <header className="team-section-head"><span>01 / LEADERSHIP</span><h2>One leadership team.</h2><p>Founder, Co-Founder, and General Secretary working through one shared structure.</p></header>
        <div className="leadership-roster">
          {leaders.map(person => <article key={person.name}>
            <div className="team-portrait"><img src={person.image} alt={person.name} /></div>
            <div>
              <span>{person.role}</span>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>)}
        </div>
        <section className="advisor-roster">
          <header><span>02 / ADVISOR</span><h2>Academic guidance.</h2></header>
          <article><div className="team-portrait"><img src={advisor.image} alt={advisor.name} /></div><div><span>{advisor.role}</span><h3>{advisor.name}</h3><p>{advisor.bio}</p></div></article>
        </section>
        <section className="department-section">
          <header className="team-section-head"><span>03 / DEPARTMENT LEADS</span><h2>National team leads.</h2><p>People responsible for the systems and disciplines that keep Sociapi moving.</p></header>
          <div className="department-roster">{departmentLeads.map((person, index) => <article key={person.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="roster-portrait"><img src={person.image} alt={person.name} /></div>
            <p>{person.department}</p><div><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>)}</div>
        </section>
        <section className="core-section">
          <header className="team-section-head"><span>04 / CORE MEMBERS</span><h2>The wider working team.</h2><p>Members supporting communication, media, event experience, outreach, and operations.</p></header>
          <div className="core-roster">{coreMembers.map(person => <article key={person.name}>
            <div className="roster-portrait"><img src={person.image} alt={person.name} /></div>
            <div><span>{person.department}</span><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>)}</div>
        </section>
        <aside className="chapter-team-note">
          <p>CHAPTER LEADERSHIP</p><h2>Campus teams are listed with their chapters.</h2><Link to="/chapters">Explore chapter leadership ↗</Link>
        </aside>
        <details className="contributors-archive">
          <summary><span>05 / PAST CONTRIBUTORS</span><strong>{pastMembers.length}</strong><b>Open archive</b></summary>
          <div><p>Former team members whose work contributed to Sociapi's growth.</p><div>{pastMembers.map(member => {
            const [name, role] = member.split(" — ");
            return <article key={member}><strong>{name}</strong><span>{role}</span></article>;
          })}</div></div>
        </details>
      </Container>
    </section>
  </>;
}

export function GalleryPage() {
  const all = useMemo(() => galleryGroups.flatMap(group => group.images.map(src => ({ src, group: group.name }))), []);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % all.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + all.length) % all.length);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [active, all.length]);
  return <>
    <PageHero eyebrow="Gallery" title="Inside Sociapi." text="The rooms, stages, conversations, and people behind the community." />
    <section className="gallery-page"><Container>
      {galleryGroups.map(group => <div className="gallery-chapter" key={group.name}>
        <header><h2>{group.name}</h2><span>{String(group.images.length).padStart(2, "0")} moments</span></header>
        <div className="editorial-gallery">
          {group.images.map((src, index) => {
            const global = all.findIndex(item => item.src === src);
            return <button key={src} className={`gallery-tile tile-${index % 7}`} onClick={() => setActive(global)}>
              <img src={src} alt={`${group.name} moment ${index + 1}`} loading="lazy" /><span>Open image ↗</span>
            </button>;
          })}
        </div>
      </div>)}
    </Container></section>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery">×</button>
      <button className="lightbox-prev" onClick={event => { event.stopPropagation(); setActive((active - 1 + all.length) % all.length); }} aria-label="Previous image">←</button>
      <figure onClick={event => event.stopPropagation()}><img src={all[active].src} alt={`${all[active].group} enlarged`} /><figcaption>{all[active].group} · {active + 1}/{all.length}</figcaption></figure>
      <button className="lightbox-next" onClick={event => { event.stopPropagation(); setActive((active + 1) % all.length); }} aria-label="Next image">→</button>
    </div>}
  </>;
}

export function ReviewsPage() {
  return <>
    <PageHero eyebrow="Community feedback" title="What people say about Sociapi." text="Real course feedback and Facebook recommendations shared by members of the community." />
    <section className="reviews-page"><Container>
      <div className="reviews-intro"><p className="section-label">In their words</p><h2>Learning that people remember.</h2><p>These reviews are shown with the names and source details supplied to Sociapi.</p></div>
      <div className="review-wall">
        {reviews.map((review, index) => <blockquote key={review.author} className={index === 2 ? "review-featured" : ""}>
          <span>“</span><p>{review.text}</p><footer><strong>{review.author}</strong><small>{review.source}</small></footer>
        </blockquote>)}
      </div>
      <a className="share-review" href={facebookReviews} target="_blank" rel="noreferrer">Share your experience on Facebook <span>↗</span></a>
    </Container></section>
  </>;
}

export function FAQPage() {
  const groups = [...new Set(faqs.map(item => item.group))];
  return <><PageHero eyebrow="Questions" title="Clear answers, quickly." text="Membership, chapters, programs, certificates, partnerships, and the shop." />
    <section className="faq-page"><Container>
      <nav aria-label="FAQ categories">{groups.map(group => <a key={group} href={`#${group.replace(/\W+/g, "-").toLowerCase()}`}>{group}</a>)}</nav>
      <div>{groups.map(group => <section key={group} id={group.replace(/\W+/g, "-").toLowerCase()}><p className="section-label">{group}</p>{faqs.filter(item => item.group === group).map(item => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</section>)}</div>
    </Container></section>
  </>;
}

export function ServicesPage() {
  return <><PageHero eyebrow="Sociapi Labs / Services" title="Work made by the creative side of Sociapi." text="A secondary initiative offering selected digital and creative services. Sociapi Society remains, first and foremost, a student technology community." image="/Image/Agentum Pic/IMG_5998.png" />
    <section className="services-page"><Container>
      <div className="labs-note"><span>SOCIAPI SOCIETY</span><i>COMMUNITY</i><b>+</b><span>SOCIAPI LABS</span><i>CREATIVE SERVICES</i></div>
      {services.map((service, index) => <article key={service.name}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.text}</p><a href={`https://wa.me/923329984490?text=${encodeURIComponent(`Hello Sociapi, I am interested in ${service.name}.`)}`} target="_blank" rel="noreferrer">Discuss a project ↗</a></article>)}
    </Container></section>
  </>;
}

export function ContactPage() {
  const routes = [["General inquiry", "sociapisociety@gmail.com", "mailto:sociapisociety@gmail.com"], ["Partnerships", "Work with the chapter network", "/partner-with-us"], ["Chapters / Campus Lead", "Start or join a chapter", links.chapter], ["Events", "Speak, attend, or collaborate", "mailto:sociapisociety@gmail.com?subject=Events inquiry"], ["WhatsApp", "+92 332 9984490", "https://wa.me/923329984490"]];
  return <><PageHero eyebrow="Contact" title="Start with the right conversation." text="Choose a direct route or send the team a message. No ticket system, no fake chat bot." />
    <section className="contact-page"><Container>
      <div className="contact-routes">{routes.map((route, index) => <a key={route[0]} href={route[2]}><span>0{index + 1}</span><h3>{route[0]}</h3><p>{route[1]}</p><b>↗</b></a>)}</div>
      <div className="contact-split">
        <ContactForm />
        <div className="contact-place"><iframe title="Islamia College University Peshawar map" loading="lazy" src="https://www.google.com/maps?q=Islamia%20College%20University%20Peshawar%20Pakistan&output=embed" /><h3>Islamia College University</h3><p>Peshawar, Pakistan</p><div><a href={links.instagram}>Instagram</a><a href={links.linkedin}>LinkedIn</a><a href={links.facebook}>Facebook</a></div></div>
      </div>
    </Container></section>
  </>;
}

type ContactErrors = Partial<Record<"name" | "email" | "phone" | "message" | "form", string>>;
const fakeWords = /(test|testing|student|example|demo|fake|unknown|anonymous|asdf|qwerty)/i;
function validPakistanPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^92(?=3)/, "0");
  if (!/^03\d{9}$/.test(digits)) return false;
  const subscriber = digits.slice(4);
  if (/(\d)\1{5,}/.test(subscriber)) return false;
  return !["012345", "123456", "234567", "345678", "456789", "987654", "876543", "765432", "654321", "543210"].some(sequence => subscriber.includes(sequence));
}
function validateContact(data: FormData): ContactErrors {
  const name = String(data.get("name") || "").trim().replace(/\s+/g, " ");
  const email = String(data.get("email") || "").trim().toLowerCase();
  const phone = String(data.get("phone") || "").trim();
  const message = String(data.get("message") || "").trim();
  const errors: ContactErrors = {};
  if (name.length < 4 || name.split(" ").length < 2 || fakeWords.test(name) || /^(.)\1+$/i.test(name.replace(/\s/g, ""))) errors.name = "Enter your real first and last name.";
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail\.com$/i.test(email) || fakeWords.test(email.split("@")[0])) errors.email = "Use your real Gmail address. Test, example, and university addresses are not accepted.";
  if (!validPakistanPhone(phone)) errors.phone = "Enter a valid Pakistani mobile number, such as 03XX XXXXXXX. Repeated or counting numbers are not accepted.";
  const messageWords = message ? message.split(/\s+/).length : 0;
  if (message.length < 15) errors.message = "Please write a genuine message of at least 15 characters.";
  else if (messageWords > 300) errors.message = "Keep your message within 300 words.";
  return errors;
}
function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [messageWords, setMessageWords] = useState(0);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    if (String(data.get("_honey") || "")) return;
    const nextErrors = validateContact(data); if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    const signature = [data.get("email"), data.get("phone"), data.get("message")].join("|").toLowerCase();
    const elapsed = Date.now() - Number(localStorage.getItem("sociapi-contact-time") || 0);
    if (elapsed < 60000 || (signature === localStorage.getItem("sociapi-contact-signature") && elapsed < 600000)) { setErrors({ form: "A message was recently submitted from this browser. Please wait before sending another." }); return; }
    setErrors({}); setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/sociapisociety@gmail.com", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      localStorage.setItem("sociapi-contact-signature", signature); localStorage.setItem("sociapi-contact-time", String(Date.now())); form.reset(); setMessageWords(0); setStatus("success");
    } catch { setStatus("idle"); setErrors({ form: "We could not send your message right now. Please try again or email sociapisociety@gmail.com." }); }
  }
  if (status === "success") return <div className="contact-thanks" role="status"><span>✓</span><h2>Thank you.</h2><p>Your form has been submitted. The Sociapi team will review your message and contact you if a response is needed.</p><button className="button" type="button" onClick={() => setStatus("idle")}>Send another message</button></div>;
  return <form onSubmit={submit} noValidate><input type="hidden" name="_subject" value="Contact inquiry from Sociapi website" /><label className="form-honey" aria-hidden="true">Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off" /></label><label>Name<input required name="name" autoComplete="name" aria-invalid={!!errors.name} />{errors.name && <small className="field-error">{errors.name}</small>}</label><label>Email<input required type="email" name="email" inputMode="email" autoComplete="email" placeholder="name@gmail.com" aria-invalid={!!errors.email} />{errors.email && <small className="field-error">{errors.email}</small>}</label><label>Phone<input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" aria-invalid={!!errors.phone} />{errors.phone && <small className="field-error">{errors.phone}</small>}</label><label>Topic<select name="type"><option>General inquiry</option><option>Campus chapter</option><option>Events</option><option>Technical support</option><option>Services</option></select></label><label className="full">Message<textarea required name="message" minLength={15} aria-invalid={!!errors.message || messageWords > 300} onChange={event => setMessageWords(event.target.value.trim() ? event.target.value.trim().split(/\s+/).length : 0)} /><span className={`word-counter${messageWords > 300 ? " over-limit" : ""}`} aria-live="polite">{messageWords} / 300 words</span>{errors.message && <small className="field-error">{errors.message}</small>}</label><button className="button" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>{errors.form ? <p className="form-error" role="alert">{errors.form}</p> : <p>Use a real name, Gmail address, and active Pakistani mobile number.</p>}</form>;
}

export function HomeTeasers() {
  return <><section className="home-gallery-teaser"><div><p>INSIDE SOCIAPI</p><h2>Not stock photos.<br />Real rooms. Real students.</h2><Link to="/gallery">Open the gallery ↗</Link></div><img src="/Image/Agentum Pic/12.png" alt="Sociapi event moment" /><img src="/Image/Agentum Pic/14.png" alt="Sociapi community moment" /><img src="/Image/3.png" alt="MEHFIL AI moment" /></section>
    <section className="home-reviews"><p>COMMUNITY FEEDBACK</p><div>{reviews.slice(0, 3).map(review => <blockquote key={review.author}><p>“{review.excerpt}”</p><footer>{review.author}</footer></blockquote>)}</div><Link to="/reviews">Read all feedback ↗</Link></section>
  </>;
}

export function ChapterCTA() {
  return <section className="chapter-final"><img src="/Image/Agentum Pic/IMG_5921.png" alt="Sociapi community together" /><div /><p>YOUR CAMPUS COULD BE NEXT.</p><h2>THE NEXT CHAPTER<br />STARTS WITH STUDENTS.</h2><nav><Button to={links.chapter}>Start a Chapter ↗</Button><Button to={links.join} external secondary>Join a Chapter ↗</Button></nav></section>;
}
