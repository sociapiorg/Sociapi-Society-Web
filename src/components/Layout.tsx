import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { links } from "../data/site";
import { Button, Container } from "./ui";
import { Seo } from "./Seo";

const primary = [["Home", "/"], ["About", "/about"], ["Chapters", "/chapters"], ["Events", "/events"], ["Programs", "/programs"], ["Opportunities", "/opportunities"]];
const more = [["Our Team", "/team"], ["Gallery", "/gallery"], ["Reviews", "/reviews"], ["FAQs", "/faqs"], ["Services", "/services"], ["Shop", "/shop"], ["Contact Us", "/contact"], ["Verify Certificate", "/verify"]];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setMoreOpen(false); window.scrollTo({ top: 0 }); }, [location.pathname]);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false); };
    addEventListener("mousedown", close);
    return () => removeEventListener("mousedown", close);
  }, []);

  return <><Seo />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><Container className="header-inner">
      <Link to="/" className="brand"><img src="/logo.png" alt="" /><span>SOCIAPI <small>SOCIETY</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {primary.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        <div className="more-menu" ref={moreRef}>
          <button onClick={() => setMoreOpen(!moreOpen)} aria-expanded={moreOpen} aria-haspopup="true">More <span>{moreOpen ? "−" : "+"}</span></button>
          {moreOpen && <div role="menu">{more.map(([label, path]) => <NavLink role="menuitem" key={path} to={path}>{label}<span>↗</span></NavLink>)}</div>}
        </div>
        <NavLink className="partner-nav" to="/partner-with-us">Partner With Us</NavLink>
      </nav>
      <span className="header-cta"><Button to={links.join} external>Join Sociapi</Button></span>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation"><span /><span /></button>
    </Container>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><Container>
      {primary.slice(1).map(([label, path]) => <NavLink key={path} to={path}>{label}<span>↗</span></NavLink>)}
      <p>MORE</p>{more.map(([label, path]) => <NavLink key={path} to={path}>{label}<span>↗</span></NavLink>)}
      <NavLink to="/partner-with-us">Partner With Us<span>↗</span></NavLink><Button to={links.join} external>Join Sociapi</Button>
    </Container></nav>}</header>
    <main id="main">{children}</main><Footer />
  </>;
}

function Column({ title, items }: { title: string; items: [string, string][] }) {
  return <div><h3>{title}</h3>{items.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}</div>;
}

function Footer() {
  return <footer><Container>
    <div className="footer-top expanded">
      <div className="footer-brand"><Link to="/" className="brand"><img src="/logo.png" alt="" /><span>SOCIAPI <small>SOCIETY</small></span></Link><p>A student-led technology community connecting campuses, practical learning, events, and student leadership across Pakistan.</p></div>
      <Column title="Explore" items={[["About", "/about"], ["Chapters", "/chapters"], ["Events", "/events"], ["Programs", "/programs"], ["Gallery", "/gallery"]]} />
      <Column title="Community" items={[["Our Team", "/team"], ["Opportunities", "/opportunities"], ["Reviews", "/reviews"], ["FAQs", "/faqs"]]} />
      <Column title="Take part" items={[["Join Sociapi", links.join], ["Partnerships", "/partner-with-us"], ["Contact Us", "/contact"], ["Shop", "/shop"]]} />
      <Column title="Resources" items={[["Sociapi Labs", "/services"], ["Verify Certificate", "/verify"]]} />
      <div><h3>Connect</h3><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={links.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={links.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={links.tiktok} target="_blank" rel="noreferrer">TikTok</a><a href={links.x} target="_blank" rel="noreferrer">X</a><a href={links.email}>Email</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Sociapi Society</span><span>From Ideas to Intelligence.</span><a href="https://xuhair.netlify.app/" target="_blank" rel="noreferrer">Designed by Zuhair Zeb ↗</a></div>
  </Container></footer>;
}
