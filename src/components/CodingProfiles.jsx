import { ArrowUpRight } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiLeetcode, SiHackerrank } from 'react-icons/si';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import { socials } from '../data/site.js';
import './CodingProfiles.css';

const PROFILES = [
  {
    key: 'github',
    icon: SiGithub,
    name: 'GitHub',
    handle: socials.github.handle,
    tone: 'github',
    blurb: 'Spring Boot backends, Android apps and automation frameworks.',
  },
  {
    key: 'linkedin',
    icon: FaLinkedin,
    name: 'LinkedIn',
    handle: socials.linkedin.handle,
    tone: 'linkedin',
    blurb: 'Java backend development and software engineering background.',
  },
  {
    key: 'leetcode',
    icon: SiLeetcode,
    name: 'LeetCode',
    handle: socials.leetcode.handle,
    tone: 'leetcode',
    blurb: 'Algorithmic problem solving in Java.',
  },
  {
    key: 'hackerrank',
    icon: SiHackerrank,
    name: 'HackerRank',
    handle: socials.hackerrank.handle,
    tone: 'hackerrank',
    blurb: 'Java (Basic) certified — problem solving practice.',
  },
];

export default function CodingProfiles() {
  return (
    <section className="section section--alt profiles" id="profiles">
      <div className="container">
        <SectionHeading
          index="09"
          eyebrow="Developer Profiles"
          title={<>Connect & <span className="gradient-text">explore my work</span></>}
          description="Professional and competitive programming profiles — no stats fabricated, just the work."
        />

        <div className="profiles__grid">
          {PROFILES.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06} y={22}>
              <a
                href={socials[p.key].url}
                target="_blank"
                rel="noreferrer"
                className="profiles__card card"
              >
                <div className={`profiles__icon profiles__icon--${p.tone}`}>
                  <p.icon size={22} aria-hidden="true" />
                </div>
                <div className="profiles__body">
                  <h3>{p.name}</h3>
                  <span className="profiles__handle mono">@{p.handle}</span>
                  <p>{p.blurb}</p>
                </div>
                <ArrowUpRight size={18} className="profiles__arrow" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}