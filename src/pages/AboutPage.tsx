import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../components/ui";
import { links } from "../data/site";
import { teamMembers } from "../data/secondary";
import { founderMessage } from "../data/founderMessage";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Avatar, Style } from "@dicebear/core";
import gazeDefinition from "@dicebear/styles/gaze.json";
import "./AboutPage.css";

const principles = [
  { number: "01", title: "Join a workshop", text: "Practice technical and professional skills alongside other students." },
  { number: "02", title: "Work on a project", text: "Build useful ideas with students and campus teams." },
  { number: "03", title: "Volunteer at an event", text: "Help with event operations, media, or student outreach." },
  { number: "04", title: "Lead on your campus", text: "Organize local activity and connect with other Sociapi chapters." },
];

const focusAreas = [
  "Artificial Intelligence", "Generative AI", "Machine Learning", "Deep Learning",
  "Robotics", "Computer Vision", "Software Engineering", "Programming",
  "Data Science", "Data Analysis", "Web Development", "Emerging Technologies",
];

const eventPhotos = [
  { src: "/Image/Event Image/Agentum Pic/0001.webp", title: "AGENTUM", note: "150+ attendees", alt: "A speaker presenting at the AGENTUM seminar", href: "/events/agentum-2026", width: 1200, height: 1600 },
  { src: "/Image/Event Image/Mehfil AI/2.webp", title: "Mehfil AI", note: "150+ attendees", alt: "Students attending a Mehfil AI session", href: "/events/mehfil-ai-2026", width: 1080, height: 1350 },
] as const;

const aboutGuides = {
  hero: { message: "Hi, I’m Gaze! Let’s get to know Sociapi.", side: "right", action: "wave" },
  proof: { message: "Students are learning and building together.", side: "left", action: "celebrate" },
  why: { message: "Technology feels closer when we learn it together.", side: "right", action: "point" },
  way: { message: "Pick a workshop, project, or campus activity to start.", side: "left", action: "wave" },
  story: { message: "It all started with one campus in Peshawar.", side: "right", action: "point" },
  founder: { message: "Meet the people and idea behind Sociapi.", side: "left", action: "wave" },
  people: { message: "A student community grows because of its people.", side: "right", action: "celebrate" },
  focus: { message: "There’s plenty to explore. Follow what interests you.", side: "left", action: "point" },
  events: { message: "Learn something new, then bring a friend along.", side: "right", action: "wave" },
  signoff: { message: "Ready? Your campus story can start right here.", side: "left", action: "celebrate" },
} as const;

type AboutGuideKey = keyof typeof aboutGuides;
type AboutGuideState = (typeof aboutGuides)[AboutGuideKey];

const aboutGaze = new Avatar(new Style(gazeDefinition), {
  seed: "sociapi-society-guide",
  size: 128,
}).toDataUri();

function AboutGuide({ guide }: { guide: AboutGuideState }) {
  const guideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let lookX = 0;
    let lookY = 0;
    const followPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = guideRef.current?.getBoundingClientRect();
      if (!bounds) return;
      lookX = Math.max(-5, Math.min(5, ((event.clientX - bounds.left) / bounds.width - 0.5) * 10));
      lookY = Math.max(-4, Math.min(4, ((event.clientY - bounds.top) / bounds.height - 0.5) * 8));
      if (frame) return;
      frame = requestAnimationFrame(() => {
        guideRef.current?.style.setProperty("--look-x", `${lookX}px`);
        guideRef.current?.style.setProperty("--look-y", `${lookY}px`);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", followPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside ref={guideRef} className={`about-guide about-guide--${guide.side}`} data-action={guide.action}>
      <p className="about-guide-note">{guide.message}</p>
      <div className="about-guide-orbit" aria-hidden="true">
        <span className="about-guide-spark about-guide-spark--one" />
        <span className="about-guide-spark about-guide-spark--two">·</span>
        <img className="about-guide-art" src={aboutGaze} alt="" width={76} height={76} loading="eager" decoding="async" />
      </div>
    </aside>
  );
}

function trackExplorePointer(event: ReactPointerEvent<HTMLLIElement>) {
  if (event.pointerType !== "mouse" || window.innerWidth <= 760 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
  card.style.setProperty("--pointer-x", `${x * 100}%`);
  card.style.setProperty("--pointer-y", `${y * 100}%`);
  card.style.setProperty("--rotate-x", `${(0.5 - y) * 4}deg`);
  card.style.setProperty("--rotate-y", `${(x - 0.5) * 4}deg`);
}

function resetExplorePointer(event: ReactPointerEvent<HTMLLIElement>) {
  const card = event.currentTarget;
  card.style.removeProperty("--pointer-x");
  card.style.removeProperty("--pointer-y");
  card.style.removeProperty("--rotate-x");
  card.style.removeProperty("--rotate-y");
}

export default function AboutPage() {
  const founder = teamMembers.find(person => person.role === "Founder");
  const leaders = teamMembers.filter(person => ["Co-Founder", "President", "Vice President", "Advisor"].includes(person.role));
  const heroImageRef = useRef<HTMLImageElement>(null);
  const [founderMessageOpen, setFounderMessageOpen] = useState(false);
  const [guide, setGuide] = useState<AboutGuideState>(aboutGuides.hero);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...document.querySelectorAll<HTMLElement>(".about-editorial section[data-reveal]")];
    if (!media.matches && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-revealed");
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.08 });
      sections.forEach(section => { section.classList.add("about-reveal"); observer.observe(section); });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".about-editorial section[data-about-guide]")];
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      const active = entries
        .filter(entry => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]?.target;
      const key = active?.getAttribute("data-about-guide");
      const nextGuide = Object.entries(aboutGuides).find(([name]) => name === key)?.[1];
      if (nextGuide) setGuide(nextGuide);
    }, { rootMargin: "-18% 0px -38% 0px", threshold: [0.15, 0.35, 0.6] });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const image = heroImageRef.current;
    if (!image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => image.style.setProperty("--hero-scroll", `${Math.min(window.scrollY * 0.045, 22)}px`));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", update); cancelAnimationFrame(frame); image.style.removeProperty("--hero-scroll"); };
  }, []);

  return <>
    <div className="about-editorial">
    <section className="about-hero-new" aria-labelledby="about-title" data-about-guide="hero">
      <div className="about-hero-panel"><Container>
        <p className="about-kicker">STUDENT-LED · PAKISTAN</p>
        <h1 id="about-title"><span className="about-hero-line">WE DON'T JUST</span><span className="about-hero-line">LEARN THE FUTURE.</span><span className="about-hero-line">WE <em>BUILD</em> IT.</span></h1>
        <p className="about-hero-description">Sociapi Society is a student-led technology community at Islamia College University Peshawar, bringing students together to learn, collaborate, and turn ideas into practical projects.</p>
        <div className="about-hero-actions"><Button to="/team">Explore Our Community</Button><a href="#about-story">Our Story <span aria-hidden="true">↘</span></a></div>
        <span className="about-hero-index" aria-hidden="true">01 / ABOUT SOCIAPI</span>
      </Container></div>
      <div className="about-hero-image">
        <ResponsiveImage ref={heroImageRef} src="/Image/Event Image/Agentum Pic/6.webp" alt="A Sociapi presenter speaking at the AGENTUM seminar" width={1200} height={1600} fetchPriority="high" decoding="async" sizes="(max-width: 760px) 100vw, 50vw" />
        <svg className="about-hero-outline" viewBox="0 0 500 600" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M17 9c66-4 125 3 193-1s126 5 201-1c27-2 75-1 78 13 4 75-2 151 2 228s-5 153 1 229c2 35-1 77-13 79-75 5-153-2-231 2s-150-4-228 2c-9 1-13-7-13-20 4-77-2-154 1-231s-3-154 1-230c1-32 0-67 8-70Z" /></svg>
        <span className="about-hero-note" aria-hidden="true">Ideas grow here <i>↗</i></span>
      </div>
    </section>

    <section className="about-proof" aria-label="Sociapi community reach" data-reveal data-about-guide="proof"><Container>
      <p className="about-proof-label">COMMUNITY IN ACTION</p>
      <article><strong>150+</strong><span>AGENTUM attendees</span></article>
      <article><strong>150+</strong><span>Mehfil AI attendees</span></article>
      <article><strong>520+</strong><span>Participants across Sociapi programs and events</span></article>
    </Container></section>

    <section className="about-why" aria-labelledby="about-why-title" data-reveal data-about-guide="why"><Container>
      <div className="about-why-heading"><p className="about-kicker">02 — WHY WE EXIST</p><h2 id="about-why-title">Why was Sociapi created?</h2></div>
      <div className="about-why-copy"><p>Members practice in workshops, collaborate on projects, and share what they learn through Sociapi events and campus chapters.</p><figure><ResponsiveImage src="/Image/Event Image/Agentum Pic/IMG_5921.png" alt="Sociapi Society students together at an AGENTUM event" width={3024} height={4032} loading="lazy" decoding="async" sizes="(max-width: 760px) 100vw, 40vw" /><figcaption>Students learning and working together on campus.</figcaption></figure></div>
    </Container></section>

    <section className="about-way" aria-labelledby="about-way-title" data-reveal data-about-guide="way"><Container>
      <header className="about-way-heading"><p className="about-kicker">03 — HOW MEMBERS TAKE PART</p><h2 id="about-way-title">How do members take part?</h2><p>Start with a workshop, join a project, volunteer at an event, or lead activity on your campus.</p></header>
      <ol className="about-way-grid">{principles.map(item => <li key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><b aria-hidden="true">↗</b></li>)}</ol>
    </Container></section>

    <section id="about-story" className="about-story" aria-labelledby="about-story-title" data-reveal data-about-guide="story"><Container>
      <div className="about-story-label"><p className="about-kicker">04 — OUR STORY</p><span>ISLAMIA COLLEGE UNIVERSITY PESHAWAR</span></div>
      <div className="about-story-copy"><h2 id="about-story-title">Where did Sociapi begin?</h2><p className="about-story-date">DECEMBER 2025 <i aria-hidden="true" /> PESHAWAR, PAKISTAN</p><p>Sociapi began at Islamia College University Peshawar in December 2025. Students now take part through workshops, events, projects, volunteering, and campus chapters.</p><Link to="/team">Meet the people behind Sociapi <span aria-hidden="true">↗</span></Link></div>
    </Container></section>

    {founder && <section className="about-founder" aria-labelledby="about-founder-title" data-reveal data-about-guide="founder"><Container>
      <div className="about-founder-photo"><ResponsiveImage src={founder.image} alt={`Portrait of ${founder.name}, founder of Sociapi Society`} width={600} height={750} loading="lazy" decoding="async" sizes="(max-width: 760px) 90vw, 40vw" /><span>THE PERSON BEHIND THE IDEA</span><i aria-hidden="true" /></div>
      <div className="about-founder-copy"><p className="about-kicker">A NOTE FROM THE FOUNDER</p><h2 id="about-founder-title">Muhammad<br /><em>Zuhair Zeb</em></h2><p className="about-founder-bio">{founder.bio}</p><div className="about-founder-quote"><span aria-hidden="true">“</span><blockquote>{founderMessage.quote}</blockquote></div><p className="about-founder-signoff">FOUNDER, SOCIAPI SOCIETY</p>
        <button className="founder-message-trigger" type="button" aria-expanded={founderMessageOpen} aria-controls="founder-full-message" onClick={() => setFounderMessageOpen(open => !open)}>{founderMessageOpen ? "Close the full message" : "Read the full message"}<span aria-hidden="true">{founderMessageOpen ? "−" : "+"}</span></button>
      </div>
      {founderMessageOpen && <div id="founder-full-message" className="founder-full-message" role="region" aria-label="Founder's full message"><button className="founder-message-close" type="button" onClick={() => setFounderMessageOpen(false)} aria-label="Close the founder's full message">×</button><p className="about-kicker">A NOTE FROM THE FOUNDER</p>{founderMessage.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="founder-message-signoff">Muhammad Zuhair Zeb <span>· Founder, Sociapi Society</span></p></div>}
    </Container></section>}

    <section className="about-people" aria-labelledby="about-people-title" data-reveal data-about-guide="people"><Container>
      <header className="about-people-heading"><p className="about-kicker">05 — LEADERSHIP</p><h2 id="about-people-title">Who leads Sociapi Society?</h2><Link to="/team">Meet the full team <span aria-hidden="true">↗</span></Link></header>
      <div className="about-people-grid">{leaders.map(person => <article key={person.name}><div className="about-person-photo"><ResponsiveImage src={person.image} alt={`Portrait of ${person.name}`} width={600} height={750} loading="lazy" decoding="async" sizes="(max-width: 760px) 80vw, 25vw" /></div><div className="about-person-copy"><p>{person.role === "Advisor" ? "ACADEMIC ADVISOR" : person.role.toUpperCase()}</p><h3>{person.name}</h3><span>{person.bio}</span></div></article>)}</div>
      <div className="about-after-founder"><Button to={links.join} external>Join Sociapi</Button></div>
    </Container></section>

    <section className="about-focus" aria-labelledby="about-focus-title" data-reveal data-about-guide="focus"><Container>
      <div className="about-focus-heading"><p className="about-kicker">06 — WHAT MEMBERS EXPLORE</p><h2 id="about-focus-title">What can members learn?</h2><p>These are the fields members explore through workshops, projects, and community events.</p></div>
      <div className="about-focus-list"><h3 className="about-focus-list-title">WHAT WE EXPLORE</h3><ol aria-label="Technology areas">{focusAreas.map((field, index) => <li key={field} style={{ "--item-index": index } as CSSProperties} onPointerMove={trackExplorePointer} onPointerLeave={resetExplorePointer}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="about-focus-topic">{field}</span></li>)}</ol></div>
    </Container></section>

    <section className="about-events" aria-labelledby="about-events-title" data-reveal data-about-guide="events"><Container>
      <header className="about-events-heading"><div><p className="about-kicker">IN THE ROOM TOGETHER</p><h2 id="about-events-title">Which events bring students together?</h2></div><Link to="/events">Explore all events <span aria-hidden="true">↗</span></Link></header>
      <div className="about-event-grid">{eventPhotos.map((photo, index) => <figure className={`about-event-card about-event-card-${index + 1}`} key={photo.title}><Link className="about-event-link" to={photo.href}><div className="about-event-image"><ResponsiveImage src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" sizes="(max-width: 760px) 100vw, 50vw" /></div><figcaption><span><strong>{photo.title}</strong><small>{photo.note}</small></span><b aria-hidden="true">↗</b></figcaption></Link></figure>)}</div>
    </Container></section>

    <section className="about-signoff" aria-labelledby="about-signoff-title" data-reveal data-about-guide="signoff"><Container><p className="about-kicker">TAKE PART</p><h2 id="about-signoff-title">Learn with your<br /><em>campus community.</em></h2><p>Join a chapter, take part in a workshop, or volunteer at an event.</p><Button to={links.join} external>Join Sociapi Society</Button></Container></section>
    <a className="about-sticky-join" href={links.join} target="_blank" rel="noreferrer">Join Sociapi</a>
    </div>
    <AboutGuide guide={guide} />
  </>;
}
