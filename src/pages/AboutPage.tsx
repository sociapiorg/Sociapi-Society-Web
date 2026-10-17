import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "../components/ui";
import { links } from "../data/site";
import { teamMembers } from "../data/secondary";
import { founderMessage } from "../data/founderMessage";
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
  { src: "/Image/Agentum Pic/0001.webp", title: "AGENTUM", note: "150+ attendees", alt: "A speaker presenting at the AGENTUM seminar", href: "/events/agentum-2026", width: 1200, height: 1600 },
  { src: "/Image/2.webp", title: "Mehfil AI", note: "150+ attendees", alt: "Students attending a Mehfil AI session", href: "/events/mehfil-ai-2026", width: 1080, height: 1350 },
] as const;

function trackExplorePointer(event: PointerEvent<HTMLLIElement>) {
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

function resetExplorePointer(event: PointerEvent<HTMLLIElement>) {
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

  return <div className="about-editorial">
    <section className="about-hero-new" aria-labelledby="about-title">
      <div className="about-hero-panel"><Container>
        <p className="about-kicker">STUDENT-LED · PAKISTAN</p>
        <h1 id="about-title"><span className="about-hero-line">WE DON'T JUST</span><span className="about-hero-line">LEARN THE FUTURE.</span><span className="about-hero-line">WE <em>BUILD</em> IT.</span></h1>
        <p className="about-hero-description">Sociapi Society is a student-led technology community at Islamia College University Peshawar, bringing students together to learn, collaborate, and turn ideas into practical projects.</p>
        <div className="about-hero-actions"><Button to="/team">Explore Our Community</Button><a href="#about-story">Our Story <span aria-hidden="true">↘</span></a></div>
        <span className="about-hero-index" aria-hidden="true">01 / ABOUT SOCIAPI</span>
      </Container></div>
      <div className="about-hero-image"><img ref={heroImageRef} src="/Image/Agentum Pic/6.webp" alt="A Sociapi presenter speaking at the AGENTUM seminar" width="1200" height="1600" fetchPriority="high" decoding="async" /></div>
    </section>

    <section className="about-proof" aria-label="Sociapi community reach" data-reveal><Container>
      <p className="about-proof-label">COMMUNITY IN ACTION</p>
      <article><strong>150+</strong><span>AGENTUM attendees</span></article>
      <article><strong>150+</strong><span>Mehfil AI attendees</span></article>
      <article><strong>520+</strong><span>Participants across Sociapi programs and events</span></article>
    </Container></section>

    <section className="about-why" aria-labelledby="about-why-title" data-reveal><Container>
      <div className="about-why-heading"><p className="about-kicker">02 — WHY WE EXIST</p><h2 id="about-why-title">A practical place to <em>learn technology.</em></h2></div>
      <div className="about-why-copy"><p>Members practice in workshops, collaborate on projects, and share what they learn through Sociapi events and campus chapters.</p><figure><img src="/Image/ss team.jpg" alt="Sociapi Society members gathered outdoors on campus" width="1440" height="990" loading="lazy" decoding="async" /><figcaption>Students learning and working together on campus.</figcaption></figure></div>
    </Container></section>

    <section className="about-way" aria-labelledby="about-way-title" data-reveal><Container>
      <header className="about-way-heading"><p className="about-kicker">03 — HOW MEMBERS TAKE PART</p><h2 id="about-way-title">Learn through <em>real activity.</em></h2><p>Start with a workshop, join a project, volunteer at an event, or lead activity on your campus.</p></header>
      <ol className="about-way-grid">{principles.map(item => <li key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><b aria-hidden="true">↗</b></li>)}</ol>
    </Container></section>

    <section id="about-story" className="about-story" aria-labelledby="about-story-title" data-reveal><Container>
      <div className="about-story-label"><p className="about-kicker">04 — OUR STORY</p><span>ISLAMIA COLLEGE UNIVERSITY PESHAWAR</span></div>
      <div className="about-story-copy"><h2 id="about-story-title">Started at Islamia College University Peshawar.</h2><p className="about-story-date">DECEMBER 2025 <i aria-hidden="true" /> PESHAWAR, PAKISTAN</p><p>Sociapi began at Islamia College University Peshawar in December 2025. Students now take part through workshops, events, projects, volunteering, and campus chapters.</p><Link to="/team">Meet the people behind Sociapi <span aria-hidden="true">↗</span></Link></div>
    </Container></section>

    {founder && <section className="about-founder" aria-labelledby="about-founder-title" data-reveal><Container>
      <div className="about-founder-photo"><img src={founder.image} alt={`Portrait of ${founder.name}, founder of Sociapi Society`} width="600" height="750" loading="lazy" decoding="async" /><span>THE PERSON BEHIND THE IDEA</span><i aria-hidden="true" /></div>
      <div className="about-founder-copy"><p className="about-kicker">A NOTE FROM THE FOUNDER</p><h2 id="about-founder-title">Muhammad<br /><em>Zuhair Zeb</em></h2><p className="about-founder-bio">{founder.bio}</p><div className="about-founder-quote"><span aria-hidden="true">“</span><blockquote>{founderMessage.quote}</blockquote></div><p className="about-founder-signoff">FOUNDER, SOCIAPI SOCIETY</p>
        <button className="founder-message-trigger" type="button" aria-expanded={founderMessageOpen} aria-controls="founder-full-message" onClick={() => setFounderMessageOpen(open => !open)}>{founderMessageOpen ? "Close the full message" : "Read the full message"}<span aria-hidden="true">{founderMessageOpen ? "−" : "+"}</span></button>
      </div>
      {founderMessageOpen && <div id="founder-full-message" className="founder-full-message" role="region" aria-label="Founder's full message"><button className="founder-message-close" type="button" onClick={() => setFounderMessageOpen(false)} aria-label="Close the founder's full message">×</button><p className="about-kicker">A NOTE FROM THE FOUNDER</p>{founderMessage.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="founder-message-signoff">Muhammad Zuhair Zeb <span>· Founder, Sociapi Society</span></p></div>}
    </Container></section>}

    <section className="about-people" aria-labelledby="about-people-title" data-reveal><Container>
      <header className="about-people-heading"><p className="about-kicker">05 — LEADERSHIP</p><h2 id="about-people-title">The minds moving us forward.</h2><Link to="/team">Meet the full team <span aria-hidden="true">↗</span></Link></header>
      <div className="about-people-grid">{leaders.map(person => <article key={person.name}><div className="about-person-photo"><img src={person.image} alt={`Portrait of ${person.name}`} width="600" height="750" loading="lazy" decoding="async" /></div><div className="about-person-copy"><p>{person.role === "Advisor" ? "ACADEMIC ADVISOR" : person.role.toUpperCase()}</p><h3>{person.name}</h3><span>{person.bio}</span></div></article>)}</div>
      <div className="about-after-founder"><Button to={links.join} external>Join Sociapi</Button></div>
    </Container></section>

    <section className="about-focus" aria-labelledby="about-focus-title" data-reveal><Container>
      <div className="about-focus-heading"><p className="about-kicker">06 — WHAT MEMBERS EXPLORE</p><h2 id="about-focus-title">Technology to <em>learn and use.</em></h2><p>These are the fields members explore through workshops, projects, and community events.</p></div>
      <div className="about-focus-list"><h3 className="about-focus-list-title">WHAT WE EXPLORE</h3><ol aria-label="Technology areas">{focusAreas.map((field, index) => <li key={field} style={{ "--item-index": index } as CSSProperties} onPointerMove={trackExplorePointer} onPointerLeave={resetExplorePointer}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="about-focus-topic">{field}</span></li>)}</ol></div>
    </Container></section>

    <section className="about-events" aria-labelledby="about-events-title" data-reveal><Container>
      <header className="about-events-heading"><div><p className="about-kicker">IN THE ROOM TOGETHER</p><h2 id="about-events-title">Seminars and events students join.</h2></div><Link to="/events">Explore all events <span aria-hidden="true">↗</span></Link></header>
      <div className="about-event-grid">{eventPhotos.map((photo, index) => <figure className={`about-event-card about-event-card-${index + 1}`} key={photo.title}><Link className="about-event-link" to={photo.href}><div className="about-event-image"><img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" /></div><figcaption><span><strong>{photo.title}</strong><small>{photo.note}</small></span><b aria-hidden="true">↗</b></figcaption></Link></figure>)}</div>
    </Container></section>

    <section className="about-signoff" aria-labelledby="about-signoff-title" data-reveal><Container><p className="about-kicker">TAKE PART</p><h2 id="about-signoff-title">Learn with your<br /><em>campus community.</em></h2><p>Join a chapter, take part in a workshop, or volunteer at an event.</p><Button to={links.join} external>Join Sociapi Society</Button></Container></section>
    <a className="about-sticky-join" href={links.join} target="_blank" rel="noreferrer">Join Sociapi</a>
  </div>;
}
