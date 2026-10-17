import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { chapters, events, links, partners, stats } from "../data/site";
import { ChapterCTA, HomeTeasers } from "./CommunityPages";

const activities = [
  ["01", "Campus chapters", "Build and lead a useful technology community where you study.", "/chapters"],
  ["02", "Events", "Meet practitioners, students, and ideas in rooms designed for real conversation.", "/events"],
  ["03", "Workshops", "Practice technical and professional skills with other students.", "/opportunities"],
  ["04", "Projects", "Build useful ideas with students and campus teams.", "/opportunities"],
  ["05", "Opportunities", "Find ways to volunteer, collaborate, lead, speak, and build.", "/opportunities"],
] as const;
const cityOrder = ["Peshawar", "Mardan", "Nowshera", "Faisalabad", "Lahore", "Multan"];

function ImpactCounter({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const target = Number(value.match(/\d+/)?.[0] ?? 0);
  const digits = value.match(/\d+/)?.[0].length ?? 1;
  const suffix = value.replace(/\d+/, "");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(target); return; }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 2600, 1);
        const eased = progress < .5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setCount(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .45 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [target]);
  return <b ref={ref} aria-label={value}>{String(count).padStart(digits, "0")}{suffix}</b>;
}

export default function HomeCampaign() {
  const agentum = events[0];
  const mehfil = events[1];

  return <div className="campaign">
    <section className="campaign-hero">
      <div className="hero-photo hero-photo-main"><img src="/Image/ss team.jpg" alt="Sociapi students together at Islamia College University Peshawar" /></div>
      <div className="campaign-hero-shade" />
      <p className="campaign-kicker">Sociapi Society <span>• From Ideas to Intelligence.</span></p>
      <h1><span>Build skills.</span><span>Run events.</span><span className="lime-word"><strong>Lead</strong> your campus.</span></h1>
      <div className="campaign-hero-bottom">
        <p>Sociapi helps students create active tech communities inside their universities across Pakistan.</p>
        <div><Link className="hero-primary-cta" to="/chapters">Explore Chapters <b>↗</b></Link><a className="hero-secondary-cta" href={links.join} target="_blank" rel="noreferrer">Join Sociapi</a></div>
      </div>
    </section>
    <div className="movement-line" aria-label="Sociapi impact">{stats.map(stat => <span key={stat.label}><ImpactCounter value={stat.value} /> {stat.label}</span>)}</div>

    <section className="national-stage">
      <div className="national-intro"><p>THE NETWORK / PAKISTAN</p><h2><b>09</b> CHAPTERS<br />ACROSS PAKISTAN</h2><div><p>Student-led communities creating local opportunities while staying connected through one national network.</p><Link to="/chapters">Explore the national network ↗</Link></div></div>
      <div className="network-atlas">
        <div className="atlas-cities">{cityOrder.map(city => <Link to="/chapters" key={city}><strong>{city}</strong><span>{chapters.filter(chapter => chapter.city === city).length} {chapters.filter(chapter => chapter.city === city).length === 1 ? "chapter" : "chapters"}</span><b>↗</b></Link>)}</div>
        <div className="campus-ribbon">{chapters.map((chapter, index) => <Link key={chapter.slug} to={`/chapters/${chapter.slug}`}><sup>0{index + 1}</sup>{chapter.shortName}<span>{chapter.city}</span></Link>)}</div>
      </div>
    </section>

    <section className="practice-spread"><header><p>WHAT SOCIAPI DOES</p><h2>FIVE WAYS<br />TO TAKE PART.</h2><span>Choose the route that fits where you are now. Every route leads to people, practice, and a way to contribute.</span></header><div className="practice-board">{activities.map((activity, index) => <Link key={activity[0]} className={`practice-piece piece-${index + 1}`} to={activity[3]}><span>{activity[0]}</span><h3>{activity[1]}</h3><p>{activity[2]}</p><b>↗</b></Link>)}</div></section>

    <section className="flagship-intro"><p>FLAGSHIP EVENTS / 2026</p><h2>Two rooms.<br />One growing community.</h2><div><p>AGENTUM and MEHFIL AI are proof of the same idea: students deserve serious spaces for practical technology, careers, and conversation.</p><Link to="/events">Explore all events ↗</Link></div></section>
    <section className="event-case"><img src={agentum.image} alt="AGENTUM 2026 stage and audience" /><div className="event-case-veil" /><div className="event-case-index">PROOF / 01</div><div className="event-case-copy"><p>{agentum.date} · {agentum.attendance} students</p><h2>AGENTUM<br /><em>2026</em></h2><div><p>{agentum.summary}</p><Link to={`/events/${agentum.slug}`}>Enter the event story ↗</Link></div></div><div className="event-case-topics">{agentum.topics.map(topic => <span key={topic}>{topic}</span>)}</div></section>
    <section className="mehfil-story"><div className="mehfil-title"><span>PROOF / 02</span><h2>MEHFIL<br />AI 2026</h2><p>A student-led gathering bringing practical AI, careers, and community into one room.</p><Link to={`/events/${mehfil.slug}`}>See what happened ↗</Link></div><div className="mehfil-image main"><img src="/Image/Mehfil_AI.png" alt="MEHFIL AI 2026 event artwork" /></div><div className="mehfil-image crowd"><img src="/Image/2.png" alt="MEHFIL AI community moment" /></div><div className="mehfil-fact"><b>150+</b><span>students in the room</span><small>07 / 05 / 2026<br />PESHAWAR, PK</small></div></section>

    <section className="origin-story"><div className="origin-words"><p>HOW IT STARTED</p><h2>ONE<br />CAMPUS.</h2></div><div className="origin-photos"><img className="origin-a" src="/Image/Agentum Pic/6.jpg" alt="Students taking part in a Sociapi gathering" /><img className="origin-b" src="/Image/Agentum Pic/15.jfif" alt="Sociapi members together" /><span>Islamia College University · Peshawar, Pakistan</span></div><div className="origin-copy"><h3>One campus started it. Nine chapters carried it forward.</h3><p>Sociapi began at Islamia College University Peshawar. Events built momentum, campus leaders took the community into new universities.</p><p className="origin-now">01 CAMPUS → 03 MAJOR EVENTS → 09 CHAPTERS</p><Link to="/about">Read the full story ↗</Link></div></section>
    <HomeTeasers />

    <section className="campaign-partners"><p>BUILT WITH PEOPLE WHO SHOW UP</p><div>{partners.map(partner => <figure key={partner.name}><img src={partner.image} alt={`${partner.name} logo`} /><figcaption>{partner.name}</figcaption></figure>)}</div></section>
    <ChapterCTA />
  </div>;
}
