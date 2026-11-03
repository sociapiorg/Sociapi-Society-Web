import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from "react-router-dom";
import { PageHero, Container, Button } from "../components/ui";
import { faqs, facebookReviews, galleryGroups, pastMembers, reviews, services } from "../data/secondary";
import { links, people } from "../data/site";

import { designProjects, labProjects } from '../data/projects';
import { ResponsiveImage } from "../components/ResponsiveImage";
import "./TeamPage.css";

export function TeamPage() {
  const leaders = people.filter(person => person.group === "Leadership");
  const advisor = people.filter(person => person.group === "Advisor");
  const coreMembers = people.filter(person => person.group === "Core team");
  const activeTeamCount = coreMembers.length;
  return <>
    <div className="team-page">
    <section className="team-hero" aria-labelledby="team-page-title">
      <Container>
        <div className="team-hero-copy">
          <p className="team-hand-label"><span>✳</span> Sociapi Society / National Team</p>
          <h1 id="team-page-title">Good people.<br />Big <em>ideas.</em><br />One community.</h1>
          <p>Meet the students and mentors who bring Sociapi together across campuses, events, and everything in between.</p>
          <a className="team-hero-link" href="#team-leadership">Meet the crew <span aria-hidden="true">↘</span></a>
        </div>
        <div className="team-hero-art" aria-hidden="true">
          <span className="team-hero-sun">✳</span>
          <span className="team-hero-note team-hero-note--one">ideas<br />welcome!</span>
          <span className="team-hero-note team-hero-note--two">{activeTeamCount} minds<br />making things happen</span>
          <div className="team-doodle-people">
            <svg viewBox="0 0 360 270" fill="none">
              <path d="M66 231c4-48 24-75 61-75s58 27 62 75M165 231c4-48 24-75 61-75s58 27 62 75" />
              <path d="M91 83c0-25 16-43 38-43 23 0 40 18 40 43v18c0 25-17 42-40 42-22 0-38-17-38-42V83Zm99 0c0-25 16-43 38-43 23 0 40 18 40 43v18c0 25-17 42-40 42-22 0-38-17-38-42V83Z" />
              <path d="M102 95c8 5 17 5 25 0m18 0c8 5 16 5 24 0m30 0c8 5 17 5 25 0m17 0c8 5 16 5 24 0" />
              <path d="M130 131c8 8 18 8 27 0m72 0c8 8 18 8 27 0" />
              <path d="M48 174c-17-19-14-42 2-55m261 55c17-19 14-42-2-55M54 119l-10 1 4 11m255-12 10 1-4 11" />
              <path d="m43 63 7 11 13-2-8 10 5 12-12-6-10 8 2-13-10-8 13-1 0-11Zm274 92 6 9 10-1-7 8 4 10-9-5-8 6 1-10-8-6 10-1 1-10Z" />
            </svg>
          </div>
          <span className="team-hero-caption">drawn together, moving forward</span>
        </div>
        <span className="team-hero-index" aria-hidden="true">PEOPLE MAKE THE NETWORK · 2026</span>
      </Container>
    </section>
    <section className="team-editorial">
      <Container>
        <div className="team-context">
          <p>THE NATIONAL CREW</p>
          <strong>{activeTeamCount}</strong>
          <span>core team members across people, events, media, outreach, design, and operations. Many hands, one shared idea.</span>
        </div>
        <header id="team-leadership" className="team-section-head"><span>01 / LEADERSHIP</span><h2>The ones steering the ship.</h2><p>Founder, Co-Founder, and General Secretary working through one shared structure.</p></header>
        <div className="leadership-roster">
          {leaders.map(person => <article key={person.name}>
            <div className="team-portrait"><ResponsiveImage src={person.image} alt={person.name} loading="lazy" decoding="async" sizes="(max-width: 760px) 50vw, 25vw" /></div>
            <div>
              <span>{person.role} <i aria-hidden="true">✳</i></span>
              <h2>{person.name}</h2>
            </div>
          </article>)}
        </div>
        <section className="advisor-roster">
          <header><span>02 / ADVISOR</span><h2>A thoughtful nudge in the right direction.</h2></header>
          {advisor.map(person => <article key={person.name}><div className="team-portrait"><ResponsiveImage src={person.image} alt={person.name} loading="lazy" decoding="async" sizes="(max-width: 760px) 50vw, 25vw" /></div><div><span>{person.role}</span><h3>{person.name}</h3></div></article>)}
        </section>
        <section className="department-section">
          <header className="team-section-head"><span>03 / CORE TEAM</span><h2>Different talents.<br />Same team.</h2><p>People responsible for operations, organizing, outreach, design, media, finance, decor, and human resources.</p></header>
          <div className="department-roster">{coreMembers.map((person, index) => <article key={person.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className={`roster-portrait${person.name === "Aqsa Sajid" ? " roster-portrait--aqsa" : ""}`}>
              {person.image
                ? <ResponsiveImage src={person.image} alt={person.name} loading="lazy" decoding="async" sizes="(max-width: 760px) 40vw, 15vw" />
                : <span className="roster-initials" aria-label={`${person.name} photo unavailable`}>{person.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase()}</span>}
            </div>
            <div><h3>{person.name}</h3><p>{person.role}</p></div>
            <span className="team-roster-doodle" aria-hidden="true">✳</span>
          </article>)}</div>
        </section>
        <aside className="chapter-team-note">
          <p>CHAPTER LEADERSHIP</p><h2>Every campus has its own story to tell.</h2><Link to="/chapters">Explore chapter leadership <span aria-hidden="true">↗</span></Link>
        </aside>
        <details className="contributors-archive">
          <summary><span>04 / PAST CONTRIBUTORS</span><strong>{pastMembers.length}</strong><b>Open archive <i aria-hidden="true">↘</i></b></summary>
          <div><p>Former team members whose work contributed to Sociapi's growth.</p><div>{pastMembers.map(member =>
            <article key={member.name}>{member.image && <ResponsiveImage src={member.image} alt={member.name} loading="lazy" decoding="async" sizes="(max-width: 760px) 30vw, 12vw" />}<strong>{member.name}</strong><span>{member.role}</span></article>
          )}</div></div>
        </details>
      </Container>
    </section>
    </div>
  </>;
}

export function GalleryPage() {
  const all = useMemo(() => galleryGroups.flatMap(group => group.images.map(src => ({ src, group: group.name }))), []);
  const [active, setActive] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (active === null) { openerRef.current?.focus(); return; }
    lightboxRef.current?.querySelector<HTMLElement>(".lightbox-close")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % all.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + all.length) % all.length);
      if (event.key === "Tab") {
        const items = [...(lightboxRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])') ?? [])];
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [active, all.length]);
  return <>
    <PageHero eyebrow="Gallery" title="Inside Sociapi." text="The rooms, stages, conversations, and people behind the community." image="/Image/Event Image/Agentum Pic/0001.webp" />
    <section className="gallery-page"><Container>
      {galleryGroups.map(group => <div className="gallery-chapter" key={group.name}>
        <header><h2>{group.name}</h2><span>{String(group.images.length).padStart(2, "0")} moments</span></header>
        <div className="editorial-gallery">
          {group.images.map((src, index) => {
            const global = all.findIndex(item => item.src === src);
            return <button key={src} className={`gallery-tile tile-${index % 7}`} onClick={event => { openerRef.current = event.currentTarget; setActive(global); }}>
              <ResponsiveImage src={src} alt={`${group.name} moment ${index + 1}`} loading="lazy" decoding="async" sizes="(max-width: 700px) 100vw, 33vw" /><span>Open image ↗</span>
            </button>;
          })}
        </div>
      </div>)}
    </Container></section>
    {active !== null && <div ref={lightboxRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery">×</button>
      <button className="lightbox-prev" onClick={event => { event.stopPropagation(); setActive((active - 1 + all.length) % all.length); }} aria-label="Previous image">←</button>
      <figure onClick={event => event.stopPropagation()}><ResponsiveImage src={all[active].src} alt={`${all[active].group} enlarged`} decoding="async" sizes="90vw" /><figcaption>{all[active].group} · {active + 1}/{all.length}</figcaption></figure>
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
      <div>{groups.map(group => <section key={group} id={group.replace(/\W+/g, "-").toLowerCase()}><p className="section-label">{group}</p><ul className="faq-questions">{faqs.filter(item => item.group === group).map(item => <li key={item.q}><article><h3>{item.q}</h3><details><summary>Read the answer<span aria-hidden="true">+</span></summary><p>{item.a}</p></details></article></li>)}</ul></section>)}</div>
    </Container></section>
  </>;
}


export function ServicesPage() {
  return <>
    <PageHero
      eyebrow='Sociapi Labs / Services'
      title='Useful digital work, built with care.'
      text='Selected software, web, and creative work from the secondary studio side of Sociapi. The Society remains a student technology community first.'
      image='/Image/Event Image/Agentum Pic/IMG_5998.png'
    />
    <section className='services-page'>
      <Container>
        <div className='labs-note'>
          <span>SOCIAPI SOCIETY</span><i>COMMUNITY</i><b>+</b>
          <span>SOCIAPI LABS</span><i>PROJECTS &amp; CREATIVE SERVICES</i>
        </div>

        <div className='services-intro'>
          <p className='section-label'>WHAT WE DO</p>
          <h2>Services for teams that need clear, practical work.</h2>
        </div>
        <div className='service-lines'>
          {services.map((service, index) => <article key={service.name}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{service.name}</h3>
            <p>{service.text}</p>
            <a href={`https://wa.me/923329984490?text=${encodeURIComponent(`Hello Sociapi, I am interested in ${service.name}.`)}`} target='_blank' rel='noreferrer'>Discuss a project <span aria-hidden='true'>{String.fromCharCode(8599)}</span></a>
          </article>)}
        </div>

        <div className='labs-projects'>
          <header className='labs-section-head'>
            <p className='section-label'>SELECTED PROJECTS / 03</p>
            <h2>Built beyond the browser.</h2>
            <p>Real tools and digital products designed around the way people actually work.</p>
          </header>
          <div className='project-cases'>
            {labProjects.map(project => <div className='project-case' key={project.name}>
              <div className='project-index'><span>{project.number}</span><p>{project.category}</p></div>
              <figure className='project-visual'><img src={project.image} alt={project.imageAlt} loading='lazy' /></figure>
              <div className='project-copy'>
                <h3>{project.name}</h3>
                <strong>{project.summary}</strong>
                <p>{project.details}</p>
                <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              </div>
              <div className='project-meta'>
                <p>BUILT WITH</p>
                <div>{project.stack.map(item => <span key={item}>{item}</span>)}</div>
                {project.link
                  ? <a href={project.link} target='_blank' rel='noreferrer'>{project.linkLabel} <span aria-hidden='true'>{String.fromCharCode(8599)}</span></a>
                  : <a href={`https://wa.me/923329984490?text=${encodeURIComponent(`Hello Sociapi, I would like to discuss a project similar to ${project.name}.`)}`} target='_blank' rel='noreferrer'>Discuss similar work <span aria-hidden='true'>{String.fromCharCode(8599)}</span></a>}
              </div>
            </div>)}
          </div>
        </div>

        <div className='design-showcase'>
          <header className='labs-section-head'>
            <p className='section-label'>GRAPHIC DESIGN</p>
            <h2>Campaigns people saw before they entered the room.</h2>
            <p>Selected event graphics created for real Sociapi programs and audiences.</p>
          </header>
          <div className='poster-pair'>
            {designProjects.map((project, index) => <figure key={project.title}>
              <div><img src={project.image} alt={project.alt} loading='lazy' /></div>
              <figcaption><span>0{index + 1}</span><div><strong>{project.title}</strong><p>{project.type}</p></div></figcaption>
            </figure>)}
          </div>
        </div>

        <div className='labs-contact'>
          <p>SOCIAPI LABS / PROJECT ENQUIRIES</p>
          <h2>Have something useful to build?</h2>
          <a href='https://wa.me/923329984490?text=Hello%20Sociapi%2C%20I%20would%20like%20to%20discuss%20a%20project.' target='_blank' rel='noreferrer'>Start a conversation <span aria-hidden='true'>{String.fromCharCode(8599)}</span></a>
        </div>
      </Container>
    </section>
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
  return <>
    <div className="home-gallery-teaser"><div><h2>Not stock photos. Real rooms. Real students.</h2><Link to="/gallery">Open the gallery</Link></div><ResponsiveImage src="/Image/Event Image/Agentum Pic/12.png" alt="Sociapi event moment" width="3024" height="4032" loading="lazy" decoding="async" sizes="(max-width: 700px) 100vw, 55vw" /><ResponsiveImage src="/Image/Event Image/Agentum Pic/14.png" alt="Sociapi community moment" width="3024" height="4032" loading="lazy" decoding="async" sizes="(max-width: 700px) 50vw, 20vw" /><ResponsiveImage src="/Image/Event Image/Mehfil AI/3.png" alt="MEHFIL AI moment" width="1080" height="1350" loading="lazy" decoding="async" sizes="(max-width: 700px) 50vw, 20vw" /></div>
    <div className="home-reviews"><div><h2>What members say</h2><Link to="/reviews">Read all feedback</Link></div><div>{reviews.slice(0, 3).map(review => <blockquote key={review.author}><p>“{review.excerpt}”</p><footer>{review.author}</footer></blockquote>)}</div></div>
  </>;
}

export function ChapterCTA() {
  return <section className="chapter-final"><ResponsiveImage src="/Image/Event Image/Agentum Pic/IMG_5921.png" alt="Sociapi community together" width="3024" height="4032" loading="lazy" decoding="async" sizes="100vw" /><div /><div className="chapter-final-content"><p>Your campus could be next.</p><h2>The next chapter starts with students.</h2><nav><Button to={links.chapter}>Start a Chapter</Button><Button to={links.join} external secondary>Join a Chapter</Button></nav></div></section>;
}
