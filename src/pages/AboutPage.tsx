import { Link } from "react-router-dom";
import { Button, Container } from "../components/ui";
import { links } from "../data/site";
import { teamMembers } from "../data/secondary";
import { founderMessage } from "../data/founderMessage";

const fields = [
  "Artificial Intelligence", "Generative AI", "Machine Learning", "Deep Learning",
  "Robotics", "Programming", "Data Science", "Data Analysis", "Web Development",
  "OpenCV", "Emerging technologies",
];

const work = [
  "Workshops, seminars, training sessions, and technical events",
  "Real projects and stronger student portfolios",
  "Learning and study groups for practical skill development",
  "Teamwork, problem solving, and innovation",
  "Connections with mentors, industry professionals, and opportunities",
  "Support for exploring modern technology and career paths",
];

const shortBios: Record<string, string> = {
  "Muhammad Zuhair Zeb": "Founded Sociapi at Islamia College University Peshawar to help students learn technology through practical work, projects, and community leadership.",
  "Muhammad Mudassir": "Helps shape Sociapi's technology direction, with interests in computer vision, AI agents, and web development.",
  "Dr. Naveed Abbas": "Provides academic guidance and mentorship for responsible, practical student technology work.",
};

export default function AboutPage() {
  const featuredPeople = teamMembers.filter(person => ["Founder", "Co-Founder", "Advisor"].includes(person.role));

  return <div className="about-editorial">
    <section className="about-hero-new">
      <Container>
        <p>ABOUT SOCIAPI</p>
        <h1>Ideas become skills.<br />Skills become <em>solutions.</em></h1>
        <div>
          <p>Sociapi Society is a student-led AI and technology community connecting students across universities in Pakistan.</p>
          <p>We help students turn ideas into practical skills, real projects, and career opportunities.</p>
        </div>
      </Container>
    </section>

    <section className="about-people">
      <Container>
        <header><p>PEOPLE BEHIND SOCIAPI</p><h2>Student-led, built together.</h2><span>Leadership and academic guidance for a growing student community.</span></header>
        <div className="about-people-grid">{featuredPeople.map(person => <article key={person.name}>
          <img src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" />
          <div><p>{person.role === "Advisor" ? "ACADEMIC ADVISOR" : person.role.toUpperCase()}</p><h3>{person.name}</h3><span>{shortBios[person.name] ?? person.bio}</span></div>
        </article>)}</div>
        <Link className="about-people-link" to="/team">Meet the full team <span aria-hidden="true">&#8599;</span></Link>

        <div className="founder-message">
          <article>
            <header><p>A NOTE FROM THE FOUNDER</p><h3>Muhammad Zuhair Zeb</h3></header>
            <blockquote>{founderMessage.quote}</blockquote>
            <details className="founder-message-details">
              <summary>Read the founder's full message <span aria-hidden="true">+</span></summary>
              <div className="founder-message-copy">{founderMessage.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
              <p className="founder-message-signoff">From Ideas to Intelligence.</p>
            </details>
          </article>
        </div>
      </Container>
    </section>

    <section className="about-focus">
      <Container><p>WHAT WE LEARN AND BUILD</p><div>{fields.map(field => <span key={field}>{field}</span>)}</div></Container>
    </section>

    <section className="about-do">
      <Container>
        <header><p>WHAT WE DO</p><h2>A community designed for learning by doing.</h2></header>
        <ol>{work.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </Container>
    </section>

    <section className="about-purpose">
      <Container>
        <article><p>VISION</p><h2>To build a connected and skilled student technology community where ideas become skills, and skills become real-world solutions.</h2></article>
        <article><p>MISSION</p><ul>
          <li>Make technology education simple, practical, and accessible</li>
          <li>Give students opportunities to learn by doing</li>
          <li>Build a strong network of student tech communities</li>
          <li>Encourage innovation, collaboration, and project-based learning</li>
          <li>Connect students with industry, mentors, and career opportunities</li>
        </ul></article>
      </Container>
    </section>

    <section className="about-signoff">
      <Container><p>SOCIAPI</p><h2>From Ideas to Intelligence.</h2><Button to={links.join} external>Join Sociapi</Button></Container>
    </section>
  </div>;
}
