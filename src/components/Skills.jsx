import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import BrandIcon from './BrandIcon.jsx';
import { skillCategories } from '../data/skills.js';
import './Skills.css';

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Technical Skills"
          title={<>My engineering <span className="gradient-text">toolkit</span></>}
          description="Backend development, databases, test automation,
          mobile development and engineering tools used across my projects and professional work."
        />

        <div className="skills__grid">
          {skillCategories.map((cat, ci) => (
            <Reveal key={cat.id} delay={Math.min(ci * 0.06, 0.3)} y={22} className="skills__cell">
              <article className="skills__card card">
                <header className="skills__header">
                  <div className="skills__header-row">
                    <h3>{cat.title}</h3>
                    <span className="skills__count mono">{cat.items.length}</span>
                  </div>
                  <p>{cat.blurb}</p>
                </header>

                <ul className="skills__list">
                  {cat.items.map((skill) => (
                    <li key={skill.name} className="skills__item">
                      <span className="skills__icon" aria-hidden="true">
                        <BrandIcon name={skill.icon} />
                      </span>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}