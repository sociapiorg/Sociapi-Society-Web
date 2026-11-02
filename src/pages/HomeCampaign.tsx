import { useEffect, useRef, useState, type ReactNode } from "react";
import { Avatar, Style } from "@dicebear/core";
import gazeDefinition from "@dicebear/styles/gaze.json";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { chapters, events, links, partners, people } from "../data/site";
import { reviews } from "../data/secondary";
import "./HomeCampaign.css";

const cityOrder = ["Peshawar", "Mardan", "Nowshera", "Faisalabad", "Lahore", "Multan"];
const activities = [
  { number: "01", title: "Campus chapters", copy: "Find your people where you study.", to: "/chapters", icon: "campus" },
  { number: "02", title: "Events", copy: "Learn alongside students and experts.", to: "/events", icon: "events" },
  { number: "03", title: "Workshops", copy: "Explore new skills by doing.", to: "/opportunities", icon: "workshops" },
  { number: "04", title: "Projects", copy: "Make ideas useful with a team.", to: "/opportunities", icon: "projects" },
  { number: "05", title: "Volunteer", copy: "Help make the next gathering happen.", to: "/opportunities", icon: "volunteer" },
] as const;
const activityDoodles = {
  campus: ["M4 13 20 5l16 8-16 8-8-4", "M11 16v9h18v-9", "M17 25v-6h6v6"],
  events: ["M20 3l2.8 11.2L34 17l-11.2 2.8L20 31l-2.8-11.2L6 17l11.2-2.8L20 3Z", "M34 4v7", "M30.5 7.5h7"],
  workshops: ["M10 30 25 15", "M18 9a9 9 0 0 0 11 11l-6 6 6 6 6-6", "M8 32l-4 4"],
  projects: ["M8 27 23 7l13 22-24-9 24-5-17 19-1-24", "M4 35h32"],
  volunteer: ["M20 34S5 25 5 15a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 10-15 19-15 19Z", "M4 7l3 2", "M33 8l3-2"],
} as const;
const moments = [
  { src: "/Image/Event Image/Agentum Pic/12.png", alt: "Students sharing a moment at an AGENTUM event", width: 3024, height: 4032 },
  { src: "/Image/Event Image/Agentum Pic/14.png", alt: "Sociapi students working together at an AGENTUM event", width: 3024, height: 3343 },
  { src: "/Image/Event Image/Mehfil AI/3.png", alt: "Students attending a MEHFIL AI session", width: 1080, height: 1350 },
  { src: "/Image/Event Image/NIC VISIT/1.jpg", alt: "Sociapi students visiting the National Incubation Center", width: 1200, height: 1600 },
  { src: "/Image/Event Image/NIC VISIT/2.jpg", alt: "Sociapi students during a National Incubation Center visit", width: 1200, height: 1600 },
] as const;
const stats = [
  { value: "09", label: "Campus chapters" },
  { value: "39", label: "Team members" },
  { value: "520+", label: "Participants reached" },
  { value: String(events.length).padStart(2, "0"), label: "Featured programs" },
] as const;
const benefits = [
  { number: "01", title: "Learn by doing", copy: "Take part in practical events, workshops, and projects alongside other students." },
  { number: "02", title: "Find your people", copy: "Meet a welcoming campus community that makes it easier to start and keep learning." },
  { number: "03", title: "Try leading", copy: "Get involved in organizing, outreach, media, design, or a student-led chapter." },
  { number: "04", title: "Build together", copy: "Share ideas, contribute your skills, and make something useful with a team." },
] as const;

const guideStops = {
  hero: { action: "wave", position: "right", message: "Hi! I’ll show you around." },
  impact: { action: "celebrate", position: "left", message: "Look how far we’ve come." },
  chapters: { action: "point", position: "right", message: "There’s a chapter near you." },
  community: { action: "look", position: "left", message: "Pick your way to join in." },
  events: { action: "point", position: "right", message: "Come for the ideas. Stay for the people." },
  story: { action: "look", position: "left", message: "It started with one campus." },
  gallery: { action: "wave", position: "right", message: "These are our real moments." },
  team: { action: "look", position: "left", message: "Made by students, together." },
  testimonials: { action: "celebrate", position: "right", message: "A few words from our community." },
  benefits: { action: "point", position: "left", message: "Your next step can start here." },
  final: { action: "celebrate", position: "center", message: "Your turn to make a mark!" },
} as const;
type GuideStop = (typeof guideStops)[keyof typeof guideStops];

const gazeStyle = new Style(gazeDefinition);
const mascotImage = new Avatar(gazeStyle, { seed: "sociapi-society-guide", size: 128 }).toDataUri();

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, ease: [0.2, 0.75, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ImpactCounter({ value }: { value: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const target = Number(value.match(/\d+/)?.[0] ?? 0);
  const digits = value.match(/\d+/)?.[0].length ?? 1;
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(target * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={nodeRef} className="impact-value" aria-label={value}>
      {String(count).padStart(digits, "0")}{suffix}
    </span>
  );
}

function MascotGuide() {
  const [guide, setGuide] = useState<GuideStop>(guideStops.hero);
  const guideRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const stops = document.querySelectorAll<HTMLElement>("[data-mascot-stop]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
      const activeStop = visible[0]?.target.getAttribute("data-mascot-stop");
      if (activeStop && activeStop in guideStops) {
        setGuide(guideStops[activeStop as keyof typeof guideStops]);
      }
    }, { rootMargin: "-18% 0px -38% 0px", threshold: [0.15, 0.35, 0.6] });

    stops.forEach((stop) => observer.observe(stop));
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    let frame = 0;
    let lookX = 0;
    let lookY = 0;
    const followPointer = (event: PointerEvent) => {
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
  }, [shouldReduceMotion]);

  return (
    <aside
      ref={guideRef}
      className={`mascot-guide mascot-guide--${guide.position}`}
      data-action={guide.action}
      aria-hidden="true"
    >
      <div className="mascot-note">{guide.message}</div>
      <div className="mascot-orbit">
        <span className="mascot-spark mascot-spark--one" />
        <span className="mascot-spark mascot-spark--two">·</span>
        <img className="mascot-art" src={mascotImage} alt="" width={76} height={76} loading="eager" decoding="async" />
      </div>
    </aside>
  );
}

function ActivityDoodle({ name }: { name: keyof typeof activityDoodles }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      {activityDoodles[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

export default function HomeCampaign() {
  const teamLeads = people.filter((person) => person.group === "Leadership").slice(0, 4);
  const timeline = [
    {
      date: "Dec 2025",
      title: "One campus. One idea.",
      copy: "Sociapi Society started at Islamia College University Peshawar, with a belief that students can create opportunities together.",
      image: "/Image/Event Image/Agentum Pic/IMG_5921.png",
    },
    ...events.map((event) => ({
      date: event.date,
      title: event.name,
      copy: event.summary,
      image: event.image,
      to: `/events/${event.slug}`,
    })),
  ];

  return (
    <article className="campaign">
      <section className="campaign-hero" data-mascot-stop="hero">
        <div className="hero-ambient hero-ambient--one" aria-hidden="true" />
        <div className="hero-ambient hero-ambient--two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="hero-kicker-line" aria-hidden="true" />
            <svg className="hero-kicker-doodle" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.5 14.2 9l6.5-2.2-4.1 5.5 5.1 4.5-6.8-.5L12 22.5 9.1 16.3l-6.8.5 5.1-4.5-4.1-5.5L9.8 9 12 2.5Z" />
            </svg>
            Scroll to explore
          </p>
          <h1>Find Your{" "}<br /><span className="hero-script-word">People.</span>{" "}<br />Lead Your{" "}<br />Campus.</h1>
          <svg className="hero-copy-spark" viewBox="0 0 42 42" fill="none" aria-hidden="true">
            <path d="M21 3c1.4 10.1 3.9 15.6 18 18-14.1 2.4-16.6 7.9-18 18C19.6 28.9 17.1 23.4 3 21 17.1 18.6 19.6 13.1 21 3Z" />
            <path d="M34 2v8M30 6h8" />
          </svg>
          <p className="hero-description">Connecting students through technology, creativity, collaboration, and innovation.</p>
          <div className="hero-actions">
            <a className="button button-lime" href="#chapters">Explore Sociapi <span aria-hidden="true">↘</span></a>
            <a className="button button-outline" href={links.join} target="_blank" rel="noreferrer">Become a Member <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-footnote"><span>From ideas to intelligence.</span><span>Made for students, by students.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-badge" aria-hidden="true">
            <span>NEW</span>
          </div>
          <div className="hero-photo-wrap">
            <ResponsiveImage
              className="hero-team-photo"
              src="/Image/Team Pic/ss team.jpg"
              alt="Sociapi team gathered together"
              width={1440}
              height={695}
              sizes="(max-width: 760px) 100vw, 54vw"
              fetchPriority="high"
              decoding="async"
            />
            <svg className="hero-photo-outline" viewBox="0 0 500 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M17 9c66-4 125 3 193-1s126 5 201-1c27-2 75-1 78 13 4 75-2 151 2 228s-5 153 1 229c2 35-1 77-13 79-75 5-153-2-231 2s-150-4-228 2c-9 1-13-7-13-20 4-77-2-154 1-231s-3-154 1-230c1-32 0-67 8-70Z" />
            </svg>
            <div className="photo-caption"><span>AGENTUM 2026</span><span>Peshawar</span></div>
          </div>
          <div className="hero-photo-sticker" aria-hidden="true"><span>Good things<br /><i>grow</i><br />together</span><b /></div>
          <svg className="hero-scribble" viewBox="0 0 170 110" fill="none" aria-hidden="true">
            <path d="M8 67C42 16 117 12 148 45M148 45l-25-3m25 3-10-22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <svg className="hero-circuit-doodle" viewBox="0 0 82 66" fill="none" aria-hidden="true">
            <path d="M7 47h17V30h18V14h31M42 30h18v20h13M24 47v12h17" />
            <circle cx="7" cy="47" r="4" />
            <circle cx="73" cy="14" r="4" />
            <circle cx="73" cy="50" r="4" />
            <circle cx="41" cy="59" r="4" />
          </svg>
          <span className="hero-code-sticker" aria-hidden="true">&lt;/&gt;</span>
          <div className="hero-doodle-cluster" aria-hidden="true">
            <span className="hero-doodle-tag hero-doodle-tag--one">powered by chai</span>
            <span className="hero-doodle-tag hero-doodle-tag--two">campus chaos</span>
            <span className="hero-doodle-arrow">↘</span>
          </div>
          <span className="hero-floating-sticker hero-floating-brain" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M32 13c-4-7-15-5-16 4-8 0-11 9-6 14-6 7-2 17 6 18-1 9 10 13 16 6V13Zm0 0c4-7 15-5 16 4 8 0 11 9 6 14 6 7 2 17-6 18 1 9-10 13-16 6V13Z" />
              <path d="M32 17v34m-9-24-5-5m5 5v10m-5 8 6-3m17-15 5-5m-5 5v10m5 8-6-3" />
              <circle cx="23" cy="27" r="2" /><circle cx="41" cy="27" r="2" />
            </svg>
          </span>
          <span className="hero-floating-sticker hero-floating-laptop" aria-hidden="true">
            <svg viewBox="0 0 64 48" fill="none">
              <path d="M15 7h34a3 3 0 0 1 3 3v24H12V10a3 3 0 0 1 3-3Z" />
              <path className="hero-sticker-accent" d="M25 21c3-7 10-7 14 0m-14 0c3 7 10 7 14 0m-7-7v14" />
              <path d="m8 37-4 5c-1 1 0 3 2 3h52c2 0 3-2 2-3l-5-5H8Z" />
            </svg>
          </span>
          <span className="hero-floating-sticker hero-floating-chip" aria-hidden="true"><i /><b>AI</b><i /></span>
          <span className="hero-floating-sticker hero-floating-build" aria-hidden="true">BUILD</span>
          <span className="hero-floating-sticker hero-floating-network" aria-hidden="true">
            <svg viewBox="0 0 68 56" fill="none">
              <path d="m10 28 17-19 28 8 4 25-24 8-25-10V28Z" />
              <path d="m10 28 25 22 20-33-28-8-17 31 45 2" />
              <circle cx="10" cy="28" r="3" /><circle cx="27" cy="9" r="3" />
              <circle cx="55" cy="17" r="3" /><circle cx="59" cy="42" r="3" />
              <circle cx="35" cy="50" r="3" /><circle cx="10" cy="40" r="3" />
              <circle className="hero-sticker-node-accent" cx="35" cy="28" r="3" />
            </svg>
          </span>
          <span className="hero-index">Sociapi Society, Pakistan</span>
        </div>
        <a className="scroll-cue" href="#impact"><span className="scroll-cue-line" /> Scroll to explore</a>
      </section>

      <section className="impact-section guide-stop" id="impact" data-mascot-stop="impact" aria-label="Sociapi impact">
        <div className="section-wrap">
          <div className="impact-intro">
            <p className="section-label">A little momentum adds up</p>
            <h2>Small starts.<br /><span>Real reach.</span></h2>
          </div>
          <div className="impact-grid">
            {stats.map((stat, index) => (
              <Reveal className="impact-item" key={stat.label}>
                <span className="impact-index">0{index + 1}</span>
                <ImpactCounter value={stat.value} />
                <span className="impact-label">{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <span className="impact-doodle" aria-hidden="true" />
      </section>

      <section className="chapters-section guide-stop" id="chapters" data-mascot-stop="chapters">
        <div className="section-wrap">
          <div className="section-heading chapter-heading">
            <div>
              <p className="section-label">Our chapters</p>
              <h2>One big community.<br /><span>Nine campus homes.</span></h2>
            </div>
            <p className="section-lead">Find Sociapi in six cities across Pakistan. Every chapter is a local student community connected to the same national network.</p>
          </div>
          <div className="chapter-atlas">
            <div className="atlas-heading"><span>The Sociapi campus network</span><span>Pakistan <b>↗</b></span></div>
            <svg className="atlas-route" viewBox="0 0 1000 300" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M68 45c104 42 114 154 235 123s92-93 214-103 119 121 236 84 100-77 176-70" />
            </svg>
            <div className="atlas-cities">
              {cityOrder.map((city, cityIndex) => {
                const cityChapters = chapters.filter((chapter) => chapter.city === city);
                return (
                  <div className={`atlas-city atlas-city--${cityIndex + 1}`} key={city}>
                    <div className="city-heading"><span className="city-node" /><h3>{city}</h3><span className="city-count">{String(cityChapters.length).padStart(2, "0")}</span></div>
                    <div className="city-chapters">
                      {cityChapters.length > 0
                        ? cityChapters.map((chapter) => (
                          <Link to={`/chapters/${chapter.slug}`} key={chapter.slug} className="chapter-pin">
                            <span>{chapter.shortName}</span><b aria-hidden="true">↗</b>
                          </Link>
                        ))
                        : <span className="city-soon">Your campus could be next</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="atlas-footer"><span><i /> {chapters.length} chapters connected</span><Link to="/chapters">Meet the chapters <b aria-hidden="true">↗</b></Link></div>
          </div>
          <div className="chapter-footnote"><span>Find your campus. Find your people.</span><Link to="/chapter-application">Bring Sociapi to your university <b aria-hidden="true">↗</b></Link></div>
        </div>
      </section>

      <section className="community-section guide-stop" id="community" data-mascot-stop="community">
        <div className="section-wrap">
          <div className="section-heading">
            <div><p className="section-label">Find your way in</p><h2>There’s more than<br /><span>one way to belong.</span></h2></div>
            <p className="section-lead">Curious, experienced, creative, or still figuring it out? There’s room to learn, help out, and make something with other students.</p>
          </div>
          <ul className="activity-grid">
            {activities.map((activity) => (
              <li className="activity-card" key={activity.number}>
                <Link to={activity.to} className="activity-card-link">
                  <span className="activity-number">{activity.number}</span>
                  <span className="activity-doodle"><ActivityDoodle name={activity.icon} /></span>
                  <div><h3>{activity.title}</h3><p>{activity.copy}</p></div>
                  <span className="activity-arrow" aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="activity-note"><span>Start where you are.</span> We’ll figure out the rest together.</p>
        </div>
      </section>

      <section className="events-section guide-stop" id="events" data-mascot-stop="events">
        <div className="section-wrap">
          <div className="section-heading events-heading">
            <div><p className="section-label">Events and activities</p><h2>Ideas are better<br /><span>when shared.</span></h2></div>
            <div className="events-heading-aside"><span className="hand-circle">Real<br />people</span><p>Big questions, practical sessions, and a room full of people ready to learn.</p><Link to="/events">All Sociapi events <b aria-hidden="true">↗</b></Link></div>
          </div>
          <div className="event-editorial-grid">
            {events.map((event, index) => (
              <Link to={`/events/${event.slug}`} className={`event-feature event-feature--${index + 1}`} key={event.slug}>
                <div className="event-image">
                  <ResponsiveImage
                    src={
                      event.slug === "agentum-2026"
                        ? "/Image/Event Image/Agentum Pic/12.png"
                        : event.slug === "mehfil-ai-2026"
                            ? "/Image/Event Image/Mehfil AI/mehfil-ai-audience.png"
                          : event.image
                    }
                    alt={event.slug === "mehfil-ai-2026" ? "Students attending a Sociapi MEHFIL AI gathering" : `${event.name} event`}
                    width={event.slug === "mehfil-ai-2026" ? 768 : 1320}
                    height={event.slug === "mehfil-ai-2026" ? 960 : 1700}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 740px) 100vw, (max-width: 1000px) 50vw, 42vw"
                  />
                  <span className="event-image-index">0{index + 1} / 0{events.length}</span>
                  <span className="event-open" aria-hidden="true">↗</span>
                </div>
                <div className="event-meta"><span>{event.date}</span><span>{event.attendance}</span></div>
                <h3>{event.name}</h3>
                <p>{event.summary}</p>
                <div className="event-topics">{event.topics.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}</div>
              </Link>
            ))}
          </div>
          <div className="events-afterword"><span>The room is better with you in it.</span><Link to="/opportunities">Find your next opportunity <b aria-hidden="true">↗</b></Link></div>
        </div>
      </section>

      <section className="story-section guide-stop" id="story" data-mascot-stop="story">
        <div className="section-wrap">
          <div className="section-heading story-heading">
            <div><p className="section-label">A little backstory</p><h2>One campus.<br /><span>Then another.</span></h2></div>
            <p className="section-lead">Sociapi started in December 2025 at Islamia College University Peshawar. Student ideas, events, and new campus communities carried it forward.</p>
          </div>
          <div className="story-layout">
            <figure className="story-photo">
              <ResponsiveImage src="/Image/Event Image/Agentum Pic/7.jpeg" alt="Students gathered at a Sociapi community event" width={940} height={788} loading="lazy" decoding="async" sizes="(max-width: 760px) 100vw, 45vw" />
              <figcaption><span>The story is still being written</span><span>ICUP, Pakistan</span></figcaption>
              <span className="story-photo-stamp" aria-hidden="true" />
            </figure>
            <div className="story-timeline">
              {timeline.map((milestone, index) => (
                <article className="timeline-entry" key={`${milestone.date}-${milestone.title}`}>
                  <span className="timeline-marker">{String(index + 1).padStart(2, "0")}</span>
                  <div className="timeline-content">
                    <div className="timeline-text">
                      <p className="timeline-date">{milestone.date}</p>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.copy}</p>
                      {"to" in milestone && <Link to={milestone.to}>Read the story <b aria-hidden="true">↗</b></Link>}
                    </div>
                    <ResponsiveImage className="timeline-thumb" src={milestone.image} alt="" sizes="78px" loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="story-link"><Link to="/about">Get to know Sociapi <b aria-hidden="true">↗</b></Link><span>Founded by students. Growing with students.</span></div>
        </div>
      </section>

      <section className="gallery-section guide-stop" id="gallery" data-mascot-stop="gallery">
        <div className="section-wrap">
          <div className="gallery-heading">
            <div><p className="section-label">Behind the scenes</p><h2>Not stock photos.<br /><span>Our kind of moments.</span></h2></div>
            <Link to="/gallery">More from the community <b aria-hidden="true">↗</b></Link>
          </div>
          <div className="moments-grid">
            {moments.map((moment, index) => (
              <Link to="/gallery" className={`moment moment--${index + 1}`} key={moment.src} aria-label={`Open Sociapi gallery: ${moment.alt}`}>
                <ResponsiveImage
                  src={moment.src}
                  alt={moment.alt}
                  width={moment.width}
                  height={moment.height}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 28vw"
                />
                <span className="moment-caption">A Sociapi moment <b aria-hidden="true">↗</b></span>
              </Link>
            ))}
          </div>
          <p className="gallery-footnote"><span className="gallery-footnote-star" aria-hidden="true" /> All people and moments shown are from Sociapi events and activities.</p>
        </div>
      </section>

      <section className="team-section guide-stop" id="team" data-mascot-stop="team">
        <div className="section-wrap team-layout">
          <div className="team-intro">
            <p className="section-label">The people behind it</p>
            <h2>A community<br />is <span>people.</span></h2>
            <p>Students lead Sociapi across chapters, events, operations, outreach, media, and more. Meet a few of the people helping the community grow.</p>
            <Link to="/team">Meet the full team <b aria-hidden="true">↗</b></Link>
          </div>
          <div className="team-portraits">
            {teamLeads.map((person, index) => (
              <Link to="/team" className={`team-portrait team-portrait--${index + 1}`} key={person.name}>
                <ResponsiveImage src={person.image} alt={person.name} sizes="(max-width: 760px) 46vw, 18vw" loading="lazy" decoding="async" />
                <span><b>{person.name}</b><small>{person.role}</small></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section guide-stop" id="testimonials" data-mascot-stop="testimonials">
        <div className="section-wrap">
          <div className="section-heading testimonials-heading">
            <div><p className="section-label">Their words, not ours</p><h2>Good things<br /><span>travel by word.</span></h2></div>
            <Link to="/reviews">Read all community feedback <b aria-hidden="true">↗</b></Link>
          </div>
          <div className="testimonial-grid">
            {reviews.slice(0, 3).map((review, index) => (
              <blockquote className={`testimonial testimonial--${index + 1}`} key={review.author}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>{review.excerpt}</p>
                <footer><span className="review-star" aria-hidden="true" /><span><b>{review.author}</b><small>{review.source}</small></span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="benefits-section guide-stop" id="benefits" data-mascot-stop="benefits">
        <div className="section-wrap">
          <div className="section-heading benefits-heading">
            <div><p className="section-label">What you take with you</p><h2>More than a<br /><span>line on a CV.</span></h2></div>
            <p className="section-lead">A place to explore, contribute, learn with other students, and find your own way to lead.</p>
          </div>
          <div className="benefits-list">
            {benefits.map((benefit) => (
              <article className="benefit-row" key={benefit.number}>
                <span className="benefit-number">{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
                <span className="benefit-mark" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <div className="partner-strip">
            <span className="partner-intro">Growing together with</span>
            <div className="partner-list">
              {partners.map((partner) => (
                <figure className="partner-logo" key={partner.name}>
                  <ResponsiveImage src={partner.image} alt="" sizes="130px" loading="lazy" decoding="async" />
                  <figcaption>{partner.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="final-section guide-stop" id="join" data-mascot-stop="final">
        <div className="final-doodle final-doodle--one" aria-hidden="true" />
        <div className="final-doodle final-doodle--two" aria-hidden="true" />
        <div className="final-content">
          <p className="section-label">Your next chapter</p>
          <h2>The Next Chapter{" "}<br /><em>Starts With You.</em></h2>
          <p>Bring your curiosity, your ideas, your whole self. There’s a place for you in the Sociapi community.</p>
          <div className="final-actions">
            <a className="button button-lime" href={links.join} target="_blank" rel="noreferrer">Join Sociapi <span aria-hidden="true">↗</span></a>
            <Link className="button button-outline" to="/chapters">Explore Our Community <span aria-hidden="true">↘</span></Link>
          </div>
          <span className="final-signoff">See you on campus <b className="final-signoff-star" /></span>
        </div>
      </section>
      <MascotGuide />
    </article>
  );
}
