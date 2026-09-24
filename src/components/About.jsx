import { Braces, ShieldCheck, FlaskConical, Smartphone, MapPin, Briefcase, GraduationCap, Focus } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import './About.css';

const HIGHLIGHTS = [
  {
    icon: Braces,
    title: 'Java Backend Development',
    text: 'Spring Boot services with layered architecture, JWT security and JPA persistence.',
  },
  {
    icon: ShieldCheck,
    title: 'REST API Development',
    text: 'Secure, validated endpoints with centralized exception handling and clear contracts.',
  },
  {
    icon: FlaskConical,
    title: 'Test Automation',
    text: 'Selenium + TestNG frameworks with data-driven tests from real industry QA practice.',
  },
  {
    icon: Smartphone,
    title: 'Android Development',
    text: 'Java-based apps on Firebase with realtime data, auth and chat workflows.',
  },
];

const FACTS = [
  { icon: MapPin, label: 'Based in', value: 'Hyderabad, Telangana, India' },
  { icon: Focus, label: 'Current focus', value: 'Java · Spring Boot · Backend engineering' },
  { icon: Briefcase, label: 'Industry experience', value: 'Premier Energies · QA · Aug 2024 – Apr 2026' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech ECE · 2019 – 2023' },
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About Me"
          title={<>Backend engineering with <span className="gradient-text">industry discipline</span></>}
        />

        <div className="about__grid">
          <div className="about__text">
            <Reveal delay={0.05}>
              <p className="about__lead">
                Java backend developer building RESTful applications with Spring Boot, Spring
                Security, JPA/Hibernate, PostgreSQL and Kafka — with 1 year 9 months of
                professional Quality Assurance experience at Premier Energies.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                My engineering path combines hands-on backend development with real industry
                experience in data validation, defect analysis and root-cause investigation. At
                Premier Energies I worked inside a Manufacturing Execution System (MES)
                environment — validating production data, documenting mismatches and driving
                discrepancies to resolution with cross-functional teams.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                That discipline now shows up in how I build software: JWT-secured REST servers,
                validated request flows, event-driven messaging and testable, layered
                architecture. Alongside Spring Boot work, I build Android applications with
                Firebase and maintain Selenium/TestNG automation frameworks.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="about__facts">
                {FACTS.map((f) => (
                  <li key={f.label} className="about__fact">
                    <span className="about__fact-icon">
                      <f.icon size={15} aria-hidden="true" />
                    </span>
                    <span className="about__fact-label">{f.label}</span>
                    <span className="about__fact-value">{f.value}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="about__cards">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={0.08 * i} y={22}>
                <article className="about__card card">
                  <div className="about__card-icon">
                    <h.icon size={19} aria-hidden="true" />
                  </div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}