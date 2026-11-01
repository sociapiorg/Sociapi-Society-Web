import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { chapters, events, links, partners } from "../data/site";
import { ChapterCTA, HomeTeasers } from "./CommunityPages";
import { ResponsiveImage } from "../components/ResponsiveImage";

const activities = [
  ["01", "Campus chapters", "Build and lead a useful technology community where you study.", "/chapters"],
  ["02", "Events", "Meet practitioners, students, and ideas in rooms designed for real conversation.", "/events"],
  ["03", "Workshops", "Practice technical and professional skills with other students.", "/opportunities"],
  ["04", "Projects", "Build useful ideas with students and campus teams.", "/opportunities"],
  ["05", "Opportunities", "Find ways to volunteer, collaborate, lead, speak, and build.", "/opportunities"],
] as const;
const cityOrder = ["Peshawar", "Mardan", "Nowshera", "Faisalabad", "Lahore", "Multan"];
const impactStats = [
  { value: String(chapters.length).padStart(2, "0"), label: "Chapters across Pakistan" },
  { value: String(new Set(chapters.map(chapter => chapter.city)).size).padStart(2, "0"), label: "Cities represented" },
  { value: String(events.length).padStart(2, "0"), label: "Programs and events" },
  { value: "520+", label: "Participants reached" },
  { value: "38+", label: "Community members" },
];

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
        const progress = Math.min((now - start) / 3400, 1);
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
      <div className="hero-photo hero-photo-main"><ResponsiveImage src="/Image/ss team.jpg" alt="Sociapi students together at Islamia College University Peshawar" width="1440" height="990" sizes="100vw" fetchPriority="high" decoding="async" /></div>
      <div className="campaign-hero-shade" />
      <p className="campaign-kicker">Sociapi Society <span>• From Ideas to Intelligence.</span></p>
      <h1><span>Build skills.</span><span>Run events.</span><span className="lime-word"><strong>Lead</strong> your campus.</span></h1>
      <div className="campaign-hero-bottom">
        <p className="direct-answer">Sociapi Society is a student-led technology community in Pakistan. Students learn through campus chapters, practical AI and technology workshops, events, and projects. They can also take on leadership roles and collaborate with peers across universities.</p>
        <div><a className="hero-primary-cta" href={links.join} target="_blank" rel="noreferrer">Join Sociapi Society <b>↗</b></a><Link className="hero-secondary-cta" to="/events">Explore Our Events</Link></div>
      </div>
    </section>
    <div className="movement-line" aria-label="Sociapi impact">{impactStats.map(stat => <span key={stat.label}><ImpactCounter value={stat.value} /> {stat.label}</span>)}</div>

    <section className="national-stage">
      <div className="national-intro"><p>THE NETWORK / PAKISTAN</p><div><h2>Where does Sociapi connect campuses?</h2><p className="direct-answer">Sociapi lists nine student-led chapters in six cities: Peshawar, Mardan, Nowshera, Faisalabad, Lahore, and Multan. The chapter directory names the campuses and shares local participation details.</p></div><div><Link to="/chapters">Explore the national network ↗</Link></div></div>
      <div className="network-atlas">
        <div className="atlas-cities">{cityOrder.map(city => <Link to="/chapters" key={city}><strong>{city}</strong><span>{chapters.filter(chapter => chapter.city === city).length} {chapters.filter(chapter => chapter.city === city).length === 1 ? "chapter" : "chapters"}</span><b>↗</b></Link>)}</div>
        <div className="campus-ribbon">{chapters.map((chapter, index) => <Link key={chapter.slug} to={`/chapters/${chapter.slug}`}><sup>0{index + 1}</sup>{chapter.shortName}<span>{chapter.city}</span></Link>)}</div>
      </div>
    </section>

<section className="chapter-data-section"><div className="chapter-data"><h2>How many Sociapi chapters are listed in each city?</h2><p className="direct-answer">The public directory lists {chapters.length} chapters across {new Set(chapters.map(chapter => chapter.city)).size} cities. A campus chapter is a local student community that organizes activities and connects students with the wider Sociapi network.</p><div className="chapter-table-scroll"><table><caption>Listed Sociapi chapters by city</caption><thead><tr><th scope="col">City</th><th scope="col">Chapter</th><th scope="col">Number listed</th></tr></thead><tbody>{cityOrder.map(city => { const cityChapters = chapters.filter(chapter => chapter.city === city); return <tr key={city}><th scope="row">{city}</th><td>{cityChapters.length ? cityChapters.map((chapter, index) => <span key={chapter.slug}>{index > 0 && ", "}<Link to={`/chapters/${chapter.slug}`}>{chapter.shortName}</Link></span>) : "No chapter currently listed"}</td><td>{cityChapters.length}</td></tr>; })}</tbody></table></div></div></section>
    <section className="practice-spread"><header><p>WHAT SOCIAPI DOES</p><h2>How can students<br />take part?</h2><p className="direct-answer">Students can join by connecting with a campus chapter, attending an event, or asking Sociapi about local activities. Chapters are student communities that organize learning and events at their campuses. Options vary, so check the directory or contact the team.</p></header><ul className="practice-board" aria-label="Ways students can participate">{activities.map((activity, index) => <li key={activity[0]} className={`practice-piece piece-${index + 1}`}><Link className="practice-piece-link" to={activity[3]}><span>{activity[0]}</span><h3>{activity[1]}</h3><p>{activity[2]}</p><b>↗</b></Link></li>)}</ul><div className="participation-guide"><h3>How can students get started?</h3><p>Students can find a chapter, explore activities, and contact Sociapi to ask about joining or starting a campus community.</p><ol><li><Link to="/chapters">Find a campus chapter</Link></li><li><Link to="/events">Explore Sociapi events</Link></li><li><Link to="/contact">Ask about joining or starting a chapter</Link></li></ol></div></section>

    <section className="flagship-intro"><p>FLAGSHIP EVENTS / 2026</p><div><h2>What happens at Sociapi events?</h2><p className="direct-answer">Sociapi events help students explore technology, AI, and career topics through talks, panels, demonstrations, and discussion. The format depends on each program. AGENTUM 2026 and MEHFIL AI 2026 event pages describe their speakers, subjects, and activities.</p></div><div><Link to="/events">Explore all events ↗</Link></div></section>
    <section className="event-case"><img src={agentum.image} alt="AGENTUM 2026 stage and audience" width="1350" height="1800" loading="lazy" decoding="async" /><div className="event-case-veil" /><div className="event-case-index">PROOF / 01</div><div className="event-case-copy"><p>{agentum.date} · {agentum.attendance} students</p><h2>AGENTUM<br /><em>2026</em></h2><div><p>{agentum.summary}</p><Link to={`/events/${agentum.slug}`}>Enter the event story ↗</Link></div></div><div className="event-case-topics">{agentum.topics.map(topic => <span key={topic}>{topic}</span>)}</div></section>
    <section className="mehfil-story"><div className="mehfil-title"><span>PROOF / 02</span><h2>MEHFIL<br />AI 2026</h2><p>A student-led gathering bringing practical AI, careers, and community into one room.</p><Link to={`/events/${mehfil.slug}`}>See what happened ↗</Link></div><div className="mehfil-image main"><ResponsiveImage src="/Image/Mehfil_AI.png" alt="MEHFIL AI 2026 event artwork" width="1080" height="1350" loading="lazy" decoding="async" sizes="(max-width: 700px) 100vw, 40vw" /></div><div className="mehfil-image crowd"><img src="/Image/2.webp" alt="Students attending a MEHFIL AI session" width="1080" height="1350" loading="lazy" decoding="async" /></div><div className="mehfil-fact"><b>150+</b><span>students in the room</span><small>07 / 05 / 2026<br />PESHAWAR, PK</small></div></section>

    <section className="origin-story"><div className="origin-words"><p>HOW IT STARTED</p><h2>Where did Sociapi begin?</h2><p className="direct-answer origin-answer">Sociapi began at Islamia College University Peshawar and grew through events and student-led chapters.</p></div><div className="origin-photos"><img className="origin-a" src="/Image/Agentum Pic/6.webp" alt="Students taking part in a Sociapi gathering" width="1200" height="1600" loading="lazy" decoding="async" /><ResponsiveImage className="origin-b" src="/Image/Agentum Pic/15.jfif" alt="Sociapi members together" width="940" height="788" loading="lazy" decoding="async" sizes="(max-width: 700px) 100vw, 40vw" /><span>Islamia College University · Peshawar, Pakistan</span></div><div className="origin-copy"><h3>One campus started it. Nine chapters carried it forward.</h3><p>Sociapi began at Islamia College University Peshawar. Events built momentum, campus leaders took the community into new universities.</p><p className="origin-now">01 CAMPUS → 03 MAJOR EVENTS → 09 CHAPTERS</p><Link to="/about">Read the full story ↗</Link></div></section>
    <HomeTeasers />

    <section className="campaign-partners"><p>BUILT WITH PEOPLE WHO SHOW UP</p><div>{partners.map(partner => <figure key={partner.name}>{partner.name === "Farabi" ? <ResponsiveImage src={partner.image} alt={`${partner.name} logo`} width="1587" height="2245" loading="lazy" decoding="async" sizes="56px" /> : <img src={partner.image} alt={`${partner.name} logo`} /> }<figcaption>{partner.name}</figcaption></figure>)}</div></section>
    <ChapterCTA />
  </div>;
}
