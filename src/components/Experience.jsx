import { Briefcase, MapPin, Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import { experience } from '../data/experience.js';
import './Experience.css';

export default function Experience() {
  return (
    <section className="section section--alt experience" id="experience">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Professional Experience"
          title={<>Professional experience built on <span className="gradient-text">quality & engineering discipline</span></>}
          description={
            <>
              Professional QA experience at a solar energy manufacturer, working
              directly with MES production data, defect analysis and cross-functional teams.
            </>
          }
        />

        <div className="experience__layout">
          <Reveal delay={0.1} className="experience__timeline">
            <div className="experience__rail" aria-hidden="true">
              <span className="experience__dot" />
            </div>

            <article className="experience__card card">
              <div className="experience__meta">
                <span className="experience__date mono">
                  <Calendar size={13} aria-hidden="true" />
                  {experience.period}
                </span>
                <span className="experience__type mono">{experience.type}</span>
              </div>

              <h3 className="experience__role">{experience.role}</h3>

              <p className="experience__company">
                <Briefcase size={16} aria-hidden="true" />
                {experience.company}
                <span className="experience__location">
                  <MapPin size={13} aria-hidden="true" />
                  {experience.location}
                </span>
              </p>

              <p className="experience__summary">{experience.summary}</p>

              <ul className="experience__list">
                {experience.responsibilities.map((r, i) => (
                  <li key={i}>
                    <span className="experience__bullet" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="experience__tags">
                {experience.tags.map((t) => (
                  <span key={t} className="experience__tag mono">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.2} className="experience__aside">
            <div className="experience__note card">
              <h4 className="mono">How this shapes my software work</h4>
              <p>
                Validating station-by-station production counts against physical output taught me
                to verify data at the source, trace discrepancies to their root cause and document
                findings precisely — the same rigour I now apply to API contracts, test suites and
                code review.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}