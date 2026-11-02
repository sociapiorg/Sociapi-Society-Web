import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

/* ============================================================
   SOCIAPI SOCIETY — UNIVERSITY CHAPTERS (single-file page)
   ============================================================ */

const EASE = [0.22, 1, 0.36, 1] as const;

const FORMS = {
  chapter: "https://forms.gle/rjCsLLKiz9FK5gFX6",
  ambassador: "https://forms.gle/gLYkmyJj7sp1zRJ2A",
};

/* ---------- every university has its own campus photo ---------- */
const IMG = {
  icp: "icp.jpg",
  uetMardan: "UET MARDAN.jfif",
  nfc: "NFC IEFR.jfif",
  uap: "aup.jfif",
  uetPeshawar: "uot.jfif",
  uop: "uop.jfif",
  uol: "UET LAHORE.jpg",
  CUSIT: "CUSIT.jpeg",
  BZU: "BZU.jpg",
  community: "Image/Event Image/Agentum Pic/IMG_5921.png",
  night: "community.jfif",
};

type Chapter = {
  code: string;
  name: string;
  uni: string;
  city: string;
  status: "active";
  tag: string;
  members: string;
  events: string;
  third: { label: string; value: string };
  node: { x: number; y: number };
  img: string;
};

const CHAPTERS: Chapter[] = [
  {
    code: "CH-01",
    name: "Islamia College Peshawar",
    uni: "Islamia College University",
    city: "Peshawar",
    status: "active",
    tag: "Founding Chapter",
    members: "20+",
    events: "3",
    third: { label: "Reached", value: "340+" },
    node: { x: 400, y: 268 },
    img: IMG.icp,
  },
  {
    code: "CH-02",
    name: "UET Mardan",
    uni: "University of Engineering & Technology, Mardan",
    city: "Mardan",
    status: "active",
    tag: "Campus Chapter",
    members: "2",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 138, y: 108 },
    img: IMG.uetMardan,
  },
  {
    code: "CH-03",
    name: "NFC IEFR",
    uni: "NFC Institute of Engineering & Fertilizer Research",
    city: "Faisalabad",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 648, y: 86 },
    img: IMG.nfc,
  },
  {
    code: "CH-04",
    name: "UAP Peshawar",
    uni: "The University of Agriculture, Peshawar",
    city: "Peshawar",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 706, y: 306 },
    img: IMG.uap,
  },
  {
    code: "CH-05",
    name: "UET Peshawar",
    uni: "University of Engineering & Technology — Nowshera Campus",
    city: "Nowshera",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 566, y: 462 },
    img: IMG.uetPeshawar,
  },
  
  {
    code: "CH-06",
    name: "University of Lahore",
    uni: "The University of Lahore",
    city: "Lahore",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 220, y: 472 },
    img: IMG.uol,
  },

  {
    code: "CH-07",
    name: "City University of Science & Information Technology Peshawar",
    uni: "City University of Science & Information Technology",
    city: "Peshawar",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 92, y: 302 },
    img: IMG.CUSIT,
  },

  {
    code: "CH-08",
    name: "Bahaudin Zakriya University Multan ",
    uni: "Bahaudin Zakriya University Multan ",
    city: "Multan",
    status: "active",
    tag: "Campus Chapter",
    members: "1",
    events: "0",
    third: { label: "Reached", value: "0" },
    node: { x: 390, y: 514 },
    img: IMG.BZU,
  },

];

const MAP_W = 800;
const MAP_H = 560;

const TRACKS = [
  { n: "01", title: "Artificial Intelligence", desc: "Foundational and applied AI — learning by building, not just theory." },
  { n: "02", title: "Machine Learning", desc: "Hands-on ML projects that ship into real student portfolios." },
  { n: "03", title: "Deep Learning", desc: "Neural networks and transformers, taught through practice." },
  { n: "04", title: "Generative AI", desc: "LLMs, agents and RAG systems — the tools shaping the AI era." },
  { n: "05", title: "Robotics & Automation", desc: "Smart systems that turn classroom ideas into working builds." },
  { n: "06", title: "Computer Vision", desc: "OpenCV and applied vision projects students can actually demo." },
  { n: "07", title: "Business Intelligence", desc: "Power BI, analytics and insight tied to real problems." },
  { n: "08", title: "Web Development", desc: "Modern, production-grade web — frontend, backend, AI-powered apps." },
];

const BENEFITS = [
  { n: "01", title: "Learn by doing, not by watching", desc: "Every chapter runs on projects. Students practice, share ideas, and solve problems as a team." },
  { n: "02", title: "Build a portfolio that stands out", desc: "Workshops, study groups and project activities produce real work — not just certificates." },
  { n: "03", title: "Open to every student", desc: "Beginner or advanced — everyone gets support, guidance, and a friendly environment." },
  { n: "04", title: "Real leadership experience", desc: "Chapter leaders manage teams, events and stakeholders before they graduate." },
  { n: "05", title: "Mentors, experts & opportunities", desc: "We connect students with mentors, industry experts, and the growing Sociapi network." },
  { n: "06", title: "One connected community", desc: "Every chapter routes back to the founding hub — shared branding, one calendar, one network." },
];

const LEADERSHIP = [
  { title: "Chapter President", role: "Lead", desc: "Owns strategy, external representation, and final calls." },
  { title: "Vice President", role: "Ops", desc: "Runs operations and coordination across the chapter." },
  { title: "General Secretary", role: "Records", desc: "Owns documentation, communications, and meeting cadence." },
];

const DEPTS = [
  { name: "Event Team", color: "#7bd355" },
  { name: "Outreach Team", color: "#7dd3a8" },
  { name: "Media Team", color: "#7fb4f0" },
  { name: "Design Team", color: "#c9a0f5" },
  { name: "Tech Team", color: "#f09070" },
  { name: "Women Wing", color: "#f08bb4" },
  { name: "Volunteers", color: "#7bd355" },
];

const STEPS = [
  { title: "Apply", meta: "10 MIN · ONLINE", desc: "Fill the chapter application — your campus, your team, and why you want to lead." },
  { title: "Interview", meta: "20 MIN · WITH THE TEAM", desc: "A straight conversation with the central team. Fit, drive, commitment — no trick questions." },
  { title: "Onboarding", meta: "WEEK 1–2 · TRAINING", desc: "You become a Campus Ambassador. Training deck, branding kit, and ops guide open up." },
  { title: "Team formation", meta: "WEEK 2–4 · RECRUITING", desc: "Build 5–7 founding members across events, outreach, media, tech and design." },
  { title: "Chapter launch", meta: "WEEK 4–6 · LAUNCH", desc: "Your chapter goes live with full Sociapi branding, toolkits, and support." },
];

const FAQS = [
  { q: "How do I start a chapter?", a: "Submit the application on this page. The central team reviews it, schedules a short interview, and walks you through the rest. Most campuses go from apply to launch in under six weeks." },
  { q: "Who can apply?", a: "Any enrolled student at a recognized university in Pakistan — with the heaviest focus on Khyber Pakhtunkhwa right now. Beginner or advanced does not matter." },
  { q: "Is prior leadership experience required?", a: "No. We screen for ambition, integrity, and reliability. The rest is taught through ambassador training and mentorship." },
  { q: "How many members do I need?", a: "A founding team of 5–7 works best. If you only have two or three committed people, apply anyway — team formation is part of the process." },
  { q: "What does the central team provide?", a: "Branding, mentorship, event toolkits, speaker connections, design templates, digital infrastructure, and ongoing operational guidance." },
];

const AMB = [
  { title: "Represent Sociapi", desc: "Be the accountable voice of Sociapi on your campus — events, notices, culture." },
  { title: "Recruit Members", desc: "Find the passionate students who will carry the chapter forward." },
  { title: "Organize Activities", desc: "Run workshops, meetups, and events with the central team's toolkits." },
  { title: "Build a Chapter", desc: "Turn the ambassadorship into a chartered, fully branded chapter." },
];

const TAGS = [
  { label: "Generative AI", side: "left" as const, top: "22%" },
  { label: "Machine Learning", side: "right" as const, top: "20%" },
  { label: "Computer Vision", side: "left" as const, top: "58%" },
  { label: "Robotics", side: "right" as const, top: "56%" },
  { label: "Data Science", side: "left" as const, top: "82%" },
  { label: "AI Agents", side: "right" as const, top: "80%" },
];

/* ---------- primitives ---------- */

/** Image with graceful fallback so a missing asset never breaks the layout. */
function ChapterImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? IMG.night : src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function MaskLine({ children, delay = 0, immediate = false }: { children: ReactNode; delay?: number; immediate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const show = immediate || inView;
  return (
    <span ref={ref} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={show ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1300);
      setV(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

function Pill({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7bd355] ${center ? "mx-auto" : ""}`}
    >
      <span className="text-[8px]">◆</span> {children}
    </span>
  );
}

function Primary({ href, children, ext }: { href: string; children: ReactNode; ext?: boolean }) {
  return (
    <a
      href={href}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-full bg-[#7bd355] px-6 py-3 font-display text-sm font-semibold text-[#1b2118] transition hover:brightness-110 sm:px-7"
    >
      {children}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M4 12h15M13 5.5 19.5 12 13 18.5" />
      </svg>
    </a>
  );
}

function Ghost({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 font-display text-sm font-semibold text-[#e8ecee] transition hover:border-[#7bd355]/40 sm:px-7"
    >
      {children}
    </a>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v20M2 12h20M5.2 5.2l13.6 13.6M18.8 5.2 5.2 18.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="currentColor" />
    </svg>
  );
}

function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 768 ? 36 : 56;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.4 + 0.4,
      }));
    };
    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (move) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = w + 10;
          else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          else if (n.y > h + 10) n.y = -10;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000) {
            ctx.strokeStyle = `rgba(123,211,85,${((1 - Math.sqrt(d2) / 122) * 0.2).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(123,211,85,0.55)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    resize();
    window.addEventListener("resize", resize);
    if (reduced) draw(false);
    else loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ---------- page ---------- */

export default function ChaptersPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const ticker = [...CHAPTERS.map((c) => c.name), "Your University"];
  const hoveredChapter = CHAPTERS.find((c) => c.code === hovered) ?? null;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx ?? 0));
        });
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="chapters-root bg-[#070907] text-[#e8ecee] antialiased">
      <style>{`
        .chapters-root { font-family: Inter, ui-sans-serif, system-ui, sans-serif; overflow-x: clip; }
        .chapters-root .font-display { font-family: Tomorrow, "Space Grotesk", ui-sans-serif, sans-serif; }
        .chapters-root .grid-lines { background-image: linear-gradient(rgba(232,236,238,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(232,236,238,0.045) 1px, transparent 1px); background-size: 64px 64px; }
        .chapters-root .mask-radial { mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 78%); }
        .chapters-root .text-outline { color: transparent; -webkit-text-stroke: 1.4px rgba(232,236,238,0.32); }
        @keyframes ch-marquee { to { transform: translateX(-50%); } }
        .chapters-root .marquee-track { display: flex; width: max-content; animation: ch-marquee 36s linear infinite; }
        @keyframes ch-spin { to { transform: rotate(360deg); } }
        .chapters-root .spin-slow { animation: ch-spin 44s linear infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes ch-dash { to { stroke-dashoffset: -60; } }
        .chapters-root .dash-flow { stroke-dasharray: 3 7; animation: ch-dash 3.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .chapters-root .marquee-track, .chapters-root .spin-slow, .chapters-root .dash-flow { animation: none !important; }
        }
      `}</style>

      {/* HERO */}
      <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <div className="grid-lines mask-radial absolute inset-0 opacity-80" />
          <NetworkCanvas />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070907] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070907] to-transparent" />
        </div>

        {TAGS.map((t) => (
          <span
            key={t.label}
            className="absolute z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm lg:inline-flex"
            style={{ top: t.top, ...(t.side === "left" ? { left: "3.5%" } : { right: "3.5%" }) }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355]" />
            {t.label}
          </span>
        ))}

        <div className="relative z-10 mx-auto flex w-full max-w-[980px] flex-1 flex-col items-center justify-center px-5 pb-10 pt-16 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7bd355]/25 bg-[#7bd355]/10 px-4 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7bd355] sm:text-[11px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355]" />
            University Expansion · Est. 2025
          </motion.p>

          <h1 className="font-display text-[clamp(2.9rem,11vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
            <MaskLine delay={0.1} immediate>
              Start a
            </MaskLine>
            <MaskLine delay={0.22} immediate>
              <span className="text-[#7bd355]">Sociapi</span>
            </MaskLine>
            <MaskLine delay={0.34} immediate>
              Chapter
            </MaskLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex w-full max-w-2xl items-end justify-center gap-3 sm:gap-4"
          >
            {[
              { src: IMG.icp, caption: "Founding Chapter", sub: "Islamia College", tall: false },
              { src: IMG.community, caption: "Our Community", sub: "Workshops & projects", tall: true },
              { src: IMG.night, caption: "Growing Network", sub: "Across Pakistan", tall: false },
            ].map((img) => (
              <figure
                key={img.caption}
                className={`relative overflow-hidden rounded-2xl border border-white/10 ${img.tall ? "w-[40%] max-w-[240px]" : "w-[28%] max-w-[180px]"}`}
              >
                <ChapterImage
                  src={img.src}
                  alt={img.caption}
                  className={`w-full object-cover ${img.tall ? "h-40 sm:h-48" : "h-32 sm:h-40"}`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 pb-2.5 pt-8 text-left">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[11px]">
                    {img.caption}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/65">{img.sub}</p>
                </figcaption>
              </figure>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62 }}
            className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-[#939596] sm:text-lg"
          >
            Building the next generation of AI, technology, leadership and innovation communities across universities —
            starting from Islamia College Peshawar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Primary href={FORMS.chapter} ext>
              Start a Chapter
            </Primary>
            <Ghost href="#network">Explore Chapters</Ghost>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88 }}
            className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { v: <Counter to={8} />, l: "Total Chapters" },
              { v: <Counter to={7} />, l: "Campus Ambassadors" },
              { v: <Counter to={340} suffix="+" />, l: "Students Reached" },
              { v: <Counter to={3} />, l: "Events Organized" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-black/40 px-3 py-5 sm:py-6">
                <p className="font-display text-3xl font-bold text-[#7bd355] sm:text-[2.1rem]">{s.v}</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-[#939596] sm:text-[11px]">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black/35 py-3">
          <div className="marquee-track items-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {ticker.map((name) => (
                  <span key={`${dup}-${name}`} className="flex items-center">
                    <span className="whitespace-nowrap px-7 font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#939596]">
                      {name}
                    </span>
                    <Mark className="h-3 w-3 text-[#7bd355]/65" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Pill>About the Society</Pill>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              <MaskLine>Students who</MaskLine>
              <MaskLine delay={0.1}>
                turn ideas into <span className="text-[#7bd355]">skills.</span>
              </MaskLine>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-[#939596] sm:text-base">
                Sociapi Society is a student-led community based at Islamia College Peshawar, where students turn ideas
                into skills and skills into real projects. We learn together and help each other grow — supporting every
                student who wants modern, practical technology in an easy and friendly way.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#939596] sm:text-base">
                We arrange workshops, training sessions, study groups and project activities. Students learn by doing,
                build real projects, and add strong work to their portfolios. Beginner or advanced — everyone gets
                support.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <ChapterImage src={IMG.community} alt="Sociapi students" className="h-72 w-full object-cover sm:h-80" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Pill>Learning Tracks</Pill>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
                <MaskLine>Eight tracks.</MaskLine>
                <MaskLine delay={0.1}>
                  One <span className="text-[#7bd355]">trajectory.</span>
                </MaskLine>
              </h2>
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-sm text-sm leading-relaxed text-[#939596] md:text-right">
                Programming, AI, robotics, Gen AI, machine learning, computer vision, data science and web — simple,
                practical, connected to real life.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((p, i) => (
              <Reveal key={p.title} delay={0.04 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-5">
                  <p className="font-display text-[11px] font-bold text-[#7bd355]">{p.n}</p>
                  <h3 className="mt-3 font-display text-base font-bold">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#939596]">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <div className="flex justify-center">
              <Pill>Why Start a Chapter</Pill>
            </div>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>From classroom theory</MaskLine>
              <MaskLine delay={0.1}>
                to production <span className="text-[#7bd355]">portfolios.</span>
              </MaskLine>
            </h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.04 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-5">
                  <p className="font-display text-[11px] font-bold text-[#7bd355]">{b.n}</p>
                  <h3 className="mt-3 font-display text-base font-bold">{b.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#939596]">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <div className="flex justify-center">
              <Pill>University Chapters</Pill>
            </div>
            <h2 className="mx-auto mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>One hub.</MaskLine>
              <MaskLine delay={0.1}>
                Eight <span className="text-[#7bd355]">campuses.</span>
              </MaskLine>
            </h2>
          </div>

          <Reveal>
            <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#101410]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-[#939596]">
                <span>Expansion Map — Pakistan</span>
                <span className="text-[#7bd355]">● All Chapters Live</span>
              </div>

              <div className="relative">
                <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full">
                  <circle cx={400} cy={268} r="72" fill="none" stroke="rgba(123,211,85,0.25)" strokeDasharray="2 8" className="spin-slow" />
                  {CHAPTERS.slice(1).map((n) => (
                    <line
                      key={n.code}
                      x1="400"
                      y1="268"
                      x2={n.node.x}
                      y2={n.node.y}
                      stroke={hovered === n.code ? "rgba(123,211,85,0.85)" : "rgba(123,211,85,0.3)"}
                      className="dash-flow"
                    />
                  ))}
                  {CHAPTERS.slice(1).map((n) => (
                    <g key={n.code} onMouseEnter={() => setHovered(n.code)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                      <circle cx={n.node.x} cy={n.node.y} r="22" fill="transparent" />
                      <circle
                        cx={n.node.x}
                        cy={n.node.y}
                        r={hovered === n.code ? 12 : 9}
                        fill="rgba(123,211,85,0.1)"
                        stroke="#7bd355"
                      />
                      <circle cx={n.node.x} cy={n.node.y} r="3" fill="#7bd355" stroke="#7bd355" />
                      <text x={n.node.x} y={n.node.y + 26} textAnchor="middle" fill="#939596" style={{ fontSize: 11 }}>
                        {n.city}
                      </text>
                    </g>
                  ))}
                  <g onMouseEnter={() => setHovered("CH-01")} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                    <circle cx="400" cy="268" r="20" fill="transparent" />
                    <circle cx="400" cy="268" r="11" fill="rgba(123,211,85,0.12)" stroke="#7bd355" />
                    <circle cx="400" cy="268" r="4.5" fill="#7bd355" />
                    <text x="400" y="234" textAnchor="middle" fill="#7bd355" style={{ fontSize: 11, fontWeight: 700 }}>
                      FOUNDING HUB
                    </text>
                  </g>
                </svg>

                {/* hover preview — each campus shows its own photo */}
                <AnimatePresence>
                  {hoveredChapter && (
                    <motion.div
                      key={hoveredChapter.code}
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="pointer-events-none absolute z-20 hidden w-56 -translate-x-1/2 -translate-y-full overflow-hidden rounded-2xl border border-white/15 bg-black/85 shadow-2xl backdrop-blur-md md:block"
                      style={{
                        left: `${(hoveredChapter.node.x / MAP_W) * 100}%`,
                        top: `${(hoveredChapter.node.y / MAP_H) * 100 - 3}%`,
                      }}
                    >
                      <ChapterImage src={hoveredChapter.img} alt={hoveredChapter.name} className="h-28 w-full object-cover" />
                      <div className="p-3 text-left">
                        <p className="font-display text-[9px] uppercase tracking-[0.2em] text-[#7bd355]">
                          {hoveredChapter.code} · Active
                        </p>
                        <p className="mt-1 font-display text-sm font-bold leading-tight">{hoveredChapter.name}</p>
                        <p className="mt-0.5 text-[11px] text-[#939596]">{hoveredChapter.city}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Founding chapter card */}
          <Reveal>
            <div className="relative mt-5 min-h-[380px] overflow-hidden rounded-[28px] sm:min-h-[440px]">
              <ChapterImage src={CHAPTERS[0].img} alt={CHAPTERS[0].name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
              <div className="relative z-10 flex min-h-[380px] flex-col justify-end p-6 sm:min-h-[440px] sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7bd355]/20 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7bd355]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7bd355]" /> Active
                  </span>
                  <span className="rounded-full bg-black/50 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Founding Chapter
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
                  {CHAPTERS[0].name}
                </h3>
                <p className="mt-2 text-sm text-white/75 sm:text-base">
                  {CHAPTERS[0].uni} · {CHAPTERS[0].city}
                </p>
                <div className="mt-6 flex flex-wrap gap-8">
                  {[
                    { v: CHAPTERS[0].members, l: "Members" },
                    { v: CHAPTERS[0].events, l: "Events" },
                    { v: CHAPTERS[0].third.value, l: "Reached" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="font-display text-3xl font-bold text-[#7bd355]">{s.v}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/60">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Live campus grid — each university shows its own campus photo */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.slice(1).map((c, i) => (
              <Reveal key={c.code} delay={0.035 * i}>
                <div
                  onMouseEnter={() => setHovered(c.code)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative min-h-[300px] overflow-hidden rounded-[24px] border transition-colors ${
                    hovered === c.code ? "border-[#7bd355]/50" : "border-white/10"
                  }`}
                >
                  <ChapterImage
                    src={c.img}
                    alt={`${c.name} campus`}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                  <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <span className="w-fit rounded-full bg-[#7bd355]/20 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7bd355]">
                        ● Active
                      </span>
                      <span className="rounded-full bg-black/60 px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.18em] text-white/60">
                        {c.code}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{c.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-white/60">{c.uni}</p>
                      <p className="mt-0.5 text-xs text-white/50">{c.city}</p>
                      <div className="mt-4 flex gap-5 border-t border-white/15 pt-3">
                        <div>
                          <p className="font-display text-lg font-bold text-[#7bd355]">{c.members}</p>
                          <p className="text-[9px] uppercase tracking-[0.14em] text-white/50">Members</p>
                        </div>
                        <div>
                          <p className="font-display text-lg font-bold text-[#7bd355]">{c.events}</p>
                          <p className="text-[9px] uppercase tracking-[0.14em] text-white/50">Events</p>
                        </div>
                        <div>
                          <p className="font-display text-lg font-bold text-[#7bd355]">{c.third.value}</p>
                          <p className="text-[9px] uppercase tracking-[0.14em] text-white/50">Reached</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <a
              href="#lead"
              className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#7bd355]/30 bg-[#7bd355]/[0.04] p-6 text-center transition hover:border-[#7bd355]/60"
            >
              <h3 className="font-display text-lg font-bold text-[#7bd355]">Your University</h3>
              <p className="mt-1 text-sm text-[#939596]">Start a chapter at your campus</p>
            </a>
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section id="structure" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="flex justify-center">
            <Pill>Organogram</Pill>
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>A living</MaskLine>
            <MaskLine delay={0.1}>
              organization <span className="text-[#7bd355]">map.</span>
            </MaskLine>
          </h2>

          <Reveal>
            <div className="relative mx-auto mt-12 hidden aspect-square w-full max-w-[760px] md:block">
              <svg viewBox="0 0 800 800" className="h-full w-full">
                <g className="spin-slow">
                  <circle cx="400" cy="400" r="280" fill="none" stroke="rgba(123,211,85,0.25)" strokeWidth="1" strokeDasharray="3 10" />
                </g>
                <circle cx="400" cy="400" r="200" fill="none" stroke="rgba(232,236,238,0.06)" strokeWidth="1" />
                {[...LEADERSHIP, ...DEPTS.map((d) => ({ title: d.name, role: d.color }))].map((node, i, arr) => {
                  const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 400 + 280 * Math.cos(a);
                  const y = 400 + 280 * Math.sin(a);
                  return (
                    <g key={String(node.title)}>
                      <line x1="400" y1="400" x2={x} y2={y} stroke="rgba(123,211,85,0.2)" />
                      <foreignObject x={x - 78} y={y - 18} width="156" height="36">
                        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/15 bg-black/70 px-3 text-center font-display text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                          {String(node.title)}
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
                <circle cx="400" cy="400" r="68" fill="rgba(123,211,85,0.12)" stroke="rgba(123,211,85,0.55)" strokeWidth="1.5" />
                <circle cx="400" cy="400" r="50" fill="#7bd355" />
                <text x="400" y="397" textAnchor="middle" fill="#070907" style={{ fontFamily: "Tomorrow", fontSize: 13, fontWeight: 800, letterSpacing: "0.12em" }}>
                  PRESIDENT
                </text>
                <text x="400" y="414" textAnchor="middle" fill="#1b2a14" style={{ fontFamily: "Tomorrow", fontSize: 9, letterSpacing: "0.16em" }}>
                  CHAPTER CORE
                </text>
              </svg>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3 md:hidden">
            {LEADERSHIP.map((r) => (
              <div key={r.title} className="rounded-2xl border border-[#7bd355]/20 bg-[#7bd355]/[0.06] p-5 text-center">
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-[#7bd355]">{r.role}</p>
                <h3 className="mt-2 font-display text-base font-bold">{r.title}</h3>
                <p className="mt-1.5 text-xs text-[#939596]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-white/10 bg-[#0a0d0a] px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Pill>How It Works</Pill>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
                <MaskLine>Application</MaskLine>
                <MaskLine delay={0.1}>
                  to <span className="text-[#7bd355]">launch.</span>
                </MaskLine>
              </h2>
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#101410] p-6">
                <p className="font-display text-5xl font-bold text-[#7bd355]">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-base text-[#939596]"> / 05</span>
                </p>
                <div className="mt-4 h-[3px] rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#7bd355] transition-all" style={{ width: `${((active + 1) / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-8">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-idx={i}
                className={`relative rounded-3xl border p-5 sm:p-7 transition-colors ${
                  active === i ? "border-[#7bd355]/40 bg-[#7bd355]/[0.05]" : "border-white/10 bg-[#101410]"
                }`}
              >
                <p className={`font-display text-[10px] uppercase tracking-[0.2em] ${active === i ? "text-[#7bd355]" : "text-[#6a6f6a]"}`}>
                  Step {String(i + 1).padStart(2, "0")} · {s.meta}
                </p>
                <div className="mt-3 flex gap-4">
                  <span className={`font-display text-4xl font-bold sm:text-5xl ${active === i ? "text-[#7bd355]" : "text-outline"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold sm:text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#939596]">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBASSADOR */}
      <section id="ambassador" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Pill>Join the Movement</Pill>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
            <MaskLine>No team yet?</MaskLine>
            <MaskLine delay={0.1}>
              Become as <span className="text-[#7bd355]">Campus Lead.</span>
            </MaskLine>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] text-[#939596]">
            Represent Sociapi on your campus, recruit members, organize activities, and turn that foothold into a full
            chapter.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Primary href={FORMS.ambassador} ext>
              Apply as a campus Lead
            </Primary>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AMB.map((r, i) => (
              <Reveal key={r.title} delay={0.05 * i}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#101410] p-5">
                  <h3 className="font-display text-base font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-[#939596]">{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN BAND */}
      <section className="relative border-t border-white/10">
        <div className="relative mx-4 my-12 overflow-hidden rounded-[28px] sm:mx-6 lg:mx-10">
          <ChapterImage src={IMG.night} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070907] via-[#070907]/85 to-[#070907]/40" />
          <div className="relative flex flex-col items-start justify-between gap-6 px-8 py-12 sm:flex-row sm:items-center sm:px-12 sm:py-14">
            <div>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7bd355]">◆ Ready</p>
              <h3 className="mt-2 max-w-xl font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                Join Sociapi Society Today.
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/70">
                Enter the community building future AI engineers — starting with a chapter on your campus.
              </p>
            </div>
            <Primary href={FORMS.chapter} ext>
              Start Membership
            </Primary>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Pill>FAQ</Pill>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-[-0.03em] sm:text-5xl">
              <MaskLine>Before</MaskLine>
              <MaskLine delay={0.1}>
                you <span className="text-outline">ask.</span>
              </MaskLine>
            </h2>
          </div>
          <div className="space-y-3 lg:col-span-8">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border ${open === i ? "border-[#7bd355]/30 bg-[#7bd355]/[0.04]" : "border-white/10 bg-[#101410]"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-bold sm:text-lg">{f.q}</span>
                  <span className="font-display text-[#7bd355]">{open === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-6 pb-5 text-sm leading-relaxed text-[#939596]"
                    >
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRICT LEAD */}
      <section id="lead" className="border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10">
            <ChapterImage src={IMG.night} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070907] via-[#070907]/90 to-[#070907]/50" />
            <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Pill>Join the Movement</Pill>
                <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[1.02] tracking-[-0.03em] sm:text-5xl">
                  Put your campus <span className="text-[#7bd355]">on the map.</span>
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#939596]">
                  Become a District Lead, run your campus, and convert the role into an official chapter. No prior
                  experience required.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Primary href={FORMS.ambassador} ext>
                    Apply as District Lead
                  </Primary>
                  <Ghost href={FORMS.chapter}>Start a Chapter</Ghost>
                </div>
                <p className="mt-5 font-display text-[11px] uppercase tracking-[0.18em] text-[#6a6f6a]">
                  Response within 48h · KPK priority · Intake open
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
                {[
                  ["Represent", "Be the face of Sociapi on your campus."],
                  ["Recruit", "Build the founding team of 5–7 students."],
                  ["Organize", "Host workshops, meetups and campus drives."],
                  ["Establish", "Turn the role into an official chapter."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm">
                    <h3 className="font-display text-base font-bold">{t}</h3>
                    <p className="mt-1.5 text-sm text-[#939596]">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 pt-16 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 pb-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold tracking-[0.08em]">SOCIAPI SOCIETY</p>
            <p className="mt-3 max-w-sm text-sm text-[#939596]">
              Student-led AI & technology community — Islamia College Peshawar, expanding across Pakistan.
            </p>
          </div>
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#7bd355]">Apply</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#939596]">
              <li>
                <a href={FORMS.chapter} target="_blank" rel="noopener noreferrer" className="hover:text-[#7bd355]">
                  Start a chapter
                </a>
              </li>
              <li>
                <a href={FORMS.ambassador} target="_blank" rel="noopener noreferrer" className="hover:text-[#7bd355]">
                  Campus ambassador
                </a>
              </li>
              <li>
                <a href="#lead" className="hover:text-[#7bd355]">
                  District lead
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#7bd355]">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#939596]">
              <li>Islamia College University, Peshawar</li>
              <li>34.0151°N 71.5843°E</li>
              <li>hello@sociapi.org</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="font-display text-[10px] uppercase tracking-[0.18em] text-[#6a6f6a]">
            © {new Date().getFullYear()} Sociapi Society. All rights reserved.
          </p>
        </div>
        <p aria-hidden="true" className="text-outline pointer-events-none text-center font-display text-[16vw] font-bold uppercase leading-[0.8] opacity-30">
          Sociapi
        </p>
      </footer>
    </div>
  );
}
